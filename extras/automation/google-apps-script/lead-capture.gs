/**
 * Google Apps Script Web App for "The Business Work" Lead Capture
 * Supports core lead data plus conversion context (page, cta, utm tags).
 * Safely appends missing headers if migrating from an older sheet structure.
 */
var CONFIG = {
  SHEET_NAME: "Leads",
  // Set your shared secret here (must match LEAD_WEBHOOK_SECRET in .env.local):
  SHARED_SECRET: "YOUR_SHARED_SECRET_HERE"
};

var EXPECTED_HEADERS = [
  "receivedAt",
  "name",
  "business",
  "email",
  "phone",
  "service",
  "problem",
  "consent",
  "source",
  "page",
  "cta",
  "utm_source",
  "utm_medium",
  "utm_campaign"
];

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
      sheet.appendRow(EXPECTED_HEADERS);
    } else {
      var lastCol = sheet.getLastColumn();
      if (lastCol > 0) {
        var existingHeaders = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
        EXPECTED_HEADERS.forEach(function(h) {
          if (existingHeaders.indexOf(h) === -1) {
            sheet.getRange(1, ++lastCol).setValue(h);
            existingHeaders.push(h);
          }
        });
      } else {
        sheet.appendRow(EXPECTED_HEADERS);
      }
    }

    // Map row values dynamically matching header positions
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var row = headers.map(function(header) {
      switch (header) {
        case "receivedAt": return data.receivedAt || new Date().toISOString();
        case "name": return data.name || "";
        case "business": return data.business || "";
        case "email": return data.email || "";
        case "phone": return data.phone || "";
        case "service": return data.service || "";
        case "problem": return data.problem || "";
        case "consent": return data.consent === true ? "TRUE" : "FALSE";
        case "source": return data.source || "website-contact-form";
        case "page": return data.page || "";
        case "cta": return data.cta || "";
        case "utm_source": return data.utm_source || "";
        case "utm_medium": return data.utm_medium || "";
        case "utm_campaign": return data.utm_campaign || "";
        default: return "";
      }
    });

    sheet.appendRow(row);

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
