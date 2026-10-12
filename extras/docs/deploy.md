# Deployment Guide

This guide details how to deploy **The Business Work** website to production hosting (e.g. Vercel) following the monorepo restructure.

---

## 1. Repository Layout

The repository is organized into three distinct top-level directories:

| Folder | Purpose | Deployed Where |
| :--- | :--- | :--- |
| `frontend/` | Next.js 14 App Router website, UI components, static assets, contact API route, tests, and build scripts. | **Vercel** (Production Website) |
| `backend/` | Reserved for future standalone Express / Gemini chatbot backend services. | Separate Node.js host / container (when implemented) |
| `extras/` | Documentation (`docs/`), design reference archives (`design-reference/`), and external automations (`automation/`). | **Never deployed** (Internal repository assets) |

---

## 2. Vercel Deployment Instructions

### Critical Configuration Setting
When importing or configuring the project on Vercel:

> **Root Directory**: `frontend`

- In the Vercel Project Settings > **General** > **Root Directory**, click **Edit** and set the value to:
  ```
  frontend
  ```
- **Do NOT** leave Root Directory as `/` (root). Vercel must build directly inside `frontend/` so it detects `next.js` and installs dependencies from `frontend/package.json`.

### Environment Variables
Configure the following in the Vercel Dashboard (**Settings** > **Environment Variables**):

1. `NEXT_PUBLIC_SITE_URL`: Your production domain, e.g. `https://thebusinesswork.com`
2. `NEXT_PUBLIC_ALLOW_INDEXING`: Set to `"true"` at public launch to allow search engine indexing (defaults to unindexed).
3. `LEAD_WEBHOOK_URL`: Your webhook endpoint (e.g. Google Apps Script Web App URL or n8n webhook URL).
4. `LEAD_WEBHOOK_SECRET`: The shared authorization secret string.
5. `LEAD_WEBHOOK_SECRET_MODE`: Set to `"body"` if using Google Apps Script; `"header"` if using n8n/custom server.
6. `NOTIFY_WEBHOOK_URL`: (Optional) Instant notification webhook for lead summaries.
7. `UPSTASH_REDIS_REST_URL` & `UPSTASH_REDIS_REST_TOKEN`: (Optional) Distributed rate limiting tokens.
8. `NEXT_PUBLIC_GA_ID`: (Optional) Google Analytics 4 Measurement ID (`G-XXXXXXXXXX`).

#### Website Assistant Variable (Optional):
9. `NEXT_PUBLIC_ASSISTANT_ENABLED`: Controls whether the rule-based assistant widget mounts on client browsers (enabled by default when unset; set to `"false"` to disable). No backend API or API keys are used.

---

## 3. Launch Gate Preflight vs. CI Build/Test

Production readiness is verified in two distinct stages:

1. **Continuous Integration (CI):**
   Runs code quality, typing, linting, and automated unit/integration/accessibility tests:
   ```bash
   npm run typecheck
   npm run lint
   npm run test
   npm run test:a11y
   npm run build
   ```

2. **Launch Gate (`preflight`):**
   `npm run preflight -- --production` serves as the explicit deployment launch gate. It does **not** re-run typecheck or build; instead, it enforces that the deployment environment is genuinely ready for production:
   - Validates that `NEXT_PUBLIC_SITE_URL` is configured, uses HTTPS, and does not contain localhost/example/vercel.app domains.
   - Verifies that business details in `site.ts` (email, phone, WhatsApp) are real and not demo placeholders.
   - Enforces valid `LEAD_WEBHOOK_URL` and audits webhook secret configuration.
   - Enforces legal signoff (zero unresolved `[[TO CONFIRM]]` placeholders).
   - Validates Cloudflare Turnstile key symmetry.
   - Preflight exits non-zero if any required launch gate check fails.

---

## 4. Post-Deployment Verification

After deployment, run the production smoke test from the repository root:
```bash
npm run smoke -- https://thebusinesswork.com
```
This validates HTTP status codes for the homepage, all service pages, privacy, terms, `robots.txt`, dynamic OG images, and `sitemap.xml`.

