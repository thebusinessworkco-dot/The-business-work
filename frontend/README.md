# Frontend Website — The Business Work

Next.js 14 (App Router) + TypeScript + Tailwind CSS production website for **The Business Work**.

---

## Getting Started

```bash
# Install dependencies
npm install

# Start local dev server (port 3000)
npm run dev

# Run TypeScript checks
npm run typecheck

# Run unit tests
npm run test

# Run accessibility audits
npm run test:a11y

# Build production bundle
npm run build

# Start production server
npm run start
```

---

## Key Directories

- `src/app/`: Next.js 14 App Router pages, metadata, sitemap, and API routes.
- `src/app/api/contact/`: Server-side lead intake endpoint with anti-bot, rate limiting, and webhook forwarding.
- `src/components/`: Accessible UI components.
- `src/content/`: Honest, structured copy and services definitions.
- `src/lib/`: Core utilities (`site.ts`, `lead.ts`, `rate-limit.ts`, `jsonld.ts`, `legal.ts`).
- `tests/`: Automated Playwright test suites (accessibility, keyboard, responsive viewports).
- `scripts/`: Operational scripts (`smoke.mjs`, `preflight.mjs`, `contrast.mjs`, `legal-check.mjs`).

---

## Environment Variables
Copy `.env.example` to `.env.local` and configure your webhook and site variables. See [`../extras/docs/lead-capture.md`](../extras/docs/lead-capture.md) and [`../extras/docs/seo.md`](../extras/docs/seo.md).
