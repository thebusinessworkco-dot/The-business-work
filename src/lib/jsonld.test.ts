import { describe, it, expect } from "vitest";
import { getHomeJsonLd, getServiceJsonLd, serializeJsonLd } from "./jsonld";
import { services } from "@/content/services";

describe("JSON-LD Structured Data", () => {
  it("generates valid home schemas without emitting placeholder contact data", () => {
    const schemas = getHomeJsonLd();
    expect(schemas).toHaveLength(3);

    const [website, org, profService] = schemas;
    expect(website["@type"]).toBe("WebSite");
    expect(org["@type"]).toBe("Organization");
    expect(profService["@type"]).toBe("ProfessionalService");

    // Placeholder guard test: email, phone, address, sameAs must NOT be emitted
    expect(org.email).toBeUndefined();
    expect(org.telephone).toBeUndefined();
    expect(org.address).toBeUndefined();
    expect(org.sameAs).toBeUndefined();

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

  it("generates valid service schemas with matching FAQ text", () => {
    const service = services[0];
    const [serviceSchema, breadcrumb, faq] = getServiceJsonLd(service);

    expect(serviceSchema["@type"]).toBe("Service");
    expect(serviceSchema.name).toBe(service.title);

    expect(breadcrumb["@type"]).toBe("BreadcrumbList");
    expect(breadcrumb.itemListElement).toHaveLength(3);

    expect(faq["@type"]).toBe("FAQPage");
    expect(faq.mainEntity).toHaveLength(service.faq.length);
    expect(faq.mainEntity[0].name).toBe(service.faq[0].question);
    expect(faq.mainEntity[0].acceptedAnswer.text).toBe(service.faq[0].answer);
  });
});
