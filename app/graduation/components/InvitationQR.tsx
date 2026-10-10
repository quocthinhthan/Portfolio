import type { ReactNode } from "react";
import { graduationConfig } from "../graduation.config";
import { createInvitationUrl } from "../utils/guestName";

/** Optional integration point. Supply a local QR encoder as renderCode; never shown by default. */
export default function InvitationQR({ invitation, renderCode }: { invitation?: { name: string; slug: string; token: string }; renderCode: (url: string) => ReactNode }) {
  const url = createInvitationUrl(graduationConfig.siteUrl, invitation);
  return <figure aria-label="QR thiệp mời tốt nghiệp">{renderCode(url)}<figcaption><a href={url}>Mở thiệp mời{invitation ? ` dành cho ${invitation.name}` : ""}</a></figcaption></figure>;
}
