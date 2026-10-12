# Production Launch Checklist

This document tracks the readiness of **The Business Work (TBW)** website for public production launch across 20 critical engineering, design, legal, and operational dimensions.

---

## Launch Checklist Status

| # | Item | Status | Evidence (Command / File) | What is Left / Owner Actions |
|---|---|---|---|---|
| 1 | **Privacy Policy** | **Owner action** | `frontend/src/content/legal/privacy.ts`, `npm run legal:check` | Legal review by a qualified Indian lawyer to confirm grievance officer details, address, and retention period placeholders. |
| 2 | **Terms of Service** | **Owner action** | `frontend/src/content/legal/terms.ts`, `npm run legal:check` | Legal review and commercial decisions on advance %, milestone schedule, GST registration/rate, notice period, and refund rules. |
| 3 | **Secrets only in env** | **Done** | `git ls-files \| grep -i "\.env"` (only `.env.example` committed) | Configure production environment variables in Vercel project settings (`TURNSTILE_SECRET_KEY`, `WEBHOOK_SECRET`, `LEAD_WEBHOOK_URL`). |
| 4 | **HTTPS & Webhook Safety** | **Done** | `npm run seo:check` (running `src/lib/https.test.ts`), `scripts/preflight.mjs --production` | Configure production domain SSL certificate on Vercel and verify `NEXT_PUBLIC_SITE_URL` begins with `https://`. |
| 5 | **Cookie Consent** | **Done** | `frontend/src/components/CookieConsent.tsx`, `npx playwright test tests/cookie-consent.spec.ts` | Default zero-cookie state verified. If owner opts to enable Google Analytics (`NEXT_PUBLIC_GA_ID`), consent banner activates automatically. |
| 6 | **SEO metadata unique per page** | **Done** | `npm run seo:check`, `frontend/src/app/layout.tsx`, `src/app/services/[slug]/page.tsx` | All metadata and OpenGraph tags configured. Set `NEXT_PUBLIC_ALLOW_INDEXING=true` at launch. |
| 7 | **Social preview image** | **Done** | `frontend/src/app/opengraph-image.tsx` | Generates 1200x630 dynamic OpenGraph preview card matching brand design tokens. |
| 8 | **Favicon and mobile icons** | **Done** | `frontend/src/app/icon.svg`, `frontend/src/app/apple-icon.png`, `frontend/src/app/manifest.ts` | Brand icon assets verified across browser tabs, PWA manifest, and mobile home screen bookmarks. |
| 9 | **Sitemap and robots** | **Done** | `frontend/src/app/sitemap.ts`, `frontend/src/app/robots.ts` | Dynamically indexes all 6 public routes (`/`, `/privacy`, `/terms`, 3 service routes). Disallows indexing until `NEXT_PUBLIC_ALLOW_INDEXING=true`. |
| 10 | **Image alt text** | **Done** | `node scripts/images-check.mjs` (0 raw or missing alt attributes) | Site exclusively uses vector SVG icons. If raster photography is added later, enforce `next/image` and descriptive alt text per `extras/docs/seo.md`. |
| 11 | **Image optimisation** | **Done** | `extras/docs/seo.md` (Section 6) | Modern WebP/AVIF format and `next/image` guidelines documented for content editors. |
| 12 | **Page speed (Lighthouse)** | **Done** | `npx lighthouse`, `extras/docs/pagespeed.md` | Mobile: 97 Perf / 100 A11y / 100 Best Practices. Desktop: 100 Perf / 100 A11y / 100 Best Practices. (SEO score 66 reflects intentional pre-launch `noindex`). |
| 13 | **Colour contrast** | **Done** | `node scripts/contrast.mjs` | All 13 text and surface pairs pass WCAG AAA/AA (contrast ratios range from 4.68:1 to 17.90:1). |
| 14 | **Responsive layouts** | **Done** | `npx playwright test tests/responsive.spec.ts` | 22/22 tests passing across 6 viewports (360x740, 390x844, 768x1024, 1024x768, 1280x800, 1440x900). Zero horizontal overflow; modal fits on mobile; anchor offset clear. |
| 15 | **Custom 404** | **Done** | `frontend/src/app/not-found.tsx` | Branded not-found page with clear navigation back to home page. |
| 16 | **Broken links** | **Done** | `npm run links:check -- http://localhost:3005` | 185 unique link occurrences checked across sitemap and crawled pages; 0 broken internal links, 0 missing anchors. |
| 17 | **Form validation** | **Done** | `vitest run src/lib/lead.test.ts` (87/87 tests pass) | Rigorous validation and sanitization for name, phone, email, requirement, budget, and UTM attribution parameters. |
| 18 | **Spam protection** | **Done** | `vitest run src/app/api/contact/route.test.ts` | Honeypot trap, submission speed limits, rate limiting (5 req / 10 min), and optional Cloudflare Turnstile CAPTCHA. |
| 19 | **Analytics and lead tracking** | **Done** | `frontend/src/components/ContactModal.tsx`, `extras/docs/analytics.md` | Zero-cookie in-memory attribution captures `page`, `cta`, and first-landing UTM tags. Optional GA4 consent integration ready. |
| 20 | **Clear CTAs** | **Done** | `frontend/src/components/Header.tsx`, `Hero.tsx`, `Services.tsx`, `CTA.tsx`, `DiscussProjectButton.tsx` | Prominent "Discuss Your Project" actions across all sections and pages passing semantic CTA origins (`header`, `hero`, `services`, `cta`, `service-page`, `assistant`). |

---

## Owner Next Actions Summary

1. **Legal Counsel Review:**
   - Review `frontend/src/content/legal/privacy.ts` and `frontend/src/content/legal/terms.ts`.
   - Resolve the 26 `[[TO CONFIRM]]` placeholders documented in `extras/docs/legal-review.md`.
2. **Google Apps Script & Sheet Setup:**
   - Deploy `extras/automation/google-apps-script/lead-capture.gs` to the production Google Sheet.
   - Verify columns auto-upgrade to 14 headers including attribution fields.
3. **Configure Production Environment Variables:**
   - Set `NEXT_PUBLIC_SITE_URL=https://thebusinesswork.com`.
   - Set `LEAD_WEBHOOK_URL` (and optional `NOTIFY_WEBHOOK_URL`).
   - If using Turnstile: set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`.
   - If using GA4: set `NEXT_PUBLIC_GA_ID`.
4. **Enable Search Indexing:**
   - Once legal review is complete and real business details are entered, set `NEXT_PUBLIC_ALLOW_INDEXING=true` to switch the site to indexed mode.
