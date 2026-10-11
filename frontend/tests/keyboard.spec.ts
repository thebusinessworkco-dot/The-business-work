import { test, expect } from "@playwright/test";

test("keyboard: Header tab navigation and skip link", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("domcontentloaded");

  // First Tab press hits skip link
  await page.keyboard.press("Tab");
  const skipLink = page.locator('a[href="#main"]');
  await expect(skipLink).toBeFocused();

  // Press Enter on skip link lands on main
  await page.keyboard.press("Enter");
  const main = page.locator("#main");
  await expect(main).toBeInViewport();
});

test("keyboard: Modal open, focus trap, Escape closes with focus return", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("domcontentloaded");

  const discussBtn = page.getByRole("button", { name: "Discuss Your Project" }).first();
  await discussBtn.focus();
  await expect(discussBtn).toBeFocused();

  // Press Enter to open modal
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  // First input should receive focus
  const nameInput = page.locator("#c-name");
  await expect(nameInput).toBeFocused();

  // Press Escape to close
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();

  // Focus must return to the trigger button
  await expect(discussBtn).toBeFocused();
});

test("keyboard: Work demos tab navigation with Left/Right and Home/End keys", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("domcontentloaded");

  const flowTab = page.locator("#tab-hospital-appointments-flow");
  const scopeTab = page.locator("#tab-hospital-appointments-scope");
  const flowPanel = page.locator("#panel-hospital-appointments-flow");
  const scopePanel = page.locator("#panel-hospital-appointments-scope");

  await flowTab.focus();
  await expect(flowTab).toBeFocused();
  await expect(flowTab).toHaveAttribute("aria-selected", "true");
  await expect(flowPanel).toBeVisible();

  // Press ArrowRight to move to Scope tab
  await page.keyboard.press("ArrowRight");
  await expect(scopeTab).toBeFocused();
  await expect(scopeTab).toHaveAttribute("aria-selected", "true");
  await expect(scopePanel).toBeVisible();

  // Press ArrowLeft to move back to Flow tab
  await page.keyboard.press("ArrowLeft");
  await expect(flowTab).toBeFocused();
  await expect(flowTab).toHaveAttribute("aria-selected", "true");

  // Press End to move to last tab
  await page.keyboard.press("End");
  await expect(scopeTab).toBeFocused();

  // Press Home to move to first tab
  await page.keyboard.press("Home");
  await expect(flowTab).toBeFocused();
});

test("keyboard: Services accordion toggles with Enter and Space", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("domcontentloaded");

  const trigger = page.locator("#service-trigger-ai-agents-chatbots");
  const panel = page.locator("#panel-ai-agents-chatbots");

  await trigger.focus();
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(panel).toBeHidden();

  // Press Enter to expand
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(panel).toBeVisible();

  // Press Space to collapse
  await page.keyboard.press("Space");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(panel).toBeHidden();
});

test("keyboard: Mobile menu button toggles and Escape closes returning focus", async ({ page }) => {
  // Set mobile viewport
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/");
  await page.waitForLoadState("domcontentloaded");

  const menuBtn = page.getByRole("button", { name: "Open menu" });
  await menuBtn.focus();
  await expect(menuBtn).toBeFocused();

  // Press Enter to open
  await page.keyboard.press("Enter");
  const mobileNav = page.locator("#mobile-nav");
  await expect(mobileNav).toBeVisible();

  // Press Escape to close
  await page.keyboard.press("Escape");
  await expect(mobileNav).not.toBeVisible();

  // Focus must return to menu button
  await expect(menuBtn).toBeFocused();
});
