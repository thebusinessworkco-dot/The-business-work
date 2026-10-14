import { chromium } from "@playwright/test";

async function testLinks() {
  const browser = await chromium.launch();
  const widths = [320, 360, 375, 390, 430, 768, 1024, 1280, 1440];

  for (const width of widths) {
    const height = width >= 1024 ? 900 : 800;
    console.log(`\n=== Testing Viewport: ${width}x${height} ===`);
    const page = await browser.newPage({ viewport: { width, height } });

    // 1. Homepage Healthcare link to Clinic Solution
    await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });

    // Verify no horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    if (hasHorizontalOverflow) {
      throw new Error(`Horizontal overflow detected at ${width}px on homepage`);
    }

    const clinicLinkHome = page.locator('a[href="/solutions/whatsapp-appointment-booking-clinics"]');
    if (!(await clinicLinkHome.isVisible())) {
      throw new Error(`Clinic link not visible on home at ${width}px`);
    }
    // Test click navigation
    await clinicLinkHome.click();
    await page.waitForURL("**/solutions/whatsapp-appointment-booking-clinics");
    const clinicH1 = await page.locator("h1").innerText();
    console.log(`  [Home -> Clinic] Click navigated to "${clinicH1}"`);

    // 2. WhatsApp Service page link to Clinic Solution
    await page.goto("http://localhost:3000/services/whatsapp-social-automation", { waitUntil: "networkidle" });
    const clinicLinkWa = page.locator('a[href="/solutions/whatsapp-appointment-booking-clinics"]');
    if (!(await clinicLinkWa.isVisible())) {
      throw new Error(`Clinic link not visible on WhatsApp service page at ${width}px`);
    }
    await clinicLinkWa.click();
    await page.waitForURL("**/solutions/whatsapp-appointment-booking-clinics");
    console.log(`  [WhatsApp -> Clinic] Click navigated successfully`);

    // 3. Workflow Automation page link to n8n Solution
    await page.goto("http://localhost:3000/services/business-workflow-automation", { waitUntil: "networkidle" });
    const n8nLink = page.locator('a[href="/solutions/n8n-workflow-automation-guide"]');
    if (!(await n8nLink.isVisible())) {
      throw new Error(`n8n link not visible on workflow service page at ${width}px`);
    }
    await n8nLink.click();
    await page.waitForURL("**/solutions/n8n-workflow-automation-guide");
    const n8nH1 = await page.locator("h1").innerText();
    console.log(`  [Workflow -> n8n] Click navigated to "${n8nH1}"`);

    await page.close();
  }

  await browser.close();
  console.log("\n✓ All 9 viewports (320px to 1440px) verified: links visible, clickable, zero overflow, real click navigation confirmed.");
}

testLinks().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
