import { describe, it, expect } from "vitest";
import { services } from "./services";

describe("Services Content Data Model", () => {
  it("defines exactly four services", () => {
    expect(services).toHaveLength(4);
    const expectedIds = [
      "ai-agents-chatbots",
      "crm-sales-automation",
      "business-workflow-automation",
      "whatsapp-social-automation",
    ];
    expect(services.map((s) => s.id)).toEqual(expectedIds);
  });

  it("keeps each service summary in company voice and under 155 characters", () => {
    for (const service of services) {
      expect(service.summary.length).toBeLessThanOrEqual(155);
      expect(service.summary).toMatch(/^We (build|help|connect)/);
    }
  });

  it("defines exactly six capabilities per service (24 total)", () => {
    let totalCapabilities = 0;
    for (const service of services) {
      expect(service.capabilities).toHaveLength(6);
      totalCapabilities += service.capabilities.length;
    }
    expect(totalCapabilities).toBe(24);
  });

  it("contains all required detail fields with at most 25 words each", () => {
    const wordCount = (str: string) => str.trim().split(/\s+/).length;

    for (const service of services) {
      for (const cap of service.capabilities) {
        expect(cap.name).toBeTruthy();
        const d = cap.details;
        expect(d).toBeDefined();

        // Field presence
        expect(d.what).toBeTruthy();
        expect(d.problem).toBeTruthy();
        expect(Array.isArray(d.steps)).toBe(true);
        expect(d.steps).toHaveLength(3);
        expect(d.example).toBeTruthy();
        expect(d.benefit).toBeTruthy();
        expect(d.tools).toBeTruthy();

        // Tools format: must start with "Depends on:"
        expect(d.tools.startsWith("Depends on:")).toBe(true);

        // Word count limits (<= 25 words per field/step)
        expect(wordCount(d.what)).toBeLessThanOrEqual(25);
        expect(wordCount(d.problem)).toBeLessThanOrEqual(25);
        for (const step of d.steps) {
          expect(wordCount(step)).toBeLessThanOrEqual(25);
        }
        expect(wordCount(d.example)).toBeLessThanOrEqual(25);
        expect(wordCount(d.benefit)).toBeLessThanOrEqual(25);
        expect(wordCount(d.tools)).toBeLessThanOrEqual(25);
      }
    }
  });

  it("contains no banned words or unsupported claims in services data", () => {
    const serialized = JSON.stringify(services).toLowerCase();
    const banned = [
      "guarantee",
      "100%",
      "instant",
      "worldwide",
      "high accuracy",
      "autonomous",
      "24/7",
      "around the clock",
    ];

    for (const word of banned) {
      expect(serialized).not.toContain(word);
    }
  });

  it("contains no placeholders in services data", () => {
    const serialized = JSON.stringify(services).toLowerCase();
    const placeholders = ["example.com", "[[to confirm", "00000 00000", "placeholder"];
    for (const p of placeholders) {
      expect(serialized).not.toContain(p);
    }
  });

  it("defines exactly six use cases per service", () => {
    for (const service of services) {
      expect(service.useCases).toHaveLength(6);
      for (const uc of service.useCases) {
        expect(uc.trim().length).toBeGreaterThan(0);
      }
    }
  });
});
