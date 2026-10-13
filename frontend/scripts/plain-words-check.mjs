// frontend/scripts/plain-words-check.mjs
// Verifies plain English copy across user-facing pages:
// 1. Checks for blacklisted jargon/cliche words
// 2. Flags sentences longer than 15 words
// 3. Computes average sentence length and estimated reading grade
// Pure Node, zero external dependencies.

import http from "http";

const args = process.argv.slice(2);
const portArg = args.find((a) => a.startsWith("--port="));
const port = portArg ? portArg.split("=")[1] : "3000";
const urlArg = args.find((a) => a.startsWith("http://") || a.startsWith("https://"));
const baseUrl = (urlArg || `http://localhost:${port}`).replace(/\/$/, "");

const targetPages = [
  { path: "/", name: "Home" },
  { path: "/services/ai-agents-chatbots", name: "AI Agents & Chatbots" },
  { path: "/services/crm-sales-automation", name: "CRM & Sales Automation" },
  { path: "/services/business-workflow-automation", name: "Business Workflow Automation" },
  { path: "/services/whatsapp-social-automation", name: "WhatsApp & Social Automation" },
  { path: "/unknown-404-check", name: "404 Not Found" },
];

const BLACKLIST = [
  "leverage",
  "utilise",
  "utilize",
  "streamline",
  "seamless",
  "seamlessly",
  "optimise",
  "optimize",
  "comprehensive",
  "robust",
  "scalable",
  "orchestrate",
  "orchestration",
  "guardrails",
  "escalate",
  "stakeholder",
  "bottleneck",
  "repetitive",
  "high accuracy",
  "around the clock",
  "day and night",
];

function fetchHtml(pagePath) {
  return new Promise((resolve, reject) => {
    const url = `${baseUrl}${pagePath}`;
    fetch(url)
      .then(async (res) => {
        const text = await res.text();
        resolve(text);
      })
      .catch((err) => reject(err));
  });
}

function stripHtml(html) {
  // Remove script and style elements
  let text = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ");
  text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ");
  text = text.replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, " ");
  // Remove HTML comments
  text = text.replace(/<!--[\s\S]*?-->/g, " ");
  // Remove HTML tags
  text = text.replace(/<[^>]+>/g, " ");
  // Decode basic HTML entities
  text = text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, " — ")
    .replace(/&ndash;/g, " – ")
    .replace(/&#8209;/g, "-")
    .replace(/&nbsp;/g, " ");

  // Normalise spaces
  return text.replace(/\s+/g, " ").trim();
}

function countSyllables(word) {
  const clean = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!clean || clean.length <= 3) return 1;
  const match = clean.replace(/(?:[^laeiouy]|ed|es|e)$/, "").match(/[aeiouy]{1,2}/g);
  return match ? Math.max(1, match.length) : 1;
}

function splitSentences(text) {
  // Split on sentence terminals
  const raw = text.split(/(?<=[.!?])\s+(?=[A-Z0-9"'])/);
  return raw
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !/^(\d+|Copyright|All rights|Privacy|Terms)$/i.test(s));
}

async function run() {
  console.log(`\n=== Plain Words Copy Checker against ${baseUrl} ===\n`);

  let totalBlacklistFound = 0;
  const results = [];

  for (const page of targetPages) {
    try {
      const html = await fetchHtml(page.path);
      const text = stripHtml(html);

      // Check blacklisted words
      const blacklistedHits = [];
      const lower = text.toLowerCase();

      for (const word of BLACKLIST) {
        const regex = new RegExp(`\\b${word}\\b`, "i");
        if (regex.test(lower)) {
          blacklistedHits.push(word);
        }
      }

      // Check workflow usage (allowed in service title / category name)
      // Strip allowed phrases first before checking workflow
      const withoutAllowed = lower
        .replace(/business workflow automation/g, " ")
        .replace(/business-workflow-automation/g, " ");
      if (/\bworkflow\b/.test(withoutAllowed)) {
        blacklistedHits.push("workflow (outside service title)");
      }

      // Sentence analysis
      const sentences = splitSentences(text);
      const longSentences = [];
      let totalWords = 0;
      let totalSyllables = 0;

      for (const sent of sentences) {
        const words = sent.split(/\s+/).filter((w) => w.length > 0);
        const wCount = words.length;
        if (wCount === 0) continue;
        totalWords += wCount;
        for (const w of words) totalSyllables += countSyllables(w);

        // Disregard non-prose lines (like breadcrumb navigation or list headers)
        if (wCount > 15 && !sent.includes("·") && !sent.includes("//")) {
          longSentences.push({ text: sent, count: wCount });
        }
      }

      const sentCount = Math.max(1, sentences.length);
      const avgSentenceLength = (totalWords / sentCount).toFixed(1);

      // Flesch-Kincaid Grade Level formula:
      // 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59
      const fkGrade = (
        0.39 * (totalWords / sentCount) +
        11.8 * (totalSyllables / Math.max(1, totalWords)) -
        15.59
      ).toFixed(1);

      results.push({
        page: page.name,
        path: page.path,
        blacklistedHits,
        sentenceCount: sentCount,
        avgSentenceLength,
        fkGrade,
        longSentences,
      });

      if (blacklistedHits.length > 0) {
        totalBlacklistFound += blacklistedHits.length;
      }
    } catch (err) {
      console.error(`Error checking ${page.name} (${page.path}):`, err.message);
      results.push({
        page: page.name,
        path: page.path,
        error: err.message,
      });
    }
  }

  // Print results table
  console.log("--------------------------------------------------------------------------------");
  console.log("Page Summary:");
  console.log("--------------------------------------------------------------------------------");
  for (const r of results) {
    if (r.error) {
      console.log(`✗ ${r.page} (${r.path}): FAILED TO FETCH (${r.error})`);
      continue;
    }
    const status = r.blacklistedHits.length === 0 ? "✓ OK" : `✗ ${r.blacklistedHits.length} BLACKLISTED`;
    console.log(
      `${status.padEnd(20)} ${r.page.padEnd(32)} AvgLen: ${r.avgSentenceLength}w | FK Grade: ${r.fkGrade}`
    );
    if (r.blacklistedHits.length > 0) {
      console.log(`   Blacklisted words found: ${r.blacklistedHits.join(", ")}`);
    }
    if (r.longSentences.length > 0) {
      console.log(`   Sentences > 15 words: ${r.longSentences.length}`);
      r.longSentences.slice(0, 3).forEach((ls) => {
        console.log(`     - [${ls.count}w] "${ls.text.slice(0, 80)}..."`);
      });
    }
  }
  console.log("--------------------------------------------------------------------------------");
  console.log("Formula Note: Reading grade estimated using Flesch-Kincaid Grade Level formula:");
  console.log("  FK = 0.39 * (words/sentences) + 11.8 * (syllables/words) - 15.59");
  console.log("--------------------------------------------------------------------------------\n");

  if (totalBlacklistFound > 0) {
    console.error(`✗ Plain words check FAILED: ${totalBlacklistFound} blacklisted occurrence(s) found.`);
    process.exit(1);
  } else {
    console.log("✓ Plain words check PASSED: zero blacklisted words found.");
    process.exit(0);
  }
}

run();
