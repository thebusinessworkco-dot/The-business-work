import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { POST } from "@/app/api/chat/route";
import {
  InMemoryRateLimiter,
  getRateLimiter,
  getChatRateLimiter,
  getChatDailyLimiter,
  resetLimitersForTesting,
} from "./rate-limit";

describe("Rate Limiter Namespace Separation", () => {
  it("proves that lead limiter and chat limiters operate in distinct namespaces without colliding", async () => {
    const leadLimiter = new InMemoryRateLimiter(5, 600000, "ratelimit:lead:");
    const chatLimiter = new InMemoryRateLimiter(20, 600000, "ratelimit:chat:ip:");
    const testIp = "203.0.113.195";

    // Exhaust the lead limiter (5 requests)
    for (let i = 0; i < 5; i++) {
      const res = await leadLimiter.check(testIp);
      expect(res.allowed).toBe(true);
    }

    // Lead limiter is now blocked
    const leadBlocked = await leadLimiter.check(testIp);
    expect(leadBlocked.allowed).toBe(false);

    // Chat limiter for the EXACT SAME IP must still be completely allowed
    const chatAllowed = await chatLimiter.check(testIp);
    expect(chatAllowed.allowed).toBe(true);
    expect(chatAllowed.remaining).toBe(19);
  });
});

