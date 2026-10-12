import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import path from "path";

test.describe("Website Assistant Widget", () => {
  test("Widget closed and open at desktop (1280x800) with a11y & screenshot", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const launcher = page.getByRole("button", { name: /website assistant/i });
    await expect(launcher).toBeVisible();

    // Screenshot launcher desktop
    await page.screenshot({
      path: path.join("qa", "screenshots", "launcher-desktop.png"),
    });

    // Check a11y when closed
    const closedAxe = await new AxeBuilder({ page }).analyze();
    const closedViolations = closedAxe.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );
    expect(closedViolations, "A11y violations when assistant closed").toHaveLength(0);

    // Open panel
    await launcher.click();
    const panel = page.getByRole("dialog", { name: "The Business Work Assistant" });
    await expect(panel).toBeVisible();

    // Screenshot open panel desktop
    await page.screenshot({
      path: path.join("qa", "screenshots", "panel-open-desktop.png"),
    });

    // Check a11y when open
    const openAxe = await new AxeBuilder({ page }).analyze();
    const openViolations = openAxe.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );
    expect(openViolations, "A11y violations when assistant open").toHaveLength(0);
  });

  test("Widget closed and open at mobile (360x740) with no horizontal scroll & screenshots", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const launcher = page.getByRole("button", { name: /website assistant/i });
    await expect(launcher).toBeVisible();

    // Verify no horizontal scroll at 360px
    const hasHorizontalScrollClosed = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalScrollClosed).toBe(false);

    // Screenshot launcher mobile
    await page.screenshot({
      path: path.join("qa", "screenshots", "launcher-mobile.png"),
    });

    // Open panel
    await launcher.click();
    const panel = page.getByRole("dialog", { name: "The Business Work Assistant" });
    await expect(panel).toBeVisible();

    // Verify no horizontal scroll when panel open
    const hasHorizontalScrollOpen = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalScrollOpen).toBe(false);

    // Screenshot open panel mobile
    await page.screenshot({
      path: path.join("qa", "screenshots", "panel-open-mobile.png"),
    });

    // Check a11y on mobile
    const mobileAxe = await new AxeBuilder({ page }).analyze();
    const mobileViolations = mobileAxe.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );
    expect(mobileViolations, "A11y violations on mobile").toHaveLength(0);
  });

  test("Keyboard navigation flow: launcher -> Enter opens -> focus in input -> Escape closes -> focus on launcher", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const launcher = page.getByRole("button", { name: /website assistant/i });
    await launcher.focus();
    await expect(launcher).toBeFocused();

    // Press Enter to open
    await page.keyboard.press("Enter");
    const panel = page.getByRole("dialog", { name: "The Business Work Assistant" });
    await expect(panel).toBeVisible();

    // Verify focus automatically moves into the text input
    const input = panel.getByRole("textbox");
    await expect(input).toBeFocused();

    // Press Escape to close
    await page.keyboard.press("Escape");
    await expect(panel).not.toBeVisible();

    // Verify focus returns to launcher
    await expect(launcher).toBeFocused();
  });

  test("Chip click shows expected answer", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const launcher = page.getByRole("button", { name: /website assistant/i });
    await launcher.click();
    const panel = page.getByRole("dialog", { name: "The Business Work Assistant" });

    // Click "Pricing" chip
    const pricingChip = panel.getByRole("button", { name: "Pricing", exact: true });
    await pricingChip.click();

    // Bot responds with pricing answer
    await expect(
      panel.getByText(/Project pricing depends on the scope and systems involved/i)
    ).toBeVisible();
  });

  test("Free-text 'price kya hai' shows pricing answer and takes screenshots", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const launcher = page.getByRole("button", { name: /website assistant/i });
    await launcher.click();
    const panel = page.getByRole("dialog", { name: "The Business Work Assistant" });

    const input = panel.getByRole("textbox");
    await input.fill("price kya hai");
    await panel.getByRole("button", { name: "Send", exact: true }).click();

    // Verify pricing answer appears
    const answer = panel.getByText(/Project pricing depends on the scope and systems involved/i);
    await expect(answer).toBeVisible();

    // Screenshot answer desktop
    await page.screenshot({
      path: path.join("qa", "screenshots", "answer-desktop.png"),
    });

    // At 360x740 for answer screenshot
    await page.setViewportSize({ width: 360, height: 740 });
    await page.screenshot({
      path: path.join("qa", "screenshots", "answer-mobile.png"),
    });
  });

  test("Out-of-scope 'weather today' shows fallback with suggestions and takes screenshots", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const launcher = page.getByRole("button", { name: /website assistant/i });
    await launcher.click();
    const panel = page.getByRole("dialog", { name: "The Business Work Assistant" });

    const input = panel.getByRole("textbox");
    await input.fill("weather today");
    await panel.getByRole("button", { name: "Send", exact: true }).click();

    // Verify fallback message appears
    const fallbackText = panel.getByText(
      /I don't have that information here\. You can send us an enquiry/i
    );
    await expect(fallbackText).toBeVisible();

    // Screenshot fallback desktop
    await page.screenshot({
      path: path.join("qa", "screenshots", "fallback-desktop.png"),
    });

    // Screenshot fallback mobile
    await page.setViewportSize({ width: 360, height: 740 });
    await page.screenshot({
      path: path.join("qa", "screenshots", "fallback-mobile.png"),
    });
  });

  test("Launcher is hidden while ContactModal is open", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const launcher = page.getByRole("button", { name: /website assistant/i });
    await expect(launcher).toBeVisible();

    // Open ContactModal via header
    const discussBtn = page.getByRole("button", { name: "Discuss Your Project" }).first();
    await discussBtn.click();

    const contactDialog = page.getByRole("dialog", { name: /discuss your project/i });
    await expect(contactDialog).toBeVisible();

    // Verify assistant launcher is hidden
    await expect(launcher).not.toBeVisible();

    // Close ContactModal
    await contactDialog.getByRole("button", { name: /close dialog/i }).click();
    await expect(contactDialog).not.toBeVisible();

    // Verify launcher is visible again
    await expect(launcher).toBeVisible();
  });

  test("Network check: zero external or server calls made during assistant usage", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    const requests: { url: string; method: string }[] = [];
    page.on("request", (req) => {
      requests.push({ url: req.url(), method: req.method() });
    });

    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Clear initial page load request tracking to focus solely on widget interactions
    requests.length = 0;

    const launcher = page.getByRole("button", { name: /website assistant/i });
    await launcher.click();
    const panel = page.getByRole("dialog", { name: "The Business Work Assistant" });
    await expect(panel).toBeVisible();

    // Click a chip
    const servicesChip = panel.getByRole("button", { name: "Our services", exact: true });
    await servicesChip.click();

    // Type a query
    const input = panel.getByRole("textbox");
    await input.fill("price kya hai");
    await panel.getByRole("button", { name: "Send", exact: true }).click();

    await expect(
      panel.getByText(/Project pricing depends on the scope and systems involved/i)
    ).toBeVisible();

    // Assert that during these interactions, ZERO network requests were triggered
    const postOpenRequests = requests.filter(
      (r) => !r.url.includes("_next/static") && !r.url.includes("favicon.ico")
    );
    expect(postOpenRequests, "Widget made network requests during interaction!").toHaveLength(0);
  });
});
