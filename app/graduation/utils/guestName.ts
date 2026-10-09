/** Preserve Vietnamese names; strip markup, controls, bidi overrides and layout-breaking input. */
export function sanitizeGuestName(value: unknown): string {
  if (typeof value !== "string") return "";
  const clean = value.normalize("NFC").replace(/<[^>]*>/g, "")
    .replace(/[^\p{L}\p{M}\p{N}\s.'’\-]/gu, "").replace(/\s+/g, " ").trim();
  return Array.from(clean).slice(0, 48).join("").trim();
}

/** URL ready to share or pass to any QR encoder; no third-party guest data transmission. */
export function createInvitationUrl(baseUrl: string, guestName = ""): string {
  const url = new URL("/graduation", baseUrl);
  const name = sanitizeGuestName(guestName);
  if (name) url.searchParams.set("to", name);
  return url.toString();
}
