import { describe, it, expect } from "vitest";
import { demos, getDemoLink, getAvailableCategories, type DemoItem } from "./demos";

describe("Demos Content Configuration", () => {
  it("contains at least one active demo", () => {
    expect(demos.length).toBeGreaterThan(0);
  });

  it("configures the Cafe demo with required properties and valid URLs", () => {
    const cafeDemo = demos.find((d) => d.slug === "cafe");
    expect(cafeDemo).toBeDefined();
    if (!cafeDemo) return;

    expect(cafeDemo.title).toBe("Café & Restaurant Management System");
    expect(cafeDemo.category).toBe("Restaurant");
    expect(cafeDemo.status).toBe("LIVE DEMO");
    expect(cafeDemo.targetUrl).toBe("https://cafe-demo-lovat-sigma.vercel.app");
    expect(cafeDemo.preferredPath).toBe("/demo/cafe");
    expect(cafeDemo.capabilities.length).toBeGreaterThanOrEqual(6);
    expect(cafeDemo.capabilities).toContain("QR Table Ordering");
    expect(cafeDemo.capabilities).toContain("Customer Dashboard");
    expect(cafeDemo.capabilities).toContain("Kitchen Management");
    expect(cafeDemo.capabilities).toContain("Billing & Payments");
    expect(cafeDemo.capabilities).toContain("Loyalty Rewards");
    expect(cafeDemo.capabilities).toContain("Restaurant Owner Dashboard");
  });

  it("handles direct vs proxy routing in getDemoLink", () => {
    const directDemo: DemoItem = {
      ...demos[0],
      routingMode: "direct",
    };
    const directLink = getDemoLink(directDemo);
    expect(directLink.href).toBe("https://cafe-demo-lovat-sigma.vercel.app");
    expect(directLink.isExternal).toBe(true);

    const proxyDemo: DemoItem = {
      ...demos[0],
      routingMode: "proxy",
    };
    const proxyLink = getDemoLink(proxyDemo);
    expect(proxyLink.href).toBe("/demo/cafe");
    expect(proxyLink.isExternal).toBe(false);
  });

  it("derives available categories dynamically from existing demos", () => {
    const categories = getAvailableCategories();
    expect(categories[0]).toBe("All");
    expect(categories).toContain("Restaurant");
    // Ensure categories with no demos (e.g. "CRM", "AI Agents") are omitted
    expect(categories).not.toContain("CRM");
    expect(categories).not.toContain("AI Agents");
  });
});
