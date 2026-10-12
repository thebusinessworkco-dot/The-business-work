import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { InMemoryRateLimiter, getClientIp } from "./rate-limit";

describe("InMemoryRateLimiter", () => {
  let limiter: InMemoryRateLimiter;
  const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
  const LIMIT = 5;

  beforeEach(() => {
    vi.useFakeTimers();
    limiter = new InMemoryRateLimiter(LIMIT, WINDOW_MS);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("allows 5 requests within the window and blocks the 6th", async () => {
    const key = "test-ip-1";

    // First 5 requests must be allowed
    for (let i = 1; i <= 5; i++) {
      const result = await limiter.check(key);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(LIMIT - i);
      expect(result.resetInSeconds).toBeGreaterThan(0);
    }

    // 6th request must be blocked
    const blocked = await limiter.check(key);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.resetInSeconds).toBeGreaterThan(0);
  });

  it("resets after the window expires using fake timers", async () => {
    const key = "test-ip-2";

    // Exhaust limit
    for (let i = 1; i <= 5; i++) {
      await limiter.check(key);
    }

    const blocked = await limiter.check(key);
    expect(blocked.allowed).toBe(false);

    // Advance time past the 10-minute window
    vi.advanceTimersByTime(WINDOW_MS + 1000);

    // Next request should now be allowed with remaining reset to 4
    const fresh = await limiter.check(key);
    expect(fresh.allowed).toBe(true);
    expect(fresh.remaining).toBe(LIMIT - 1);
  });

  it("tracks different keys independently", async () => {
    const keyA = "ip-a";
    const keyB = "ip-b";

    for (let i = 0; i < 5; i++) {
      await limiter.check(keyA);
    }

    expect((await limiter.check(keyA)).allowed).toBe(false);
    expect((await limiter.check(keyB)).allowed).toBe(true);
  });
});

describe("getClientIp", () => {
  it("prioritizes x-vercel-ip when present", () => {
    const req = new Request("http://localhost/api/test", {
      headers: {
        "x-vercel-ip": "203.0.113.195",
        "x-real-ip": "198.51.100.1",
        "x-forwarded-for": "192.0.2.1, 198.51.100.1",
      },
    });
    expect(getClientIp(req)).toBe("203.0.113.195");
  });

  it("falls back to x-real-ip when x-vercel-ip is missing", () => {
    const req = new Request("http://localhost/api/test", {
      headers: {
        "x-real-ip": "198.51.100.5",
        "x-forwarded-for": "192.0.2.2",
      },
    });
    expect(getClientIp(req)).toBe("198.51.100.5");
  });

  it("extracts first IP from x-forwarded-for when platform headers are missing", () => {
    const req = new Request("http://localhost/api/test", {
      headers: {
        "x-forwarded-for": "192.0.2.45, 10.0.0.1",
      },
    });
    expect(getClientIp(req)).toBe("192.0.2.45");
  });

  it("returns 127.0.0.1 when no IP headers are provided", () => {
    const req = new Request("http://localhost/api/test");
    expect(getClientIp(req)).toBe("127.0.0.1");
  });
});
