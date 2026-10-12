// frontend/scripts/links-check.mjs
// Pure Node broken-link and anchor checker.
// Crawls internal pages, checks anchors, validates mailto/tel/whatsapp schemes, and optionally verifies external URLs.

const args = process.argv.slice(2);
const checkExternal = args.includes("--external");
const urlArg = args.find((a) => a.startsWith("http://") || a.startsWith("https://"));
const baseUrlStr = (urlArg || "http://localhost:3000").replace(/\/$/, "");

const baseUrl = new URL(baseUrlStr);
const baseHost = baseUrl.host;

const visitedPages = new Map(); // path -> { status, html, ids: Set<string> }
const checkedLinks = []; // { source, href, type, status, note, ok }
const externalChecked = new Map(); // url -> { status, note, ok }

function extractIds(html) {
  const ids = new Set();
  const idRegex = /\sid=["']([^"']+)["']/gi;
  let match;
  while ((match = idRegex.exec(html)) !== null) {
    ids.add(match[1]);
  }
  const nameRegex = /<a[^>]*\sname=["']([^"']+)["']/gi;
  while ((match = nameRegex.exec(html)) !== null) {
    ids.add(match[1]);
  }
  return ids;
}

function extractHrefs(html) {
  const hrefs = [];
  const regex = /<a\s+(?:[^>]*?\s+)?href=["']([^"']*)["']/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const val = match[1].trim();
    if (val && !val.startsWith("javascript:")) {
      hrefs.push(val);
    }
  }
  return hrefs;
}

async function fetchPage(targetUrl) {
  try {
    const res = await fetch(targetUrl, {
      signal: AbortSignal.timeout(10000),
      headers: { "User-Agent": "TBW-Link-Checker/1.0" },
    });
    const status = res.status;
    const html = res.ok ? await res.text() : "";
    return { ok: res.ok, status, html, ids: extractIds(html) };
  } catch (err) {
    return { ok: false, status: 0, html: "", ids: new Set(), error: err.message };
  }
}

async function checkExternalUrl(url) {
  if (externalChecked.has(url)) return externalChecked.get(url);

  let status = 0;
  let note = "OK";
  let ok = false;

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      let res = await fetch(url, {
        method: "HEAD",
        signal: AbortSignal.timeout(8000),
        headers: { "User-Agent": "TBW-Link-Checker/1.0" },
      });

      // Some servers reject HEAD requests (405, 403, 400) - retry with GET
      if (!res.ok && res.status !== 404) {
        res = await fetch(url, {
          method: "GET",
          signal: AbortSignal.timeout(8000),
          headers: { "User-Agent": "TBW-Link-Checker/1.0" },
        });
      }

      status = res.status;
      ok = res.ok || (status >= 200 && status < 400);
      note = ok ? "HTTP " + status : "HTTP " + status;
      break;
    } catch (err) {
      if (attempt === 2) {
        status = 0;
        ok = true; // Never fail the run on external timeouts, only warn
        note = `WARN: timeout/error (${err.message})`;
      } else {
        await new Promise((r) => setTimeout(r, 1000));
      }
    }
  }

  const result = { status, note, ok };
  externalChecked.set(url, result);
  return result;
}

