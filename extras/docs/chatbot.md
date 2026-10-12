# Website Chat Assistant Documentation

This document describes the architecture, operational guidelines, configuration, testing, and safety limits for the AI Chat Assistant on **The Business Work** website.

---

## 1. System Architecture

The chatbot is built entirely within the Next.js 14 App Router application without external runtime dependencies (using native `fetch`):

```
┌────────────────────────────────────────────────────────┐
│               Website Visitor (Browser)               │
└────────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│  ChatWidget (Client Component, next/dynamic ssr:false) │
│  - Anchored bottom-right launcher & accessible panel  │
│  - Session state in React memory (no cookies/storage)  │
│  - Direct triggers for ContactModal & WhatsApp         │
└────────────────────────────────────────────────────────┘
                           │ POST /api/chat (JSON, 8 KB max)
                           ▼
┌────────────────────────────────────────────────────────┐
│     API Route: frontend/src/app/api/chat/route.ts      │
│  1. Content-Type (415) & Same-Origin check (403)       │
│  2. Global Daily Rate Limit (CHAT_DAILY_LIMIT -> 503)  │
│  3. Per-IP Rate Limit (20 req / 10 min -> 429)         │
│  4. Validation: 8-message window, 500 chars, no empty  │
│  5. Dynamic Knowledge Assembly (chat-knowledge.ts)     │
│  6. System Prompt & Anti-Injection (chat-prompt.ts)    │
└────────────────────────────────────────────────────────┘
                           │
                           ▼ POST REST API (x-goog-api-key)
┌────────────────────────────────────────────────────────┐
│  Google Gemini API (e.g. gemini-3.8-flash)             │
│  https://generativelanguage.googleapis.com/...         │
└────────────────────────────────────────────────────────┘
                           │ Response JSON
                           ▼
┌────────────────────────────────────────────────────────┐
│  Output Safety Filter (chat-filter.ts)                 │
│  - Disallows currency amounts (₹, $, INR, USD, Rs)     │
│  - Disallows guarantees ("guarantee", "100%")          │
│  - Disallows placeholders & [[TO CONFIRM]]             │
│  - Returns safe fallback if triggered                  │
└────────────────────────────────────────────────────────┘
```

---

## 2. Environment Variables

Configure these variables in your deployment environment (e.g. Vercel dashboard under Production and Preview):

| Variable | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `GEMINI_API_KEY` | Secret | *None* | Google AI Studio API key. **Server-side only** (NEVER prefix with `NEXT_PUBLIC_`). |
| `GEMINI_MODEL` | String | `gemini-3.8-flash` | Gemini model name. Recheck official [Google AI Studio pricing](https://ai.google.dev/pricing) for active models. |
| `CHAT_ENABLED` | Boolean string | `"false"` | Controls whether `/api/chat` responds to requests or returns 503. |
| `NEXT_PUBLIC_CHAT_ENABLED` | Boolean string | `"false"` | Controls whether the frontend widget mounts in the browser. |
| `CHAT_DAILY_LIMIT` | Integer | `500` | Maximum chat requests permitted globally per day across all visitors. |
| `UPSTASH_REDIS_REST_URL` | String | *None* | Optional Upstash Redis endpoint for distributed rate limits across serverless instances. |
| `UPSTASH_REDIS_REST_TOKEN` | Secret | *None* | Optional Upstash Redis authorization token. |

---

## 3. How to Update What the Bot Knows

The bot knowledge is dynamically generated from the site's structured content files. It contains **no hardcoded answers**. To modify or expand the bot's knowledge, edit the corresponding files in `frontend/src/content/` and `frontend/src/lib/site.ts`:

1. **Agency details & Contact**: Edit `frontend/src/lib/site.ts`. Any field flagged by `isPlaceholder(...)` (such as demo emails or phone numbers) is automatically hidden from both the knowledge and the UI.
2. **Services & Scope**: Edit `frontend/src/content/services.ts`. The bot reads titles, summaries, solves, capabilities, dependencies, intros, use cases, limits, and FAQs directly from this file.
3. **Delivery Process**: Edit `frontend/src/content/process.ts`.
4. **Target Industries**: Edit `frontend/src/content/industries.ts`.
5. **Demos & Proofs of Concept**: Edit `frontend/src/content/work.ts`. The bot reports true statuses (e.g., "In development", "Proof of concept") exactly as stated here.
6. **Operating Principles**: Edit `frontend/src/content/principles.ts`.

---

## 4. Cost, Quota, and Daily Cap Notes

- **Current Pricing Architecture**: Always check the official [Google AI Studio Pricing Page](https://ai.google.dev/pricing) before launching. Google separates usage into Free Tier (rate-limited, prompts may be logged for model improvement) and Paid Tier (billed per 1M input and output tokens, data not used to train models).
- **Token Efficiency**: The system prompt and compiled site knowledge total roughly ~1,200 tokens. Output responses are capped at `maxOutputTokens: 300` (~90 words).
- **Runaway Cost Protection**: The built-in `CHAT_DAILY_LIMIT` (default 500 requests/day) stops API consumption automatically if global traffic surges or automated scripts target the endpoint.

---

## 5. How to Disable the Chatbot Instantly

To completely disable the chatbot without redeploying code:
1. In the Vercel dashboard, set `NEXT_PUBLIC_CHAT_ENABLED=false` and `CHAT_ENABLED=false`.
2. Redeploy or let environment variable changes take effect.
3. When `NEXT_PUBLIC_CHAT_ENABLED` is false, the launcher button and chat panel are completely unmounted from the DOM and zero chat bundle code executes.

---

## 6. How to Test

### Automated Unit & Mock Tests
Run the Vitest test suite to verify knowledge extraction, rate limiting, and Gemini API error handling:
```bash
npm run test
```

### Accessibility & UI Tests
Run Playwright tests to verify WCAG 2.2 AA compliance, keyboard navigation, and responsive sheets:
```bash
npm run test:a11y
```

### Evaluation Script (Prompt Injection & Boundary Checks)
Run the automated evaluation suite against a local or remote server:
```bash
npm run chat:eval
```
*Note: If `GEMINI_API_KEY` is not present in `.env.local`, the script prints `NOT RUN: no key`.*

---

## 7. Known Limitations

1. **No Real-Time Lead Creation inside Chat**: In alignment with strict privacy standards, the chat widget does not collect personal contact details. Visitors are prompted to use the Contact Modal ("Send an enquiry") or WhatsApp.
2. **Context Window Limit**: Conversations maintain a sliding window of the last 8 messages. Long conversations will lose context from earlier turns.
3. **In-Memory Rate Limiting on Ephemeral Serverless**: When Upstash Redis is not configured, rate limits use an in-memory Map which resets upon serverless function restarts. Upstash Redis is recommended for strict multi-instance enforcement.
