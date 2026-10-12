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
- `src/app/api/chat/`: Server-side AI chat assistant endpoint (Gemini REST API, rate limits, daily cap, output filter).
- `src/components/chat/`: Accessible website chat widget client components.
- `src/components/`: Accessible UI components.
- `src/content/`: Honest, structured copy and services definitions.
- `src/lib/`: Core utilities (`site.ts`, `lead.ts`, `rate-limit.ts`, `chat-knowledge.ts`, `chat-prompt.ts`, `chat-filter.ts`).
- `tests/`: Automated Playwright test suites (accessibility, keyboard, responsive viewports, chat widget).
- `scripts/`: Operational scripts (`smoke.mjs`, `preflight.mjs`, `contrast.mjs`, `legal-check.mjs`, `chat-eval.mjs`).

---

## Environment Variables
Copy `.env.example` to `.env.local` and configure variables.

### Website Chat Assistant Variables:
- `GEMINI_API_KEY`: Server-side API key from Google AI Studio (secret, no `NEXT_PUBLIC_` prefix).
- `GEMINI_MODEL`: Gemini model ID (default: `gemini-3.8-flash`).
- `CHAT_ENABLED`: Set to `"true"` to enable `/api/chat`.
- `NEXT_PUBLIC_CHAT_ENABLED`: Set to `"true"` to show the chat launcher widget on the site.
- `CHAT_DAILY_LIMIT`: Global daily request cap (default: `500`).

See [`../extras/docs/chatbot.md`](../extras/docs/chatbot.md), [`../extras/docs/lead-capture.md`](../extras/docs/lead-capture.md), and [`../extras/docs/deploy.md`](../extras/docs/deploy.md).
