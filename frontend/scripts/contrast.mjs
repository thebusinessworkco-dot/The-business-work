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
  background: "#F7F4EE",
  "surface-card": "#FFFFFF",
  "surface-muted": "#EFEBE1",
  ink: "#181716",
  "ink-muted": "#646059",
  "ink-faint": "#6E6A62",
  "accent-ochre": "#A3512B",
  "accent-ochre-dark": "#8F4524",
  white: "#FFFFFF",
};

const pairs = [
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
];

console.log("| Text / Foreground | Background | Context | Ratio | Normal (4.5:1) | Large (3:1) |");
console.log("| :--- | :--- | :--- | :---: | :---: | :---: |");

for (const p of pairs) {
  const fgHex = colors[p.fg];
  const bgHex = colors[p.bg];
  const ratio = contrastRatio(fgHex, bgHex);
  const ratioStr = ratio.toFixed(2) + ":1";
  const passNormal = ratio >= 4.5 ? "PASS" : "FAIL";
  const passLarge = ratio >= 3.0 ? "PASS" : "FAIL";
  console.log(`| ${p.fg} (${fgHex}) | ${p.bg} (${bgHex}) | ${p.desc} | ${ratioStr} | ${passNormal} | ${passLarge} |`);
}
