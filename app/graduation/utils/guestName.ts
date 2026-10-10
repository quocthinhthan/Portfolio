/** Preserve Vietnamese names; strip markup, controls, bidi overrides and layout-breaking input. */
export function sanitizeGuestName(value: unknown): string {
  if (typeof value !== "string") return "";
  const clean = value.normalize("NFC").replace(/<[^>]*>/g, "")
    .replace(/[^\p{L}\p{M}\p{N}\s.'’\-]/gu, "").replace(/\s+/g, " ").trim();
  return Array.from(clean).slice(0, 48).join("").trim();
}

/** Build from an existing invitation, never turn a free-form name into a private link. */
export function createInvitationUrl(baseUrl: string, invitation?: { slug: string; token: string }): string {
  if (!invitation) return new URL("/graduation", baseUrl).toString();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(invitation.slug) || !/^[A-Za-z0-9]{6}$/.test(invitation.token)) throw new Error("Invalid invitation link.");
  return new URL(`/graduation/${invitation.slug}/${invitation.token}`, baseUrl).toString();
}
