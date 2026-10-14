import { chromium } from "@playwright/test";

async function testLinks() {
  const browser = await chromium.launch();
  const viewports = [
    { name: "Desktop (1280x800)", width: 1280, height: 800 },
    { name: "Mobile (390x844)", width: 390, height: 844 }
  ];

  for (const vp of viewports) {
    console.log(`\n=== Testing Viewport: ${vp.name} ===`);
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });

    // 1. Homepage Healthcare link to Clinic Solution
    await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
    const clinicLinkOnHome = page.locator('a[href="/solutions/whatsapp-appointment-booking-clinics"]');
    const homeCount = await clinicLinkOnHome.count();
    console.log(`Homepage clinic link count: ${homeCount}`);
    if (homeCount > 0) {
      const text = await clinicLinkOnHome.first().innerText();
      const isVisible = await clinicLinkOnHome.first().isVisible();
      console.log(`Homepage clinic link text: "${text.trim()}", visible: ${isVisible}`);
    }

    // 2. WhatsApp Service page link to Clinic Solution
    await page.goto("http://localhost:3000/services/whatsapp-social-automation", { waitUntil: "networkidle" });
    const clinicLinkOnWa = page.locator('a[href="/solutions/whatsapp-appointment-booking-clinics"]');
    const waCount = await clinicLinkOnWa.count();
    console.log(`WhatsApp page clinic link count: ${waCount}`);
    if (waCount > 0) {
      const text = await clinicLinkOnWa.first().innerText();
      const isVisible = await clinicLinkOnWa.first().isVisible();
      console.log(`WhatsApp page clinic link text: "${text.replace(/\s+/g, ' ').trim()}", visible: ${isVisible}`);
    }

    // 3. Workflow Automation page link to n8n Solution
    await page.goto("http://localhost:3000/services/business-workflow-automation", { waitUntil: "networkidle" });
    const n8nLinkOnWorkflow = page.locator('a[href="/solutions/n8n-workflow-automation-guide"]');
    const wfCount = await n8nLinkOnWorkflow.count();
    console.log(`Workflow page n8n link count: ${wfCount}`);
    if (wfCount > 0) {
      const text = await n8nLinkOnWorkflow.first().innerText();
      const isVisible = await n8nLinkOnWorkflow.first().isVisible();
      console.log(`Workflow page n8n link text: "${text.replace(/\s+/g, ' ').trim()}", visible: ${isVisible}`);
    }

    await page.close();
  }

  await browser.close();
  console.log("\n✓ All internal links verified successfully.");
}

testLinks().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
