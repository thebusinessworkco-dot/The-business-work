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
