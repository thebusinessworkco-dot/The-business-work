import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F7F4EE",
        surface: "#F7F4EE",
        "surface-card": "#FFFFFF",
        "surface-muted": "#EFEBE1",
        "border-sand": "#E4DFD5",
        "border-taupe": "#D6D0C4",
        ink: "#181716",
        "ink-muted": "#646059",
        "ink-faint": "#6E6A62",
        // Ochre calibrated to exceed 4.5:1 on background, surface-card, and surface-muted
        "accent-ochre": "#A3512B",
        "accent-ochre-dark": "#8F4524",
        primary: "#181716",
        "on-primary": "#F7F4EE",
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
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
