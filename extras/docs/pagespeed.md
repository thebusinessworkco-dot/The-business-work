# PageSpeed and Performance Guide

This document records the baseline Lighthouse performance audit results for **The Business Work** and provides testing instructions for deployed preview and production URLs.

---

## 1. Local Lighthouse Baseline (Production Build)

Audits were executed against the production Next.js build running locally on `http://localhost:3005` with production optimizations enabled and the AI Assistant widget active.

### Results Summary

| Target | Preset | Performance | Accessibility | Best Practices | SEO* | LCP | CLS | TBT |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Home (`/`)** | Mobile | **97** | **100** | **100** | **66\*** | 2.5 s | 0.001 | 0 ms |
| **Home (`/`)** | Desktop | **100** | **100** | **100** | **66\*** | 0.5 s | 0.002 | 0 ms |
| **Service (`/services/ai-agents-chatbots`)** | Mobile | **98** | **100** | **100** | **66\*** | 2.3 s | 0.001 | 0 ms |

*\*Note on SEO score (66/100): The SEO audit flags that the site has a `noindex` directive (`<meta name="robots" content="noindex, nofollow"/>`). This is deliberate pre-launch protection controlled by `NEXT_PUBLIC_ALLOW_INDEXING`. Once indexing is enabled for launch (`NEXT_PUBLIC_ALLOW_INDEXING=true`), the SEO score reaches 100.*

---

## 2. Lab Scores vs. Real-User Core Web Vitals

- **Lighthouse (Lab Data):** Measured in a controlled synthetic environment with artificial network throttling and device emulation. It is useful for debugging and identifying regression risks.
- **Core Web Vitals (Field Data / CrUX):** Measured from real human visitors on diverse devices, browsers, and network conditions across India and globally over a 28-day rolling window:
  - **LCP (Largest Contentful Paint):** Target ≤ 2.5 s. Driven by hero rendering and font display (`display: swap`).
  - **INP (Interaction to Next Paint):** Target ≤ 200 ms. Minimal JavaScript overhead on the public site ensures rapid main thread response.
  - **CLS (Cumulative Layout Shift):** Target ≤ 0.1. Zero layout shift is ensured through fixed aspect ratios and CSS container containment.

---

## 3. Testing Deployed Previews with Google PageSpeed Insights

Once deployed to Vercel (preview or production), test with Google PageSpeed Insights:

1. Open [PageSpeed Insights](https://pagespeed.web.dev/).
2. Enter the preview URL (e.g. `https://the-business-work-preview.vercel.app` or production domain).
3. Click **Analyze**.
4. Review both **Mobile** and **Desktop** tabs:
   - Check LCP, FID/INP, and CLS metrics.
   - Inspect diagnostics for unused JavaScript or third-party script delays.
   - Verify that no unintended third-party network requests are recorded.
