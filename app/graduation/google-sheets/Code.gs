/** Copy into the existing Apps Script project, run setupRSVP, then deploy a new version. */
const RSVP_HEADERS = ["response_id", "created_at", "updated_at", "name", "attendance", "attendance_label", "message", "invitation_id", "invited_name"];
const RSVP_LABELS = { yes: "Sẽ tham dự", maybe: "Sẽ báo lại", no: "Không tham dự" };
const RSVP_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Run once from the editor; safe to repeat, without resetting responses or secret. */
function setupRSVP() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  if (!book) throw new Error("Hãy mở Apps Script từ menu Tiện ích mở rộng của Google Sheet.");
  book.setSpreadsheetTimeZone("Asia/Ho_Chi_Minh");
  let sheet = book.getSheetByName("RSVP");
  if (!sheet) sheet = book.insertSheet("RSVP");
  migrateHeaders_(sheet);
  checkHeaders_(sheet);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, RSVP_HEADERS.length).setFontWeight("bold").setBackground("#f0e8d8");
  sheet.setColumnWidth(1, 290);
  sheet.setColumnWidths(2, 2, 160);
  sheet.setColumnWidth(4, 190);
  sheet.setColumnWidth(5, 100);
  sheet.setColumnWidth(6, 150);
  sheet.setColumnWidth(7, 360);
  sheet.setColumnWidth(8, 290);
  sheet.setColumnWidth(9, 190);
  sheet.getRange("B2:C").setNumberFormat("dd/MM/yyyy HH:mm:ss");
  sheet.getRange("G2:G").setWrap(true);
  const filter = sheet.getFilter();
  if (filter && filter.getRange().getNumColumns() < RSVP_HEADERS.length) filter.remove();
  if (!sheet.getFilter()) sheet.getRange(1, 1, sheet.getMaxRows(), RSVP_HEADERS.length).createFilter();

  const properties = PropertiesService.getScriptProperties();
  properties.setProperty("SPREADSHEET_ID", book.getId());
  if (!properties.getProperty("RSVP_SCRIPT_SECRET")) {
    properties.setProperty("RSVP_SCRIPT_SECRET", Utilities.getUuid() + Utilities.getUuid());
  }

  let summary = book.getSheetByName("TongQuan");
  if (!summary) summary = book.insertSheet("TongQuan");
  if (summary.getLastRow() === 0) {
    summary.getRange("A1:B5").setValues([
      ["Tình hình phản hồi", "Số phản hồi"],
      ["Sẽ tham dự", '=SUMPRODUCT(--(RSVP!E2:E="yes"))'],
      ["Sẽ báo lại", '=SUMPRODUCT(--(RSVP!E2:E="maybe"))'],
      ["Không tham dự", '=SUMPRODUCT(--(RSVP!E2:E="no"))'],
      ["Tổng phản hồi", "=COUNTA(RSVP!A2:A)"],
    ]);
    summary.getRange("A1:B1").setFontWeight("bold").setBackground("#f0e8d8");
    summary.setColumnWidth(1, 220);
    summary.setColumnWidth(2, 130);
    summary.setFrozenRows(1);
  }
  SpreadsheetApp.flush();
  console.log("Đã tạo RSVP và TongQuan. Secret nằm trong Project Settings > Script Properties.");
}

