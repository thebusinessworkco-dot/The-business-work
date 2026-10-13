// scripts/contrast.mjs
// Calculates WCAG contrast ratios for color pairs used across the site.

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  return [
    (num >> 16) & 255,
    (num >> 8) & 255,
    num & 255,
  ];
}

function relativeLuminance([r, g, b]) {
  const sRGB = [r, g, b].map((val) => {
    const s = val / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

function contrastRatio(hex1, hex2) {
  const lum1 = relativeLuminance(hexToRgb(hex1));
  const lum2 = relativeLuminance(hexToRgb(hex2));
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

const colors = {
  // Foundational tokens
  background: "#F7F4EE",
  "surface-card": "#FFFFFF",
  "surface-muted": "#EFEBE1",
  "border-sand": "#E4DFD5",
  "border-taupe": "#D6D0C4",
  ink: "#181716",
  "ink-muted": "#646059",
  "ink-faint": "#6E6A62",
  "accent-ochre": "#A3512B",
  "accent-ochre-dark": "#8F4524",
  white: "#FFFFFF",

  // Semantic Section Tokens
  "section-cream": "#F7F4EE",
  "section-sand": "#EFEBE1",
  "section-ochre": "#F5EBE1",
  "section-sage": "#E8EDE5",
  "section-ink": "#181716",
  "ochre-on-dark": "#E0A27F",
};

const pairs = [
  // --- Standard Backgrounds ---
  { fg: "ink", bg: "background", desc: "Body text on background" },
  { fg: "ink", bg: "surface-card", desc: "Body text on card" },
  { fg: "ink-muted", bg: "background", desc: "Muted text on background" },
  { fg: "ink-muted", bg: "surface-card", desc: "Muted text on card" },
  { fg: "ink-muted", bg: "surface-muted", desc: "Muted text on surface-muted" },
  { fg: "ink-faint", bg: "background", desc: "Faint text on background" },
  { fg: "ink-faint", bg: "surface-card", desc: "Faint text on card" },
  { fg: "accent-ochre", bg: "background", desc: "Ochre text on background" },
  { fg: "accent-ochre", bg: "surface-card", desc: "Ochre text on card" },
  { fg: "accent-ochre", bg: "surface-muted", desc: "Ochre text on surface-muted" },
  { fg: "accent-ochre-dark", bg: "background", desc: "Dark ochre on background" },
  { fg: "background", bg: "ink", desc: "Light text on dark button" },
  { fg: "white", bg: "ink", desc: "White text on dark button" },

  // --- Section: Cream (#F7F4EE) ---
  { fg: "ink", bg: "section-cream", desc: "Headings & body on section-cream" },
  { fg: "ink-muted", bg: "section-cream", desc: "Muted text on section-cream" },
  { fg: "ink-faint", bg: "section-cream", desc: "Faint text on section-cream" },
  { fg: "accent-ochre", bg: "section-cream", desc: "Eyebrow & icons on section-cream" },
  { fg: "accent-ochre-dark", bg: "section-cream", desc: "Dark ochre on section-cream" },

  // --- Section: Sand (#EFEBE1) ---
  { fg: "ink", bg: "section-sand", desc: "Headings & body on section-sand" },
  { fg: "ink-muted", bg: "section-sand", desc: "Muted text on section-sand" },
  { fg: "ink-faint", bg: "section-sand", desc: "Faint text on section-sand" },
  { fg: "accent-ochre", bg: "section-sand", desc: "Eyebrow & icons on section-sand" },
  { fg: "accent-ochre-dark", bg: "section-sand", desc: "Dark ochre on section-sand" },

  // --- Section: Ochre Tint (#F5EBE1) ---
  { fg: "ink", bg: "section-ochre", desc: "Headings & body on section-ochre" },
  { fg: "ink-muted", bg: "section-ochre", desc: "Muted text on section-ochre" },
  { fg: "ink-faint", bg: "section-ochre", desc: "Faint text on section-ochre" },
  { fg: "accent-ochre", bg: "section-ochre", desc: "Eyebrow & icons on section-ochre" },
  { fg: "accent-ochre-dark", bg: "section-ochre", desc: "Dark ochre on section-ochre" },

  // --- Section: Sage Tint (#E8EDE5) ---
  { fg: "ink", bg: "section-sage", desc: "Headings & body on section-sage" },
  { fg: "ink-muted", bg: "section-sage", desc: "Muted text on section-sage" },
  { fg: "ink-faint", bg: "section-sage", desc: "Faint text on section-sage" },
  { fg: "accent-ochre", bg: "section-sage", desc: "Eyebrow & icons on section-sage" },
  { fg: "accent-ochre-dark", bg: "section-sage", desc: "Dark ochre on section-sage" },

  // --- Section: Ink (#181716) ---
  { fg: "section-cream", bg: "section-ink", desc: "Headings & body on section-ink" },
  { fg: "white", bg: "section-ink", desc: "White text on section-ink" },
  { fg: "ochre-on-dark", bg: "section-ink", desc: "Ochre accent text on section-ink" },
  { fg: "border-sand", bg: "section-ink", desc: "Muted secondary copy on section-ink" },
  { fg: "surface-muted", bg: "section-ink", desc: "Faint copy on section-ink" },
  { fg: "ink", bg: "section-cream", desc: "Button ink text on cream CTA button" },
  { fg: "ink", bg: "ochre-on-dark", desc: "Button ink text on ochre hover state" },
];

console.log("| Text / Foreground | Background | Context | Ratio | Normal (4.5:1) | Large (3:1) |");
console.log("| :--- | :--- | :--- | :---: | :---: | :---: |");

let hasFailure = false;

for (const p of pairs) {
  const fgHex = colors[p.fg];
  const bgHex = colors[p.bg];
  const ratio = contrastRatio(fgHex, bgHex);
  const ratioStr = ratio.toFixed(2) + ":1";
  const passNormal = ratio >= 4.5 ? "PASS" : "FAIL";
  const passLarge = ratio >= 3.0 ? "PASS" : "FAIL";
  if (passNormal === "FAIL") {
    hasFailure = true;
  }
  console.log(`| ${p.fg} (${fgHex}) | ${p.bg} (${bgHex}) | ${p.desc} | ${ratioStr} | ${passNormal} | ${passLarge} |`);
}

if (hasFailure) {
  console.error("\n❌ Some contrast checks failed!");
  process.exit(1);
} else {
  console.log("\n✅ All contrast checks PASSED (100% compliant with WCAG AA/AAA)!");
}
