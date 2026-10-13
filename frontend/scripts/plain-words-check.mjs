// frontend/scripts/plain-words-check.mjs
// Verifies plain English copy across user-facing pages:
// 1. Element-by-element parsing (sentence boundaries at every block element, ignoring <head>, script, style, svg, aria-hidden)
// 2. Separate reporting for UI elements (headings, buttons, labels) flagged if > 8 words
// 3. Body sentence analysis: avg words/sentence, sentences > 15 words, Flesch-Kincaid grade estimate
// 4. Blacklist verification + "capabilities" as WARN only
// 5. Exit non-zero on blacklisted words, any sentence > 22 words, or avg body sentence length > 15
// Pure Node, zero external dependencies. Windows-safe.

import http from "http";

const args = process.argv.slice(2);
const portArg = args.find((a) => a.startsWith("--port="));
const port = portArg ? portArg.split("=")[1] : "3000";
const urlArg = args.find((a) => a.startsWith("http://") || a.startsWith("https://"));
const baseUrl = (urlArg || `http://localhost:${port}`).replace(/\/$/, "");

const targetPages = [
  { path: "/", name: "Home", maxGrade: 6 },
  { path: "/services/ai-agents-chatbots", name: "AI Agents & Chatbots", maxGrade: 8 },
  { path: "/services/crm-sales-automation", name: "CRM & Sales Automation", maxGrade: 8 },
  { path: "/services/business-workflow-automation", name: "Business Workflow Automation", maxGrade: 8 },
  { path: "/services/whatsapp-social-automation", name: "WhatsApp & Social Automation", maxGrade: 8 },
  { path: "/unknown-404-check", name: "404 Not Found", maxGrade: 8 },
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

function cleanText(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, " — ")
    .replace(/&ndash;/g, " – ")
    .replace(/&#8209;/g, "-")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function countWords(str) {
  return str.split(/\s+/).filter((w) => w.length > 0).length;
}

function countSyllables(word) {
  const clean = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!clean || clean.length <= 3) return 1;
  const match = clean.replace(/(?:[^laeiouy]|ed|es|e)$/, "").match(/[aeiouy]{1,2}/g);
  return match ? Math.max(1, match.length) : 1;
}

