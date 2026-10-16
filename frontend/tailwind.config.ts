import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FAF7E8",
        surface: "#FAF7E8",
        "surface-card": "#FFFFFF",
        "surface-muted": "#F0EBDC",
        "border-sand": "#E8E2D2",
        "border-taupe": "#D8D2C2",
        ink: "#181716",
        "ink-muted": "#646059",
        "ink-faint": "#6E6A62",
        // Ochre calibrated to exceed 4.5:1 on background, surface-card, and surface-muted
        "accent-ochre": "#A3512B",
        "accent-ochre-dark": "#7A3A1C",
        primary: "#181716",
        "on-primary": "#FAF7E8",

        // Semantic section background tokens (bolder, distinct, earthy)
        "section-cream": "#FAF7E8",
        "section-sand": "#E8DDC8",
        "section-pine": "#283730",
        "section-clay": "#EFD7C3",
        "section-sage": "#D9E3D6",
        "section-ochre": "#A3512B",
        "section-ink": "#181716",

        // Semantic section text & accent tokens
        "on-pine": "#F7F4EE",
        "on-pine-muted": "#C2CEC6",
        "on-ochre": "#F7F4EE",
        "on-ochre-muted": "#F7F4EE",
        "on-ink": "#F7F4EE",
        "on-ink-muted": "#C7C2B8",
        "ochre-on-dark": "#E3A27E",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      screens: {
        xs: "480px",
      },
      fontFamily: {
        headline: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        body: ["var(--font-manrope)", "system-ui", "sans-serif"],
        serif: ["var(--font-newsreader)", "Georgia", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
