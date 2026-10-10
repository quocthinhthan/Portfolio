import { graduationConfig } from "../graduation.config";
import { sanitizeGuestName } from "../utils/guestName";
import { validateRSVP, type RSVPRequest } from "../utils/rsvp";

export type { RSVPInput } from "../utils/rsvp";
export type NoteInput = { name: string; message: string };
export type GuestNote = NoteInput & { id: string };
export type SubmissionResult = { mode: "demo" | "live" };

export interface InvitationService {
  submitRSVP: (input: RSVPRequest) => Promise<SubmissionResult>;
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

// Credentials stay in the server route. Guestbook notes remain a separate demo.
export const invitationService: InvitationService = {
  async submitRSVP(input) {
    const payload = validateRSVP(input);
    if (graduationConfig.responses.mode === "demo") return { mode: "demo" };
    let response: Response;
    try {
      response = await fetch("/api/graduation/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(25_000),
      });
    } catch {
      throw new Error("Chưa nhận được xác nhận. Bạn thử gửi lại nhé; phản hồi sẽ không bị lưu trùng.");
    }
    const result = await response.json().catch(() => null);
    if (!response.ok || result?.ok !== true) {
      throw new Error(result?.error || "Chưa gửi được. Bạn thử lại nhé.");
    }
    return { mode: "live" };
  },
  async submitNote(input) {
    const clean = validate(input, true);
    return { mode: "demo", note: { ...clean, id: crypto.randomUUID() } };
  },
};
