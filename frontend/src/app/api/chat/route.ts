import { NextResponse } from "next/server";
import { getClientIp, getChatRateLimiter, getChatDailyLimiter, hashIp } from "@/lib/rate-limit";
import { buildChatKnowledge } from "@/lib/chat-knowledge";
import { buildSystemPrompt } from "@/lib/chat-prompt";
import { filterChatReply } from "@/lib/chat-filter";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 8192; // 8 KB strict body size limit
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models";

// Strip control characters except newline (\n), carriage return (\r), and tab (\t)
function stripControlChars(str: string): string {
  return str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
}

export async function POST(req: Request) {
  const startTime = Date.now();
  const clientIp = getClientIp(req);
  const ipHash = hashIp(clientIp);

  // 1. Content-Type check (415)
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json(
      { error: "Unsupported Media Type. Please send JSON." },
      { status: 415 }
    );
  }

  // 2. Same-origin check (403)
  const origin = req.headers.get("origin");
  if (origin) {
    const isDev = process.env.NODE_ENV !== "production";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
    const normalizedOrigin = origin.replace(/\/$/, "");

    const isLocalDev =
      isDev &&
      (normalizedOrigin.startsWith("http://localhost:") ||
        normalizedOrigin.startsWith("http://127.0.0.1:"));

    if (!isLocalDev && (!siteUrl || normalizedOrigin !== siteUrl)) {
      return NextResponse.json(
        { error: "Forbidden: cross-origin requests are not allowed." },
        { status: 403 }
      );
    }
  }

  // 3. Body size limit check on actual bytes read (413)
  const arrayBuffer = await req.arrayBuffer();
  if (arrayBuffer.byteLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "Request body exceeds maximum size (8 KB)." },
      { status: 413 }
    );
  }

  // 4. Rate limiting: Daily global cap check (503 if exceeded)
  const dailyLimiter = getChatDailyLimiter();
  const dailyResult = await dailyLimiter.check("global-chat-daily");
  if (!dailyResult.allowed) {
    console.warn(`[chat] rate-limit hit: type=daily_global, ipHash=${ipHash}`);
    return NextResponse.json(
      {
        error:
          "Chat is temporarily unavailable due to daily capacity limits. Please send an enquiry or message us on WhatsApp.",
        fallback: true,
      },
      { status: 503 }
    );
  }

  // 5. Rate limiting: Per-IP check (20 requests per 10 minutes) (429)
  const ipLimiter = getChatRateLimiter();
  const ipResult = await ipLimiter.check(clientIp);
  if (!ipResult.allowed) {
    console.warn(`[chat] rate-limit hit: type=per_ip, ipHash=${ipHash}`);
    return NextResponse.json(
      {
        error:
          "Too many messages. Please wait a few minutes before trying again or send an enquiry.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(ipResult.resetInSeconds),
        },
      }
    );
  }

  // 6. Parse and validate JSON body (400)
  let body: Record<string, unknown>;
  try {
    const raw = new TextDecoder().decode(arrayBuffer);
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body || !Array.isArray(body.messages) || body.messages.length === 0) {
    return NextResponse.json(
      { error: "Invalid request: 'messages' must be a non-empty array." },
      { status: 400 }
    );
  }

  // 7. Validate individual messages
  interface CleanMessage {
    role: "user" | "assistant";
    content: string;
  }

  const rawMessages = body.messages as Array<Record<string, unknown>>;
  const cleanMessages: CleanMessage[] = [];

  for (const m of rawMessages) {
    if (!m || typeof m !== "object") {
      return NextResponse.json(
        { error: "Invalid message item in array." },
        { status: 400 }
      );
    }

    if (m.role !== "user" && m.role !== "assistant") {
      return NextResponse.json(
        { error: "Invalid role: must be 'user' or 'assistant'." },
        { status: 400 }
      );
    }

    if (typeof m.content !== "string") {
      return NextResponse.json(
        { error: "Message content must be a string." },
        { status: 400 }
      );
    }

    const stripped = stripControlChars(m.content).trim();
    if (!stripped) {
      return NextResponse.json(
        { error: "Message content cannot be empty." },
        { status: 400 }
      );
    }

    // Cap individual message content at 500 characters
    cleanMessages.push({
      role: m.role,
      content: stripped.slice(0, 500),
    });
  }

  // Last message must be from the user
  const lastMessage = cleanMessages[cleanMessages.length - 1];
  if (!lastMessage || lastMessage.role !== "user") {
    return NextResponse.json(
      { error: "Last message must be from the user." },
      { status: 400 }
    );
  }

  // 8. Check if chat is enabled and API key is present (503)
  const chatEnabled = process.env.CHAT_ENABLED === "true";
  const apiKey = process.env.GEMINI_API_KEY;

  if (!chatEnabled || !apiKey) {
    return NextResponse.json(
      {
        error: "Chat is unavailable right now.",
        fallback: true,
      },
      { status: 503 }
    );
  }

  // Keep at most 8 messages (drop oldest if > 8)
  const windowedMessages =
    cleanMessages.length > 8 ? cleanMessages.slice(-8) : cleanMessages;

  // 9. Prepare Gemini REST API call
  const knowledge = buildChatKnowledge();
  const systemInstruction = buildSystemPrompt(knowledge);
  const model = process.env.GEMINI_MODEL || "gemini-3.8-flash";
  const endpoint = `${GEMINI_API_URL}/${encodeURIComponent(model)}:generateContent`;

  const geminiContents = windowedMessages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const requestPayload = {
    systemInstruction: {
      parts: [{ text: systemInstruction }],
    },
    contents: geminiContents,
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 300,
    },
  };

  const payloadString = JSON.stringify(requestPayload);
  let geminiSuccess = false;
  let lastStatus = 0;
  let responseText = "";

  // Call Gemini with 1 retry on network error or 5xx
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: payloadString,
        signal: AbortSignal.timeout(12000),
      });

      lastStatus = res.status;

      if (res.ok) {
        const data = (await res.json()) as {
          candidates?: Array<{
            content?: {
              parts?: Array<{ text?: string }>;
            };
          }>;
        };

        responseText =
          data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
        geminiSuccess = true;
        break;
      }

      // Retry on 5xx server errors
      if (res.status >= 500 && attempt === 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        continue;
      }

      break;
    } catch {
      lastStatus = 0;
      if (attempt === 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        continue;
      }
      break;
    }
  }

  const durationMs = Date.now() - startTime;

  if (!geminiSuccess || !responseText) {
    console.error(
      `[chat] Gemini API failed: status=${lastStatus}, durationMs=${durationMs}, ipHash=${ipHash}`
    );
    return NextResponse.json(
      {
        error:
          "We're having trouble reaching our AI service right now. Please try again in a moment or send an enquiry.",
        fallback: true,
      },
      { status: 502 }
    );
  }

  // 10. Filter model output before returning to client
  const { text: safeReply } = filterChatReply(responseText);

  console.info(
    `[chat] request completed: status=200, durationMs=${durationMs}, ipHash=${ipHash}`
  );

  return NextResponse.json({ reply: safeReply });
}
