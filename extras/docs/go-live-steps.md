# Go-Live Steps

This is the step-by-step guide to launch **The Business Work** website on Vercel. Written in plain English from the existing code and documentation.

---

## 1. Vercel Project Settings

1. Connect your Git repository to **Vercel**.
2. In the project setup screen, configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Node.js Version**: `20.x` (in Project Settings > General > Node.js Version)
3. Leave build command as default (`next build`) and output directory as default (`.next`).

---

## 2. Environment Variables Table

Configure these variables in **Vercel Project Settings > Environment Variables**.

> **Important on Vercel**: Preview and Production deployments both run Next.js in production mode (`NODE_ENV=production`). In production mode, the contact form strictly requires `LEAD_WEBHOOK_URL`. If you test the contact form on a Preview deployment without setting `LEAD_WEBHOOK_URL`, submissions will fail. Set `LEAD_WEBHOOK_URL` for both Preview and Production.

| Name | What it is for | Secret? | Environments |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Public canonical site URL (e.g. `https://thebusinesswork.com`). Used for metadata, sitemaps, and origin checks. Must start with `https://` in production. | No | Preview & Production |
| `NEXT_PUBLIC_ALLOW_INDEXING` | Controls search engine crawlers. Keep `false` until launch day, then set `true`. | No | Production only (`false` in Preview) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 Measurement ID (e.g. `G-XXXXXXXXXX`). Optional; consent banner appears only when set. | No | Production |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console HTML verification token. | No | Production |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Bing Webmaster Tools verification token. | No | Production |
| `LEAD_WEBHOOK_URL` | Webhook URL where submitted leads are delivered (Google Apps Script web app or n8n). Must be HTTPS in production. | Yes | Preview & Production |
| `LEAD_WEBHOOK_SECRET` | Shared secret key for authenticating webhook delivery. | Yes | Preview & Production |
| `LEAD_WEBHOOK_SECRET_MODE` | Secret delivery mode: `header` (for n8n) or `body` (required for Google Apps Script). | No | Preview & Production |
| `NOTIFY_WEBHOOK_URL` | Optional second webhook for instant alerts (e.g. WhatsApp/Email notification). | Yes | Production |
| `UPSTASH_REDIS_REST_URL` | Optional Upstash Redis URL for distributed rate limiting across serverless instances. | Yes | Production |
| `UPSTASH_REDIS_REST_TOKEN` | Optional Upstash Redis REST token. | Yes | Production |
| `NEXT_PUBLIC_ASSISTANT_ENABLED` | Controls website assistant widget (`true` by default; set `false` to hide). | No | Preview & Production |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Optional Cloudflare Turnstile public site key for spam challenge widget. | No | Preview & Production |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile server secret key for server-side verification. | Yes | Preview & Production |

---

## 3. Google Sheet and Apps Script Setup

To receive form leads directly in Google Sheets without paid tools:
1. Follow the steps in [`extras/docs/lead-capture.md`](lead-capture.md).
2. Create your Google Sheet named `The Business Work - Leads` with sheet tab `Leads`.
3. Add the code from [`extras/automation/google-apps-script/lead-capture.gs`](../automation/google-apps-script/lead-capture.gs) into **Extensions > Apps Script**.
4. Set your `SECRET_KEY` in the Apps Script file to match `LEAD_WEBHOOK_SECRET`.
5. Deploy as Web App (**Execute as: Me**, **Who has access: Anyone**).
6. Copy the `/exec` URL into `LEAD_WEBHOOK_URL` and set `LEAD_WEBHOOK_SECRET_MODE=body`.

---

## 4. Domain and DNS Configuration

1. In Vercel, navigate to **Settings > Domains**.
2. Add your custom domain (e.g. `thebusinesswork.com`).
3. Set up DNS records with your registrar:
   - **Apex domain**: A record pointing to `76.76.21.21`.
   - **www subdomain**: CNAME record pointing to `cname.vercel-dns.com`.
4. Pick one canonical host (e.g. redirect `www` to root apex domain, or vice versa).
5. Verify that SSL certificates issue automatically and `NEXT_PUBLIC_SITE_URL` begins with `https://`.

---

## 5. Pre-Launch Gate Check

Before pointing public traffic, test your production values locally from the repo root:

```bash
npm run preflight -- --production --env-file <path-to-file-with-production-values>
```

All `FAIL` items must be resolved:
- Business details in `frontend/src/lib/site.ts` must be real (`PASS`).
- Production site URL must begin with `https://`.
- `LEAD_WEBHOOK_URL` must begin with `https://`.
- Legal placeholders in `privacy.ts` and `terms.ts` must be confirmed (`npm run legal:check`).
- If Turnstile is enabled, both public and secret keys must be present.

---

## 6. After First Deploy Verification

Deploy with `NEXT_PUBLIC_ALLOW_INDEXING=false` first to verify the live site safely:

1. Run the smoke test against your production URL:
   ```bash
   npm run smoke -- https://yourdomain.com --expect-noindex
   ```
2. Open your live website in a browser.
3. Open the contact modal ("Discuss Your Project").
4. Fill in a test enquiry with your real name, email, and phone.
5. Submit the form. Verify the success state in the modal.
6. Open your Google Sheet and confirm the new row appears with all 14 columns populated.

---

## 7. Turn on Search Engine Indexing

Once lead delivery and site pages are confirmed working:

1. In Vercel Project Settings, change `NEXT_PUBLIC_ALLOW_INDEXING` to `true`.
2. Redeploy the production branch in Vercel.
3. Verify that the site now allows search engines:
   ```bash
   npm run smoke -- https://yourdomain.com --expect-indexable
   ```
4. Verify `/robots.txt` returns `Allow: /` and links to `https://yourdomain.com/sitemap.xml`.

---

## 8. Search Console and Bing Submission

1. Open **Google Search Console**:
   - Add property for your HTTPS domain.
   - Verify ownership via DNS TXT record or `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
   - Under **Sitemaps**, submit `https://yourdomain.com/sitemap.xml`.
2. Open **Bing Webmaster Tools**:
   - Add site or import from Google Search Console.
   - Verify ownership via `NEXT_PUBLIC_BING_SITE_VERIFICATION`.
   - Submit `https://yourdomain.com/sitemap.xml`.

---

## 9. Optional Integrations

- **Upstash Redis**: Set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to enable shared rate limiting across serverless instances.
- **Cloudflare Turnstile**: Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` for invisible bot protection on form submissions.
- **Google Analytics 4**: Set `NEXT_PUBLIC_GA_ID` (e.g. `G-XXXXXXXXXX`). The website will automatically render the cookie consent banner, loading GA4 only when visitors click "Accept".
