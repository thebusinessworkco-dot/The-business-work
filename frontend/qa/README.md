# Responsive and Accessibility QA Artifacts

This directory contains automated visual screenshots and QA audit artifacts collected across multiple responsive breakpoints:
- `360x740` (Small Mobile)
- `390x844` (Modern Mobile / iOS)
- `768x1024` (Tablet Portrait)
- `1024x768` (Tablet Landscape)
- `1280x800` (Small Laptop)
- `1440x900` (Desktop)

Screenshots are generated during the Playwright test suite (`tests/responsive.spec.ts`) and saved to `qa/screenshots/`.
