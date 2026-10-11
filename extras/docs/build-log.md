# Build Log & Repository History

This document logs significant structural, architectural, and operational tasks across the repository lifecycle.

---

### Task: Repository restructure + cleanup | 2026-10-12
- Changed:
  - Moved Next.js application files (`src/`, `scripts/`, `tests/`, `qa/`, `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs`, `tailwind.config.ts`, `vitest.config.ts`, `playwright.config.ts`, `.env.example`, `.env.local`) to `frontend/` using `git mv`.
  - Moved documentation (`lead-capture.md`, `legal-review.md`, `seo.md`) from `docs/` to `extras/docs/`.
  - Added `backend/README.md` as reservation notice for future Express/Node chatbot backend (no fake Express server created).
  - Extracted Google Apps Script from `lead-capture.md` verbatim into `extras/automation/google-apps-script/lead-capture.gs` and linked it from `extras/docs/lead-capture.md`.
  - Added design reference files (`code.html`, `DESIGN.md`, `screen.png`) to `extras/design-reference/`.
  - Created root proxy `package.json` with scripts (`install:all`, `dev`, `build`, `start`, `typecheck`, `test`, `test:a11y`, `legal:check`, `preflight`, `smoke`, `seo:check`, `contrast`, `lint`) forwarding to `frontend/`.
  - Created root `README.md` with complete repository layout table and proxy guide.
  - Created `frontend/README.md` with application-specific development and build commands.
  - Created `extras/docs/deploy.md` detailing Vercel deployment root (`frontend`) and hosting boundaries.
  - Configured root `.gitignore` and `.github/workflows/ci.yml`.
  - Updated path references in `frontend/scripts/legal-check.mjs`, `frontend/scripts/smoke.mjs`, `frontend/scripts/preflight.mjs`, `frontend/playwright.config.ts`, `extras/docs/seo.md`, `extras/docs/legal-review.md`.
- Deleted:
  - Generated cache output: `tsconfig.tsbuildinfo`, `next-env.d.ts` (regenerated dynamically by Next.js).
  - Empty directories left after git moves: `docs/`, `scripts/`, `src/`, `tests/`, `qa/`.
  - (No unused source files or duplicates deleted: 0 duplicates found via sha256sum; all source files actively imported/referenced).
- Commands run and result:
  - `npm run typecheck` (frontend): PASS (exit code 0; matched BASELINE)
  - `npm run test` (frontend): PASS (14/14 tests passed, 0 failures; matched BASELINE)
  - `npm run build` (frontend): PASS (14 routes compiled identically; matched BASELINE)
  - `npm run typecheck` (root proxy): PASS (exit code 0; matched BASELINE)
  - `npm run test` (root proxy): PASS (14/14 tests passed, 0 failures; matched BASELINE)
  - `npm run build` (root proxy): PASS (14 routes compiled identically; matched BASELINE)
  - `npm run legal:check` (root proxy): PASS (audited 18 expected [[TO CONFIRM]] placeholders; matched BASELINE)
  - `npm run preflight -- --production` (root proxy): PASS (typecheck + test + build all succeeded; matched BASELINE)
  - `npm run smoke -- http://localhost:3000 --expect-noindex` (root proxy): PASS (all 5 endpoints verified; matched BASELINE)
  - `npm run test:a11y` (root proxy): PASS (9/9 axe accessibility tests passed with 0 violations)
  - `npm run seo:check` (root proxy): PASS (3/3 structured data schema tests passed)
- Errors/warnings/skips (verbatim messages):
  - "⚠ Using edge runtime on a page currently disables static generation for that page" (Next.js build warning for edge routes)
  - "The CJS build of Vite's Node API is deprecated. See https://vite.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated for more details." (Vite/Vitest info notice)
  - "⚠ Legal check: unresolved placeholders remain (normal for pre-launch draft mode)." (Expected pre-launch draft audit)
- Not run and why:
  - None. All unit, build, typecheck, preflight, smoke, and accessibility tests executed and passed.
- Kept but uncertain (owner to decide):
  - None. All retained files verified necessary and active.
- Open items for owner:
  - Configure Vercel project settings: Set **Root Directory** to `frontend`.
  - Confirm and replace 18 draft `[[TO CONFIRM]]` placeholders in `frontend/src/content/legal/privacy.ts` and `frontend/src/content/legal/terms.ts` prior to indexing legal pages.
  - Update any local IDE workspace or run configurations to target the new monorepo root or `frontend/` folder.
- Resumed after a crash; items found already done: layout relocation into frontend/, backend/, extras/, root proxy package.json, docs/deploy.md, and lead-capture.gs extraction; items completed in resume: state audit and duplicate/missing file verification, smoke test endpoint validation, full test suite pass from root and frontend, accessibility verification (9/9 passed), build-log completion, and final git commit.
