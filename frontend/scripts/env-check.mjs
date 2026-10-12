// frontend/scripts/env-check.mjs
// Verifies that .env.example and codebase process.env references are completely synchronized.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendDir = path.resolve(__dirname, "..");

// 1. Parse .env.example
const envExamplePath = path.resolve(frontendDir, ".env.example");
const envExampleContent = fs.readFileSync(envExamplePath, "utf-8");
const documentedVars = new Set();

for (const line of envExampleContent.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const match = trimmed.match(/^([A-Z0-9_]+)=/);
  if (match) {
    documentedVars.add(match[1]);
  }
}

// 2. Scan frontend/src for process.env references
const srcDir = path.resolve(frontendDir, "src");
const codeVars = new Set();
const standardBuiltins = new Set(["NODE_ENV"]);

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(full);
    } else if (/\.(ts|tsx|js|mjs)$/.test(entry.name) && !entry.name.endsWith(".test.ts")) {
      const code = fs.readFileSync(full, "utf-8");
      const regex = /process\.env\.([A-Z0-9_]+)/g;
      let m;
      while ((m = regex.exec(code)) !== null) {
        if (!standardBuiltins.has(m[1])) {
          codeVars.add(m[1]);
        }
      }
    }
  }
}

scanDir(srcDir);

// 3. Compare sets
const missingInCode = [...documentedVars].filter((v) => !codeVars.has(v));
const undocumentedInExample = [...codeVars].filter((v) => !documentedVars.has(v));

console.log("\n=== Environment Variables Sync Check ===\n");
console.log(`Documented in .env.example (${documentedVars.size}):`);
console.log([...documentedVars].sort().map((v) => `  - ${v}`).join("\n"));
console.log(`\nReferenced in frontend/src (${codeVars.size}):`);
console.log([...codeVars].sort().map((v) => `  - ${v}`).join("\n"));

let hasError = false;

if (undocumentedInExample.length > 0) {
  console.error(`\n✗ ERROR: Referenced in code but NOT documented in .env.example:`);
  undocumentedInExample.forEach((v) => console.error(`  - ${v}`));
  hasError = true;
}

if (missingInCode.length > 0) {
  console.error(`\n✗ ERROR: Documented in .env.example but NOT referenced in code:`);
  missingInCode.forEach((v) => console.error(`  - ${v}`));
  hasError = true;
}

if (!hasError) {
  console.log("\n✓ All environment variables are 100% synchronized between code and .env.example.\n");
  process.exit(0);
} else {
  process.exit(1);
}
