# Lead Capture & Delivery Setup

This document describes how to connect the website's contact form (`/api/contact`) to Google Sheets or an automation runner (n8n), ensuring zero leads are lost.

---

## 1. Setup A: Google Apps Script Web App (Direct to Google Sheets)

This option requires no third-party automation tools or paid subscriptions. Google Apps Script receives the lead and appends it directly to your Google Sheet.

> **Note on Headers**: Google Apps Script web apps do not have access to custom request headers (like `x-webhook-secret`). Therefore, when using Google Apps Script, set `LEAD_WEBHOOK_SECRET_MODE=body` in your `.env.local` so the secret is passed securely inside the JSON payload.

### Step 1: Create the Google Sheet
1. Create a new Google Sheet named `The Business Work - Leads`.
2. Name the first tab (sheet) `Leads`.
3. In row 1, set the following header columns (columns A to N):
   - **A1**: `receivedAt`
   - **B1**: `name`
   - **C1**: `business`
   - **D1**: `email`
   - **E1**: `phone`
   - **F1**: `service`
   - **G1**: `problem`
   - **H1**: `consent`
   - **I1**: `source`
   - **J1**: `page`
   - **K1**: `cta`
   - **L1**: `utm_source`
   - **M1**: `utm_medium`
   - **N1**: `utm_campaign`

*(Note: The Apps Script code automatically appends missing columns if migrating an older 9-column sheet).*

### Step 2: Add the Apps Script Code
1. In your Google Sheet, click **Extensions** > **Apps Script**.
2. Replace all existing code in `Code.gs` with the updated script from [lead-capture.gs](../automation/google-apps-script/lead-capture.gs).

### Step 3: Deploy as a Web App
1. In the Apps Script editor, click the blue **Deploy** button > **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set the fields:
   - **Description**: `The Business Work - Lead Intake v2`
   - **Execute as**: `Me (<your-email@gmail.com>)`
   - **Who has access**: `Anyone` (Required so Next.js server can POST to it)
4. Click **Deploy**.
5. Grant permissions if prompted.
6. Copy the generated **Web App URL** (e.g. `https://script.google.com/macros/s/.../exec`).

### Step 4: Configure Next.js Environment Variables
Add to your `.env.local`:
```env
LEAD_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
LEAD_WEBHOOK_SECRET=your_generated_secret_here
LEAD_WEBHOOK_SECRET_MODE=body
```

---

## 2. Setup B: n8n Workflow (Webhook -> Google Sheets + Notifications)

If you use n8n (self-hosted or cloud), you can route leads to Google Sheets, CRM, email, and WhatsApp simultaneously.

### Workflow Nodes

1. **Webhook Node**:
   - **HTTP Method**: `POST`
   - **Path**: `/the-business-work/leads`
   - **Authentication**: `Header Auth`
   - **Header Name**: `x-webhook-secret`
   - **Header Value**: `your_shared_secret_here`
   - **Response Mode**: `On Received` (or `Last Node`, returns `{ "ok": true }`)

2. **Google Sheets Node ("Append row")**:
   - **Operation**: `Append`
   - **Document**: Select `The Business Work - Leads`
   - **Sheet**: `Leads`
   - **Mapping**:
     - `receivedAt` -> `{{ $json.body.receivedAt }}`
     - `name` -> `{{ $json.body.name }}`
     - `business` -> `{{ $json.body.business }}`
     - `email` -> `{{ $json.body.email }}`
     - `phone` -> `{{ $json.body.phone }}`
     - `service` -> `{{ $json.body.service }}`
     - `problem` -> `{{ $json.body.problem }}`
     - `consent` -> `{{ $json.body.consent }}`
     - `source` -> `{{ $json.body.source }}`
     - `page` -> `{{ $json.body.page }}`
     - `cta` -> `{{ $json.body.cta }}`
     - `utm_source` -> `{{ $json.body.utm_source }}`
     - `utm_medium` -> `{{ $json.body.utm_medium }}`
     - `utm_campaign` -> `{{ $json.body.utm_campaign }}`

3. **Optional Owner Alert (WhatsApp / Telegram / Email)**:
   - Connect an alert node to send an instant message when a lead is logged.

### Next.js Configuration for n8n
In `.env.local`:
```env
LEAD_WEBHOOK_URL=https://your-n8n-instance.com/webhook/the-business-work/leads
LEAD_WEBHOOK_SECRET=your_shared_secret_here
LEAD_WEBHOOK_SECRET_MODE=header
```

---

## 3. Expected Lead Payload Shape

The Next.js backend sends the following JSON body to `LEAD_WEBHOOK_URL`:

```json
{
  "name": "Aman Sharma",
  "business": "Sharma Diagnostics",
  "email": "aman@example.com",
  "phone": "+91 98765 43210",
  "service": "AI Agents & Chatbots",
  "problem": "Looking to automate patient appointment intake.",
  "consent": true,
  "receivedAt": "2026-10-12T01:50:00.000Z",
  "source": "website-contact-form",
  "page": "/services/ai-agents-chatbots",
  "cta": "hero",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "q4_automation"
}
```
*(If `LEAD_WEBHOOK_SECRET_MODE=body`, a `"secret": "..."` field is included in this payload).*

---

## 4. Optional Fire-and-Forget Owner Notification

If you set `NOTIFY_WEBHOOK_URL`, the server will also send a fire-and-forget alert summary after successful delivery:

```json
{
  "summary": "New enquiry: Aman Sharma (Sharma Diagnostics) - AI Agents & Chatbots"
}
```
Note: To protect prospective client privacy, the problem description text is deliberately excluded from notification webhook summaries.