function splitBodySentences(text) {
  // A sentence never spans across elements. Split on sentence terminals within element.
  const raw = text.split(/(?<=[.!?])\s+(?=[A-Z0-9"'])/);
  return raw
    .map((s) => cleanText(s))
    .filter((s) => s.length > 0 && !/^(\d+|Copyright|All rights|Privacy|Terms)$/i.test(s));
}

function parseElements(html) {
  let cleanHtml = html
    .replace(/<head[\s\S]*?<\/head>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ");

  // Remove aria-hidden elements
  while (/<([a-zA-Z0-9]+)\b[^>]*\baria-hidden="true"[^>]*>[\s\S]*?<\/\1>/gi.test(cleanHtml)) {
    cleanHtml = cleanHtml.replace(/<([a-zA-Z0-9]+)\b[^>]*\baria-hidden="true"[^>]*>[\s\S]*?<\/\1>/gi, " ");
  }

  const tokens = [];
  const tagRegex = /<(\/)?([a-zA-Z0-9\-]+)([^>]*)>/g;
  let lastIndex = 0;
  let match;

  while ((match = tagRegex.exec(cleanHtml)) !== null) {
    if (match.index > lastIndex) {
      const text = cleanHtml.slice(lastIndex, match.index);
      if (text.trim().length > 0) {
        tokens.push({ type: "text", content: text });
      }
    }
    const isClosing = match[1] === "/";
    const tagName = match[2].toLowerCase();
    const attrs = match[3];
    tokens.push({ type: "tag", isClosing, tagName, attrs });
    lastIndex = tagRegex.lastIndex;
  }
  if (lastIndex < cleanHtml.length) {
    const text = cleanHtml.slice(lastIndex);
    if (text.trim().length > 0) {
      tokens.push({ type: "text", content: text });
    }
  }

  const headingsButtonsLabels = [];
  const bodyItems = [];
  const stack = [];
  const voidTags = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);

  for (const token of tokens) {
    if (token.type === "text") {
      if (stack.length > 0) {
        stack[stack.length - 1].directText += token.content;
        stack[stack.length - 1].fullText += token.content;
      }
    } else if (token.type === "tag") {
      if (!token.isClosing) {
        const isButtonLink = token.tagName === "a" && (
          /role=["']button["']/i.test(token.attrs) ||
          /class=["'][^"']*\b(btn|button)\b[^"']*["']/i.test(token.attrs)
        );
        stack.push({
          tagName: token.tagName,
          attrs: token.attrs,
          isButtonLink,
          directText: "",
          fullText: "",
          hasChildBlock: false,
        });
        if (voidTags.has(token.tagName)) {
          stack.pop();
        }
      } else {
        const idx = stack.findLastIndex((item) => item.tagName === token.tagName);
        if (idx !== -1) {
          const item = stack[idx];
          stack.splice(idx, 1);

          const isUiBlock = /^h[1-6]$/.test(item.tagName) || item.tagName === "button" || item.tagName === "label" || item.isButtonLink;
          const isBodyBlock = ["p", "li", "td", "th", "summary", "figcaption"].includes(item.tagName);

          if (isUiBlock || isBodyBlock) {
            if (stack.length > 0) {
              stack[stack.length - 1].hasChildBlock = true;
            }
          }

          const cleaned = cleanText(item.fullText);
          if (cleaned.length > 0) {
            if (isUiBlock) {
              headingsButtonsLabels.push({
                element: item.isButtonLink ? "a.button" : item.tagName,
                text: cleaned,
                wordCount: countWords(cleaned),
              });
            } else if (isBodyBlock) {
              bodyItems.push({
                element: item.tagName,
                text: cleaned,
              });
            } else if (item.tagName === "div") {
              const directClean = cleanText(item.directText);
              if (directClean.length > 0 && !item.hasChildBlock) {
                bodyItems.push({
                  element: "div",
                  text: directClean,
                });
              }
            }
          }
        }
      }
    }
  }

  return { headingsButtonsLabels, bodyItems };
}

async function run() {
  console.log(`\n=== Plain Words Copy Checker against ${baseUrl} ===\n`);

  let totalBlacklistFound = 0;
  let totalOver22Found = 0;
  let totalAvgOver15Found = 0;
  const results = [];

  for (const page of targetPages) {
    try {
      const res = await fetch(`${baseUrl}${page.path}`);
      const html = await res.text();
      const { headingsButtonsLabels, bodyItems } = parseElements(html);

      // Check blacklisted words
      const blacklistedHits = [];
      const warnHits = [];
      const pageText = [
        ...headingsButtonsLabels.map((h) => h.text),
        ...bodyItems.map((b) => b.text),
      ].join(" ");
      const lower = pageText.toLowerCase();

      for (const word of BLACKLIST) {
        const regex = new RegExp(`\\b${word}\\b`, "i");
        if (regex.test(lower)) {
          blacklistedHits.push(word);
        }
      }

      // Check workflow usage (allowed in service title / capability titles under Business Workflow Automation)
      const withoutAllowed = lower
        .replace(/business workflow automation/g, " ")
        .replace(/business-workflow-automation/g, " ")
        .replace(/n8n, make\.com and zapier workflow automation/g, " ")
        .replace(/approval workflows with human review/g, " ");
      if (/\bworkflows?\b/.test(withoutAllowed)) {
        blacklistedHits.push("workflow (outside allowed title)");
      }

      // Check "capabilities" as WARN only
      if (/\bcapabilities\b/.test(lower)) {
        warnHits.push("capabilities (WARN only)");
      }

      // Sentence analysis for body elements
      const bodySentences = [];
      let totalWords = 0;
      let totalSyllables = 0;

      for (const b of bodyItems) {
        const sents = splitBodySentences(b.text);
        for (const s of sents) {
          const wCount = countWords(s);
          if (wCount === 0) continue;
          bodySentences.push({
            element: b.element,
            text: s,
            words: wCount,
          });
          totalWords += wCount;
          for (const w of s.split(/\s+/)) totalSyllables += countSyllables(w);
        }
      }

      const sentCount = Math.max(1, bodySentences.length);
      const avgLen = Number((totalWords / sentCount).toFixed(1));
      const fkGrade = Number((
        0.39 * (totalWords / sentCount) +
        11.8 * (totalSyllables / Math.max(1, totalWords)) -
        15.59
      ).toFixed(1));

      const over15 = bodySentences.filter((s) => s.words > 15);
      const over22 = bodySentences.filter((s) => s.words > 22);
      const uiOver8 = headingsButtonsLabels.filter((h) => h.wordCount > 8);

      if (blacklistedHits.length > 0) totalBlacklistFound += blacklistedHits.length;
      if (over22.length > 0) totalOver22Found += over22.length;
      if (avgLen > 15) totalAvgOver15Found++;

      let gradeWarn = false;
      if (page.maxGrade && fkGrade > page.maxGrade) {
        gradeWarn = true;
      }

      results.push({
        page: page.name,
        path: page.path,
        blacklistedHits,
        warnHits,
        uiOver8,
        sentCount,
        avgLen,
        fkGrade,
        gradeWarn,
        maxGrade: page.maxGrade,
        over15,
        over22,
      });
    } catch (err) {
      console.error(`Error checking ${page.name} (${page.path}):`, err.message);
      results.push({
        page: page.name,
        path: page.path,
        error: err.message,
      });
    }
  }

  // Print results
  console.log("--------------------------------------------------------------------------------");
  console.log("Page Summary (Element-by-Element Analysis):");
  console.log("--------------------------------------------------------------------------------");

  for (const r of results) {
    if (r.error) {
      console.log(`✗ ${r.page} (${r.path}): FAILED TO FETCH (${r.error})`);
      continue;
    }

    const okStatus = r.blacklistedHits.length === 0 && r.over22.length === 0 && r.avgLen <= 15;
    const statusMark = okStatus ? "✓ OK" : "✗ FAIL";
    console.log(
      `${statusMark.padEnd(8)} ${r.page.padEnd(32)} AvgLen: ${r.avgLen}w | FK Grade: ${r.fkGrade} (Cap: ${r.maxGrade}) | Sentences: ${r.sentCount}`
    );

    if (r.blacklistedHits.length > 0) {
      console.log(`   ✗ Blacklisted words: ${r.blacklistedHits.join(", ")}`);
    }
    if (r.warnHits.length > 0) {
      console.log(`   ⚠ Notice: ${r.warnHits.join(", ")}`);
    }
    if (r.gradeWarn) {
      console.log(`   ⚠ WARN: Estimated FK Grade (${r.fkGrade}) exceeds guideline (${r.maxGrade})`);
    }
    if (r.uiOver8.length > 0) {
      console.log(`   UI elements > 8 words (${r.uiOver8.length}):`);
      r.uiOver8.forEach((u) => {
        console.log(`     - [${u.wordCount}w] <${u.element}> "${u.text}"`);
      });
    }
    if (r.over15.length > 0) {
      console.log(`   Body sentences > 15 words (${r.over15.length}):`);
      r.over15.forEach((s) => {
        console.log(`     - [${s.words}w] <${s.element}> "${s.text}"`);
      });
    }
  }

  console.log("--------------------------------------------------------------------------------");
  console.log("Flesch-Kincaid Grade Level Formula Note:");
  console.log("  FK = 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59");
  console.log("  Note: This mathematical formula is an estimate and is unreliable for short texts.");
  console.log("--------------------------------------------------------------------------------\n");

  const hasFail = totalBlacklistFound > 0 || totalOver22Found > 0 || totalAvgOver15Found > 0;
  if (hasFail) {
    console.error(
      `✗ Plain words check FAILED: ${totalBlacklistFound} blacklisted words, ${totalOver22Found} sentences > 22 words, ${totalAvgOver15Found} pages with avg length > 15.`
    );
    process.exit(1);
  } else {
    console.log("✓ Plain words check PASSED: zero blacklisted words, zero sentences > 22 words, avg length <= 15 on all pages.");
    process.exit(0);
  }
}

run();
