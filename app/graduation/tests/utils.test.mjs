import { test } from "node:test";
import assert from "node:assert/strict";
import { ceremonyStart, countdownState, createCalendarEvent, displayDate, foldIcsLine, validDate, vietnamDateKey } from "../utils/calendar.ts";
import { sanitizeGuestName, createInvitationUrl } from "../utils/guestName.ts";

const ceremony = { date: "2026-11-15", startTime: "08:00", endTime: "10:00", location: "Đại học Tôn Đức Thắng", address: "Hội trường; A, B", description: "Chúc mừng\nChương mới" };

test("Vietnam timezone handles day boundaries independently of the viewer timezone", () => {
  assert.equal(ceremonyStart(ceremony).toISOString(), "2026-11-15T01:00:00.000Z");
  assert.equal(vietnamDateKey(new Date("2026-11-14T17:00:00Z")), "2026-11-15");
  assert.equal(countdownState(ceremony, new Date("2026-11-14T16:59:59Z")).status, "upcoming");
  assert.equal(countdownState(ceremony, new Date("2026-11-14T17:00:00Z")).status, "today");
  assert.equal(countdownState(ceremony, new Date("2026-11-15T16:59:59Z")).status, "today");
  assert.equal(countdownState(ceremony, new Date("2026-11-15T17:00:00Z")).status, "past");
  assert.deepEqual(countdownState(ceremony, new Date("2026-11-13T23:57:56Z")), { status: "upcoming", days: 1, hours: 1, minutes: 2, seconds: 4 });
});

test("unconfirmed or impossible dates never create a bogus event", () => {
  for (const date of ["", "2026-02-29", "2026-13-01", "2026-02-31", "not-a-date"]) {
    assert.equal(validDate(date), false);
    assert.equal(createCalendarEvent({ ...ceremony, date }, "Thịnh"), null);
  }
  assert.equal(validDate("2028-02-29"), true);
  assert.equal(ceremonyStart({ ...ceremony, startTime: "25:90" }), null);
  assert.equal(ceremonyStart({ ...ceremony, startTime: "" }), null);
  assert.equal(createCalendarEvent({ ...ceremony, endTime: "invalid" }, "Thịnh"), null);
  assert.equal(displayDate("2026-11-15"), "15 · 11 · 2026");
  assert.equal(displayDate(""), "Sẽ thông báo");
});

test("ICS is escaped, uses UTC, folds UTF-8 safely, and supports overnight events", () => {
  const calendar = createCalendarEvent(ceremony, "Thân Quốc Thịnh", new Date("2026-10-01T00:00:00Z"));
  const unfolded = calendar.replace(/\r\n /g, "");
  assert.ok(calendar.startsWith("BEGIN:VCALENDAR\r\n"));
  assert.ok(calendar.endsWith("END:VCALENDAR\r\n"));
  assert.ok(unfolded.includes("DTSTART:20261115T010000Z"));
  assert.ok(unfolded.includes("DTEND:20261115T030000Z"));
  assert.ok(unfolded.includes("LOCATION:Đại học Tôn Đức Thắng\\, Hội trường\\; A\\, B"));
  assert.ok(unfolded.includes("DESCRIPTION:Chúc mừng\\nChương mới"));
  const longLine = "SUMMARY:" + "Tốt nghiệp 🤍 ".repeat(30);
  const folded = foldIcsLine(longLine);
  assert.equal(folded.replace(/\r\n /g, ""), longLine);
  for (const line of folded.split("\r\n")) assert.ok(Buffer.byteLength(line, "utf8") <= 75);
  assert.ok(createCalendarEvent({ ...ceremony, startTime: "23:00", endTime: "01:00" }, "Thịnh").includes("DTEND:20261115T180000Z"));
  assert.ok(createCalendarEvent({ ...ceremony, endTime: "" }, "Thịnh").includes("DTEND:20261115T030000Z"));
});

test("guest names preserve Vietnamese while removing markup, controls and excess length", () => {
  assert.equal(sanitizeGuestName("  Anh   Tuấn  "), "Anh Tuấn");
  assert.equal(sanitizeGuestName("<img src=x onerror=alert(1)>Gia đình"), "Gia đình");
  assert.equal(sanitizeGuestName("Minh\u202e\u0000"), "Minh");
  assert.equal(sanitizeGuestName(null), "");
  assert.equal(Array.from(sanitizeGuestName("Thịnh".repeat(100))).length, 48);
  const url = new URL(createInvitationUrl("https://example.com", { slug: "anh-tuan", token: "Ab12Cd" }));
  assert.equal(url.pathname, "/graduation/anh-tuan/Ab12Cd");
  assert.equal(url.searchParams.has("to"), false);
  assert.equal(createInvitationUrl("https://example.com"), "https://example.com/graduation");
  assert.throws(() => createInvitationUrl("https://example.com", { slug: "../other", token: "Ab12Cd" }));
});
