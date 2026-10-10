import GraduationExperience from "./components/GraduationExperience";
import { graduationMetadata } from "./metadata";

export const metadata = graduationMetadata;

export default function GraduationPage() {
  // Query-string names are untrusted. Personalization requires a valid private link.
  return <GraduationExperience guestName="" />;
}
