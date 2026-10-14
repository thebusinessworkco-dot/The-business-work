import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import sitemap from "./sitemap";
import * as legalModule from "@/lib/legal";
import { services } from "@/content/services";

describe("Sitemap Generation (sitemap.ts)", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.restoreAllMocks();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("lists / and all 4 service pages, excluding /privacy and /terms when placeholders exist", () => {
    // Simulate active [[TO CONFIRM]] placeholders
    vi.spyOn(legalModule, "isLegalDraft").mockReturnValue(true);

    const map = sitemap();
    const urls = map.map((entry) => entry.url);

    // Must have exactly 1 (home) + 4 (services) = 5 URLs
    expect(map).toHaveLength(1 + services.length);
    expect(services).toHaveLength(4);

    // Verify all 4 service URLs are present
    for (const service of services) {
      expect(urls.some((u) => u.endsWith(`/services/${service.id}`))).toBe(true);
    }

    // Must NOT contain draft legal pages
    expect(urls.some((u) => u.endsWith("/privacy"))).toBe(false);
    expect(urls.some((u) => u.endsWith("/terms"))).toBe(false);
  });

  it("automatically includes /privacy and /terms once all placeholders are resolved", () => {
    // Naturally finalized legal pages (no [[TO CONFIRM]] remaining)
    const map = sitemap();
    const urls = map.map((entry) => entry.url);

    // Must have 1 (home) + 4 (services) + 2 (legal) = 7 URLs
    expect(map).toHaveLength(1 + services.length + 2);

    expect(urls.some((u) => u.endsWith("/privacy"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/terms"))).toBe(true);
  });

  it("uses the official production domain https://www.thebusinesswork.com consistently for all entries", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    const map = sitemap();
    expect(map).toHaveLength(7);
    for (const entry of map) {
      expect(entry.url.startsWith("https://www.thebusinesswork.com")).toBe(true);
      expect(entry.url).not.toContain("your-domain");
      expect(entry.url).not.toContain("vercel.app");
    }
  });

  it("intercepts placeholder your-domain.vercel.app and falls back to https://www.thebusinesswork.com", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://your-domain.vercel.app";
    const map = sitemap();
    expect(map).toHaveLength(7);
    for (const entry of map) {
      expect(entry.url.startsWith("https://www.thebusinesswork.com")).toBe(true);
      expect(entry.url).not.toContain("your-domain");
    }
  });

  it("canonicalizes apex https://thebusinesswork.com to https://www.thebusinesswork.com in sitemap entries", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://thebusinesswork.com";
    const map = sitemap();
    expect(map).toHaveLength(7);
    for (const entry of map) {
      expect(entry.url.startsWith("https://www.thebusinesswork.com")).toBe(true);
    }
  });
});
