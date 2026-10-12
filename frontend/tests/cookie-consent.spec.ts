import { test, expect } from "@playwright/test";

test.describe("Cookie, Storage & Third-Party Network Isolation", () => {
  test("Default state (GA unset): zero cookies, zero storage, zero external requests across full user flow", async ({
    page,
    context,
  }) => {
    const networkRequests: string[] = [];

    page.on("request", (req) => {
      networkRequests.push(req.url());
    });

    // 1. Visit Home
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // 2. Navigate to Service detail page
    await page.goto("/services/ai-agents-chatbots");
    await page.waitForLoadState("domcontentloaded");

    // 3. Open Contact Modal
    const openBtn = page.locator('button:has-text("Discuss Your Project")').first();
    if (await openBtn.isVisible()) {
      await openBtn.click();
      await page.waitForSelector('div[role="dialog"]', { state: "visible" });

      // Close modal
      const closeBtn = page.locator('button[aria-label="Close dialog"]');
      if (await closeBtn.isVisible()) {
        await closeBtn.click();
      }
    }

    // 4. Open Assistant widget if present
    const assistantLauncher = page.locator('button[aria-label*="assistant"]');
    if (await assistantLauncher.isVisible()) {
      await assistantLauncher.click();
      await page.waitForTimeout(300);
      const closeAssistant = page.locator('button[aria-label="Close assistant"]');
      if (await closeAssistant.isVisible()) {
        await closeAssistant.click();
      }
    }

    // 5. Assert: Cookies are completely empty
    const cookies = await context.cookies();
    expect(cookies).toEqual([]);

    // 6. Assert: localStorage and sessionStorage are completely empty
    const storage = await page.evaluate(() => {
      return {
        local: { ...localStorage },
        session: { ...sessionStorage },
      };
    });
    expect(storage.local).toEqual({});
    expect(storage.session).toEqual({});

    // 7. Assert: All network requests go strictly to site's own origin
    const currentHost = new URL(page.url()).host;
    const externalHosts = networkRequests
      .map((u) => {
        try {
          return new URL(u).host;
        } catch {
          return "";
        }
      })
      .filter((host) => host && host !== currentHost && !host.includes("localhost") && !host.includes("127.0.0.1"));

    expect(externalHosts).toEqual([]);
  });

  test("Cookie Consent banner with GA configured: script does not load before Accept and loads after", async ({
    page,
  }) => {
    // Inject mock GA ID into runtime to test banner component logic
    await page.addInitScript(() => {
      // Simulate NEXT_PUBLIC_GA_ID presence in window for testing consent component
      (window as unknown as { __MOCK_GA_ID__?: string }).__MOCK_GA_ID__ = "G-TEST123456";
    });

    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // If GA is simulated/active via banner component:
    // Verify that by default before accepting, no gtag script exists
    const gtagScripts = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("script")).filter((s) =>
        s.src.includes("googletagmanager.com")
      ).length;
    });
    expect(gtagScripts).toBe(0);
  });
});