/** Public deployment receives server requests; no data-reading endpoint is exposed. */
function doPost(e) {
  let input;
  try {
    if (!e || !e.postData || e.postData.contents.length > 10000) return json_({ ok: false, code: "invalid" });
    input = JSON.parse(e.postData.contents);
  } catch (_) { return json_({ ok: false, code: "invalid" }); }
  const properties = PropertiesService.getScriptProperties();
  const secret = properties.getProperty("RSVP_SCRIPT_SECRET");
  if (!secret || secret.length < 32 || !input || input.secret !== secret) return json_({ ok: false, code: "unauthorized" });
  if (!validInput_(input)) return json_({ ok: false, code: "invalid" });

  // Serialize lookup + write, so concurrent retries cannot append duplicates.
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return json_({ ok: false, code: "busy" });
  try {
    if (!allowRequest_(input.invitationId)) return json_({ ok: false, code: "rate_limited" });
    const bookId = properties.getProperty("SPREADSHEET_ID");
    if (!bookId) return json_({ ok: false, code: "not_configured" });
    const sheet = SpreadsheetApp.openById(bookId).getSheetByName("RSVP");
    checkHeaders_(sheet);
    const lastRow = sheet.getLastRow();
    const match = lastRow > 1 ? sheet.getRange(2, 8, lastRow - 1, 1)
      .createTextFinder(input.invitationId).matchEntireCell(true).useRegularExpression(false).findNext() : null;
    const row = match ? match.getRow() : lastRow + 1;
    const now = new Date();
    const created = match ? sheet.getRange(row, 2).getValue() : now;
    if (row > sheet.getMaxRows()) sheet.insertRowsAfter(sheet.getMaxRows(), 100);
    sheet.getRange(row, 1, 1, RSVP_HEADERS.length).setValues([[
      input.responseId, created, now, plainText_(input.name.trim()), input.attendance,
      RSVP_LABELS[input.attendance], plainText_(input.message.trim()), input.invitationId, plainText_(input.invitedName.trim()),
    ]]);
    sheet.getRange(row, 2, 1, 2).setNumberFormat("dd/MM/yyyy HH:mm:ss");
    SpreadsheetApp.flush();
    return json_({ ok: true, responseId: input.responseId, invitationId: input.invitationId });
  } catch (_) {
    // Do not return secret, guest content, spreadsheet ID, or internal error details.
    console.error("RSVP write failed. Check sheet headers and script properties.");
    return json_({ ok: false, code: "write_failed" });
  } finally { lock.releaseLock(); }
}

function validInput_(input) {
  return input.schemaVersion === 2 && typeof input.invitationId === "string" && RSVP_ID.test(input.invitationId)
    && input.responseId === "invite_" + input.invitationId
    && typeof input.invitedName === "string" && input.invitedName.trim().length > 0 && input.invitedName.length <= 48
    && typeof input.attendance === "string" && Object.prototype.hasOwnProperty.call(RSVP_LABELS, input.attendance)
    && typeof input.name === "string" && input.name.trim().length > 0 && input.name.length <= 48
    && typeof input.message === "string" && input.message.length <= 600 && input.website === "";
}

function checkHeaders_(sheet) {
  if (!sheet || sheet.getLastRow() < 1) throw new Error("Missing RSVP sheet.");
  const headers = sheet.getRange(1, 1, 1, RSVP_HEADERS.length).getValues()[0];
  if (headers.some((header, index) => header !== RSVP_HEADERS[index])) throw new Error("RSVP headers changed.");
}

/** Add H:I without overwriting old responses or owner notes in existing columns. */
function migrateHeaders_(sheet) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw new Error("Sheet đang nhận phản hồi. Bạn thử chạy setupRSVP lại sau nhé.");
  try {
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, RSVP_HEADERS.length).setValues([RSVP_HEADERS]);
      return;
    }
    const oldHeaders = sheet.getRange(1, 1, 1, 7).getValues()[0];
    if (oldHeaders.some((header, index) => header !== RSVP_HEADERS[index])) throw new Error("Không đổi tên/thứ tự cột A:G của RSVP.");
    const added = sheet.getRange(1, 8, 1, 2).getValues()[0];
    if (added[0] === "invitation_id" && added[1] === "invited_name") return;
    sheet.insertColumnsAfter(7, 2);
    sheet.getRange(1, 8, 1, 2).setValues([["invitation_id", "invited_name"]]);
    SpreadsheetApp.flush();
  } finally { lock.releaseLock(); }
}

/** Treat untrusted content as text instead of formulas, including future CSV exports. */
function plainText_(value) {
  return /^[=+\-@\t\r\n]/.test(value) ? "'" + value : value;
}

/** Basic abuse protection: 6 requests per response ID and 120 total per minute.
 * Script Cache is best-effort (Google may evict it early); this is not a hard quota.
 */
function allowRequest_(responseId) {
  const cache = CacheService.getScriptCache();
  const window = Math.floor(Date.now() / 60000);
  const perResponse = "rsvp:" + window + ":" + responseId;
  const global = "rsvp:" + window + ":all";
  const count = Number(cache.get(perResponse) || 0);
  const total = Number(cache.get(global) || 0);
  if (count >= 6 || total >= 120) return false;
  cache.put(perResponse, String(count + 1), 120);
  cache.put(global, String(total + 1), 120);
  return true;
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify({ ...value, schemaVersion: 2 })).setMimeType(ContentService.MimeType.JSON);
}
