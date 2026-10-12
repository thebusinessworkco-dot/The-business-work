import { describe, it, expect, vi, beforeEach } from "vitest";
import sitemap from "./sitemap";
import * as legalModule from "@/lib/legal";
import { services } from "@/content/services";

describe("Sitemap Generation (sitemap.ts)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("lists / and all 4 service pages, excluding /privacy and /terms when placeholders exist", () => {
    // Current state: legal documents have [[TO CONFIRM placeholders
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
    // Mock isLegalDraft to return false (simulating all placeholders confirmed/resolved)
    vi.spyOn(legalModule, "isLegalDraft").mockReturnValue(false);

    const map = sitemap();
    const urls = map.map((entry) => entry.url);

    // Must have 1 (home) + 4 (services) + 2 (legal) = 7 URLs
    expect(map).toHaveLength(1 + services.length + 2);

    expect(urls.some((u) => u.endsWith("/privacy"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/terms"))).toBe(true);
  });
});
