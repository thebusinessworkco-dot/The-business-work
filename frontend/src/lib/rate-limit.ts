export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetInSeconds: number;
}

export interface RateLimiter {
  check(key: string): Promise<RateLimitResult>;
}

/**
 * In-memory fallback rate limiter.
 *
 * NOTE: This Map is held in application process memory.
 * On serverless platforms (e.g. Vercel, AWS Lambda), execution environments
 * are ephemeral and scaled across multiple instances. Rate limits in memory
 * will not be shared across instances.
 *
 * For reliable distributed enforcement across all serverless instances,
 * set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.
 */
export class InMemoryRateLimiter implements RateLimiter {
  private store = new Map<string, { count: number; resetAt: number }>();
  public readonly windowMs: number;
  public readonly limit: number;
  public readonly keyPrefix: string;

  constructor(limit = 5, windowMs = 10 * 60 * 1000, keyPrefix = "") {
    this.limit = limit;
    this.windowMs = windowMs;
    this.keyPrefix = keyPrefix;
  }

  async check(key: string): Promise<RateLimitResult> {
    const storageKey = this.keyPrefix ? `${this.keyPrefix}${key}` : key;
    const now = Date.now();
    const entry = this.store.get(storageKey);

    if (!entry || now >= entry.resetAt) {
      const resetAt = now + this.windowMs;
      this.store.set(storageKey, { count: 1, resetAt });
      return {
        allowed: true,
        limit: this.limit,
        remaining: this.limit - 1,
        resetInSeconds: Math.ceil(this.windowMs / 1000),
      };
    }

    if (entry.count < this.limit) {
      entry.count += 1;
      const resetInSeconds = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
      return {
        allowed: true,
        limit: this.limit,
        remaining: this.limit - entry.count,
        resetInSeconds,
      };
    }

    const resetInSeconds = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
    return {
      allowed: false,
      limit: this.limit,
      remaining: 0,
      resetInSeconds,
    };
  }

  reset(): void {
    this.store.clear();
  }
}

/**
 * Distributed rate limiter using Upstash Redis REST API (fetch-based, zero npm dependencies).
 */
export class UpstashRedisRateLimiter implements RateLimiter {
  private readonly url: string;
  private readonly token: string;
  public readonly limit: number;
  public readonly windowSeconds: number;
  public readonly keyPrefix: string;

  constructor(
    url: string,
    token: string,
    limit = 5,
    windowSeconds = 600,
    keyPrefix = "ratelimit:lead:"
  ) {
    this.url = url.replace(/\/$/, "");
    this.token = token;
    this.limit = limit;
    this.windowSeconds = windowSeconds;
    this.keyPrefix = keyPrefix;
  }

  async check(key: string): Promise<RateLimitResult> {
    const redisKey = `${this.keyPrefix}${key}`;
    try {
      const res = await fetch(`${this.url}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", redisKey],
          ["TTL", redisKey],
        ]),
        signal: AbortSignal.timeout(3000),
      });

      if (!res.ok) {
        throw new Error(`Upstash returned HTTP ${res.status}`);
      }

      const results = (await res.json()) as Array<{ result: number }>;
      const count = Number(results[0]?.result || 1);
      let ttl = Number(results[1]?.result ?? -1);

      // If new key or no expiry set, set the expiration window
      if (ttl === -1 || count === 1) {
        fetch(`${this.url}/expire/${encodeURIComponent(redisKey)}/${this.windowSeconds}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${this.token}` },
        }).catch(() => {});
        ttl = this.windowSeconds;
      }

      const resetInSeconds = ttl > 0 ? ttl : this.windowSeconds;
      const allowed = count <= this.limit;
      const remaining = Math.max(0, this.limit - count);

      return {
        allowed,
        limit: this.limit,
        remaining,
        resetInSeconds,
      };
    } catch (err) {
      console.warn(
        "[rate-limit] Upstash check failed, allowing request as fail-open:",
        err instanceof Error ? err.message : "unknown"
      );
      return {
        allowed: true,
        limit: this.limit,
        remaining: 1,
        resetInSeconds: this.windowSeconds,
      };
    }
  }
}

/**
 * Extracts client IP safely from request headers.
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "127.0.0.1";
}

/**
 * Returns a short 8-char FNV-1a hash of an IP address for privacy-safe logging.
 * Never logs raw IP addresses.
 */
export function hashIp(ip: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < ip.length; i++) {
    hash ^= ip.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

let defaultLimiter: RateLimiter | null = null;

export function getRateLimiter(): RateLimiter {
  if (defaultLimiter) return defaultLimiter;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    defaultLimiter = new UpstashRedisRateLimiter(url, token, 5, 600, "ratelimit:lead:");
  } else {
    defaultLimiter = new InMemoryRateLimiter(5, 10 * 60 * 1000, "ratelimit:lead:");
  }

  return defaultLimiter;
}

let chatIpLimiter: RateLimiter | null = null;

export function getChatRateLimiter(): RateLimiter {
  if (chatIpLimiter) return chatIpLimiter;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    chatIpLimiter = new UpstashRedisRateLimiter(url, token, 20, 600, "ratelimit:chat:ip:");
  } else {
    chatIpLimiter = new InMemoryRateLimiter(20, 10 * 60 * 1000, "ratelimit:chat:ip:");
  }

  return chatIpLimiter;
}

let chatDailyLimiter: RateLimiter | null = null;

export function getChatDailyLimiter(): RateLimiter {
  if (chatDailyLimiter) return chatDailyLimiter;

  const dailyLimit = parseInt(process.env.CHAT_DAILY_LIMIT || "500", 10) || 500;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    chatDailyLimiter = new UpstashRedisRateLimiter(url, token, dailyLimit, 86400, "ratelimit:chat:daily:");
  } else {
    chatDailyLimiter = new InMemoryRateLimiter(dailyLimit, 24 * 60 * 60 * 1000, "ratelimit:chat:daily:");
  }

  return chatDailyLimiter;
}

/**
 * Resets limiters for isolated testing.
 */
export function resetLimitersForTesting(): void {
  defaultLimiter = null;
  chatIpLimiter = null;
  chatDailyLimiter = null;
}
