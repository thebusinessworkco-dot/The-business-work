import { NextResponse } from "next/server";
import { parseLead } from "@/lib/lead";
import { getClientIp, getRateLimiter } from "@/lib/rate-limit";
import { isPlaceholder } from "@/lib/site";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 10_000;

function getUnavailableMessage(): string {
  const hasRealWhatsapp = !isPlaceholder("whatsapp");
  const hasRealEmail = !isPlaceholder("email");

  if (hasRealWhatsapp && hasRealEmail) {
    return "Our enquiry service is temporarily unavailable. Please try again in a few minutes, or reach us on WhatsApp or email.";
  }
  if (hasRealWhatsapp) {
    return "Our enquiry service is temporarily unavailable. Please try again in a few minutes, or message us on WhatsApp.";
  }
  if (hasRealEmail) {
    return "Our enquiry service is temporarily unavailable. Please try again in a few minutes, or email us directly.";
  }
  return "Our enquiry service is temporarily unavailable. Please try again in a few minutes.";
}

function getTurnstileUnavailableMessage(): string {
  const hasRealWhatsapp = !isPlaceholder("whatsapp");
  if (hasRealWhatsapp) {
    return "The security check is not working right now. Please try again soon or message us on WhatsApp.";
  }
  return "The security check is not working right now. Please try again soon.";
}

function getRateLimitMessage(): string {
  const hasRealWhatsapp = !isPlaceholder("whatsapp");
  if (hasRealWhatsapp) {
    return "Too many messages sent. Please wait a few minutes before trying again or message us on WhatsApp.";
  }
  return "Too many messages sent. Please wait a few minutes before trying again.";
}

function getDeliveryFailedMessage(): string {
  const hasRealWhatsapp = !isPlaceholder("whatsapp");
  const hasRealEmail = !isPlaceholder("email");

  if (hasRealWhatsapp && hasRealEmail) {
    return "We couldn't send your enquiry. Please try again in a few minutes, or reach us on WhatsApp or email.";
  }
  if (hasRealWhatsapp) {
    return "We couldn't send your enquiry. Please try again in a few minutes, or message us on WhatsApp.";
  }
  if (hasRealEmail) {
    return "We couldn't send your enquiry. Please try again in a few minutes, or email us directly.";
  }
  return "We couldn't send your enquiry. Please try again in a few minutes.";
}


