// frontend/scripts/preflight.mjs
// Launch Gate Checker for The Business Work.
// Audits production-readiness, environment variables, contact details, and legal status.
// Exits non-zero on any FAIL.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendDir = path.resolve(__dirname, "..");

const args = process.argv.slice(2);
const isProduction = args.includes("--production");

// 1. Read process.env and frontend/.env.local (without logging secret values)
const env = { ...process.env };
const envLocalPath = path.resolve(frontendDir, ".env.local");
if (fs.existsSync(envLocalPath)) {
  const content = fs.readFileSync(envLocalPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (env[key] === undefined) {
        env[key] = val;
      }
    }
  }
}

// 2. Placeholder guards matching src/lib/site.ts
function isPlaceholderEmail(email) {
  if (!email) return true;
  const lower = email.toLowerCase();
  return lower.includes("example.com") || lower.includes("test.com") || lower.includes("placeholder");
}

function isPlaceholderPhone(phone) {
  if (!phone) return true;
  const digits = String(phone).replace(/\D/g, "");
  return !digits || /^0+$/.test(digits) || digits === "910000000000";
}

function isPlaceholderLocation(location) {
  if (!location) return true;
  const lower = location.trim().toLowerCase();
  return lower === "india" || lower === "placeholder";
}

// Read site.ts
const siteTsPath = path.resolve(frontendDir, "src/lib/site.ts");
let siteEmail = "";
let sitePhone = "";
let siteWhatsapp = "";
let siteLocation = "";

if (fs.existsSync(siteTsPath)) {
  const siteContent = fs.readFileSync(siteTsPath, "utf-8");
  const emailM = siteContent.match(/email:\s*"([^"]+)"/);
  const phoneM = siteContent.match(/phone:\s*"([^"]+)"/);
  const waM = siteContent.match(/whatsappNumber:\s*"([^"]+)"/);
  const locM = siteContent.match(/location:\s*"([^"]+)"/);
  if (emailM) siteEmail = emailM[1];
  if (phoneM) sitePhone = phoneM[1];
  if (waM) siteWhatsapp = waM[1];
  if (locM) siteLocation = locM[1];
}

// 3. Scan legal placeholders
const legalFiles = [
  path.resolve(frontendDir, "src/content/legal/privacy.ts"),
  path.resolve(frontendDir, "src/content/legal/terms.ts"),
];
let legalPlaceholderCount = 0;
for (const file of legalFiles) {
  if (fs.existsSync(file)) {
    const text = fs.readFileSync(file, "utf-8");
    const matches = text.match(/\[\[TO CONFIRM:\s*([^\]]+)\]\]/g);
    if (matches) legalPlaceholderCount += matches.length;
  }
}

// 4. Run Checks
const results = [];

function check(title, status, details, blocksIndexing = false) {
  results.push({ title, status, details, blocksIndexing });
}

// Check A: NEXT_PUBLIC_SITE_URL
const siteUrl = env.NEXT_PUBLIC_SITE_URL;
if (!siteUrl) {
  if (isProduction) {
    check("NEXT_PUBLIC_SITE_URL", "FAIL", "Missing required site URL", true);
  } else {
    check("NEXT_PUBLIC_SITE_URL", "WARN", "Unset (defaults to http://localhost:3000)", false);
  }
} else if (!siteUrl.startsWith("https://")) {
  if (isProduction) {
    check("NEXT_PUBLIC_SITE_URL", "FAIL", `Must use https:// protocol (got: ${siteUrl})`, true);
  } else {
    check("NEXT_PUBLIC_SITE_URL", "PASS", `Set to ${siteUrl} (development protocol allowed)`);
  }
} else if (isProduction && (siteUrl.includes("localhost") || siteUrl.includes("example") || siteUrl.includes("vercel.app"))) {
  check("NEXT_PUBLIC_SITE_URL", "FAIL", `Production site URL cannot contain localhost, example, or vercel.app (got: ${siteUrl})`, true);
} else {
  check("NEXT_PUBLIC_SITE_URL", "PASS", `Configured: ${siteUrl}`);
}

// Check B: site.ts placeholders
const sitePlaceholders = [];
if (isPlaceholderEmail(siteEmail)) sitePlaceholders.push(`email="${siteEmail}"`);
if (isPlaceholderPhone(sitePhone)) sitePlaceholders.push(`phone="${sitePhone}"`);
if (isPlaceholderPhone(siteWhatsapp)) sitePlaceholders.push(`whatsapp="${siteWhatsapp}"`);
if (isPlaceholderLocation(siteLocation)) sitePlaceholders.push(`location="${siteLocation}"`);

