import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { services } from "../src/content/services";

for (const service of services) {
  test.describe(`Capabilities on ${service.title} (/services/${service.id})`, () => {
    test("each capability box opens a dialog whose heading matches the box title, Escape closes it, and focus returns", async ({
      page,
    }) => {
      await page.goto(`/services/${service.id}`);
      await page.waitForLoadState("domcontentloaded");

      for (let i = 0; i < service.capabilities.length; i++) {
        const expectedCap = service.capabilities[i];

        // Locate capability button
        const capBtn = page.getByRole("button", {
          name: new RegExp(`View explanation for ${expectedCap.name}`, "i"),
        });
        await expect(capBtn).toBeVisible();

        // Click to open dialog
        await capBtn.click();

        // Dialog should be visible
        const dialog = page.getByRole("dialog");
        await expect(dialog).toBeVisible();

        // Heading inside dialog must match the capability title
        const heading = page.locator("#capability-dialog-heading");
        await expect(heading).toHaveText(expectedCap.name);

        // Escape closes dialog
        await page.keyboard.press("Escape");
        await expect(dialog).not.toBeVisible();

        // Focus must return to the clicked capability button
        await expect(capBtn).toBeFocused();
      }
    });

    test("axe has no serious or critical accessibility violations when dialog is open", async ({
      page,
    }) => {
      await page.goto(`/services/${service.id}`);
      await page.waitForLoadState("domcontentloaded");

      // Open the first capability dialog
      const firstBtn = page.getByRole("button", {
        name: new RegExp(`View explanation for ${service.capabilities[0].name}`, "i"),
      });
      await firstBtn.click();

      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();

      // Analyze accessibility with Axe
      const results = await new AxeBuilder({ page }).analyze();
      const criticalOrSerious = results.violations.filter(
        (v) => v.impact === "critical" || v.impact === "serious"
      );

      if (criticalOrSerious.length > 0) {
        console.error(
          `[a11y error] Capability dialog on /services/${service.id} had violations:`,
          criticalOrSerious
        );
      }
      expect(criticalOrSerious).toHaveLength(0);

      await page.keyboard.press("Escape");
    });

    test("has no horizontal scroll at 360px width", async ({ page }) => {
      await page.setViewportSize({ width: 360, height: 740 });
      await page.goto(`/services/${service.id}`);
      await page.waitForLoadState("domcontentloaded");

      // Check page-level overflow
      const pageOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(pageOverflow).toBe(false);

      // Open a dialog and check modal overflow at 360px
      const firstBtn = page.getByRole("button", {
        name: new RegExp(`View explanation for ${service.capabilities[0].name}`, "i"),
      });
      await firstBtn.click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();

      const modalOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(modalOverflow).toBe(false);

      await page.keyboard.press("Escape");
    });
  });
}
