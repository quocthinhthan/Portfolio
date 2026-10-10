import "server-only";
import registry from "../invitations/registry.json";
import { lookupInvitation, parseInvitationRegistry } from "../utils/invitations";

// The complete registry stays in the server bundle, never in Client Component props.
const invitations = parseInvitationRegistry(registry);
export function findInvitation(token: string) {
  return lookupInvitation(invitations, token);
}
