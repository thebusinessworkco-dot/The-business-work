import { describe, it, expect } from "vitest";
import { parseLead } from "./lead";

describe("parseLead", () => {
  const baseValid = {
    name: "Aman Sharma",
    business: "Sharma Diagnostics",
    email: "aman@example.com",
    phone: "+91 98765 43210",
    service: "AI Agents & Chatbots",
    problem: "Need appointment scheduling for our clinic.",
    consent: true,
  };

  it("accepts a completely valid lead", () => {
    const res = parseLead(baseValid);
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.lead.name).toBe("Aman Sharma");
      expect(res.lead.business).toBe("Sharma Diagnostics");
      expect(res.lead.email).toBe("aman@example.com");
      expect(res.lead.phone).toBe("+91 98765 43210");
      expect(res.lead.service).toBe("AI Agents & Chatbots");
      expect(res.lead.consent).toBe(true);
      expect(res.lead.source).toBe("website-contact-form");
      expect(res.lead.receivedAt).toBeDefined();
    }
  });

  it("fails when name is missing or empty", () => {
    const res = parseLead({ ...baseValid, name: "   " });
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.error).toBe("Please enter your name.");
    }
  });

  it("fails when both email and phone are missing", () => {
    const res = parseLead({ ...baseValid, email: "", phone: "" });
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.error).toBe("Please provide an email or phone number.");
    }
  });

  it("fails when email is invalid", () => {
    const res = parseLead({ ...baseValid, email: "invalid-email" });
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.error).toBe("Please enter a valid email.");
    }
  });

  it("accepts valid phone variations and rejects bad phone", () => {
    // Valid phone variations
    expect(parseLead({ ...baseValid, phone: "+91-98765-43210" }).ok).toBe(true);
    expect(parseLead({ ...baseValid, phone: "(022) 1234567" }).ok).toBe(true);
    expect(parseLead({ ...baseValid, phone: "9876543210" }).ok).toBe(true);

    // Bad phone (< 7 digits or invalid characters)
    const resTooShort = parseLead({ ...baseValid, phone: "12345" });
    expect(resTooShort.ok).toBe(false);
    if (!resTooShort.ok) {
      expect(resTooShort.error).toBe("Please enter a valid phone number.");
    }

    const resTooLong = parseLead({ ...baseValid, phone: "123456789012345678" });
    expect(resTooLong.ok).toBe(false);
    if (!resTooLong.ok) {
      expect(resTooLong.error).toBe("Please enter a valid phone number.");
    }
  });

  it("maps unknown service to 'Other'", () => {
    const res = parseLead({ ...baseValid, service: "Cryptocurrency Trading Bot" });
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.lead.service).toBe("Other");
    }
  });

  it("fails when consent is false or missing", () => {
    const resMissing = parseLead({ ...baseValid, consent: false });
    expect(resMissing.ok).toBe(false);
    if (!resMissing.ok) {
      expect(resMissing.error).toBe("Please agree to be contacted to submit your enquiry.");
    }
  });

  it("rejects problem field with 3 or more URLs but accepts 0 to 2 URLs", () => {
    // 2 URLs: allowed
    const res2 = parseLead({
      ...baseValid,
      problem: "Check https://example.com and www.test.com for reference.",
    });
    expect(res2.ok).toBe(true);

    // 3 URLs: rejected
    const res3 = parseLead({
      ...baseValid,
      problem: "Visit https://one.com and https://two.com and http://three.com for spam.",
    });
    expect(res3.ok).toBe(false);
    if (!res3.ok) {
      expect(res3.error).toBe("Please reduce the number of links in your message.");
    }
  });

  it("sanitizes, caps, and includes lead context (page, cta, utm tags)", () => {
    const longString = "a".repeat(150);
    const res = parseLead({
      ...baseValid,
      page: "/services/ai-agents-chatbots",
      cta: "hero",
      utm_source: "google\u0000\u001F" + longString,
      utm_medium: "cpc" + longString,
      utm_campaign: "launch_2026",
      unknownMaliciousField: "DROP_ME",
    });

    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.lead.page).toBe("/services/ai-agents-chatbots");
      expect(res.lead.cta).toBe("hero");
      expect(res.lead.utm_source).toHaveLength(80);
      expect(res.lead.utm_source?.startsWith("google")).toBe(true);
      expect(res.lead.utm_source?.includes("\u0000")).toBe(false);
      expect(res.lead.utm_medium).toHaveLength(80);
      expect(res.lead.utm_campaign).toBe("launch_2026");
      expect((res.lead as unknown as Record<string, unknown>).unknownMaliciousField).toBeUndefined();
    }
  });
});
