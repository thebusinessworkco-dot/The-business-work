// frontend/scripts/legal-check.mjs
// Scans legal content files for [[TO CONFIRM: ...]] placeholders.
// Exits non-zero if any placeholders remain.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendDir = path.resolve(__dirname, "..");

const files = [
  "src/content/legal/privacy.ts",
  "src/content/legal/terms.ts",
];

const placeholderRegex = /\[\[TO CONFIRM:\s*([^\]]+)\]\]/g;
const findings = [];

for (const relPath of files) {
  const fullPath = path.resolve(frontendDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    continue;
  }
  const content = fs.readFileSync(fullPath, "utf-8");
  const lines = content.split("\n");

  lines.forEach((line, index) => {
    let match;
    while ((match = placeholderRegex.exec(line)) !== null) {
      findings.push({
        file: relPath,
        line: index + 1,
        placeholder: match[0],
        description: match[1].trim(),
      });
    }
  });
}

console.log(`\n=== Legal Placeholder Audit ===\n`);

if (findings.length === 0) {
  console.log("✓ No unresolved [[TO CONFIRM]] placeholders found! Legal documents are ready for final indexing.");
  process.exit(0);
} else {
  console.log(`Found ${findings.length} unresolved placeholder(s) across legal documents:\n`);
  findings.forEach((f, i) => {
    console.log(`${i + 1}. [frontend/${f.file}:${f.line}]`);
    console.log(`   ${f.placeholder}\n`);
  });
  console.log(`Note: These placeholders keep /privacy and /terms in 'DRAFT' status (noindex, sitemap excluded).`);
  console.log(`A qualified Indian legal counsel must review and confirm these facts before launch.\n`);
  process.exit(1);
}