async function main() {
  console.log(`\n=== Broken Link & Anchor Checker ===`);
  console.log(`Target: ${baseUrlStr}`);
  console.log(`External check: ${checkExternal ? "ENABLED" : "DISABLED (use --external to enable)"}\n`);

  // 1. Initial seeds
  const seedPaths = new Set(["/", "/privacy", "/terms"]);

  // Read /sitemap.xml
  try {
    const sitemapRes = await fetch(`${baseUrlStr}/sitemap.xml`, { signal: AbortSignal.timeout(6000) });
    if (sitemapRes.ok) {
      const xml = await sitemapRes.text();
      const locRegex = /<loc>([^<]+)<\/loc>/g;
      let m;
      while ((m = locRegex.exec(xml)) !== null) {
        try {
          const locUrl = new URL(m[1]);
          if (locUrl.host === baseHost) {
            seedPaths.add(locUrl.pathname);
          }
        } catch {}
      }
      console.log(`✓ Read /sitemap.xml (${seedPaths.size} routes seeded)`);
    } else {
      console.log(`ℹ /sitemap.xml returned ${sitemapRes.status}`);
    }
  } catch (err) {
    console.log(`ℹ Could not fetch /sitemap.xml: ${err.message}`);
  }

  // 2. Crawl queue: { path, depth }
  const queue = Array.from(seedPaths).map((p) => ({ path: p, depth: 0 }));
  const queuedPaths = new Set(seedPaths);

  while (queue.length > 0 && visitedPages.size < 200) {
    const current = queue.shift();
    if (visitedPages.has(current.path)) continue;

    const fullUrl = `${baseUrlStr}${current.path}`;
    const pageData = await fetchPage(fullUrl);
    visitedPages.set(current.path, pageData);

    if (!pageData.ok) {
      continue;
    }

    if (current.depth < 3) {
      const hrefs = extractHrefs(pageData.html);
      for (const rawHref of hrefs) {
        try {
          const resolved = new URL(rawHref, fullUrl);
          if (resolved.host === baseHost) {
            const nextPath = resolved.pathname;
            if (!queuedPaths.has(nextPath) && queuedPaths.size < 200) {
              queuedPaths.add(nextPath);
              queue.push({ path: nextPath, depth: current.depth + 1 });
            }
          }
        } catch {}
      }
    }
  }

  console.log(`✓ Crawled ${visitedPages.size} internal page(s)\n`);

  // 3. Inspect every link on every crawled page
  let brokenInternalCount = 0;
  let missingAnchorCount = 0;

  for (const [pagePath, pageData] of visitedPages.entries()) {
    if (!pageData.ok) {
      checkedLinks.push({
        source: pagePath,
        href: pagePath,
        type: "internal",
        status: pageData.status,
        note: `HTTP ${pageData.status}`,
        ok: false,
      });
      brokenInternalCount++;
      continue;
    }

    const hrefs = extractHrefs(pageData.html);
    const currentPageUrl = `${baseUrlStr}${pagePath}`;

    for (const rawHref of hrefs) {
      // Check mailto:
      if (rawHref.startsWith("mailto:")) {
        const email = rawHref.replace(/^mailto:/, "").split("?")[0].trim();
        const isPlaceholder = email.includes("example.com") || /0000/.test(email);
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        checkedLinks.push({
          source: pagePath,
          href: rawHref,
          type: "mailto",
          status: valid ? (isPlaceholder ? "PLACEHOLDER" : "VALID") : "INVALID",
          note: isPlaceholder ? "PLACEHOLDER email detected" : valid ? "Valid email syntax" : "Malformed mailto",
          ok: valid, // Placeholders are permitted in draft mode, invalid syntax is not
        });
        continue;
      }

      // Check tel:
      if (rawHref.startsWith("tel:")) {
        const phone = rawHref.replace(/^tel:/, "").trim();
        const isPlaceholder = /00000/.test(phone);
        const digits = phone.replace(/\D/g, "");
        const valid = digits.length >= 7 && digits.length <= 15;
        checkedLinks.push({
          source: pagePath,
          href: rawHref,
          type: "tel",
          status: valid ? (isPlaceholder ? "PLACEHOLDER" : "VALID") : "INVALID",
          note: isPlaceholder ? "PLACEHOLDER phone detected" : valid ? "Valid tel format" : "Malformed tel",
          ok: valid,
        });
        continue;
      }

      // Check whatsapp:
      if (rawHref.includes("wa.me") || rawHref.includes("api.whatsapp.com")) {
        const isPlaceholder = /00000/.test(rawHref) || /910000000000/.test(rawHref);
        checkedLinks.push({
          source: pagePath,
          href: rawHref,
          type: "whatsapp",
          status: isPlaceholder ? "PLACEHOLDER" : "VALID",
          note: isPlaceholder ? "PLACEHOLDER WhatsApp link" : "Valid WhatsApp URL",
          ok: true,
        });
        continue;
      }

      // Internal vs External
      try {
        const resolved = new URL(rawHref, currentPageUrl);

        if (resolved.host === baseHost) {
          // Internal link
          const destPath = resolved.pathname;
          const hash = resolved.hash ? resolved.hash.replace(/^#/, "") : "";

          // Fetch if not visited yet
          let destData = visitedPages.get(destPath);
          if (!destData) {
            destData = await fetchPage(`${baseUrlStr}${destPath}`);
            visitedPages.set(destPath, destData);
          }

          if (!destData.ok) {
            checkedLinks.push({
              source: pagePath,
              href: rawHref,
              type: "internal",
              status: destData.status,
              note: `Page returned HTTP ${destData.status}`,
              ok: false,
            });
            brokenInternalCount++;
          } else if (hash) {
            // Check anchor target
            const idExists = destData.ids.has(hash);
            checkedLinks.push({
              source: pagePath,
              href: rawHref,
              type: "anchor",
              status: idExists ? "200 (ID found)" : "MISSING ID",
              note: idExists ? `Target #${hash} verified` : `Target #${hash} not found in destination DOM`,
              ok: idExists,
            });
            if (!idExists) missingAnchorCount++;
          } else {
            checkedLinks.push({
              source: pagePath,
              href: rawHref,
              type: "internal",
              status: destData.status,
              note: `HTTP ${destData.status} OK`,
              ok: true,
            });
          }
        } else if (resolved.protocol === "http:" || resolved.protocol === "https:") {
          // External link
          if (checkExternal) {
            const extResult = await checkExternalUrl(resolved.href);
            checkedLinks.push({
              source: pagePath,
              href: rawHref,
              type: "external",
              status: extResult.status,
              note: extResult.note,
              ok: extResult.ok,
            });
          } else {
            checkedLinks.push({
              source: pagePath,
              href: rawHref,
              type: "external",
              status: "SKIPPED",
              note: "External check disabled (pass --external to check)",
              ok: true,
            });
          }
        }
      } catch (err) {
        checkedLinks.push({
          source: pagePath,
          href: rawHref,
          type: "malformed",
          status: "ERR",
          note: `Invalid URL: ${err.message}`,
          ok: false,
        });
        brokenInternalCount++;
      }
    }
  }

  // 4. Output Summary Table
  console.log(`Checked Links Breakdown:`);
  console.log(`| Type | Source | Target | Status | Note |`);
  console.log(`| :--- | :--- | :--- | :---: | :--- |`);

  // Deduplicate for display
  const seenTable = new Set();
  for (const c of checkedLinks) {
    const key = `${c.type}:${c.source}:${c.href}`;
    if (!seenTable.has(key)) {
      seenTable.add(key);
      const mark = c.ok ? "✓" : "✗";
      console.log(`| ${c.type} | ${c.source} | ${c.href} | ${mark} ${c.status} | ${c.note} |`);
    }
  }

  console.log(`\nLink Check Summary:`);
  console.log(`- Total unique link occurrences checked: ${checkedLinks.length}`);
  console.log(`- Broken internal links: ${brokenInternalCount}`);
  console.log(`- Missing anchor IDs: ${missingAnchorCount}`);

  if (brokenInternalCount > 0 || missingAnchorCount > 0) {
    console.error(`\n✗ Broken link check FAILED: resolve broken internal routes or missing anchors.`);
    process.exit(1);
  } else {
    console.log(`\n✓ All internal links and anchor references PASSED.`);
    process.exit(0);
  }
}

main().catch((err) => {
  console.error("Fatal error running links-check:", err);
  process.exit(1);
});
