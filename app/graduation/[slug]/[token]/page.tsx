import { notFound, redirect } from "next/navigation";
import GraduationExperience from "../../components/GraduationExperience";
import { graduationMetadata } from "../../metadata";
import { findInvitation } from "../../server/invitations";
import { invitationPath } from "../../utils/invitations";

export const dynamic = "force-dynamic";
export const metadata = { ...graduationMetadata, robots: { index: false, follow: false }, referrer: "no-referrer" as const };

export default async function PrivateGraduationPage({ params }: { params: Promise<{ slug: string; token: string }> }) {
  const { slug, token } = await params;
  const invitation = findInvitation(token);
  if (!invitation) notFound();
  if (slug !== invitation.slug) redirect(invitationPath(invitation));
  return <GraduationExperience guestName={invitation.name} invitationToken={invitation.token} />;
}
