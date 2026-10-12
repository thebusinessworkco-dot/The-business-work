import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import path from "node:path";

const screenshotDir = path.resolve(__dirname, "../qa/screenshots");

test.describe("Website Chat Widget", () => {
  test.beforeEach(async ({ page }) => {
    // Mock /api/chat so tests do not rely on a live Gemini key or external network
    await page.route("**/api/chat", async (route) => {
      const request = route.request();
      if (request.method() === "POST") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            reply:
              "We build custom AI agents and workflow automations tailored to your business operations.",
          }),
        });
      } else {
        await route.continue();
      }
    });
  });

  test("Desktop (1280x800): closed launcher, open panel, accessibility and screenshots", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const launcher = page.getByRole("button", {
      name: "Open chat with The Business Work assistant",
    });
    await expect(launcher).toBeVisible();

    // Screenshot closed launcher
    await page.screenshot({
      path: path.join(screenshotDir, "launcher-desktop-1280x800.png"),
    });

    // Axe audit on closed launcher
    const axeClosed = await new AxeBuilder({ page }).analyze();
    const criticalClosed = axeClosed.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );
    expect(criticalClosed).toHaveLength(0);

    // Click launcher to open panel
    await launcher.click();
    const panel = page.getByRole("dialog", {
      name: "The Business Work Assistant",
    });
    await expect(panel).toBeVisible();

    // Input should receive focus
    const input = page.getByRole("textbox", { name: "Message" });
    await expect(input).toBeFocused();

    // Screenshot open panel
    await page.screenshot({
      path: path.join(screenshotDir, "panel-open-desktop-1280x800.png"),
    });

    // Axe audit on open panel
    const axeOpen = await new AxeBuilder({ page }).analyze();
    const criticalOpen = axeOpen.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );
    expect(criticalOpen).toHaveLength(0);
  });

  test("Mobile (360x740): responsive sheet, no horizontal scroll, and screenshots", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Check no horizontal scroll when launcher is closed
    const hasScrollClosed = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    expect(hasScrollClosed).toBe(false);

    // Screenshot closed on mobile
    await page.screenshot({
      path: path.join(screenshotDir, "launcher-mobile-360x740.png"),
    });

    const launcher = page.getByRole("button", {
      name: "Open chat with The Business Work assistant",
    });
    await launcher.click();

    const panel = page.getByRole("dialog", {
      name: "The Business Work Assistant",
    });
    await expect(panel).toBeVisible();

    // Check no horizontal scroll when panel is open
    const hasScrollOpen = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    expect(hasScrollOpen).toBe(false);

    // Screenshot open panel on mobile
    await page.screenshot({
      path: path.join(screenshotDir, "panel-open-mobile-360x740.png"),
    });

    // Mobile axe scan
    const axeMobile = await new AxeBuilder({ page }).analyze();
    const criticalMobile = axeMobile.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );
    expect(criticalMobile).toHaveLength(0);
  });

  test("Keyboard flow: Tab, Enter to open, focus in input, Escape closes and returns focus", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const launcher = page.getByRole("button", {
      name: "Open chat with The Business Work assistant",
    });
    await launcher.focus();
    await expect(launcher).toBeFocused();

    // Press Enter to open
    await page.keyboard.press("Enter");
    const panel = page.getByRole("dialog", {
      name: "The Business Work Assistant",
    });
    await expect(panel).toBeVisible();

    const input = page.getByRole("textbox", { name: "Message" });
    await expect(input).toBeFocused();

    // Press Escape to close
    await page.keyboard.press("Escape");
    await expect(panel).not.toBeVisible();
    await expect(launcher).toBeFocused();
  });

  test("Suggestion chips send message and display response", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const launcher = page.getByRole("button", {
      name: "Open chat with The Business Work assistant",
    });
    await launcher.click();

    // Click "What do you offer?" chip
    const chip = page.getByRole("button", { name: "What do you offer?" });
    await expect(chip).toBeVisible();
    await chip.click();

    // Verify user message appears in log
    const userMsg = page.getByText("What do you offer?", { exact: true });
    await expect(userMsg).toBeVisible();

    // Verify mocked assistant response appears
    const botMsg = page.getByText(
      "We build custom AI agents and workflow automations tailored to your business operations."
    );
    await expect(botMsg).toBeVisible();
  });

  test("Error state with failing route and retry flow", async ({ page }) => {
    // Override /api/chat route to fail
    await page.route("**/api/chat", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({
          error: "Service temporarily unavailable. Please try again.",
        }),
      });
    });

    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const launcher = page.getByRole("button", {
      name: "Open chat with The Business Work assistant",
    });
    await launcher.click();

    const chip = page.getByRole("button", { name: "What do you offer?" });
    await chip.click();

    const panel = page.getByRole("dialog", {
      name: "The Business Work Assistant",
    });
    const errorAlert = panel.getByRole("alert");
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toContainText("Service temporarily unavailable");

    // Screenshot error state
    await page.screenshot({
      path: path.join(screenshotDir, "panel-error-desktop-1280x800.png"),
    });

    const retryBtn = page.getByRole("button", { name: "Retry" });
    await expect(retryBtn).toBeVisible();
  });

  test("ContactModal open state hides the launcher", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const launcher = page.getByRole("button", {
      name: "Open chat with The Business Work assistant",
    });
    await expect(launcher).toBeVisible();

    // Open Contact Modal
    const discussBtn = page
      .getByRole("button", { name: "Discuss Your Project" })
      .first();
    await discussBtn.click();

    const contactDialog = page.getByRole("dialog", {
      name: "Discuss Your Project",
    });
    await expect(contactDialog).toBeVisible();

    // Launcher should be hidden / unmounted while contact modal is open
    await expect(launcher).not.toBeVisible();
  });
});
