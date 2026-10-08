export type Ceremony = {
  date: string; startTime: string; endTime: string; location: string;
  address: string; description: string;
};

export function validDate(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const parsed = new Date(`${date}T00:00:00Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date;
}

export function vietnamDateKey(now: Date): string {
  // Vietnam has a fixed UTC+07 offset and no daylight saving time.
  return new Date(now.getTime() + 7 * 3600000).toISOString().slice(0, 10);
}

export function ceremonyStart(ceremony: Pick<Ceremony, "date" | "startTime">): Date | null {
  if (!validDate(ceremony.date) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(ceremony.startTime)) return null;
  return new Date(`${ceremony.date}T${ceremony.startTime}:00+07:00`);
}

export function displayDate(date: string): string {
  return validDate(date) ? date.split("-").reverse().join(" · ") : "Sẽ thông báo";
}

export function countdownState(ceremony: Pick<Ceremony, "date" | "startTime">, now: Date) {
  if (!validDate(ceremony.date)) return { status: "unconfirmed" as const };
  const today = vietnamDateKey(now);
  if (today === ceremony.date) return { status: "today" as const };
  if (today > ceremony.date) return { status: "past" as const };
  const start = ceremonyStart(ceremony);
  if (!start) return { status: "unconfirmed" as const };
  const seconds = Math.max(0, Math.floor((start.getTime() - now.getTime()) / 1000));
  return { status: "upcoming" as const, days: Math.floor(seconds / 86400), hours: Math.floor(seconds / 3600) % 24, minutes: Math.floor(seconds / 60) % 60, seconds: seconds % 60 };
}

const escapeIcs = (text: string) => text.replace(/\\/g, "\\\\").replace(/\r\n|\r|\n/g, "\\n").replace(/;/g, "\\;").replace(/,/g, "\\,");
const stamp = (date: Date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");

/** RFC 5545 line folding counts UTF-8 bytes, including Vietnamese characters. */
export function foldIcsLine(line: string): string {
  const encoder = new TextEncoder();
  let result = "", bytes = 0;
  for (const char of line) {
    const length = encoder.encode(char).length;
    if (bytes + length > 75) { result += "\r\n "; bytes = 1; }
    result += char; bytes += length;
  }
  return result;
}

export function createCalendarEvent(ceremony: Ceremony, name: string, now = new Date()): string | null {
  const start = ceremonyStart(ceremony);
  if (!start) return null;
  let end = ceremony.endTime ? ceremonyStart({ date: ceremony.date, startTime: ceremony.endTime }) : new Date(start.getTime() + 2 * 3600000);
  if (!end) return null;
  if (end <= start) end = new Date(end.getTime() + 86400000);
  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//TQT//Graduation Invitation//VI", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
    "BEGIN:VEVENT", `UID:graduation-${ceremony.date}@thanquocthinh.id.vn`, `DTSTAMP:${stamp(now)}`,
    `DTSTART:${stamp(start)}`, `DTEND:${stamp(end)}`, `SUMMARY:${escapeIcs(`Graduation Ceremony — ${name}`)}`,
    `LOCATION:${escapeIcs([ceremony.location, ceremony.address].filter(Boolean).join(", "))}`,
    `DESCRIPTION:${escapeIcs(ceremony.description)}`, "END:VEVENT", "END:VCALENDAR", "",
  ].map(foldIcsLine).join("\r\n");
}

export function downloadCalendar(ceremony: Ceremony, name: string) {
  const calendar = createCalendarEvent(ceremony, name);
  if (!calendar) return;
  const url = URL.createObjectURL(new Blob([calendar], { type: "text/calendar;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url; link.download = "graduation-than-quoc-thinh.ics";
  document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
