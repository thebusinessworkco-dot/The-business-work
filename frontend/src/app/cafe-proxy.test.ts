import { describe, it, expect, beforeEach, afterEach } from "vitest";
import nextConfig from "../../next.config.mjs";
import { demos, getDemoLink } from "@/content/demos";

describe("Café Demo Reverse Proxy Rewrites Configuration", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("exports a rewrites function on nextConfig", () => {
    expect(typeof nextConfig.rewrites).toBe("function");
  });

  it("configures external rewrites for /demo/cafe, /demo/cafe/:path*, and /cafe-static/:path*", async () => {
    process.env.CAFE_DEMO_ORIGIN = "https://custom-cafe.vercel.app";
    const rewritesResult = await nextConfig.rewrites();

    const rewrites = Array.isArray(rewritesResult)
      ? rewritesResult
      : rewritesResult.beforeFiles || [];

    const rootRewrite = rewrites.find((r: { source: string }) => r.source === "/demo/cafe");
    const pathRewrite = rewrites.find((r: { source: string }) => r.source === "/demo/cafe/:path*");
    const staticRewrite = rewrites.find((r: { source: string }) => r.source === "/cafe-static/:path*");

    expect(rootRewrite).toBeDefined();
    expect(rootRewrite.destination).toBe("https://custom-cafe.vercel.app/demo/cafe");

    expect(pathRewrite).toBeDefined();
    expect(pathRewrite.destination).toBe("https://custom-cafe.vercel.app/demo/cafe/:path*");

    expect(staticRewrite).toBeDefined();
    expect(staticRewrite.destination).toBe("https://custom-cafe.vercel.app/cafe-static/:path*");
  });

  it("falls back to default production origin when CAFE_DEMO_ORIGIN is unset", async () => {
    delete process.env.CAFE_DEMO_ORIGIN;
    const rewritesResult = await nextConfig.rewrites();

    const rewrites = Array.isArray(rewritesResult)
      ? rewritesResult
      : rewritesResult.beforeFiles || [];

    const rootRewrite = rewrites.find((r: { source: string }) => r.source === "/demo/cafe");
    expect(rootRewrite).toBeDefined();
    expect(rootRewrite.destination).toContain("https://cafe-demo-lovat-sigma.vercel.app/demo/cafe");
  });

  it("strips trailing slashes from CAFE_DEMO_ORIGIN gracefully", async () => {
    process.env.CAFE_DEMO_ORIGIN = "https://custom-cafe.vercel.app///";
    const rewritesResult = await nextConfig.rewrites();

    const rewrites = Array.isArray(rewritesResult)
      ? rewritesResult
      : rewritesResult.beforeFiles || [];

    const rootRewrite = rewrites.find((r: { source: string }) => r.source === "/demo/cafe");
    expect(rootRewrite.destination).toBe("https://custom-cafe.vercel.app/demo/cafe");
  });

  it("preserves direct routingMode in content/demos.ts until proxy deployment is verified", () => {
    const cafeDemo = demos.find((d) => d.slug === "cafe");
    expect(cafeDemo).toBeDefined();
    if (!cafeDemo) return;

    // Verify configuration fields are ready for proxy
    expect(cafeDemo.preferredPath).toBe("/demo/cafe");
    expect(cafeDemo.targetUrl).toBe("https://cafe-demo-lovat-sigma.vercel.app");

    // The active demo link must point to a working destination
    const link = getDemoLink(cafeDemo);
    if (cafeDemo.routingMode === "proxy") {
      expect(link.href).toBe("/demo/cafe");
      expect(link.isExternal).toBe(false);
    } else {
      expect(link.href).toBe("https://cafe-demo-lovat-sigma.vercel.app");
      expect(link.isExternal).toBe(true);
    }
  });
});
