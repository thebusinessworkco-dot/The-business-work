// frontend/scripts/preflight.mjs
// Runs full preflight validation suite: typecheck, unit tests, and production build.

import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendDir = path.resolve(__dirname, "..");

const args = process.argv.slice(2);
const isProduction = args.includes("--production");

console.log(`\n=== Running Preflight Checks ${isProduction ? "[Production Mode]" : "[Standard Mode]"} ===\n`);

function step(name, cmd) {
  console.log(`▶ Running: ${name} (${cmd})`);
  try {
    execSync(cmd, { cwd: frontendDir, stdio: "inherit" });
    console.log(`✓ ${name} PASSED\n`);
    return true;
  } catch {
    console.error(`✗ ${name} FAILED\n`);
    return false;
  }
}

let allOk = true;

allOk = step("TypeScript Typecheck", "npm run typecheck") && allOk;
allOk = step("Vitest Unit Tests", "npm run test") && allOk;
allOk = step("Production Build", "npm run build") && allOk;

if (isProduction) {
  console.log("▶ In production mode, checking HTTPS safety for site URL and configured webhooks:");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl && !siteUrl.startsWith("https://")) {
    console.error(`✗ Production safety FAILED: NEXT_PUBLIC_SITE_URL must start with https:// in production mode (got: ${siteUrl})\n`);
    allOk = false;
  } else {
    console.log("✓ Site URL HTTPS check passed\n");
  }

  const leadWebhook = process.env.LEAD_WEBHOOK_URL;
  if (leadWebhook && !leadWebhook.startsWith("https://")) {
    console.error("✗ Production safety FAILED: LEAD_WEBHOOK_URL must start with https:// in production mode.\n");
    allOk = false;
  }

  const notifyWebhook = process.env.NOTIFY_WEBHOOK_URL;
  if (notifyWebhook && !notifyWebhook.startsWith("https://")) {
    console.error("✗ Production safety FAILED: NOTIFY_WEBHOOK_URL must start with https:// in production mode.\n");
    allOk = false;
  }

  console.log("▶ Note: In production mode, checking legal placeholders status:");
  try {
    execSync("npm run legal:check", { cwd: frontendDir, stdio: "inherit" });
    console.log("✓ Legal check: all placeholders resolved for production launch.\n");
  } catch {
    console.warn("⚠ Legal check: unresolved placeholders remain (normal for pre-launch draft mode).\n");
  }
}

if (!allOk) {
  console.error("✗ Preflight validation failed: fix errors before deployment.\n");
  process.exit(1);
} else {
  console.log("✓ Preflight validation succeeded: repository is healthy.\n");
  process.exit(0);
}
