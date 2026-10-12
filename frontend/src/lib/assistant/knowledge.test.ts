import { describe, it, expect } from "vitest";
import { buildAssistantKnowledge } from "./knowledge";
import { services } from "@/content/services";
import { demos } from "@/content/work";

describe("Assistant Knowledge Base", () => {
  const entries = buildAssistantKnowledge();

  it("should generate a non-empty array of valid entries", () => {
    expect(entries.length).toBeGreaterThan(15);
    for (const entry of entries) {
      expect(entry.id).toBeTruthy();
      expect(entry.title).toBeTruthy();
      expect(entry.keywords.length).toBeGreaterThan(0);
      expect(entry.answer.trim().length).toBeGreaterThan(0);
    }
  });

  it("should contain all 4 service titles", () => {
    const allText = entries.map((e) => `${e.title} ${e.answer}`).join(" ");
    expect(services.length).toBe(4);
    for (const service of services) {
      expect(allText).toContain(service.title);
    }
  });

  it("should contain both demo real statuses", () => {
    const allText = entries.map((e) => `${e.title} ${e.answer}`).join(" ");
    expect(demos.length).toBe(2);
    for (const demo of demos) {
      expect(allText).toContain(demo.status);
    }
  });

  it("should not contain [[TO CONFIRM anywhere in answers", () => {
    for (const entry of entries) {
      expect(entry.answer).not.toContain("[[TO CONFIRM");
    }
  });

  it("should not contain placeholder contact values", () => {
    const placeholderPatterns = [
      /example\.com/i,
      /\+91\s*00000\s*00000/,
      /0000000000/,
      /placeholder/i,
    ];
    for (const entry of entries) {
      for (const pattern of placeholderPatterns) {
        expect(entry.answer).not.toMatch(pattern);
      }
    }
  });

  it("should not contain currency amounts, 'guarantee', or '100%'", () => {
    const forbidden = [
      /₹\s*\d+/,
      /\$\s*\d+/,
      /\b\d+\s*(?:rs|rupees|inr|usd)\b/i,
      /guarantee/i,
      /guaranteed/i,
      /100%/,
    ];
    for (const entry of entries) {
      for (const regex of forbidden) {
        expect(entry.answer).not.toMatch(regex);
      }
    }
  });

  it("should keep every answer short (<= 70 words)", () => {
    for (const entry of entries) {
      const wordCount = entry.answer.trim().split(/\s+/).length;
      expect(wordCount).toBeLessThanOrEqual(70);
    }
  });
});
