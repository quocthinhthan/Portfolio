export const attendanceStatuses = ["yes", "maybe", "no"] as const;
export type AttendanceStatus = (typeof attendanceStatuses)[number];
export type RSVPInput = { name: string; message: string; attendance: AttendanceStatus };
export type RSVPRequest = RSVPInput & { invitationToken: string; website: string };

export function validateRSVP(value: unknown): RSVPRequest {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Phản hồi không hợp lệ. Bạn thử lại nhé.");
  }
  const input = value as Record<string, unknown>;
  if (typeof input.invitationToken !== "string" || !/^[A-Za-z0-9]{6}$/.test(input.invitationToken)) {
    throw new Error("Bạn hãy mở đường dẫn thiệp Thịnh đã gửi riêng nhé.");
  }
  if (!attendanceStatuses.includes(input.attendance as AttendanceStatus)) {
    throw new Error("Bạn hãy chọn một câu trả lời nhé.");
  }
  if (typeof input.name !== "string" || !input.name.trim() || input.name.length > 48) {
    throw new Error("Bạn hãy điền tên, tối đa 48 ký tự nhé.");
  }
  if (typeof input.message !== "string" || input.message.length > 600) {
    throw new Error("Lời nhắn tối đa 600 ký tự nhé.");
  }
  if (typeof input.website !== "string" || input.website !== "") {
    throw new Error("Phản hồi không hợp lệ. Bạn thử lại nhé.");
  }
  return {
    invitationToken: input.invitationToken,
    name: input.name.normalize("NFC").trim(),
    message: input.message.normalize("NFC").trim(),
    attendance: input.attendance as AttendanceStatus,
    website: "",
  };
}
