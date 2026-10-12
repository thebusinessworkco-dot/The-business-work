import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST } from "./route";

describe("Contact API Route (/api/contact)", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = {
      ...originalEnv,
      NODE_ENV: "development",
      LEAD_WEBHOOK_URL: "https://example.com/webhook",
      NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
    };
    vi.restoreAllMocks();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  let ipCounter = 1;
  function createRequest(body: Record<string, unknown>, headers: Record<string, string> = {}) {
    const ip = `192.168.1.${ipCounter++}`;
    return new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "http://localhost:3000",
        "x-forwarded-for": ip,
        ...headers,
      },
      body: JSON.stringify(body),
    });
  }

  const validLeadBody = {
    name: "Aman Sharma",
    business: "Sharma Diagnostics",
    email: "aman@example.com",
    phone: "+91 98765 43210",
    service: "AI Agents & Chatbots",
    problem: "Automating clinic appointments",
    consent: true,
    startedAt: Date.now() - 3000,
    page: "/services/ai-agents-chatbots",
    cta: "hero",
    utm_source: "linkedin",
  };

  it("returns 415 for non-JSON content-type", async () => {
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "content-type": "text/plain" },
      body: "plain text",
    });
    const res = await POST(req);
    expect(res.status).toBe(415);
  });

  it("returns fake success for honeypot submissions", async () => {
    const req = createRequest({ ...validLeadBody, website: "spam-bot.com" });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
  });

  it("returns fake success for ultra-fast bot submissions (< 2s)", async () => {
    const req = createRequest({ ...validLeadBody, startedAt: Date.now() - 500 });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
  });

  it("verifies Cloudflare Turnstile token when enabled", async () => {
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = "test-site-key";
    process.env.TURNSTILE_SECRET_KEY = "test-secret-key";

    // 1. Missing token -> 400
    const reqNoToken = createRequest({ ...validLeadBody });
    const resNoToken = await POST(reqNoToken);
    expect(resNoToken.status).toBe(400);
    const dataNoToken = await resNoToken.json();
    expect(dataNoToken.error).toContain("security check");

    // 2. Failed siteverify -> 400
    globalThis.fetch = vi.fn().mockImplementation((url: string) => {
      if (url.includes("challenges.cloudflare.com")) {
        return Promise.resolve(new Response(JSON.stringify({ success: false })));
      }
      return Promise.resolve(new Response(JSON.stringify({ ok: true })));
    });

    const reqBadToken = createRequest({ ...validLeadBody, turnstileToken: "invalid_token" });
    const resBadToken = await POST(reqBadToken);
    expect(resBadToken.status).toBe(400);
    const dataBadToken = await resBadToken.json();
    expect(dataBadToken.error).toContain("Security check failed");

    // 3. Successful siteverify -> 200
    globalThis.fetch = vi.fn().mockImplementation((url: string) => {
      if (url.includes("challenges.cloudflare.com")) {
        return Promise.resolve(new Response(JSON.stringify({ success: true })));
      }
      return Promise.resolve(new Response(JSON.stringify({ ok: true })));
    });

    const reqGoodToken = createRequest({ ...validLeadBody, turnstileToken: "valid_token" });
    const resGoodToken = await POST(reqGoodToken);
    expect(resGoodToken.status).toBe(200);
  });

  it("refuses non-HTTPS webhook URLs in production environment", async () => {
    (process.env as Record<string, string | undefined>).NODE_ENV = "production";
    process.env.NEXT_PUBLIC_SITE_URL = "https://thebusinesswork.com";
    process.env.LEAD_WEBHOOK_URL = "http://insecure-endpoint.com/lead";

    const req = new Request("https://thebusinesswork.com/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "https://thebusinesswork.com",
        "x-forwarded-for": "192.168.1.99",
      },
      body: JSON.stringify(validLeadBody),
    });

    const res = await POST(req);
    expect(res.status).toBe(503);
    const data = await res.json();
    expect(data.error).toContain("temporarily unavailable");
  });

  it("sends lead with attribution fields to webhook and retries on 500 error", async () => {
    let callCount = 0;
    let receivedPayload: Record<string, unknown> = {};

    globalThis.fetch = vi.fn().mockImplementation((url: string, options: any) => {
      callCount++;
      if (options && options.body) {
        try {
          receivedPayload = JSON.parse(options.body);
        } catch {}
      }

      // First call fails with 500; second call succeeds with 200
      if (callCount === 1) {
        return Promise.resolve(new Response("Internal Error", { status: 500 }));
      }
      return Promise.resolve(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    });

    const req = createRequest(validLeadBody);
    const res = await POST(req);

    expect(res.status).toBe(200);
    // Exactly one retry happened (2 calls total)
    expect(callCount).toBe(2);

    // Verify received payload contains attribution fields
    expect(receivedPayload).toHaveProperty("page", "/services/ai-agents-chatbots");
    expect(receivedPayload).toHaveProperty("cta", "hero");
    expect(receivedPayload).toHaveProperty("utm_source", "linkedin");
  });

  it("returns 502 when webhook endpoint repeatedly fails", async () => {
    globalThis.fetch = vi.fn().mockImplementation(() => {
      return Promise.resolve(new Response("Gateway Down", { status: 500 }));
    });

    const req = createRequest(validLeadBody);
    const res = await POST(req);

    expect(res.status).toBe(502);
    const data = await res.json();
    expect(data.error).toContain("couldn't send your enquiry");
  });
});
