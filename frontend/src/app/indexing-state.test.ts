import { describe, it, expect } from "vitest";
import robots from "./robots";
import sitemap from "./sitemap";
import { generateMetadata as generatePrivacyMeta } from "./privacy/page";
import { generateMetadata as generateTermsMeta } from "./terms/page";

describe("E4 State 2: Indexing Enabled with Active Legal Placeholders", () => {
  it("allows general site indexing on custom host while keeping legal pages noindexed and out of sitemap", () => {
    process.env.NEXT_PUBLIC_ALLOW_INDEXING = "true";
    process.env.NEXT_PUBLIC_SITE_URL = "https://yourdomain.test";

    // 1. Robots.txt
    const robotsResult = robots();
    console.log("robots.txt Output:", JSON.stringify(robotsResult, null, 2));
    expect(robotsResult.rules).toEqual([
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ]);
    expect(robotsResult.sitemap).toBe("https://yourdomain.test/sitemap.xml");

    // 2. Sitemap.xml
    const sitemapResult = sitemap();
    console.log(`sitemap.xml Output (${sitemapResult.length} URLs):`);
    sitemapResult.forEach((entry, i) => {
      console.log(`  [${i + 1}] ${entry.url}`);
    });

    expect(sitemapResult).toHaveLength(5);
    expect(sitemapResult[0].url).toBe("https://yourdomain.test");
    expect(sitemapResult.some((e) => e.url.includes("/privacy"))).toBe(false);
    expect(sitemapResult.some((e) => e.url.includes("/terms"))).toBe(false);

    // 3. Legal pages robots meta
    const privMeta = generatePrivacyMeta();
    const termsMeta = generateTermsMeta();
    console.log("Privacy robots meta:", JSON.stringify(privMeta.robots));
    console.log("Terms robots meta:", JSON.stringify(termsMeta.robots));

    expect(privMeta.robots).toEqual({ index: false, follow: false });
    expect(termsMeta.robots).toEqual({ index: false, follow: false });
  });
});
