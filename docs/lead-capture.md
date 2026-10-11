# Lead Capture & Delivery Setup

This document describes how to connect the website's contact form (`/api/contact`) to Google Sheets or an automation runner (n8n), ensuring zero leads are lost.

---

## 1. Setup A: Google Apps Script Web App (Direct to Google Sheets)

This option requires no third-party automation tools or paid subscriptions. Google Apps Script receives the lead and appends it directly to your Google Sheet.

> **Note on Headers**: Google Apps Script web apps do not have access to custom request headers (like `x-webhook-secret`). Therefore, when using Google Apps Script, set `LEAD_WEBHOOK_SECRET_MODE=body` in your `.env.local` so the secret is passed securely inside the JSON payload.

### Step 1: Create the Google Sheet
1. Create a new Google Sheet named `The Business Work - Leads`.
2. Name the first tab (sheet) `Leads`.
3. In row 1, set the following header columns (columns A to I):
   - **A1**: `receivedAt`
   - **B1**: `name`
   - **C1**: `business`
   - **D1**: `email`
   - **E1**: `phone`
   - **F1**: `service`
   - **G1**: `problem`
   - **H1**: `consent`
   - **I1**: `source`

### Step 2: Add the Apps Script Code
1. In your Google Sheet, click **Extensions** > **Apps Script**.
2. Replace all existing code in `Code.gs` with the following script:

```javascript
/**
 * Google Apps Script Web App for "The Business Work" Lead Capture
 */
var CONFIG = {
  SHEET_NAME: "Leads",
  // Set your shared secret here (must match LEAD_WEBHOOK_SECRET in .env.local):
  SHARED_SECRET: "YOUR_SHARED_SECRET_HERE"
};

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Wait up to 10 seconds for concurrent write locks
    lock.waitLock(10000);

    if (!e || !e.postData || !e.postData.contents) {
      return responseJson({ error: "Missing post body" }, 400);
    }

    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return responseJson({ error: "Invalid JSON" }, 400);
    }

    // Verify secret if configured
    if (CONFIG.SHARED_SECRET && CONFIG.SHARED_SECRET !== "YOUR_SHARED_SECRET_HERE") {
      var providedSecret = data.secret;
      if (!providedSecret || providedSecret !== CONFIG.SHARED_SECRET) {
        return responseJson({ error: "Unauthorized" }, 401);
      }
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(CONFIG.SHEET_NAME);
      sheet.appendRow([
        "receivedAt",
        "name",
        "business",
        "email",
        "phone",
        "service",
        "problem",
        "consent",
        "source"
      ]);
    }

    // Append new row
    sheet.appendRow([
      data.receivedAt || new Date().toISOString(),
      data.name || "",
      data.business || "",
      data.email || "",
      data.phone || "",
      data.service || "",
      data.problem || "",
      data.consent === true ? "TRUE" : "FALSE",
      data.source || "website-contact-form"
    ]);

    return responseJson({ ok: true, status: "saved" }, 200);
  } catch (err) {
    return responseJson({ error: err.message || "Failed to process lead" }, 500);
  } finally {
    lock.releaseLock();
  }
}

function responseJson(payload, statusCode) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### Step 3: Deploy as a Web App
1. In the Apps Script editor, click the blue **Deploy** button > **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set the fields:
   - **Description**: `The Business Work - Lead Intake v1`
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
  "source": "website-contact-form"
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
