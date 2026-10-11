# The Business Work: website

Next.js 14 (App Router) + TypeScript + Tailwind CSS 3.

## Run
```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Where to edit
| What | File |
|---|---|
| Email / phone / WhatsApp number / location (**placeholders now**) | `src/lib/site.ts` |
| Services (exactly 4), process, industries, demos, principles copy | `src/content/*.ts` |
| Colours, fonts | `tailwind.config.ts`, `src/app/layout.tsx` |
| Contact form backend | `src/app/api/contact/route.ts` |
| Privacy / Terms (placeholders) | `src/app/privacy`, `src/app/terms` |

## Leads
Set `LEAD_WEBHOOK_URL` to deliver leads to Google Sheets (via Google Apps Script or n8n).
See [docs/lead-capture.md](docs/lead-capture.md) for full step-by-step setup guides for both Google Apps Script and n8n.

* In development: if `LEAD_WEBHOOK_URL` is omitted, the form validates successfully and logs a server warning (no leads stored).
* In production: if `LEAD_WEBHOOK_URL` is omitted, the API safely returns HTTP 503 so no lead is silently lost.
* Configure `UPSTASH_REDIS_REST_URL` & `UPSTASH_REDIS_REST_TOKEN` for distributed rate limiting on serverless platforms.

## Tests
Run unit tests with Vitest:
```bash
npm run test
```

## Before going live
See [docs/seo.md](docs/seo.md) for the complete launch and SEO checklist.
* Set `NEXT_PUBLIC_SITE_URL` to your production domain (e.g. `https://thebusinesswork.com`).
* Set `NEXT_PUBLIC_ALLOW_INDEXING=true` in production to allow search engine indexing.
* Replace placeholder contact details in `src/lib/site.ts`.
* Finalize legal text in `src/app/privacy` and `src/app/terms`.