if (sitePlaceholders.length > 0) {
  const detail = `Unresolved demo placeholders in site.ts: ${sitePlaceholders.join(", ")}`;
  if (isProduction) {
    check("site.ts business details", "FAIL", detail, true);
  } else {
    check("site.ts business details", "WARN", detail, false);
  }
} else {
  check("site.ts business details", "PASS", "Real business contact details configured");
}

// Check C: LEAD_WEBHOOK_URL
const leadWebhook = env.LEAD_WEBHOOK_URL;
if (!leadWebhook) {
  if (isProduction) {
    check("LEAD_WEBHOOK_URL", "FAIL", "Missing required lead webhook URL", true);
  } else {
    check("LEAD_WEBHOOK_URL", "WARN", "Unset (lead submission will fail in dev)", false);
  }
} else if (!leadWebhook.startsWith("https://")) {
  if (isProduction) {
    check("LEAD_WEBHOOK_URL", "FAIL", "Must start with https:// in production", true);
  } else {
    check("LEAD_WEBHOOK_URL", "WARN", `Non-https webhook (${leadWebhook})`, false);
  }
} else {
  check("LEAD_WEBHOOK_URL", "PASS", "HTTPS webhook configured");
}

// Check D: LEAD_WEBHOOK_SECRET
const webhookSecret = env.LEAD_WEBHOOK_SECRET;
if (!webhookSecret) {
  check("LEAD_WEBHOOK_SECRET", "WARN", "Unset (HMAC webhook signature disabled)", false);
} else {
  check("LEAD_WEBHOOK_SECRET", "PASS", "Secret configured");
}

// Check E: Upstash vars
const upstashUrl = env.UPSTASH_REDIS_REST_URL;
const upstashToken = env.UPSTASH_REDIS_REST_TOKEN;
if (!upstashUrl || !upstashToken) {
  check("Upstash Redis rate-limit", "WARN", "Unset (using in-memory fallback rate limiter)", false);
} else {
  check("Upstash Redis rate-limit", "PASS", "Distributed rate limiter configured");
}

// Check F: Legal placeholders
if (legalPlaceholderCount > 0) {
  const msg = `${legalPlaceholderCount} unresolved [[TO CONFIRM]] placeholders remain`;
  if (isProduction) {
    check("Legal placeholders", "FAIL", msg, true);
  } else {
    check("Legal placeholders", "WARN", `${msg} (draft banner & noindex active)`, false);
  }
} else {
  check("Legal placeholders", "PASS", "All legal placeholders resolved");
}

// Check G: Cloudflare Turnstile
const siteKey = env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const secretKey = env.TURNSTILE_SECRET_KEY;
if ((siteKey && !secretKey) || (!siteKey && secretKey)) {
  check("Cloudflare Turnstile", "FAIL", "Key mismatch: one key set without the other", true);
} else if (siteKey && secretKey) {
  check("Cloudflare Turnstile", "PASS", "Both site key and secret key configured");
} else {
  check("Cloudflare Turnstile", "PASS", "Disabled (optional spam protection)");
}

// Check H: NEXT_PUBLIC_ALLOW_INDEXING
const allowIndexing = env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
const blockingFails = results.filter((r) => r.status === "FAIL" && r.blocksIndexing);

if (allowIndexing) {
  if (blockingFails.length > 0) {
    check("NEXT_PUBLIC_ALLOW_INDEXING", "FAIL", `Set to true, but blocked by: ${blockingFails.map((f) => f.title).join(", ")}`, true);
  } else {
    check("NEXT_PUBLIC_ALLOW_INDEXING", "PASS", "Search engine indexing enabled");
  }
} else {
  const blockingMsg = blockingFails.length > 0
    ? `Currently false (noindex active). Launch gate items blocking indexing: ${blockingFails.map((f) => f.title).join(", ")}`
    : "Currently false (noindex active). Ready to enable when desired.";
  check("NEXT_PUBLIC_ALLOW_INDEXING", "WARN", blockingMsg, false);
}

// Render Results Table
console.log(`\n=== Launch Gate Preflight [${isProduction ? "PRODUCTION" : "STANDARD"}] ===\n`);
console.log("| Check | Status | Details |");
console.log("| :--- | :---: | :--- |");
for (const r of results) {
  console.log(`| ${r.title} | ${r.status} | ${r.details} |`);
}

const fails = results.filter((r) => r.status === "FAIL");
const warns = results.filter((r) => r.status === "WARN");
const passes = results.filter((r) => r.status === "PASS");

console.log(`\nSummary: ${passes.length} PASS, ${warns.length} WARN, ${fails.length} FAIL`);

const readyToIndex = fails.length === 0 && legalPlaceholderCount === 0 && sitePlaceholders.length === 0 && siteUrl && siteUrl.startsWith("https://") && !siteUrl.includes("localhost") && !siteUrl.includes("vercel.app");

console.log(`Ready to index: ${readyToIndex ? "yes" : "no"}\n`);

if (fails.length > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
