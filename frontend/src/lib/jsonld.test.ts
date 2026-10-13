import { describe, it, expect } from "vitest";
import { getHomeJsonLd, getServiceJsonLd, serializeJsonLd } from "./jsonld";
import { services } from "@/content/services";
import { site } from "@/lib/site";

describe("JSON-LD Structured Data", () => {
  it("generates valid home schemas without emitting placeholder contact data", () => {
    const schemas = getHomeJsonLd();
    expect(schemas).toHaveLength(3);

    const [website, org, profService] = schemas;
    expect(website["@type"]).toBe("WebSite");
    expect(website.inLanguage).toBe("en-IN");

    expect(org["@type"]).toBe("Organization");
    expect(org.description).toBe(site.description);
    expect(org.areaServed.name).toBe("India");

    expect(profService["@type"]).toBe("ProfessionalService");
    expect(profService.description).toBe(site.description);
    expect(profService.areaServed.name).toBe("India");
    expect(profService.serviceType).toEqual(services.map((s) => s.title));

    // Verified contact details are emitted; unconfirmed address & sameAs remain undefined
    expect(org.email).toBe(site.email);
    expect(org.telephone).toBe(site.phone);
    expect(org.address).toBeUndefined();
    expect(org.sameAs).toEqual(["https://instagram.com/thebusinesswork.co"]);

    // No fake rating fields
    expect(profService).not.toHaveProperty("aggregateRating");
    expect(profService).not.toHaveProperty("review");

    // Must serialize cleanly to valid JSON
    const serialized = serializeJsonLd(schemas);
    expect(() => JSON.parse(serialized)).not.toThrow();
    expect(serialized).not.toContain("hello@example.com");
    expect(serialized).not.toContain("00000 00000");
  });

  it("escapes '<' characters in serialization to prevent XSS", () => {
    const unsafeData = { title: "AI <script>alert(1)</script> Chatbot" };
    const serialized = serializeJsonLd(unsafeData);
    expect(serialized).not.toContain("<");
    expect(serialized).toContain("\\u003c");
  });

  it("contains no banned words or unsupported claims in home or service structured data", () => {
    const homeJson = JSON.stringify(getHomeJsonLd()).toLowerCase();
    const banned = ["guarantee", "100%", "instant", "worldwide", "high accuracy", "autonomous", "deterministic", "production ai"];
    for (const word of banned) {
      expect(homeJson).not.toContain(word);
    }

    for (const service of services) {
      const serviceJson = JSON.stringify(getServiceJsonLd(service)).toLowerCase();
      for (const word of banned) {
        expect(serviceJson).not.toContain(word);
      }
    }
  });

  it("generates valid service schemas with matching FAQ text and areaServed India", () => {
    for (const service of services) {
      const schemas = getServiceJsonLd(service);
      const serviceSchema = schemas.find((s) => s && s["@type"] === "Service");
      const breadcrumb = schemas.find((s) => s && s["@type"] === "BreadcrumbList");
      const faq = schemas.find((s) => s && s["@type"] === "FAQPage");


      expect(serviceSchema).toBeDefined();
      if (serviceSchema && serviceSchema["@type"] === "Service") {
        expect(serviceSchema.name).toBe(service.title);
        expect(serviceSchema.description).toBe(service.summary);
        expect(serviceSchema.areaServed.name).toBe("India");
      }

      expect(breadcrumb).toBeDefined();
      if (breadcrumb && breadcrumb["@type"] === "BreadcrumbList") {
        expect(breadcrumb.itemListElement).toHaveLength(3);
      }

      if (service.faq && service.faq.length > 0) {
        expect(faq).toBeDefined();
        if (faq && faq["@type"] === "FAQPage") {
          expect(faq.mainEntity).toHaveLength(service.faq.length);
          service.faq.forEach((f, idx) => {
            expect(faq.mainEntity[idx].name).toBe(f.question);
            expect(faq.mainEntity[idx].acceptedAnswer.text).toBe(f.answer);
          });
        }
      } else {
        expect(faq).toBeUndefined();
      }
    }
  });
});

