import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getCleanSiteUrl } from "./site";
import { getHomeJsonLd, getServiceJsonLd } from "./jsonld";
import { services } from "@/content/services";
// @ts-expect-error next.config.mjs is untyped ESM
import nextConfig from "../../next.config.mjs";

interface HeaderRule {
  source: string;
  headers: Array<{ key: string; value: string }>;
}

describe("HTTPS, HSTS, and Canonical URL Safety", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("configures Strict-Transport-Security (HSTS) header in next.config.mjs", async () => {
    expect(nextConfig.headers).toBeDefined();
    if (nextConfig.headers) {
      const headersList = (await nextConfig.headers()) as HeaderRule[];
      const catchAllRule = headersList.find((h: HeaderRule) => h.source === "/(.*)");
      expect(catchAllRule).toBeDefined();

      const hstsHeader = catchAllRule?.headers.find(
        (header: { key: string; value: string }) => header.key === "Strict-Transport-Security"
      );
      expect(hstsHeader).toBeDefined();
      expect(hstsHeader?.value).toContain("max-age=63072000");
      expect(hstsHeader?.value).toContain("includeSubDomains");
      expect(hstsHeader?.value).toContain("preload");
    }
  });

  it("canonicalizes apex thebusinesswork.com to www and emits https:// URLs across JSON-LD schemas", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://thebusinesswork.com";
    const cleanUrl = getCleanSiteUrl();
    expect(cleanUrl).toBe("https://www.thebusinesswork.com");
    expect(cleanUrl.startsWith("https://")).toBe(true);

    const [website, org, profService] = getHomeJsonLd();
    expect(website.url.startsWith("https://www.thebusinesswork.com")).toBe(true);
    expect(org.url.startsWith("https://www.thebusinesswork.com")).toBe(true);
    expect(org.logo.startsWith("https://www.thebusinesswork.com")).toBe(true);
    expect(profService.url.startsWith("https://www.thebusinesswork.com")).toBe(true);

    const [serviceSchema, breadcrumb] = getServiceJsonLd(services[0]);
    expect(serviceSchema.url.startsWith("https://www.thebusinesswork.com")).toBe(true);
    expect(serviceSchema.provider.url.startsWith("https://www.thebusinesswork.com")).toBe(true);
    expect(breadcrumb.itemListElement[0].item.startsWith("https://www.thebusinesswork.com")).toBe(true);
  });

  it("canonicalizes insecure http://thebusinesswork.com to https://www.thebusinesswork.com", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "http://thebusinesswork.com";
    const cleanUrl = getCleanSiteUrl();
    expect(cleanUrl).toBe("https://www.thebusinesswork.com");
  });
});
