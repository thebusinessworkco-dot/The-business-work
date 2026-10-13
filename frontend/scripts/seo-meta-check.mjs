// frontend/scripts/seo-meta-check.mjs
const pages = [
  "/",
  "/services/ai-agents-chatbots",
  "/services/crm-sales-automation",
  "/services/business-workflow-automation",
  "/services/whatsapp-social-automation"
];

async function check() {
  console.log("=== SEO Title, Description, and OG:Title Check (http://localhost:3000) ===\n");
  for (const p of pages) {
    const res = await fetch("http://localhost:3000" + p);
    const html = await res.text();
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
    const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i);

    const title = titleMatch ? titleMatch[1] : "N/A";
    const desc = descMatch ? descMatch[1] : "N/A";
    const ogTitle = ogTitleMatch ? ogTitleMatch[1] : "N/A";

    console.log(`Page: ${p}`);
    console.log(`  Title (${title.length} chars, max 60): "${title}"`);
    console.log(`  Description (${desc.length} chars, max 155): "${desc}"`);
    console.log(`  og:title (${ogTitle.length} chars): "${ogTitle}"`);
    console.log(`  Status: ${title.length <= 60 && desc.length <= 155 ? "✓ PASS (within limits)" : "✗ FAIL (exceeds limit)"}`);
    console.log("");
  }
}

check();
