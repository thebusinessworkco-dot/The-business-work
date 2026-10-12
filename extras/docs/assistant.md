# Website Assistant Architecture & Operations

## Overview
The Business Work website features an automated, browser-side website assistant widget mounted at the bottom-right corner of every page.

It is strictly **rule-based** and **zero-backend**:
- **No AI / LLM / external API:** It never connects to OpenAI, Google Gemini, Anthropic, or any third-party AI provider.
- **No server calls:** It executes 100% inside the visitor's browser (no `/api/chat`, no `fetch()`, zero external network calls).
- **Zero storage / tracking:** It does not use `localStorage`, `sessionStorage`, or cookies. Conversation history exists solely in ephemeral React component state and resets upon reload or when clicking "Start over".
- **Strict brand integrity:** It answers only from the agency's published content files (`services.ts`, `process.ts`, `industries.ts`, `work.ts`, `principles.ts`, `site.ts`). It never outputs pricing figures, guarantees, or clinical advice.

---

## Architecture Flow

```
[Content Source Files]
   (services.ts, process.ts, industries.ts, work.ts, principles.ts, site.ts)
                    │
                    ▼
[src/lib/assistant/knowledge.ts]
   (Generates curated AssistantEntry[] with English & Hinglish keywords, answers <= 70 words)
                    │
                    ▼
[src/lib/assistant/match.ts]
   (Deterministic token normalization, stemming, typo tolerance, weighted scoring, thresholding)
                    │
                    ▼
[src/components/assistant/AssistantWidget.tsx]
   (Client component loaded dynamically with ssr: false, WCAG 2.2 AA compliant, design tokens)
```

---

## How It Works

1. **Knowledge Extraction (`src/lib/assistant/knowledge.ts`):**
   - Automatically references content files so updates to services, process steps, or demo statuses propagate immediately.
   - Restricts answers to simple Indian English, <= 70 words, strictly factual.
   - Enforces the hard pricing rule: directs users to the enquiry form, stating that third-party usage costs are billed separately.
   - Enforces demo truthfulness: statuses reflect exact labels ("In development", "Proof of concept") without claiming nonexistent clients.

2. **Deterministic Matcher (`src/lib/assistant/match.ts`):**
   - Caps raw inputs at 200 characters to prevent buffer abuse.
   - Normalizes text: strips punctuation, collapses whitespace, converts to lowercase.
   - Applies light stemming (`-ies`, `-es`, `-s`, `-ing`) to catch singular/plural queries.
   - Evaluates weighted scoring:
     - Exact or substring title match (+25 to +40 points).
     - Multi-word keyword phrase match (+15 to +30 points).
     - Single-word exact keyword match (+10 points).
     - Stemmed match (+8 points).
     - Typo tolerance via Levenshtein distance (+8 points for transpositions, omissions, and distance <= 2 on longer terms).
   - If highest score is below the match threshold (8 points), it returns a standard fallback answer with 3 "did you mean" suggestion chips.

3. **User Interface (`src/components/assistant/AssistantWidget.tsx`):**
   - Mounted dynamically via `next/dynamic` with `ssr: false` in `src/app/layout.tsx`.
   - Hidden whenever `ContactModal` is open to avoid UI overlap.
   - Launcher displays the brand mark from `Logo.tsx` with an `accent-ochre` dot and "Ask us" label on desktop.
   - Fully accessible: `role="dialog"`, `role="log"` with `aria-live="polite"`, Escape key handling, and touch targets >= 44px.

---

## How to Add or Edit an Answer and Keywords

1. Open `frontend/src/lib/assistant/knowledge.ts`.
2. Locate the relevant entry in `buildAssistantKnowledge()`, or append a new entry:
   ```ts
   {
     id: "unique-entry-id",
     title: "Entry Title",
     keywords: [
       "english keyword",
       "hinglish keyword",
       "common synonym",
     ],
     answer: "Clear, factual answer in Indian English (must be <= 70 words).",
     followUps: ["Related Chip 1", "Related Chip 2"],
   }
   ```
3. Run evaluation and unit tests:
   ```bash
   cd frontend
   npm run test
   npm run assistant:eval
   ```

---

## How to Test

- **Unit tests:**
  ```bash
  npm run test
  ```
  Runs `knowledge.test.ts` (bounds, placeholder guards, length checks) and `match.test.ts` (50+ queries across English, Hinglish, typos, injection, and fallbacks).

- **Matcher evaluation:**
  ```bash
  npm run assistant:eval
  ```
  Runs 40+ test prompts through Node.js and prints every query, matched entry, score, and complete answer text.

- **Accessibility & E2E tests:**
  ```bash
  npm run test:a11y
  ```
  Tests keyboard navigation, mobile/desktop responsiveness, axe accessibility, and asserts zero network requests.

---

## Disabling the Assistant

The assistant is enabled by default. To disable it completely:
Set the following environment variable in `.env.local` (or production hosting environment):
```bash
NEXT_PUBLIC_ASSISTANT_ENABLED=false
```
When set to `"false"`, the widget will not be mounted or rendered in the DOM.

---

## Known Limitations

- **Rule & Keyword Matching:** The assistant matches phrases and keywords. It does not parse complex multi-clause sentence syntax or perform abstract semantic reasoning.
- **Free-Form Synthesis:** Questions outside of the predefined knowledge base will trigger the fallback response directing the visitor to the contact form.

---

## Future AI Model Integration Note

If the agency decides in the future to introduce a live LLM / AI model:
- That would represent an architectural change with substantial **privacy implications** (sending user inquiries to third-party model providers, requiring revised DPDP notices and consent banners).
- It introduces **variable third-party API costs** and latency considerations.
- The current rule-based architecture guarantees zero ongoing inference cost, zero data leakage, and deterministic compliance with agency rules.
