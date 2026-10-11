import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

const viewports = [
  { width: 360, height: 740, name: "360x740" },
  { width: 390, height: 844, name: "390x844" },
  { width: 768, height: 1024, name: "768x1024" },
  { width: 1024, height: 768, name: "1024x768" },
  { width: 1280, height: 800, name: "1280x800" },
  { width: 1440, height: 900, name: "1440x900" },
];

const targetPages = [
  { path: "/", slug: "home" },
  { path: "/services/ai-agents-chatbots", slug: "service-ai-agents" },
  { path: "/privacy", slug: "privacy" },
];

test.beforeAll(() => {
  const dir = path.resolve(process.cwd(), "qa/screenshots");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

for (const vp of viewports) {
  for (const p of targetPages) {
    test(`responsive: ${p.slug} at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(p.path);
      await page.waitForLoadState("domcontentloaded");

      // Verify no horizontal overflow
      const overflow = await page.evaluate(() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        };
      });

      expect(
        overflow.hasOverflow,
        `Page ${p.slug} at ${vp.name} has horizontal scroll: scrollWidth=${overflow.scrollWidth}, clientWidth=${overflow.clientWidth}`
      ).toBe(false);

      // Capture screenshot
      const shotPath = path.resolve(
        process.cwd(),
        `qa/screenshots/${p.slug}-${vp.name}.png`
      );
      await page.screenshot({ path: shotPath, fullPage: true });
    });
  }
}

// Modal open screenshots and fits
const modalViewports = [
  { width: 360, height: 740, name: "360x740" },
  { width: 1280, height: 800, name: "1280x800" },
  { width: 360, height: 560, name: "360x560-short" },
];

for (const mv of modalViewports) {
  test(`modal: open at ${mv.name}`, async ({ page }) => {
    await page.setViewportSize({ width: mv.width, height: mv.height });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const discussBtn = page.getByRole("button", { name: "Discuss Your Project" }).first();
    await discussBtn.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // Verify modal bounding box fits inside viewport width and height
    const box = await dialog.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.width).toBeLessThanOrEqual(mv.width);
      expect(box.height).toBeLessThanOrEqual(mv.height);
    }

    if (mv.name !== "360x560-short") {
      const shotPath = path.resolve(
        process.cwd(),
        `qa/screenshots/modal-${mv.name}.png`
      );
      await page.screenshot({ path: shotPath });
    }
  });
}

// Anchor scroll offset test (header does not overlap content)
test("anchors: scroll-padding-top prevents fixed header overlap", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  await page.waitForLoadState("domcontentloaded");

  const anchors = [
    { hash: "#services", targetId: "services-title" },
    { hash: "#how-we-work", targetId: "process-title" },
    { hash: "#industries", targetId: "industries-title" },
    { hash: "#demos", targetId: "demos-title" },
    { hash: "#contact", targetId: "cta-title" },
  ];

  for (const a of anchors) {
    await page.goto(`/${a.hash}`);
    await page.waitForTimeout(300); // allow smooth scroll to settle

    const targetHeading = page.locator(`#${a.targetId}`);
    await expect(targetHeading).toBeVisible();

    const top = await targetHeading.evaluate((el) => el.getBoundingClientRect().top);
    // Header height is 80px (h-20); scroll-padding-top is 6rem (96px).
    // Heading top must be >= 70px from viewport top to not be covered.
    expect(
      top,
      `Anchor ${a.hash} target #${a.targetId} is overlapped by fixed header (top=${top})`
    ).toBeGreaterThanOrEqual(70);
  }
});
