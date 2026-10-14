import { describe, it, expect } from "vitest";
import { solutions } from "./solutions";
import { getSolutionJsonLd } from "@/lib/jsonld";

describe("Solutions Content Data Model", () => {
  it("defines exactly two solutions", () => {
    expect(solutions).toHaveLength(2);
    const expectedSlugs = [
      "whatsapp-appointment-booking-clinics",
      "n8n-workflow-automation-guide",
    ];
    expect(solutions.map((s) => s.slug)).toEqual(expectedSlugs);
  });

  it("contains no banned words or unsupported claims in solutions data", () => {
    const serialized = JSON.stringify(solutions).toLowerCase();
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

  it("contains no placeholders in solutions data", () => {
    const serialized = JSON.stringify(solutions).toLowerCase();
    const placeholders = ["example.com", "[[to confirm", "00000 00000", "placeholder"];
    for (const p of placeholders) {
      expect(serialized).not.toContain(p);
    }
  });

  it("contains no currency symbols or public pricing amounts", () => {
    const serialized = JSON.stringify(solutions);
    expect(serialized).not.toContain("₹");
    expect(serialized).not.toContain("$");
    expect(serialized).not.toContain("€");
    expect(serialized).not.toContain("£");
  });

  it("generates valid solution JSON-LD structured data with matching FAQ text", () => {
    for (const solution of solutions) {
      const schemas = getSolutionJsonLd(solution);
      expect(schemas.length).toBeGreaterThanOrEqual(2);

      const serviceSchema = schemas.find((s) => s && s["@type"] === "Service");
      const breadcrumb = schemas.find((s) => s && s["@type"] === "BreadcrumbList");
      const faq = schemas.find((s) => s && s["@type"] === "FAQPage");

      expect(serviceSchema).toBeDefined();
      if (serviceSchema && serviceSchema["@type"] === "Service") {
        expect(serviceSchema.name).toBe(solution.title);
        expect(serviceSchema.description).toBe(solution.summary);
        expect(serviceSchema.areaServed.name).toBe("India");
      }

      expect(breadcrumb).toBeDefined();
      if (breadcrumb && breadcrumb["@type"] === "BreadcrumbList") {
        expect(breadcrumb.itemListElement).toHaveLength(3);
      }

      if (solution.faq && solution.faq.length > 0) {
        expect(faq).toBeDefined();
        if (faq && faq["@type"] === "FAQPage") {
          expect(faq.mainEntity).toHaveLength(solution.faq.length);
        }
      }
    }
  });
});
