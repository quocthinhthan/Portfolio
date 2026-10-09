import { graduationConfig } from "../graduation.config";
import { sanitizeGuestName } from "../utils/guestName";

export type RSVPInput = { name: string; message: string; attending: boolean };
export type NoteInput = { name: string; message: string };
export type GuestNote = NoteInput & { id: string };
export type SubmissionResult = { mode: "demo" | "live" };

export interface InvitationService {
  submitRSVP: (input: RSVPInput) => Promise<SubmissionResult>;
  submitNote: (input: NoteInput) => Promise<SubmissionResult & { note: GuestNote }>;
}

function validate(input: NoteInput, messageRequired = false): NoteInput {
  const name = sanitizeGuestName(input.name);
  const message = input.message.trim();
  if (!name) throw new Error("Bạn hãy điền tên để Thịnh nhận ra nhé.");
  if (message.length > 600) throw new Error("Lời nhắn tối đa 600 ký tự nhé.");
  if (messageRequired && !message) throw new Error("Bạn hãy viết một lời nhắn nhé.");
  return { name, message };
}

function requireDemo() {
  if (graduationConfig.responses.mode !== "demo") {
    throw new Error("Sổ lưu niệm chưa sẵn sàng nhận tin. Bạn thử lại sau nhé.");
  }
}

// Replace this adapter with your API/Supabase/Firebase implementation.
// On the server: validate again, add rate limits, and moderate notes before publishing.
// Never put privileged API keys in this client-side module.
export const invitationService: InvitationService = {
  async submitRSVP(input) {
    requireDemo(); validate(input);
    return { mode: "demo" };
  },
  async submitNote(input) {
    requireDemo();
    const clean = validate(input, true);
    return { mode: "demo", note: { ...clean, id: crypto.randomUUID() } };
  },
};
