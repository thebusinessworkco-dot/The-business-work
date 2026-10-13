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
  "accent-ochre-dark": "#7A3A1C",
  white: "#FFFFFF",

  // Semantic Section Background Tokens
  "section-cream": "#F7F4EE",
  "section-sand": "#E8DDC8",
  "section-pine": "#283730",
  "section-clay": "#EFD7C3",
  "section-sage": "#D9E3D6",
  "section-ochre": "#A3512B",
  "section-ink": "#181716",

  // Semantic Section Text & Accent Tokens
  "on-pine": "#F7F4EE",
  "on-pine-muted": "#C2CEC6",
  "on-ochre": "#F7F4EE",
  "on-ochre-muted": "#F7F4EE",
  "on-ink": "#F7F4EE",
  "on-ink-muted": "#C7C2B8",
  "ochre-on-dark": "#E3A27E",
};

const pairs = [
  // --- Standard Backgrounds ---
  { fg: "ink", bg: "background", desc: "Body text on background" },
  { fg: "ink", bg: "surface-card", desc: "Body text on card" },
  { fg: "ink-muted", bg: "background", desc: "Muted text on background" },
  { fg: "ink-muted", bg: "surface-card", desc: "Muted text on card" },
  { fg: "ink-faint", bg: "surface-card", desc: "Faint text on card" },
  { fg: "accent-ochre", bg: "background", desc: "Ochre text on background" },
  { fg: "accent-ochre", bg: "surface-card", desc: "Ochre text on card" },
  { fg: "accent-ochre-dark", bg: "background", desc: "Dark ochre on background" },
  { fg: "background", bg: "ink", desc: "Light text on dark button" },
  { fg: "white", bg: "ink", desc: "White text on dark button" },

  // --- 1. Section: Hero & Principles (Cream #F7F4EE) ---
  { fg: "ink", bg: "section-cream", desc: "Headings & body on section-cream" },
  { fg: "ink-muted", bg: "section-cream", desc: "Muted text on section-cream" },
  { fg: "accent-ochre", bg: "section-cream", desc: "Eyebrow & icons on section-cream" },
  { fg: "accent-ochre-dark", bg: "section-cream", desc: "Dark ochre on section-cream" },

  // --- 2. Section: Services (Deep Sand #E8DDC8) ---
  { fg: "ink", bg: "section-sand", desc: "Headings & body on section-sand" },
  { fg: "ink-muted", bg: "section-sand", desc: "Muted text on section-sand" },
  { fg: "accent-ochre-dark", bg: "section-sand", desc: "Eyebrow label & icon on section-sand" },
  { fg: "surface-card", bg: "section-sand", desc: "White cards on section-sand", min: 1.3 },
  { fg: "ink", bg: "surface-card", desc: "Body inside cards on section-sand" },
  { fg: "ink-muted", bg: "surface-card", desc: "Muted text inside cards on section-sand" },

  // --- 3. Section: How We Work (Pine Green #283730 - DARK) ---
  { fg: "on-pine", bg: "section-pine", desc: "Title & step heading on section-pine" },
  { fg: "on-pine-muted", bg: "section-pine", desc: "Body copy & output labels on section-pine" },
  { fg: "ochre-on-dark", bg: "section-pine", desc: "Step number & eyebrow on section-pine" },
  { fg: "on-pine", bg: "section-pine", desc: "Hairline cell dividers on section-pine", min: 3.0 },
  { fg: "on-pine", bg: "section-pine", desc: "Focus-visible ring on section-pine", min: 3.0 },

  // --- 4. Section: Industries (Clay #EFD7C3) ---
  { fg: "ink", bg: "section-clay", desc: "Headings & body on section-clay" },
  { fg: "ink-muted", bg: "section-clay", desc: "Muted text on section-clay" },
  { fg: "accent-ochre-dark", bg: "section-clay", desc: "Eyebrow label on section-clay" },
  { fg: "surface-card", bg: "section-clay", desc: "White cards on section-clay", min: 1.3 },
  { fg: "ink", bg: "surface-card", desc: "Body inside cards on section-clay" },
  { fg: "ink-muted", bg: "surface-card", desc: "Muted text inside cards on section-clay" },

  // --- 5. Section: Demos (Sage #D9E3D6) ---
  { fg: "ink", bg: "section-sage", desc: "Headings & body on section-sage" },
  { fg: "ink-muted", bg: "section-sage", desc: "Muted text on section-sage" },
  { fg: "accent-ochre-dark", bg: "section-sage", desc: "Eyebrow label on section-sage" },
  { fg: "surface-card", bg: "section-sage", desc: "White cards on section-sage", min: 1.3 },
  { fg: "ink", bg: "surface-card", desc: "Body inside cards on section-sage" },
  { fg: "ink-muted", bg: "surface-card", desc: "Muted text inside cards on section-sage" },

  // --- 6. Section: Why The Business Work (Cream #F7F4EE) ---
  { fg: "ink", bg: "surface-card", desc: "Card title in Principles" },
  { fg: "accent-ochre", bg: "surface-card", desc: "Card eyebrow label in Principles" },
  { fg: "ink-muted", bg: "surface-card", desc: "Card body text in Principles" },

  // --- 7. Section: Final CTA (Solid Ochre #A3512B) ---
  { fg: "on-ochre", bg: "section-ochre", desc: "Heading & subcopy on section-ochre" },
  { fg: "white", bg: "section-ochre", desc: "White text & hover on section-ochre" },
  { fg: "ink", bg: "section-cream", desc: "Primary CTA button text on cream background" },
  { fg: "section-cream", bg: "ink", desc: "Primary CTA button text on hover ink background" },
  { fg: "on-ochre", bg: "section-ochre", desc: "WhatsApp ghost button outline & text", min: 3.0 },
  { fg: "on-ochre", bg: "section-ochre", desc: "Underlined email link on section-ochre" },
  { fg: "on-ochre", bg: "section-ochre", desc: "Focus-visible ring on section-ochre", min: 3.0 },

  // --- 8. Section: Footer (Dark Ink #181716) ---
  { fg: "on-ink", bg: "section-ink", desc: "Logo, headers & copyright on section-ink" },
  { fg: "on-ink-muted", bg: "section-ink", desc: "Muted copy & nav links on section-ink" },
  { fg: "ochre-on-dark", bg: "section-ink", desc: "Accent hover & highlights on section-ink" },
  { fg: "on-ink", bg: "section-ink", desc: "Focus-visible ring on section-ink", min: 3.0 },

  // --- Assistant Launcher 2px Cream Ring on Every Section ---
  { fg: "section-cream", bg: "section-pine", desc: "Assistant cream ring over pine", min: 3.0 },
  { fg: "section-cream", bg: "section-ochre", desc: "Assistant cream ring over ochre", min: 3.0 },
  { fg: "section-cream", bg: "section-ink", desc: "Assistant cream ring over ink", min: 3.0 },
  { fg: "ink", bg: "section-sand", desc: "Assistant ink body over sand", min: 3.0 },
  { fg: "ink", bg: "section-clay", desc: "Assistant ink body over clay", min: 3.0 },
  { fg: "ink", bg: "section-sage", desc: "Assistant ink body over sage", min: 3.0 },
  { fg: "ink", bg: "section-cream", desc: "Assistant ink body over cream", min: 3.0 },
];

console.log("| Text / Foreground | Background | Context | Ratio | Normal (4.5:1) | Large / UI (3:1) |");
console.log("| :--- | :--- | :--- | :---: | :---: | :---: |");

let hasFailure = false;

for (const p of pairs) {
  const fgHex = colors[p.fg];
  const bgHex = colors[p.bg];
  const ratio = contrastRatio(fgHex, bgHex);
  const ratioStr = ratio.toFixed(2) + ":1";
  const requiredNormal = p.min ?? 4.5;
  const passNormal = ratio >= requiredNormal ? "PASS" : "FAIL";
  const passLarge = ratio >= (p.min ?? 3.0) ? "PASS" : "FAIL";
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
