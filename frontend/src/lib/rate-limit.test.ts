import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { InMemoryRateLimiter } from "./rate-limit";

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
