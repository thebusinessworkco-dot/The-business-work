import { test, expect } from "@playwright/test";

test.describe("Section Background Colours", () => {
  test("all 8 home page sections have expected background colours and neighbouring sections differ", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const sections = [
      { name: "Hero", selector: "section[aria-labelledby='hero-title']", expectedRgb: "rgb(247, 244, 238)", hex: "#F7F4EE" },
      { name: "Services", selector: "#services", expectedRgb: "rgb(232, 221, 200)", hex: "#E8DDC8" },
      { name: "How We Work", selector: "#how-we-work", expectedRgb: "rgb(40, 55, 48)", hex: "#283730" },
      { name: "Industries", selector: "#industries", expectedRgb: "rgb(239, 215, 195)", hex: "#EFD7C3" },
      { name: "Demos", selector: "#demos", expectedRgb: "rgb(217, 227, 214)", hex: "#D9E3D6" },
      { name: "Why The Business Work", selector: "#why-us", expectedRgb: "rgb(247, 244, 238)", hex: "#F7F4EE" },
      { name: "Final CTA", selector: "#contact", expectedRgb: "rgb(163, 81, 43)", hex: "#A3512B" },
      { name: "Footer", selector: "footer", expectedRgb: "rgb(24, 23, 22)", hex: "#181716" },
    ];

    const observedColours: string[] = [];

    for (let i = 0; i < sections.length; i++) {
      const s = sections[i];
      const el = page.locator(s.selector);
      await expect(el, `${s.name} section element exists`).toBeVisible();

      const bgColour = await el.evaluate((node) => {
        return window.getComputedStyle(node).backgroundColor;
      });

      expect(bgColour, `${s.name} background colour should match ${s.hex} (${s.expectedRgb})`).toBe(s.expectedRgb);
      observedColours.push(bgColour);

      if (i > 0) {
        expect(
          bgColour,
          `Neighbouring sections ${sections[i - 1].name} and ${s.name} must have different background colours`
        ).not.toBe(observedColours[i - 1]);
      }
    }

    expect(observedColours).toHaveLength(8);
  });
});