export async function POST(req: Request) {
  // 1. Content-Type check
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json(
      { error: "Unsupported Media Type. Please send JSON." },
      { status: 415 }
    );
  }

  // 2. Same-origin check
  const origin = req.headers.get("origin");
  if (origin) {
    let originHost: string | null = null;
    try {
      originHost = new URL(origin).host.toLowerCase();
    } catch {
      return NextResponse.json(
        { error: "Forbidden: cross-origin requests are not allowed." },
        { status: 403 }
      );
    }

    const forwardedHost = req.headers.get("x-forwarded-host");
    const rawHost = forwardedHost
      ? forwardedHost.split(",")[0].trim()
      : req.headers.get("host") || (req.url ? new URL(req.url).host : null);
    const requestHost = rawHost ? rawHost.toLowerCase().trim() : null;

    let siteHost: string | null = null;
    if (process.env.NEXT_PUBLIC_SITE_URL) {
      try {
        siteHost = new URL(process.env.NEXT_PUBLIC_SITE_URL).host.toLowerCase();
      } catch {
        siteHost = null;
      }
    }

    const isAllowed =
      Boolean((requestHost && originHost === requestHost) ||
      (siteHost && originHost === siteHost));

    if (!isAllowed) {
      return NextResponse.json(
        { error: "Forbidden: cross-origin requests are not allowed." },
        { status: 403 }
      );
    }
  }

  // 3. Body size limit check on actual bytes read
  const arrayBuffer = await req.arrayBuffer();
  if (arrayBuffer.byteLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "Request body too large." },
      { status: 413 }
    );
  }

  // 4. Rate limiting per IP
  const clientIp = getClientIp(req);
  const limiter = getRateLimiter();
  const rateLimitResult = await limiter.check(clientIp);

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      {
        error: getRateLimitMessage(),
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimitResult.resetInSeconds),
        },
      }
    );
  }

  // 5. Parse JSON
  let body: Record<string, unknown>;
  try {
    const raw = new TextDecoder().decode(arrayBuffer);
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // 6. Honeypot check (fake success for bots)
  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  // 7. Minimum-time-to-submit check (fake success for submissions under 2s)
  const startedAt =
    typeof body.startedAt === "number"
      ? body.startedAt
      : typeof body.startedAt === "string"
      ? Number(body.startedAt)
      : null;

  if (!startedAt || Date.now() - startedAt < 2000) {
    return NextResponse.json({ ok: true });
  }

  // 8. Lead validation and consent check
  const parseResult = parseLead(body);
  if (!parseResult.ok) {
    return NextResponse.json({ error: parseResult.error }, { status: 400 });
  }

  const { lead } = parseResult;

  // 8b. Optional Cloudflare Turnstile CAPTCHA verification (when configured)
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (turnstileSecret && turnstileSiteKey) {
    const turnstileToken =
      typeof body.turnstileToken === "string" ? body.turnstileToken.trim() : "";
    if (!turnstileToken) {
      return NextResponse.json(
        { error: "Please complete the security check to continue." },
        { status: 400 }
      );
    }

    try {
      const verifyRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            secret: turnstileSecret,
            response: turnstileToken,
            remoteip: clientIp,
          }),
          signal: AbortSignal.timeout(8000),
        }
      );

      if (!verifyRes.ok) {
        console.error(`[turnstile] Verification endpoint returned HTTP ${verifyRes.status}`);
        return NextResponse.json(
          {
            error: getTurnstileUnavailableMessage(),
          },
          { status: 503 }
        );
      }

      const verifyData = (await verifyRes.json().catch(() => ({}))) as {
        success?: boolean;
      };
      if (!verifyData.success) {
        return NextResponse.json(
          { error: "Security check failed. Please refresh and try again." },
          { status: 400 }
        );
      }
    } catch {
      console.error("[turnstile] Security verification timed out or network error");
      return NextResponse.json(
        {
          error: getTurnstileUnavailableMessage(),
        },
        { status: 503 }
      );
    }
  }

  // 9. Webhook configuration check
  const hook = process.env.LEAD_WEBHOOK_URL;
  if (!hook) {
    if (process.env.NODE_ENV === "production") {
      console.error("[contact] LEAD_WEBHOOK_URL is not configured in production.");
      return NextResponse.json(
        {
          error: getUnavailableMessage(),
        },
        { status: 503 }
      );
    }

    console.warn(
      "[contact] Lead validated but LEAD_WEBHOOK_URL is not set (dev mode). Lead was not stored."
    );
    return NextResponse.json({
      ok: true,
      devNotice:
        "Lead validated successfully. In local development without LEAD_WEBHOOK_URL, lead delivery is skipped.",
    });
  }

  // In production, refuse non-HTTPS webhooks (fail safe without logging URL)
  if (process.env.NODE_ENV === "production") {
    if (!hook.startsWith("https://")) {
      console.error("[contact] Refused non-HTTPS LEAD_WEBHOOK_URL in production.");
      return NextResponse.json(
        {
          error: getUnavailableMessage(),
        },
        { status: 503 }
      );
    }
    if (
      process.env.NOTIFY_WEBHOOK_URL &&
      !process.env.NOTIFY_WEBHOOK_URL.startsWith("https://")
    ) {
      console.error("[contact] Refused non-HTTPS NOTIFY_WEBHOOK_URL in production.");
      return NextResponse.json(
        {
          error: getUnavailableMessage(),
        },
        { status: 503 }
      );
    }
  }

  // 10. Webhook delivery with 1 retry on network error or 5xx
  const secret = process.env.LEAD_WEBHOOK_SECRET;
  const secretMode = process.env.LEAD_WEBHOOK_SECRET_MODE || "header";
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const payload: Record<string, unknown> = { ...lead };

  if (secret) {
    headers["x-webhook-secret"] = secret;
    if (secretMode === "body" || hook.includes("script.google.com")) {
      payload.secret = secret;
    }
  }

  const bodyStr = JSON.stringify(payload);
  const startTime = Date.now();
  let lastStatus = 0;
  let success = false;
  let attempts = 0;

  for (let attempt = 1; attempt <= 2; attempt++) {
    attempts = attempt;
    try {
      const res = await fetch(hook, {
        method: "POST",
        headers,
        body: bodyStr,
        signal: AbortSignal.timeout(12000),
      });

      lastStatus = res.status;
      if (res.ok) {
        success = true;
        break;
      }

      // Retry once on 5xx server errors
      if (res.status >= 500 && attempt === 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        continue;
      }

      // Do not retry on 4xx client errors
      break;
    } catch {
      lastStatus = 0;
      // Retry once on network or timeout error
      if (attempt === 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        continue;
      }
      break;
    }
  }

  const durationMs = Date.now() - startTime;

  if (!success) {
    console.error(
      `[contact] Webhook delivery failed: status=${lastStatus}, attempts=${attempts}, durationMs=${durationMs}`
    );
    return NextResponse.json(
      {
        error: getDeliveryFailedMessage(),
      },
      { status: 502 }
    );
  }


  console.info(
    `[contact] Webhook delivery succeeded: status=${lastStatus}, attempts=${attempts}, durationMs=${durationMs}`
  );

  // 11. Optional owner notification (fire-and-forget)
  if (process.env.NOTIFY_WEBHOOK_URL) {
    const summary = lead.business
      ? `New enquiry: ${lead.name} (${lead.business}) - ${lead.service}`
      : `New enquiry: ${lead.name} - ${lead.service}`;

    fetch(process.env.NOTIFY_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ summary }),
      signal: AbortSignal.timeout(5000),
    }).catch((err) => {
      console.warn(
        "[notify] Owner notification failed:",
        err instanceof Error ? err.message : "unknown"
      );
    });
  }

  return NextResponse.json({ ok: true });
}
