# Legal Review & Launch Readiness Guide

> [!IMPORTANT]
> **Legal Disclaimer:** The Privacy Policy and Terms of Service documents generated in this repository are technical and operational drafts prepared by software engineers to accurately reflect the website's actual code, form fields, and data flows. **They do not constitute legal advice.** A qualified Indian advocate or legal counsel specializing in corporate and digital laws must review, customize, and approve both documents before public deployment.

---

## 1. Automated Placeholder Audit (`npm run legal:check`)

Run the following command at any time to audit remaining placeholders:
```bash
npm run legal:check
```

This script scans `src/content/legal/privacy.ts` and `src/content/legal/terms.ts` for unresolved `[[TO CONFIRM: ...]]` tags and exits non-zero if any remain.

### Current Placeholders to Resolve

#### In `src/content/legal/privacy.ts`
1. **Section 1 (Who We Are):**
   - `[[TO CONFIRM: registered business entity type, registration number, and GSTIN if applicable]]`
   - `[[TO CONFIRM: complete registered office address, city, state, PIN code, India]]`
   - `[[TO CONFIRM: official contact and privacy email address, e.g. privacy@thebusinesswork.com]]`
   - `[[TO CONFIRM: official business contact phone number]]`
2. **Section 4 (Indian DPDP Act Alignment):**
   - `[[TO CONFIRM: lawyer to confirm applicable statutory notices and rules under the DPDP Act 2023]]`
3. **Section 6 (Cross-Border Transfers):**
   - `[[TO CONFIRM: lawyer to confirm international data transfer safeguards and restrictions under Indian law]]`
4. **Section 7 (Data Retention):**
   - `[[TO CONFIRM: retention period, e.g. 12 months after last contact or until consent is withdrawn]]`
5. **Section 9 (Your Rights & Response SLA):**
   - `[[TO CONFIRM: official privacy email address]]`
   - `[[TO CONFIRM: response timeline, e.g. within 30 days of receiving a verified request]]`
6. **Section 10 (Cookies & Consent):**
   - `[[TO CONFIRM: lawyer to confirm cookie notice, consent banner, or opt-out requirements if analytics is deployed in production]]`
7. **Section 13 (Grievance Redressal):**
   - `[[TO CONFIRM: Grievance Officer Name]]`
   - `[[TO CONFIRM: Grievance Officer Designation]]`
   - `[[TO CONFIRM: Grievance Officer Email Address]]`
   - `[[TO CONFIRM: Grievance Officer Postal Address, India]]`
   - `[[TO CONFIRM: statutory grievance resolution timeline, e.g. within 30 days]]`

#### In `src/content/legal/terms.ts`
1. **Section 10 (Limitation of Liability):**
   - `[[TO CONFIRM: lawyer to set liability cap and exclusions, e.g. total aggregate liability limited to INR 1,000 or actual fees paid in the preceding three months]]`
2. **Section 12 (Governing Law & Jurisdiction):**
   - `[[TO CONFIRM: city and state in India, e.g. Bengaluru, Karnataka, India]]`
3. **Section 13 (Contact):**
   - `[[TO CONFIRM: official contact email address]]`

---

## 2. Safety Guards Implemented in Code

- **Draft Banner:** While any `[[TO CONFIRM` string exists in the rendered content, both `/privacy` and `/terms` automatically render a visible warning banner: `"DRAFT: not yet reviewed by a lawyer"`.
- **Search Engine Indexing Guard:** While placeholders remain, both pages emit `<meta name="robots" content="noindex, nofollow"/>` regardless of environment settings.
- **Sitemap Exclusion:** `/privacy` and `/terms` are excluded from `/sitemap.xml` while draft placeholders remain. Once all placeholders are resolved and `NEXT_PUBLIC_ALLOW_INDEXING="true"`, they automatically appear in the sitemap.

---

## 3. Owner Action Checklist Before Launch

- [ ] **Supply Business Details:** Provide official business registration, registered address, GSTIN, and corporate email.
- [ ] **Assign Grievance Officer:** Appoint a named Grievance Officer with an official email address as required under Indian IT and DPDP regulations.
- [ ] **Define Retention Schedule:** Finalize the inquiry retention period (recommended: 12 months or upon request).
- [ ] **Jurisdiction City:** Specify your corporate legal jurisdiction (e.g., Bengaluru, Mumbai, Delhi).
- [ ] **Lawyer Sign-off:** Have an advocate review limitation of liability clauses, DPDP notice alignment, and client responsibility sections.
- [ ] **Resolve Placeholders:** Replace all `[[TO CONFIRM: ...]]` strings in `src/content/legal/privacy.ts` and `src/content/legal/terms.ts`.
- [ ] **Verify `npm run legal:check`:** Confirm the audit command passes with 0 remaining placeholders.
