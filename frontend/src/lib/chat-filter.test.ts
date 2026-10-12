import { describe, it, expect, beforeEach } from "vitest";
import {
  filterChatReply,
  SAFE_FALLBACK_REPLY,
  getFilterHitCount,
  resetFilterHitCountForTesting,
} from "./chat-filter";

describe("filterChatReply", () => {
  beforeEach(() => {
    resetFilterHitCountForTesting();
  });

  it("passes normal informative text through unchanged", () => {
    const normal =
      "We build custom AI agents that answer enquiries from approved documentation.";
    const result = filterChatReply(normal);
    expect(result.filtered).toBe(false);
    expect(result.text).toBe(normal);
    expect(getFilterHitCount()).toBe(0);
  });

  it("replaces replies containing currency amounts (₹, $, INR, USD, Rs)", () => {
    const cases = [
      "Our setup fee starts at ₹25,000 for standard workflows.",
      "The service costs $500 per month.",
      "You will need to pay 10000 INR for the implementation.",
      "The running charge is 50 USD for hosting.",
      "The estimate is Rs. 15,000 for basic setup.",
      "It will cost Rs 2000 per user.",
    ];

    for (const c of cases) {
      const res = filterChatReply(c);
      expect(res.filtered).toBe(true);
      expect(res.text).toBe(SAFE_FALLBACK_REPLY);
    }
    expect(getFilterHitCount()).toBe(cases.length);
  });

  it("replaces replies containing guarantee claims", () => {
    const cases = [
      "We guarantee an increase in qualified leads.",
      "Success is guaranteed within 30 days.",
      "Our system guarantees 100% accuracy.",
    ];

    for (const c of cases) {
      const res = filterChatReply(c);
      expect(res.filtered).toBe(true);
      expect(res.text).toBe(SAFE_FALLBACK_REPLY);
    }
  });

  it("replaces replies containing 100% claims", () => {
    const res = filterChatReply("Our agents have a 100% response rate.");
    expect(res.filtered).toBe(true);
    expect(res.text).toBe(SAFE_FALLBACK_REPLY);
  });

  it("replaces replies containing [[TO CONFIRM placeholders", () => {
    const res = filterChatReply(
      "Our office is at [[TO CONFIRM: registered address]]."
    );
    expect(res.filtered).toBe(true);
    expect(res.text).toBe(SAFE_FALLBACK_REPLY);
  });

  it("replaces replies containing placeholder contact information", () => {
    const cases = [
      "You can email us at hello@example.com for more info.",
      "Call us on +91 00000 00000 to discuss.",
      "Message on whatsapp at 910000000000.",
    ];

    for (const c of cases) {
      const res = filterChatReply(c);
      expect(res.filtered).toBe(true);
      expect(res.text).toBe(SAFE_FALLBACK_REPLY);
    }
  });

  it("caps reply text if longer than 1500 characters", () => {
    const longText = "A".repeat(1600);
    const res = filterChatReply(longText);
    expect(res.filtered).toBe(false);
    expect(res.text.length).toBeLessThanOrEqual(1502);
    expect(res.text.endsWith("…")).toBe(true);
  });
});
