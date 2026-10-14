import { describe, it, expect, vi, beforeEach } from "vitest";
import robots from "./robots";
import sitemap from "./sitemap";
import * as legalModule from "@/lib/legal";
import { generateMetadata as generatePrivacyMeta } from "./privacy/page";
import { generateMetadata as generateTermsMeta } from "./terms/page";

describe("E4 State 2 & 3: Indexing and Legal Placeholders", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("allows general site indexing on custom host while keeping legal pages noindexed and out of sitemap when placeholders exist", () => {
    vi.spyOn(legalModule, "isLegalDraft").mockReturnValue(true);
    vi.spyOn(legalModule, "getLegalRobots").mockReturnValue({ index: false, follow: false });
    process.env.NEXT_PUBLIC_ALLOW_INDEXING = "true";
    process.env.NEXT_PUBLIC_SITE_URL = "https://yourdomain.test";

    // 1. Robots.txt
    const robotsResult = robots();
    expect(robotsResult.rules).toEqual([
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ]);
    expect(robotsResult.sitemap).toBe("https://yourdomain.test/sitemap.xml");

    // 2. Sitemap.xml excludes draft legal pages (1 home + 4 services + 2 solutions = 7)
    const sitemapResult = sitemap();
    expect(sitemapResult).toHaveLength(7);
    expect(sitemapResult[0].url).toBe("https://yourdomain.test");
    expect(sitemapResult.some((e) => e.url.includes("/privacy"))).toBe(false);
    expect(sitemapResult.some((e) => e.url.includes("/terms"))).toBe(false);

    // 3. Legal pages robots meta is noindex
    const privMeta = generatePrivacyMeta();
    const termsMeta = generateTermsMeta();
    expect(privMeta.robots).toEqual({ index: false, follow: false });
    expect(termsMeta.robots).toEqual({ index: false, follow: false });
  });

  it("includes legal pages in sitemap and enables indexing when legal pages are finalized", () => {
    process.env.NEXT_PUBLIC_ALLOW_INDEXING = "true";
    process.env.NEXT_PUBLIC_SITE_URL = "https://yourdomain.test";

    // Sitemap includes all 9 pages (1 home + 4 services + 2 solutions + 2 legal = 9)
    const sitemapResult = sitemap();
    expect(sitemapResult).toHaveLength(9);
    expect(sitemapResult.some((e) => e.url.includes("/privacy"))).toBe(true);
    expect(sitemapResult.some((e) => e.url.includes("/terms"))).toBe(true);

    // Legal pages are indexable
    const privMeta = generatePrivacyMeta();
    const termsMeta = generateTermsMeta();
    expect(privMeta.robots).toEqual({ index: true, follow: true });
    expect(termsMeta.robots).toEqual({ index: true, follow: true });
  });
});
