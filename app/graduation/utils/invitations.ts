export type Invitation = { id: string; name: string; slug: string; token: string; active: boolean };
export const invitationTokenPattern = /^[A-Za-z0-9]{6}$/;
export const invitationIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function invitationSlug(name: string): string {
  return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "khach-moi";
}

export function invitationPath(invitation: Pick<Invitation, "slug" | "token">): string {
  return `/graduation/${invitation.slug}/${invitation.token}`;
}

export function parseInvitationRegistry(value: unknown): Invitation[] {
  const registry = value as { version?: unknown; invitations?: unknown } | null;
  if (!registry || registry.version !== 1 || !Array.isArray(registry.invitations)) {
    throw new Error("Invalid invitation registry. Run npm run invitations:generate.");
  }
  const ids = new Set<string>();
  const tokens = new Set<string>();
  return registry.invitations.map((value: unknown) => {
    const entry = value as Partial<Invitation> | null;
    if (!entry || typeof entry.id !== "string" || !invitationIdPattern.test(entry.id)
      || typeof entry.name !== "string" || !entry.name.trim() || entry.name.length > 48
      || /[<>\p{Cc}\p{Cf}]/u.test(entry.name)
      || typeof entry.slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug)
      || typeof entry.token !== "string" || !invitationTokenPattern.test(entry.token)
      || typeof entry.active !== "boolean" || ids.has(entry.id.toLowerCase()) || tokens.has(entry.token)) {
      throw new Error("Invalid or duplicate invitation. Run npm run invitations:generate.");
    }
    ids.add(entry.id.toLowerCase()); tokens.add(entry.token);
    return { id: entry.id.toLowerCase(), name: entry.name.normalize("NFC").trim(), slug: entry.slug, token: entry.token, active: entry.active };
  });
}

export function lookupInvitation(invitations: readonly Invitation[], token: string): Invitation | undefined {
  if (!invitationTokenPattern.test(token)) return undefined;
  return invitations.find(entry => entry.active && entry.token === token);
}
