/**
 * Single source of truth for business details.
 * ALL values below are DEMO PLACEHOLDERS — replace before going live.
 */
export const site = {
  name: "The Business Work",
  tagline: "We Make Business Simpler.",
  description:
    "The Business Work is an AI automation and digital systems agency in India. We build AI agents, WhatsApp automation, and CRM workflows around your business.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "hello@example.com", // TODO: real business email
  phone: "+91 00000 00000", // TODO: real phone
  whatsappNumber: "910000000000", // TODO: digits only, with country code, no "+"
  location: "India", // TODO: city / registered address
  social: [] as { label: string; href: string }[], // add only real, ready accounts
} as const;

/**
 * Stable timestamp for sitemap and metadata to prevent churn on every rebuild.
 */
export const LAST_MODIFIED = "2026-10-12T00:00:00.000Z";

/**
 * Placeholder guard functions.
 * Protects search engines and public structured data from ever indexing demo/test values.
 */
export function isPlaceholderEmail(email?: string): boolean {
  if (!email) return true;
  const lower = email.toLowerCase();
  return lower.includes("example.com") || lower.includes("test.com") || lower.includes("placeholder");
}

export function isPlaceholderPhone(phone?: string): boolean {
  if (!phone) return true;
  const digits = phone.replace(/\D/g, "");
  return !digits || /^0+$/.test(digits) || digits === "910000000000";
}

export function isPlaceholderUrl(url?: string): boolean {
  if (!url) return true;
  const lower = url.toLowerCase();
  return lower.includes("localhost") || lower.includes("127.0.0.1") || lower.includes("example.com");
}

export function isPlaceholderLocation(location?: string): boolean {
  if (!location) return true;
  const lower = location.trim().toLowerCase();
  return lower === "india" || lower === "placeholder";
}

export function isPlaceholder(
  field: "email" | "phone" | "whatsapp" | "url" | "location" | "social",
  value?: string
): boolean {
  switch (field) {
    case "email":
      return isPlaceholderEmail(value ?? site.email);
    case "phone":
    case "whatsapp":
      return isPlaceholderPhone(value ?? (field === "phone" ? site.phone : site.whatsappNumber));
    case "url":
      return isPlaceholderUrl(value ?? site.url);
    case "location":
      return isPlaceholderLocation(value ?? site.location);
    case "social":
      return !site.social || site.social.length === 0;
    default:
      return true;
  }
}

/**
 * Indexing safety switch:
 * Only allow search engines to index when NEXT_PUBLIC_ALLOW_INDEXING is explicitly "true".
 */
export function isIndexingAllowed(): boolean {
  return process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
}

export function getCleanSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || site.url;
  return raw.replace(/\/+$/, "");
}

export function whatsappLink(message = "Hi, I'd like to discuss a project with The Business Work.") {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
