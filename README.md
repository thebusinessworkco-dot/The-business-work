# The Business Work (Monorepo)

**The Business Work** is an AI automation and digital systems agency based in India. This repository is structured into a clean three-folder layout separating production frontend applications, backend services, and project extras.

---

## Repository Folder Map

| Folder | Purpose | Deployed Where | How to Run |
| :--- | :--- | :--- | :--- |
| `frontend/` | Next.js 14 App Router website, UI components, static assets, contact API route, and testing suites. | **Vercel** (Production Website) | `npm run dev` (from root or `frontend/`) |
| `backend/` | Reserved for future standalone Express / Gemini chatbot backend services. | Separate Node.js host / container (when added) | See `backend/README.md` |
| `extras/` | Documentation (`docs/`), design reference archives (`design-reference/`), and external automations (`automation/`). | **Never deployed** (Internal assets) | Reference only |

---

## Quick Start (Root Proxy Scripts)

You can run all operations directly from the repository root:

```bash
# Install frontend dependencies
npm run install:all

# Development server (http://localhost:3000)
npm run dev

# TypeScript typecheck
npm run typecheck

# Unit tests (Vitest)
npm run test

# Production build
npm run build

# Production preview
npm run start

# Automated WCAG 2.2 AA accessibility scan (Playwright + axe-core)
npm run test:a11y

# Production smoke test
npm run smoke -- http://localhost:3000 --expect-noindex

# Full preflight check
npm run preflight -- --production

# Audit legal placeholders
npm run legal:check

# Structured data / JSON-LD validation
npm run seo:check
```

---

## Deployment Notice
For Vercel production hosting, set the **Root Directory** in project settings to `frontend`. See [`extras/docs/deploy.md`](extras/docs/deploy.md) for full instructions.
