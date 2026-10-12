// frontend/scripts/smoke.mjs
// Quick production smoke test verifying key HTTP endpoints and index status.

const args = process.argv.slice(2);
let baseUrl = "http://localhost:3000";
let expectNoindex = false;
let expectIndex = false;
let liveChatTest = false;

for (const arg of args) {
  if (arg === "--expect-noindex") expectNoindex = true;
  else if (arg === "--expect-index") expectIndex = true;
  else if (arg === "--live-chat-test") liveChatTest = true;
  else if (arg.startsWith("http://") || arg.startsWith("https://")) baseUrl = arg.replace(/\/+$/, "");
}

console.log(`\n=== Running Smoke Test against ${baseUrl} ===\n`);

async function run() {
  const checks = [];

  // 1. Home Page
  try {
    const res = await fetch(`${baseUrl}/`);
    const text = await res.text();
    const hasNoindex = text.includes('content="noindex');
    let indexCheckPassed = true;
    let detail = `status=${res.status}`;

    if (expectNoindex && !hasNoindex) {
      indexCheckPassed = false;
      detail += " (FAILED: expected noindex, found index)";
    } else if (expectIndex && hasNoindex) {
      indexCheckPassed = false;
      detail += " (FAILED: expected index, found noindex)";
    } else if (expectNoindex && hasNoindex) {
      detail += " (verified noindex)";
    }

    checks.push({
      endpoint: "/",
      status: res.status,
      expected: 200,
      ok: res.status === 200 && indexCheckPassed,
      detail,
    });
  } catch (err) {
    checks.push({ endpoint: "/", status: "ERR", expected: 200, ok: false, detail: err.message });
  }

  // 2. Service Detail Page
  try {
    const res = await fetch(`${baseUrl}/services/ai-agents-chatbots`);
    checks.push({
      endpoint: "/services/ai-agents-chatbots",
      status: res.status,
      expected: 200,
      ok: res.status === 200,
      detail: `status=${res.status}`,
    });
  } catch (err) {
    checks.push({ endpoint: "/services/ai-agents-chatbots", status: "ERR", expected: 200, ok: false, detail: err.message });
  }

  // 3. Robots.txt
  try {
    const res = await fetch(`${baseUrl}/robots.txt`);
    const text = await res.text();
    checks.push({
      endpoint: "/robots.txt",
      status: res.status,
      expected: 200,
      ok: res.status === 200,
      detail: `status=${res.status}, length=${text.length}b`,
    });
  } catch (err) {
    checks.push({ endpoint: "/robots.txt", status: "ERR", expected: 200, ok: false, detail: err.message });
  }

  // 4. Sitemap.xml
  try {
    const res = await fetch(`${baseUrl}/sitemap.xml`);
    const text = await res.text();
    checks.push({
      endpoint: "/sitemap.xml",
      status: res.status,
      expected: 200,
      ok: res.status === 200,
      detail: `status=${res.status}, length=${text.length}b`,
    });
  } catch (err) {
    checks.push({ endpoint: "/sitemap.xml", status: "ERR", expected: 200, ok: false, detail: err.message });
  }

  // 5. Contact API with invalid body
  try {
    const res = await fetch(`${baseUrl}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ startedAt: Date.now() - 5000 }),
    });
    checks.push({
      endpoint: "/api/contact (invalid body)",
      status: res.status,
      expected: 400,
      ok: res.status === 400,
      detail: `status=${res.status} (expected validation error 400)`,
    });
  } catch (err) {
    checks.push({ endpoint: "/api/contact (invalid body)", status: "ERR", expected: 400, ok: false, detail: err.message });
  }

  // 6. Chat API - Wrong Origin (403)
  try {
    const res = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://unauthorized-cross-origin.com",
      },
      body: JSON.stringify({ messages: [{ role: "user", content: "Hi" }] }),
    });
    // In dev mode localhost origins are allowed, but external domains get 403
    const isDev = baseUrl.includes("localhost") || baseUrl.includes("127.0.0.1");
    const expected = 403;
    checks.push({
      endpoint: "/api/chat (wrong origin)",
      status: res.status,
      expected,
      ok: res.status === expected,
      detail: `status=${res.status} (expected forbidden 403)`,
    });
  } catch (err) {
    checks.push({ endpoint: "/api/chat (wrong origin)", status: "ERR", expected: 403, ok: false, detail: err.message });
  }

  // 7. Chat API - Wrong Content-Type (415)
  try {
    const res = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: "Hello",
    });
    checks.push({
      endpoint: "/api/chat (text/plain)",
      status: res.status,
      expected: 415,
      ok: res.status === 415,
      detail: `status=${res.status} (expected unsupported media type 415)`,
    });
  } catch (err) {
    checks.push({ endpoint: "/api/chat (text/plain)", status: "ERR", expected: 415, ok: false, detail: err.message });
  }

  // 8. Chat API - Invalid body (400)
  try {
    const res = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ invalidField: true }),
    });
    checks.push({
      endpoint: "/api/chat (invalid body)",
      status: res.status,
      expected: 400,
      ok: res.status === 400,
      detail: `status=${res.status} (expected validation error 400)`,
    });
  } catch (err) {
    checks.push({ endpoint: "/api/chat (invalid body)", status: "ERR", expected: 400, ok: false, detail: err.message });
  }

  // 9. Chat API - Live chat test (ONLY if explicitly requested via --live-chat-test)
  if (liveChatTest) {
    try {
      const res = await fetch(`${baseUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: "What services do you offer?" }],
        }),
      });
      const data = await res.json().catch(() => ({}));
      checks.push({
        endpoint: "/api/chat (live test)",
        status: res.status,
        expected: 200,
        ok: res.status === 200 && Boolean(data.reply),
        detail: `status=${res.status}, replyLen=${data.reply?.length || 0}`,
      });
    } catch (err) {
      checks.push({ endpoint: "/api/chat (live test)", status: "ERR", expected: 200, ok: false, detail: err.message });
    }
  }

  // Report table
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
