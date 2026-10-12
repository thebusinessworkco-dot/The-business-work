import { describe, it, expect } from "vitest";
import { buildChatKnowledge } from "./chat-knowledge";
import { services } from "@/content/services";
import { demos } from "@/content/work";
import { site } from "./site";

describe("buildChatKnowledge", () => {
  const knowledge = buildChatKnowledge();

  it("contains all 4 service titles exactly", () => {
    expect(services).toHaveLength(4);
    for (const service of services) {
      expect(knowledge).toContain(service.title);
    }
  });

  it("contains both demo true statuses from work.ts", () => {
    expect(demos).toHaveLength(2);
    expect(knowledge).toContain("True Status: In development");
    expect(knowledge).toContain("True Status: Proof of concept");
  });

  it("contains no [[TO CONFIRM placeholders", () => {
    expect(knowledge).not.toContain("[[TO CONFIRM");
    expect(knowledge).not.toMatch(/\[\[TO CONFIRM/i);
  });

  it("contains no placeholder email, phone, or WhatsApp values", () => {
    expect(knowledge).not.toContain(site.email);
    expect(knowledge).not.toContain("hello@example.com");
    expect(knowledge).not.toContain("+91 00000 00000");
    expect(knowledge).not.toContain("910000000000");
  });

  it("contains no currency amounts or currency symbols", () => {
    // Must contain no rupee/dollar symbols or explicit currency code amounts
    expect(knowledge).not.toContain("₹");
    expect(knowledge).not.toContain("$");
    expect(knowledge).not.toMatch(/[₹$]/);
    expect(knowledge).not.toMatch(/\b(?:INR|USD|Rs\.?)\s*\d+/i);
    expect(knowledge).not.toMatch(/\d+\s*(?:INR|USD|Rs\.?)\b/i);
  });
});
