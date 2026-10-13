/**
 * Single source of truth for business details.
 * Updated with verified contact information for The Business Work.
 */
export const site = {
  name: "The Business Work",
  tagline: "We Make Business Simpler.",
  founder: "Aman Rajbhar",
  description:
    "The Business Work helps small and medium businesses in India automate customer enquiries, bookings, lead follow-ups and repetitive admin — using WhatsApp, AI and connected business tools.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://the-business-work.vercel.app",
  email: "thebusinesswork.co@gmail.com",
  phone: "+91 79720 20292",
  phoneHref: "tel:+917972020292",
  whatsappNumber: "917972020292", // digits only, with country code, no "+"
  whatsappHref: "https://wa.me/917972020292",
  instagram: "https://instagram.com/thebusinesswork.co",
  location: "India", // No verified office address — keep general
  social: [
    { label: "Instagram", href: "https://instagram.com/thebusinesswork.co" },
  ] as readonly { label: string; href: string }[],
} as const;

/**
 * Stable timestamp for sitemap and metadata to prevent churn on every rebuild.
 */
export const LAST_MODIFIED = "2026-10-13T00:00:00.000Z";

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

export function whatsappLink(
  message = "Hi, I'd like to discuss a business automation project with The Business Work. Could we set up a time to talk?"
) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
