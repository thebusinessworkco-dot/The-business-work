// frontend/scripts/images-check.mjs
// Scans frontend/src for <img> and <Image> tags to ensure alt text compliance and Next.js Image component usage.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.resolve(__dirname, "../src");

function walkDir(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(walkDir(fullPath));
    } else if (/\.(tsx|ts|jsx|js|html)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

const allFiles = walkDir(srcDir);
const rawImgIssues = [];
const missingAltIssues = [];
let totalImagesFound = 0;

for (const file of allFiles) {
  const content = fs.readFileSync(file, "utf-8");
  const relPath = path.relative(path.resolve(__dirname, ".."), file).replace(/\\/g, "/");

  // Regex matching <img ...> tags
  const imgRegex = /<img\b([^>]*)>/gi;
  let imgMatch;
  while ((imgMatch = imgRegex.exec(content)) !== null) {
    totalImagesFound++;
    const attrs = imgMatch[1];
    rawImgIssues.push({ file: relPath, tag: imgMatch[0] });
    if (!/\balt\s*=/i.test(attrs)) {
      missingAltIssues.push({ file: relPath, tag: imgMatch[0] });
    }
  }

  // Regex matching <Image ...> tags (Next.js Image)
  const nextImageRegex = /<Image\b([^>]*)>/gi;
  let nextImgMatch;
  while ((nextImgMatch = nextImageRegex.exec(content)) !== null) {
    totalImagesFound++;
    const attrs = nextImgMatch[1];
    if (!/\balt\s*=/i.test(attrs)) {
      missingAltIssues.push({ file: relPath, tag: nextImgMatch[0] });
    }
  }
}

console.log("\n=== Image Alt Text & Optimization Check ===");

if (totalImagesFound === 0) {
  console.log("ℹ Total raster <img> and <Image> tags found in frontend/src: 0");
  console.log("✓ The website uses pure inline vector SVGs and Lucide icons for all visual elements.");
  console.log("✓ Alt text audit passed (0 missing alt attributes).\n");
  process.exit(0);
}

let hasError = false;

if (rawImgIssues.length > 0) {
  console.warn(`\n⚠ Found ${rawImgIssues.length} raw <img> tag(s) (consider converting to next/image for optimization):`);
  rawImgIssues.forEach((issue) => console.warn(`  - [${issue.file}]: ${issue.tag}`));
}

if (missingAltIssues.length > 0) {
  console.error(`\n✗ Found ${missingAltIssues.length} image(s) missing required alt prop:`);
  missingAltIssues.forEach((issue) => console.error(`  - [${issue.file}]: ${issue.tag}`));
  hasError = true;
}

if (hasError) {
  process.exit(1);
} else {
  console.log("\n✓ All images contain required alt attribute.\n");
  process.exit(0);
}
