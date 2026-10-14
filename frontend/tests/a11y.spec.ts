import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pagesToTest = [
  { name: "Home Page", path: "/" },
  { name: "Privacy Policy", path: "/privacy" },
  { name: "Terms of Service", path: "/terms" },
  { name: "Service: AI Agents & Chatbots", path: "/services/ai-agents-chatbots" },
  { name: "Service: CRM & Sales Automation", path: "/services/crm-sales-automation" },
  { name: "Service: Business Workflow", path: "/services/business-workflow-automation" },
  { name: "Service: WhatsApp & Social", path: "/services/whatsapp-social-automation" },
  { name: "Solution: Clinic WhatsApp Booking", path: "/solutions/whatsapp-appointment-booking-clinics" },
  { name: "Solution: n8n Workflow Automation", path: "/solutions/n8n-workflow-automation-guide" },
  { name: "404 Not Found Page", path: "/unknown-404-check" },
];

for (const p of pagesToTest) {
  test(`a11y: ${p.name} (${p.path})`, async ({ page }) => {
    await page.goto(p.path);
    await page.waitForLoadState("domcontentloaded");

    const results = await new AxeBuilder({ page }).analyze();

    const criticalOrSerious = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );
    const moderateOrMinor = results.violations.filter(
      (v) => v.impact === "moderate" || v.impact === "minor"
    );

    if (moderateOrMinor.length > 0) {
      console.warn(
        `[a11y warning] ${p.name} had ${moderateOrMinor.length} moderate/minor notice(s):`
      );
      moderateOrMinor.forEach((m) =>
        console.warn(`  - [${m.impact}] ${m.id}: ${m.help}`)
      );
    }

    if (criticalOrSerious.length > 0) {
      console.error(
        `[a11y error] ${p.name} had ${criticalOrSerious.length} critical/serious violation(s):`
      );
      criticalOrSerious.forEach((c) => {
        console.error(`  - [${c.impact}] ${c.id}: ${c.help} (${c.nodes.length} nodes)`);
        c.nodes.forEach((n) => console.error(`      target: ${n.target.join(", ")}`));
      });
    }

    expect(criticalOrSerious, `Critical/serious a11y violations on ${p.name}`).toHaveLength(0);
  });
}

test("a11y: ContactModal opened", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("domcontentloaded");

  // Open modal via header button
  const discussBtn = page.getByRole("button", { name: "Discuss Your Project" }).first();
  await discussBtn.click();

  // Wait for dialog to appear
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  const results = await new AxeBuilder({ page }).analyze();

  const criticalOrSerious = results.violations.filter(
    (v) => v.impact === "critical" || v.impact === "serious"
  );
  const moderateOrMinor = results.violations.filter(
    (v) => v.impact === "moderate" || v.impact === "minor"
  );

  if (moderateOrMinor.length > 0) {
    console.warn(
      `[a11y warning] ContactModal had ${moderateOrMinor.length} moderate/minor notice(s):`
    );
    moderateOrMinor.forEach((m) =>
      console.warn(`  - [${m.impact}] ${m.id}: ${m.help}`)
    );
  }

  if (criticalOrSerious.length > 0) {
    console.error(
      `[a11y error] ContactModal had ${criticalOrSerious.length} critical/serious violation(s):`
    );
    criticalOrSerious.forEach((c) => {
      console.error(`  - [${c.impact}] ${c.id}: ${c.help} (${c.nodes.length} nodes)`);
      c.nodes.forEach((n) => console.error(`      target: ${n.target.join(", ")}`));
    });
  }

  expect(criticalOrSerious, "Critical/serious a11y violations in ContactModal").toHaveLength(0);
});
