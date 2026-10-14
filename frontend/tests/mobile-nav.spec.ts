import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Mobile Navigation Accessibility & Focus Management", () => {
  const mobileViewports = [
    { name: "320px (iPhone SE small)", width: 320, height: 568 },
    { name: "360px (Android compact)", width: 360, height: 640 },
    { name: "375px (iPhone standard)", width: 375, height: 667 },
    { name: "390px (iPhone 14)", width: 390, height: 844 },
    { name: "430px (iPhone 14 Pro Max)", width: 430, height: 932 },
  ];

  for (const vp of mobileViewports) {
    test(`Mobile nav closed state is inert and passes axe on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/");
      await page.waitForLoadState("domcontentloaded");

      const toggleBtn = page.getByRole("button", { name: "Open menu" });
      await expect(toggleBtn).toBeVisible();
      await expect(toggleBtn).toHaveAttribute("aria-expanded", "false");
      await expect(toggleBtn).toHaveAttribute("aria-controls", "mobile-nav");

      const mobileNav = page.locator("#mobile-nav");
      await expect(mobileNav).toHaveAttribute("aria-hidden", "true");
      await expect(mobileNav).toHaveAttribute("inert", "");

      // Verify that axe-core detects zero accessibility tree or aria-hidden violations
      const axeResults = await new AxeBuilder({ page }).include("#mobile-nav").analyze();
      const violations = axeResults.violations.filter(
        (v) => v.impact === "critical" || v.impact === "serious"
      );
      expect(violations, `A11y violations on closed mobile-nav at ${vp.name}`).toHaveLength(0);
    });
  }

  test("Sequential Tab navigation skips closed mobile nav links", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const toggleBtn = page.getByRole("button", { name: "Open menu" });
    await toggleBtn.focus();
    await expect(toggleBtn).toBeFocused();

    // Tab forward from the toggle button
    await page.keyboard.press("Tab");

    // The focused element must NOT be any link or button inside #mobile-nav
    const activeElementInsideMobileNav = await page.evaluate(() => {
      const active = document.activeElement;
      const nav = document.getElementById("mobile-nav");
      return nav ? nav.contains(active) : false;
    });
    expect(activeElementInsideMobileNav).toBe(false);
  });

  test("Opening menu removes inert and makes links keyboard focusable", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const toggleBtn = page.locator('button[aria-controls="mobile-nav"]');
    await expect(toggleBtn).toHaveAttribute("aria-label", "Open menu");
    await expect(toggleBtn).toHaveAttribute("aria-expanded", "false");

    await toggleBtn.click();

    // Expanded state
    await expect(toggleBtn).toHaveAttribute("aria-expanded", "true");
    await expect(toggleBtn).toHaveAttribute("aria-label", "Close menu");

    const mobileNav = page.locator("#mobile-nav");
    await expect(mobileNav).toHaveAttribute("aria-hidden", "false");
    await expect(mobileNav).not.toHaveAttribute("inert", "");

    // Verify all expected links exist inside mobile nav
    const expectedLabels = [
      "Services",
      "How We Work",
      "Industries",
      "Demos",
      "Contact",
    ];
    for (const label of expectedLabels) {
      const link = mobileNav.getByRole("link", { name: label });
      await expect(link).toBeVisible();
    }

    // Verify axe-core passes when open
    const axeResults = await new AxeBuilder({ page }).include("#mobile-nav").analyze();
    const violations = axeResults.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );
    expect(violations, "A11y violations on open mobile-nav").toHaveLength(0);
  });

  test("Escape key restores inert and returns focus to toggle button", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const toggleBtn = page.locator('button[aria-controls="mobile-nav"]');
    await toggleBtn.click();
    await expect(toggleBtn).toHaveAttribute("aria-expanded", "true");

    // Tab into first link
    await page.keyboard.press("Tab");
    const servicesLink = page.locator('#mobile-nav a[href="/#services"]');
    await expect(servicesLink).toBeFocused();

    // Press Escape
    await page.keyboard.press("Escape");

    // Menu must be closed and inert restored
    const mobileNav = page.locator("#mobile-nav");
    await expect(mobileNav).toHaveAttribute("aria-hidden", "true");
    await expect(mobileNav).toHaveAttribute("inert", "");
    await expect(toggleBtn).toHaveAttribute("aria-expanded", "false");

    // Focus must return to toggle button
    await expect(toggleBtn).toBeFocused();
  });

  test("Desktop navigation (1024px+) hides mobile nav and shows primary nav", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const toggleBtn = page.getByRole("button", { name: /menu/i });
    await expect(toggleBtn).toBeHidden();

    const primaryNav = page.getByRole("navigation", { name: "Primary" });
    await expect(primaryNav).toBeVisible();

    const expectedLabels = ["Services", "How We Work", "Industries", "Demos", "Contact"];
    for (const label of expectedLabels) {
      const link = primaryNav.getByRole("link", { name: label });
      await expect(link).toBeVisible();
    }
  });

  test("Mobile nav preserves CSS animation classes and markup integrity", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const mobileNav = page.locator("#mobile-nav");
    const classAttr = await mobileNav.getAttribute("class");
    expect(classAttr).toContain("grid");
    expect(classAttr).toContain("transition-[grid-template-rows,opacity]");
    expect(classAttr).toContain("duration-300");
    expect(classAttr).toContain("ease-in-out");
    expect(classAttr).toContain("md:hidden");
  });

  test("Visual verification: captures mobile closed, mobile open, and desktop screenshots", async ({ page }) => {
    // Mobile closed
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: "tests/screenshots/mobile-closed.png" });

    // Mobile open
    const toggleBtn = page.locator('button[aria-controls="mobile-nav"]');
    await toggleBtn.click();
    await page.waitForTimeout(400); // 300ms transition
    await page.screenshot({ path: "tests/screenshots/mobile-open.png" });

    // Desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: "tests/screenshots/desktop.png" });
  });
});