describe("/api/chat route behavior with mocked Gemini fetch", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    resetLimitersForTesting();
    process.env = {
      ...originalEnv,
      GEMINI_API_KEY: "mock-gemini-test-key",
      CHAT_ENABLED: "true",
      NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
      NODE_ENV: "test",
    };
    vi.restoreAllMocks();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
    vi.restoreAllMocks();
  });

  function createRequest(
    body: unknown,
    options: {
      headers?: Record<string, string>;
      rawBuffer?: ArrayBuffer;
    } = {}
  ): Request {
    const headers = new Headers({
      "Content-Type": "application/json",
      Origin: "http://localhost:3000",
      "x-forwarded-for": "198.51.100.1",
      ...(options.headers || {}),
    });

    const bodyData = options.rawBuffer
      ? options.rawBuffer
      : typeof body === "string"
      ? body
      : JSON.stringify(body);

    return new Request("http://localhost:3000/api/chat", {
      method: "POST",
      headers,
      body: bodyData,
    });
  }

  it("returns 415 if Content-Type is not application/json", async () => {
    const req = new Request("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: "Hello",
    });

    const res = await POST(req);
    expect(res.status).toBe(415);
    const data = await res.json();
    expect(data.error).toContain("Unsupported Media Type");
  });

  it("returns 403 on cross-origin requests", async () => {
    Object.defineProperty(process.env, "NODE_ENV", {
      value: "production",
      configurable: true,
      writable: true,
    });
    process.env.NEXT_PUBLIC_SITE_URL = "https://thebusinesswork.com";

    const req = new Request("https://thebusinesswork.com/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://malicious-website.com",
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: "Hello" }],
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(403);
    const data = await res.json();
    expect(data.error).toContain("Forbidden: cross-origin");
  });

  it("returns 413 if request body exceeds 8 KB", async () => {
    const oversizeBuffer = new Uint8Array(8193).buffer;
    const req = createRequest(null, { rawBuffer: oversizeBuffer });

    const res = await POST(req);
    expect(res.status).toBe(413);
    const data = await res.json();
    expect(data.error).toContain("exceeds maximum size");
  });

  it("returns 400 for invalid role or missing messages", async () => {
    // Missing messages array
    let req = createRequest({});
    let res = await POST(req);
    expect(res.status).toBe(400);

    // Invalid role
    req = createRequest({
      messages: [{ role: "system", content: "Test" }],
    });
    res = await POST(req);
    expect(res.status).toBe(400);
    expect((await res.json()).error).toContain("Invalid role");

    // Empty content
    req = createRequest({
      messages: [{ role: "user", content: "   " }],
    });
    res = await POST(req);
    expect(res.status).toBe(400);
    expect((await res.json()).error).toContain("cannot be empty");

    // Last message not from user
    req = createRequest({
      messages: [
        { role: "user", content: "Hi" },
        { role: "assistant", content: "Hello" },
      ],
    });
    res = await POST(req);
    expect(res.status).toBe(400);
    expect((await res.json()).error).toContain("Last message must be from the user");
  });

  it("returns 503 if GEMINI_API_KEY is missing or CHAT_ENABLED is false", async () => {
    // Key missing
    process.env.GEMINI_API_KEY = "";
    let req = createRequest({
      messages: [{ role: "user", content: "Hi" }],
    });
    let res = await POST(req);
    expect(res.status).toBe(503);
    expect((await res.json()).fallback).toBe(true);

    // CHAT_ENABLED is false
    process.env.GEMINI_API_KEY = "mock-key";
    process.env.CHAT_ENABLED = "false";
    req = createRequest({
      messages: [{ role: "user", content: "Hi" }],
    });
    res = await POST(req);
    expect(res.status).toBe(503);
    expect((await res.json()).fallback).toBe(true);
  });

  it("returns 200 with reply on successful Gemini response", async () => {
    const mockReply =
      "We provide AI agents that answer queries from your approved documents.";

    vi.spyOn(globalThis, "fetch").mockImplementation(async (url, init) => {
      // Ensure API key is passed in header and NOT in URL query
      expect(String(url)).not.toContain("mock-gemini-test-key");
      const headers = init?.headers as Record<string, string>;
      expect(headers["x-goog-api-key"]).toBe("mock-gemini-test-key");

      return new Response(
        JSON.stringify({
          candidates: [
            {
              content: {
                parts: [{ text: mockReply }],
              },
            },
          ],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    });

    const req = createRequest({
      messages: [{ role: "user", content: "What do you build?" }],
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.reply).toBe(mockReply);
  });

  it("trims message history to last 8 messages when 9+ messages are provided", async () => {
    let capturedPayload: any = null;

    vi.spyOn(globalThis, "fetch").mockImplementation(async (_url, init) => {
      capturedPayload = JSON.parse(String(init?.body));
      return new Response(
        JSON.stringify({
          candidates: [
            { content: { parts: [{ text: "Acknowledged." }] } },
          ],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    });

    const tenMessages = Array.from({ length: 10 }, (_, i) => ({
      role: i % 2 === 0 ? "user" : "assistant",
      content: `Message ${i + 1}`,
    }));
    // Ensure last is user
    tenMessages[9] = { role: "user", content: "Message 10" };

    const req = createRequest({ messages: tenMessages });
    const res = await POST(req);
    expect(res.status).toBe(200);

    // Gemini payload contents should have length 8 (oldest 2 dropped)
    expect(capturedPayload.contents).toHaveLength(8);
    expect(capturedPayload.contents[0].parts[0].text).toBe("Message 3");
    expect(capturedPayload.contents[7].parts[0].text).toBe("Message 10");
  });

  it("retries on 5xx error and returns 200 if retry succeeds", async () => {
    let callCount = 0;

    vi.spyOn(globalThis, "fetch").mockImplementation(async () => {
      callCount++;
      if (callCount === 1) {
        return new Response("Internal Server Error", { status: 500 });
      }
      return new Response(
        JSON.stringify({
          candidates: [
            { content: { parts: [{ text: "Success after retry." }] } },
          ],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    });

    const req = createRequest({
      messages: [{ role: "user", content: "Hello" }],
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(callCount).toBe(2);
    const data = await res.json();
    expect(data.reply).toBe("Success after retry.");
  });

  it("returns 502 friendly error if both attempts fail", async () => {
    let callCount = 0;

    vi.spyOn(globalThis, "fetch").mockImplementation(async () => {
      callCount++;
      return new Response("Service Unavailable", { status: 503 });
    });

    const req = createRequest({
      messages: [{ role: "user", content: "Hello" }],
    });

    const res = await POST(req);
    expect(res.status).toBe(502);
    expect(callCount).toBe(2);
    const data = await res.json();
    expect(data.error).toContain("having trouble reaching our AI service");
    expect(data.fallback).toBe(true);
  });

  it("filters out currency amounts and replaces with safe fallback", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(async () => {
      return new Response(
        JSON.stringify({
          candidates: [
            { content: { parts: [{ text: "Our setup price is ₹25,000." }] } },
          ],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    });

    const req = createRequest({
      messages: [{ role: "user", content: "How much does it cost?" }],
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.reply).toBe(
      "I'm not able to confirm that here. Please send us an enquiry and the team will help."
    );
  });

  it("enforces 20 requests per 10 minutes rate limit and returns 429 with Retry-After", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(async () => {
      return new Response(
        JSON.stringify({
          candidates: [
            { content: { parts: [{ text: "Hello there." }] } },
          ],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    });

    const uniqueIp = "192.0.2.100";

    // 20 allowed requests
    for (let i = 0; i < 20; i++) {
      const req = createRequest(
        { messages: [{ role: "user", content: `Ping ${i}` }] },
        { headers: { "x-forwarded-for": uniqueIp } }
      );
      const res = await POST(req);
      expect(res.status).toBe(200);
    }

    // 21st request must return 429
    const reqBlocked = createRequest(
      { messages: [{ role: "user", content: "Ping 21" }] },
      { headers: { "x-forwarded-for": uniqueIp } }
    );
    const resBlocked = await POST(reqBlocked);
    expect(resBlocked.status).toBe(429);
    expect(resBlocked.headers.get("Retry-After")).toBeTruthy();
    const data = await resBlocked.json();
    expect(data.error).toContain("Too many messages");
  });
});
