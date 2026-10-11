import { services } from "@/content/services";

export interface Lead {
  name: string;
  business: string;
  email: string;
  phone: string;
  service: string;
  problem: string;
  consent: true;
  receivedAt: string;
  source: "website-contact-form";
}

export type ParseLeadResult =
  | { ok: true; lead: Lead }
  | { ok: false; error: string };

const clean = (v: unknown, max: number): string =>
  typeof v === "string"
    ? v
        .replace(/[\u0000-\u001F\u007F]/g, " ")
        .trim()
        .slice(0, max)
    : "";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_REGEX = /(?:https?:\/\/|www\.)[^\s]+/gi;

const validServiceTitles = new Set([
  ...services.map((s) => s.title),
  "Not sure yet / custom solution",
]);

/**
 * Validates and sanitizes a raw request body into a typed Lead object.
 * Pure function: does not mutate inputs or perform I/O.
 */
export function parseLead(body: unknown): ParseLeadResult {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request payload." };
  }

  const raw = body as Record<string, unknown>;

  // Consent is required
  const consentGiven = raw.consent === true || raw.consent === "true";
  if (!consentGiven) {
    return { ok: false, error: "Please agree to be contacted to submit your enquiry." };
  }

  // Name is required
  const name = clean(raw.name, 100);
  if (!name) {
    return { ok: false, error: "Please enter your name." };
  }

  // Business is optional
  const business = clean(raw.business, 120);

  // Email validation
  const rawEmail = clean(raw.email, 160);
  let email = "";
  if (rawEmail) {
    if (!EMAIL_REGEX.test(rawEmail)) {
      return { ok: false, error: "Please enter a valid email." };
    }
    email = rawEmail;
  }

  // Phone validation: strip spaces, dashes, brackets, dots, leading +
  const rawPhone = clean(raw.phone, 25);
  let phone = "";
  if (rawPhone) {
    const digitsOnly = rawPhone.replace(/^\+/, "").replace(/[\s\-\(\)\[\]\.]/g, "");
    if (!/^\d{7,15}$/.test(digitsOnly)) {
      return { ok: false, error: "Please enter a valid phone number." };
    }
    phone = rawPhone;
  }

  // Must provide at least one contact method
  if (!email && !phone) {
    return { ok: false, error: "Please provide an email or phone number." };
  }

  // Service title validation (fallback to "Other")
  const rawService = clean(raw.service, 80);
  const service = validServiceTitles.has(rawService) ? rawService : "Other";

  // Problem field validation (max 1500 chars, max 2 URLs)
  const problem = clean(raw.problem, 1500);
  const urls = problem.match(URL_REGEX) || [];
  if (urls.length >= 3) {
    return { ok: false, error: "Please reduce the number of links in your message." };
  }

  return {
    ok: true,
    lead: {
      name,
      business,
      email,
      phone,
      service,
      problem,
      consent: true,
      receivedAt: new Date().toISOString(),
      source: "website-contact-form",
    },
  };
}
