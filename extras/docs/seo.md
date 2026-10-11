# Technical & On-Page SEO Guide

This document outlines the SEO architecture, indexing safety controls, structured data safeguards, and launch checklist for **The Business Work**.

---

## 1. Indexing Safety Switch (`NEXT_PUBLIC_ALLOW_INDEXING`)

To prevent staging, preview, and test deployments from being indexed prematurely by search engines:

* **Default Behavior (Unset or anything other than `"true"`)**:
  - Root metadata serves `robots: { index: false, follow: false }`.
  - `/robots.txt` returns `Disallow: /` for all user agents.
* **Production Launch Behavior (`NEXT_PUBLIC_ALLOW_INDEXING=true`)**:
  - Root metadata enables indexation (`index: true, follow: true`).
  - `/robots.txt` allows `/`, disallows `/api/`, and declares the canonical sitemap (`/sitemap.xml`) and host.

> **Important**: When you are ready to launch publicly on your production domain, you **must** set `NEXT_PUBLIC_ALLOW_INDEXING=true` in your production environment variables (e.g. Vercel, Netlify, or server environment).

---

## 2. Placeholder Guard

In `frontend/src/lib/site.ts`, business contact information begins as placeholders (`hello@example.com`, `+91 00000 00000`, `localhost`, etc.).

To protect domain authority and prevent search engines from scraping demo values:
* The `isPlaceholder()` helper inspects contact values before any JSON-LD schema or metadata is built.
* If an email contains `example.com`, or a phone consists of demo digits/zeros, it is **strictly omitted** from the `Organization` schema.
* Once the owner updates `frontend/src/lib/site.ts` with real registered details, the schemas automatically include them on the next build.

---

## 3. Structured Data (JSON-LD)

Structured data is generated dynamically and escaped to prevent script injection:

1. **Home Page (`/`)**:
   - `WebSite`: Basic site metadata.
   - `Organization`: Brand name, clean canonical URL, logo (`/icon`), and verified contact details (only once non-placeholder).
   - `ProfessionalService`: Categorizes the agency under `serviceType` for India (`IN`). Does **not** include fake reviews, ratings, or fabricated certifications.
2. **Service Detail Pages (`/services/[slug]`)**:
   - `Service`: Service category name, summary, provider reference, and service area.
   - `BreadcrumbList`: Three-level breadcrumb (`Home` > `Services` > `{Service Title}`).
   - `FAQPage`: Exactly mirrors the visible `<details>`/`<summary>` Q&As displayed on the page.

---

## 4. How to Add a New Service

1. Open `frontend/src/content/services.ts`.
2. Add a new object to the `services` array conforming to the `Service` type:
   - Provide `id`, `index`, `title`, `tag`, `summary`, `solves`, `capabilities` (max 6), `depends`, `intro`, `useCases`, `howItWorks`, `limits`, and `faq`.
3. Because `generateStaticParams()` dynamically reads from `services`, Next.js will automatically build:
   - The new route `/services/{id}`.
   - Corresponding XML entry in `/sitemap.xml`.
   - Matching JSON-LD schemas.
4. Update navigation references or tests if category counts change. (Note: The core agency scope strictly maintains the 4 primary pillars).

---

## 5. Analytics & Verification (Optional)

* **Google Analytics 4**: Set `NEXT_PUBLIC_GA_ID` (e.g. `G-XXXXXXXXXX`). GA4 will load via `next/script` with `strategy="afterInteractive"`.
  - *TODO for Owner*: When enabling GA4 in production, ensure your privacy policy and cookie banner setup aligns with applicable consent regulations.
* **Search Console / Webmaster Verification**:
  - Google: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_token`
  - Bing: `NEXT_PUBLIC_BING_SITE_VERIFICATION=your_token`

---

## 6. Pre-Launch & Launch Checklist

Follow this checklist before opening the site to search engines:

1. [ ] **Real Domain**: Set `NEXT_PUBLIC_SITE_URL` to your live domain (e.g. `https://thebusinesswork.com`) without trailing slash.
2. [ ] **Update Details**: Replace placeholders in `frontend/src/lib/site.ts` with real email, phone, WhatsApp number, and office location.
3. [ ] **Finalize Legal Text**: Replace placeholder text at `/privacy` and `/terms`. Once complete, add both URLs to `frontend/src/app/sitemap.ts`.
4. [ ] **Enable Indexing**: Set `NEXT_PUBLIC_ALLOW_INDEXING=true` in your production environment variables.
5. [ ] **Rebuild & Deploy**: Trigger a production deployment.
6. [ ] **Verify Robots & Sitemap**:
   - Visit `https://yourdomain.com/robots.txt` (ensure it allows `/` and references `/sitemap.xml`).
   - Visit `https://yourdomain.com/sitemap.xml` (ensure all 5 URLs are present with live domain prefixes).
7. [ ] **Verify OpenGraph Previews**: Test your URLs in social link debuggers (e.g., LinkedIn Post Inspector, Twitter/X Card Validator, or Facebook Sharing Debugger).
8. [ ] **Google Search Console**:
   - Add your domain property in [Google Search Console](https://search.google.com/search-console).
   - Submit `https://yourdomain.com/sitemap.xml`.
   - Use URL Inspection to request indexing for the home page.
9. [ ] **Bing Webmaster Tools**:
   - Import or add domain in [Bing Webmaster Tools](https://www.bing.com/webmasters).
   - Submit sitemap.
10. [ ] **Google Business Profile**:
    - If you operate from a physical commercial office or verified address in India, create and verify a Google Business Profile linking to your domain.

---

## 7. Reality of Search Rankings

> Technical SEO ensures search engine crawlers can efficiently discover, parse, render, and index your website without friction or duplicate-content issues.
> Search rankings are determined by domain age, editorial quality, user intent matching, and external references. Technical optimization provides the required foundation, but rankings are never guaranteed.
