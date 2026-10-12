import { site } from "./site";

export const SAFE_FALLBACK_REPLY =
  "I'm not able to confirm that here. Please send us an enquiry and the team will help.";

// Counter for internal metrics (no message content logged)
let filterHitCount = 0;

export function getFilterHitCount(): number {
  return filterHitCount;
}

export function resetFilterHitCountForTesting(): void {
  filterHitCount = 0;
}

/**
 * Validates and filters model output before returning to the user.
 * Catches:
 * - Currency amounts (₹, $, INR, USD, Rs)
 * - Guarantee claims ("guarantee", "guaranteed", "guarantees")
 * - Absolute claims ("100%")
 * - Placeholder tags ([[TO CONFIRM...)
 * - Site placeholder contact values (site.email, site.phone, site.whatsappNumber)
 */
export function filterChatReply(reply: string): { text: string; filtered: boolean } {
  if (!reply || typeof reply !== "string") {
    return { text: SAFE_FALLBACK_REPLY, filtered: true };
  }

  // 1. Currency amount detection
  // Checks for currency symbols (₹, $) or currency codes (INR, USD, Rs/Rs.) near numbers or standalone
  const currencyRegex =
    /[₹$]|\b(?:inr|usd|rs\.?)\s*\d+|\d+\s*(?:inr|usd|rs\.?)\b/i;

  if (currencyRegex.test(reply)) {
    filterHitCount += 1;
    return { text: SAFE_FALLBACK_REPLY, filtered: true };
  }

  // 2. Guarantee keywords
  const guaranteeRegex = /\bguarante(?:e|ed|es|eing)\b/i;
  if (guaranteeRegex.test(reply)) {
    filterHitCount += 1;
    return { text: SAFE_FALLBACK_REPLY, filtered: true };
  }

  // 3. 100% claims
  if (/100%/.test(reply)) {
    filterHitCount += 1;
    return { text: SAFE_FALLBACK_REPLY, filtered: true };
  }

  // 4. Draft placeholder tags
  if (/\[\[TO CONFIRM/i.test(reply)) {
    filterHitCount += 1;
    return { text: SAFE_FALLBACK_REPLY, filtered: true };
  }

  // 5. Placeholder contact values from site config
  const placeholderValues = [
    site.email,
    site.phone,
    site.whatsappNumber,
    "hello@example.com",
    "910000000000",
  ].filter(Boolean);

  const lowerReply = reply.toLowerCase();
  for (const val of placeholderValues) {
    if (val && lowerReply.includes(val.toLowerCase())) {
      filterHitCount += 1;
      return { text: SAFE_FALLBACK_REPLY, filtered: true };
    }
  }

  // 6. Cap reply length (max 1500 chars)
  const trimmed = reply.length > 1500 ? reply.slice(0, 1500) + "…" : reply;

  return { text: trimmed, filtered: false };
}
