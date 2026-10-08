import type { ReactNode } from "react";
import { graduationConfig } from "../graduation.config";
import { createInvitationUrl } from "../utils/guestName";

/** Optional integration point. Supply a local QR encoder as renderCode; never shown by default. */
export default function InvitationQR({ guestName = "", renderCode }: { guestName?: string; renderCode: (url: string) => ReactNode }) {
  const url = createInvitationUrl(graduationConfig.siteUrl, guestName);
  return <figure aria-label="QR thiệp mời tốt nghiệp">{renderCode(url)}<figcaption><a href={url}>Mở thiệp mời{guestName ? ` dành cho ${guestName}` : ""}</a></figcaption></figure>;
}
