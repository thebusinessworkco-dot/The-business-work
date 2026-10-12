# Analytics, Lead Tracking & Cookie Policy Guide

This document describes how traffic measurement, lead conversion attribution, and privacy-preserving analytics are designed and implemented on **The Business Work** website.

---

## 1. Default Operational Mode: Zero-Cookie, Zero-Storage Lead Tracking

By default, the website operates with **zero third-party analytics tools, zero marketing cookies, and zero local/session storage usage**:

- **No Third-Party Scripts**: No tracking pixels (Facebook Pixel, LinkedIn Insight, Google Tag Manager) or client tracking libraries are loaded.
- **Privacy & Regulation Compliance**: Because no cookies or tracking devices are placed on visitor browsers, the default site does not require intrusive cookie consent banners under the Indian Digital Personal Data Protection Act, 2023 (DPDP Act) or European GDPR.
- **Client Performance**: Zero analytics JavaScript execution preserves fast page load times and eliminates third-party network latency.

### How Lead Conversion Attribution Works (In-Memory React State)

To measure which marketing channels and website buttons generate enquiries without tracking visitor identities across the web:

1. **First-Landing Campaign Tags**:
   - When a visitor lands on any URL containing marketing query parameters (e.g. `?utm_source=linkedin&utm_medium=post&utm_campaign=q4_launch`), the `ContactModalProvider` extracts these parameters in client memory.
   - Values are strictly sanitized (control characters stripped) and capped at 80 characters.
   - These tags are stored **in React component state only**. They are **never** written to `document.cookie`, `localStorage`, or `sessionStorage`.
2. **Call-To-Action (CTA) Tracking**:
   - When a user opens the "Discuss Your Project" modal, the button identifier (`header`, `hero`, `services`, `cta`, `service-page`, or `assistant`) and current page pathname are recorded in modal state.
3. **Submission Payload**:
   - When the user submits the form, these attribution fields (`page`, `cta`, `utm_source`, `utm_medium`, `utm_campaign`) are delivered alongside the lead to the webhook (`LEAD_WEBHOOK_URL`) and recorded in your Google Sheet or CRM.

---

## 2. WhatsApp Click Measurement: Known Technical Limitation

A common business requirement is tracking how many visitors click the "Chat on WhatsApp" button.

### Why Direct Tracking Without Analytics Tools Is Limited
Because the WhatsApp link is an external `href` pointing directly to Meta's servers (`https://wa.me/...`), standard browser navigation leaves the website immediately. Without an analytics script running, external outbound clicks cannot be tracked in server logs or spreadsheets.

### Two Possible Options to Implement in Future:
1. **Cookie-Free Analytics Tool**:
   - Tools like Plausible Analytics or Umami can record custom outbound link click events without setting persistent cookies or tracking individual users across websites.
2. **Server-Side Redirect Counter**:
   - Route WhatsApp clicks through an internal endpoint (e.g. `/go/whatsapp` or `/api/track-whatsapp`) that increments a database counter or pushes an event to your webhook before issuing an HTTP 302 redirect to `https://wa.me/...`.

*(Neither option is active by default to ensure complete independence from third-party services and zero redirection delay for prospective clients).*

---

## 3. Optional Google Analytics 4 (GA4) with Explicit Consent Banner

If the business owner desires aggregate traffic analytics, Google Analytics 4 can be enabled via environment configuration.

### How It Works:
1. **Activation Switch**: Set `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` in your deployment environment variables (e.g., Vercel Project Settings).
2. **Consent-Gated Loading**:
   - When `NEXT_PUBLIC_GA_ID` is set, the website displays an accessible, non-modal cookie consent banner (`<CookieConsent />`).
   - The banner gives equal visual prominence to **"Accept"** and **"Reject"**.
   - **Crucial Privacy Guarantee**: Before the user makes a choice, zero cookies are set, `localStorage` is completely empty, and the Google Tag Manager script (`gtag/js`) is **not loaded**.
   - If the visitor clicks **"Accept"**: The choice is saved in `localStorage.setItem("tbw_cookie_consent", "accepted")`, and the GA4 script is loaded via Next.js `Script`.
   - If the visitor clicks **"Reject"**: The choice is saved as `"rejected"`, the banner closes, and no tracking script is ever injected.
3. **Deactivated State (Default)**:
   - When `NEXT_PUBLIC_GA_ID` is left empty or unset, the consent banner is completely disabled, no scripts are loaded, and no browser storage is accessed.

---

## 4. Optional Cloudflare Turnstile Spam Protection

If the contact form experiences automated spam submissions, Cloudflare Turnstile can be enabled as a privacy-first alternative to CAPTCHA:

1. **Environment Variables**:
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: Public site key provided by Cloudflare.
   - `TURNSTILE_SECRET_KEY`: Private secret key stored only on the server.
2. **Behavior**:
   - When both keys are configured, the Turnstile challenge widget mounts inside the `ContactModal` only when the user opens the modal.
   - The verification script (`challenges.cloudflare.com`) is loaded on-demand.
   - The backend `/api/contact` verifies the token with Cloudflare's `siteverify` endpoint before delivering the lead.
3. **Free Tier**:
   - Cloudflare Turnstile offers a free tier (allowing up to 1 million siteverifies per month; verify current terms at cloudflare.com).
4. **Content Security Policy (CSP)**:
   - The CSP in `frontend/next.config.mjs` explicitly permits `https://challenges.cloudflare.com` under `script-src` and `frame-src`.
