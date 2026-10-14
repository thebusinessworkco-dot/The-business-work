// frontend/scripts/smoke.mjs
// Comprehensive production smoke test for The Business Work.
// Verifies all core routes, media endpoints, security headers, JSON-LD, sitemap, 404, and contact API validation.

const args = process.argv.slice(2);
let baseUrl = "http://localhost:3000";
let expectNoindex = false;
let expectIndex = false;
let liveLeadTest = false;

for (const arg of args) {
  if (arg === "--expect-noindex") expectNoindex = true;
  else if (arg === "--expect-index") expectIndex = true;
  else if (arg === "--live-lead-test") liveLeadTest = true;
  else if (arg.startsWith("http://") || arg.startsWith("https://")) baseUrl = arg.replace(/\/+$/, "");
}

const baseHost = new URL(baseUrl).host;

console.log(`\n=== Running Smoke Test against ${baseUrl} ===\n`);

async function run() {
  const checks = [];

  function record(endpoint, status, expected, ok, detail) {
    checks.push({ endpoint, status, expected, ok, detail });
  }

  // 1. Home Page (/): 200, security headers, robots, JSON-LD parse
  try {
    const res = await fetch(`${baseUrl}/`);
    const text = await res.text();
    const hasNoindex = text.includes('content="noindex');

    let robotsOk = true;
    let robotsMsg = "";
    if (expectNoindex && !hasNoindex) {
      robotsOk = false;
      robotsMsg = " (FAILED: expected noindex)";
    } else if (expectIndex && hasNoindex) {
      robotsOk = false;
      robotsMsg = " (FAILED: expected index)";
    } else if (hasNoindex) {
      robotsMsg = " (noindex verified)";
    }

    // Security headers
    const secHeaders = [
      "x-content-type-options",
      "x-frame-options",
      "referrer-policy",
    ];
    const missingHeaders = secHeaders.filter((h) => !res.headers.get(h));

    // JSON-LD validation on home page
    const jsonLdRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    let jsonLdValid = true;
    let jsonLdNoPlaceholders = true;
    let match;
    let jsonLdCount = 0;

    while ((match = jsonLdRegex.exec(text)) !== null) {
      jsonLdCount++;
      try {
        const parsed = JSON.parse(match[1]);
        const jsonStr = JSON.stringify(parsed).toLowerCase();
        if (jsonStr.includes("example.com") || jsonStr.includes("00000 00000") || jsonStr.includes("[[to confirm")) {
          jsonLdNoPlaceholders = false;
        }
      } catch {
        jsonLdValid = false;
      }
    }

    const homeOk = res.status === 200 && robotsOk && missingHeaders.length === 0 && jsonLdValid && jsonLdNoPlaceholders;
    const detail = `status=${res.status}${robotsMsg}, secHeaders=${missingHeaders.length === 0 ? "OK" : "Missing " + missingHeaders.join(",")}, jsonLd=${jsonLdCount} block(s) valid=${jsonLdValid} noPlaceholders=${jsonLdNoPlaceholders}`;

    record("/", res.status, 200, homeOk, detail);
  } catch (err) {
    record("/", "ERR", 200, false, err.message);
  }

  function inspectHtml(html) {
    const titleMatch = /<title[^>]*>([^<]+)<\/title>/i.exec(html);
    const title = titleMatch ? titleMatch[1].trim() : null;

    const h1Match = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html);
    const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() : null;

    const canonMatch =
      /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i.exec(html) ||
      /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i.exec(html);
    const canonical = canonMatch ? canonMatch[1] : null;

    return { title, h1, canonical };
  }

  // 2. Legal pages (/privacy, /terms)
  for (const legalPath of ["/privacy", "/terms"]) {
    try {
      const res = await fetch(`${baseUrl}${legalPath}`);
      const text = await res.text();
      const { title, h1, canonical } = inspectHtml(text);
      const ok = res.status === 200 && !!title && !!h1 && !!canonical;
      record(legalPath, res.status, 200, ok, `status=${res.status}, title="${title}", h1="${h1}", canonical="${canonical}"`);
    } catch (err) {
      record(legalPath, "ERR", 200, false, err.message);
    }
  }

  // 3. All 4 Canonical Service pages
  const serviceSlugs = [
    "ai-agents-chatbots",
    "crm-sales-automation",
    "business-workflow-automation",
    "whatsapp-social-automation",
  ];

  for (const slug of serviceSlugs) {
    const sPath = `/services/${slug}`;
    try {
      const res = await fetch(`${baseUrl}${sPath}`);
      const text = await res.text();
      const { title, h1, canonical } = inspectHtml(text);
      const ok = res.status === 200 && !!title && !!h1 && !!canonical;
      record(sPath, res.status, 200, ok, `status=${res.status}, title="${title}", h1="${h1}", canonical="${canonical}"`);
    } catch (err) {
      record(sPath, "ERR", 200, false, err.message);
    }
  }

  // 3b. Solution pages
  const solutionSlugs = [
    "whatsapp-appointment-booking-clinics",
    "n8n-workflow-automation-guide",
  ];

  for (const slug of solutionSlugs) {
    const solPath = `/solutions/${slug}`;
    try {
      const res = await fetch(`${baseUrl}${solPath}`);
      const text = await res.text();
      const { title, h1, canonical } = inspectHtml(text);
      const ok = res.status === 200 && !!title && !!h1 && !!canonical;
      record(solPath, res.status, 200, ok, `status=${res.status}, title="${title}", h1="${h1}", canonical="${canonical}"`);
    } catch (err) {
      record(solPath, "ERR", 200, false, err.message);
    }
  }

  // 4. Media & Icons: /opengraph-image, /icon
  try {
    const res = await fetch(`${baseUrl}/opengraph-image`);
    const cType = res.headers.get("content-type") || "";
    const isImage = cType.includes("image");
    record("/opengraph-image", res.status, 200, res.status === 200 && isImage, `status=${res.status}, content-type=${cType}`);
  } catch (err) {
    record("/opengraph-image", "ERR", 200, false, err.message);
  }

  try {
    const res = await fetch(`${baseUrl}/icon`);
    const cType = res.headers.get("content-type") || "";
    record("/icon", res.status, 200, res.status === 200, `status=${res.status}, content-type=${cType}`);
  } catch (err) {
    record("/icon", "ERR", 200, false, err.message);
  }

  // 5. Invalid & Obsolete route 404 checks
  const invalidPaths = [
    "/services/ai-lead-generation",
    "/services/ai-customer-support",
    "/services/unknown-nonexistent-service",
    "/solutions/unknown-nonexistent-solution",
    "/unknown-nonexistent-smoke-test-path",
  ];

  for (const invPath of invalidPaths) {
    try {
      const res = await fetch(`${baseUrl}${invPath}`);
      record(invPath, res.status, 404, res.status === 404, `status=${res.status} (expected 404 not found)`);
    } catch (err) {
      record(invPath, "ERR", 404, false, err.message);
    }
  }

  // 6. Robots.txt
  try {
    const res = await fetch(`${baseUrl}/robots.txt`);
    const text = await res.text();
    let robotsTxtOk = res.status === 200;
    let rDetail = `status=${res.status}`;
    if (expectNoindex && !text.includes("Disallow: /")) {
      robotsTxtOk = false;
      rDetail += " (FAILED: expected Disallow: /)";
    } else if (expectIndex && text.includes("Disallow: /")) {
      robotsTxtOk = false;
      rDetail += " (FAILED: expected Allow indexing)";
    }
    record("/robots.txt", res.status, 200, robotsTxtOk, `${rDetail}, length=${text.length}b`);
  } catch (err) {
    record("/robots.txt", "ERR", 200, false, err.message);
  }

  // 7. Sitemap.xml & URL host check
  try {
    const res = await fetch(`${baseUrl}/sitemap.xml`);
    const xml = await res.text();
    const locRegex = /<loc>([^<]+)<\/loc>/g;
    const sitemapUrls = [];
    let m;
    while ((m = locRegex.exec(xml)) !== null) {
      sitemapUrls.push(m[1]);
    }

    let allSitemapUrls200 = true;
    for (const u of sitemapUrls) {
      try {
        const target = new URL(new URL(u).pathname, baseUrl).href;
        const uRes = await fetch(target);
        if (uRes.status !== 200) allSitemapUrls200 = false;
      } catch {
        allSitemapUrls200 = false;
      }
    }

    const sitemapOk = res.status === 200 && sitemapUrls.length > 0 && allSitemapUrls200;
    record("/sitemap.xml", res.status, 200, sitemapOk, `status=${res.status}, ${sitemapUrls.length} URLs crawled all 200 OK`);
  } catch (err) {
    record("/sitemap.xml", "ERR", 200, false, err.message);
  }

  // 8. Contact API validation: invalid body -> 400
  try {
    const res = await fetch(`${baseUrl}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: baseUrl },
      body: JSON.stringify({ startedAt: Date.now() - 5000 }),
    });
    record("/api/contact (invalid body)", res.status, 400, res.status === 400, `status=${res.status} (expected validation error 400)`);
  } catch (err) {
    record("/api/contact (invalid body)", "ERR", 400, false, err.message);
  }

  // 9. Contact API security: wrong Origin -> 403
  try {
    const res = await fetch(`${baseUrl}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: "https://malicious-attacker.com" },
      body: JSON.stringify({ startedAt: Date.now() - 5000, name: "Attacker" }),
    });
    record("/api/contact (wrong Origin)", res.status, 403, res.status === 403, `status=${res.status} (expected forbidden 403)`);
  } catch (err) {
    record("/api/contact (wrong Origin)", "ERR", 403, false, err.message);
  }

  // 10. Live lead test (ONLY if --live-lead-test is passed)
  if (liveLeadTest) {
    try {
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Origin: baseUrl },
        body: JSON.stringify({
          startedAt: Date.now() - 5000,
          name: "Smoke Test Lead",
          email: "smoketest@thebusinesswork.in",
          phone: "+91 99999 88888",
          problem: "Automated smoke test verification lead",
          consent: true,
          page: "/smoke-test",
          cta: "smoke-test",
        }),
      });
      record("/api/contact (live lead test)", res.status, 200, res.status === 200, `status=${res.status}`);
    } catch (err) {
      record("/api/contact (live lead test)", "ERR", 200, false, err.message);
    }
  }

  // Print Summary Table
  console.log("| Endpoint | Status | Expected | Result | Details |");
  console.log("| :--- | :---: | :---: | :---: | :--- |");
  let allPassed = true;

  for (const c of checks) {
    if (!c.ok) allPassed = false;
    const resultStr = c.ok ? "PASS" : "FAIL";
    console.log(`| ${c.endpoint} | ${c.status} | ${c.expected} | ${resultStr} | ${c.detail} |`);
  }

  console.log("");
  if (allPassed) {
    console.log("✓ Smoke test passed: all endpoints verified successfully.\n");
    process.exit(0);
  } else {
    console.error("✗ Smoke test failed: one or more checks did not match expectations.\n");
    process.exit(1);
  }
}

run();
