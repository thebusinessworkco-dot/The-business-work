import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const outDir = path.resolve("qa/screenshots");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  // 1. Home desktop full page
  const pageDesk = await context.newPage();
  await pageDesk.setViewportSize({ width: 1280, height: 800 });
  await pageDesk.goto("http://localhost:3000/");
  await pageDesk.waitForLoadState("networkidle");
  await pageDesk.screenshot({ path: path.join(outDir, "home-desktop-1280x800.png"), fullPage: true });

  // 2. Home mobile full page
  const pageMob = await context.newPage();
  await pageMob.setViewportSize({ width: 360, height: 740 });
  await pageMob.goto("http://localhost:3000/");
  await pageMob.waitForLoadState("networkidle");
  await pageMob.screenshot({ path: path.join(outDir, "home-mobile-360x740.png"), fullPage: true });

  // 3. Service desktop full page
  await pageDesk.goto("http://localhost:3000/services/ai-agents-chatbots");
  await pageDesk.waitForLoadState("networkidle");
  await pageDesk.screenshot({ path: path.join(outDir, "service-desktop-1280x800.png"), fullPage: true });

  // 4. Service mobile full page
  await pageMob.goto("http://localhost:3000/services/ai-agents-chatbots");
  await pageMob.waitForLoadState("networkidle");
  await pageMob.screenshot({ path: path.join(outDir, "service-mobile-360x740.png"), fullPage: true });

  // 5. Dark CTA and footer area with assistant launcher and keyboard-focused button
  await pageDesk.goto("http://localhost:3000/#contact");
  await pageDesk.waitForLoadState("networkidle");
  // Focus the "Send an Enquiry" button in CTA
  const sendEnquiryBtn = pageDesk.locator("#contact button").first();
  await sendEnquiryBtn.focus();
  // Scroll to view CTA and footer together
  await pageDesk.evaluate(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "instant" });
  });
  await pageDesk.waitForTimeout(400);
  await pageDesk.screenshot({ path: path.join(outDir, "cta-footer-focused-1280x800.png") });

  await browser.close();
  console.log("Screenshots captured successfully in", outDir);
}

run().catch(console.error);
