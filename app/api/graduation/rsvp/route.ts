import { validateRSVP } from "../../../graduation/utils/rsvp";
import { sanitizeGuestName } from "../../../graduation/utils/guestName";
import { findInvitation } from "../../../graduation/server/invitations";

export const runtime = "nodejs";

const unavailable = "Chưa gửi được phản hồi. Bạn thử lại sau một chút nhé.";
function failure(error: string, status: number) {
  return Response.json({ ok: false, error }, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const scriptUrl = process.env.RSVP_SCRIPT_URL;
  const secret = process.env.RSVP_SCRIPT_SECRET;
  if (!scriptUrl || !secret || secret.length < 32) return failure(unavailable, 503);
  // Only a configured Google deployment can receive credentials.
  let url: URL;
  try { url = new URL(scriptUrl); } catch { return failure(unavailable, 503); }
  if (url.protocol !== "https:" || url.hostname !== "script.google.com" || !/^\/macros\/s\/[^/]+\/exec$/.test(url.pathname)) {
    return failure(unavailable, 503);
  }
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return failure("Phản hồi không hợp lệ.", 403);
  if (!request.headers.get("content-type")?.includes("application/json")) return failure("Phản hồi không hợp lệ.", 415);

  let input;
  try {
    // Bound the body even for requests without a Content-Length header.
    const reader = request.body?.getReader();
    if (!reader) return failure("Phản hồi không hợp lệ.", 400);
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.length;
      if (length > 8_192) { await reader.cancel(); return failure("Phản hồi quá dài.", 413); }
      chunks.push(value);
    }
    input = validateRSVP(JSON.parse(Buffer.concat(chunks).toString("utf8")));
    input.name = sanitizeGuestName(input.name);
    if (!input.name) return failure("Bạn hãy điền tên để Thịnh nhận ra nhé.", 400);
  } catch (error) {
    return failure(error instanceof SyntaxError ? "Phản hồi không hợp lệ." : error instanceof Error ? error.message : "Phản hồi không hợp lệ.", 400);
  }

  const invitation = findInvitation(input.invitationToken);
  if (!invitation) return failure("Đường dẫn thiệp không hợp lệ hoặc đã ngừng nhận phản hồi.", 403);
  const responseId = `invite_${invitation.id}`;

  try {
    const upstream = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Ignore all client-supplied IDs/recipient names; never forward the bearer token.
      body: JSON.stringify({
        schemaVersion: 2, responseId, invitationId: invitation.id, invitedName: invitation.name,
        name: input.name, message: input.message, attendance: input.attendance, website: "", secret,
      }),
      signal: AbortSignal.timeout(20_000),
      cache: "no-store",
      redirect: "follow",
    });
    const result = await upstream.json();
    if (result?.code === "rate_limited") return failure("Bạn vừa gửi nhiều phản hồi. Chờ một phút rồi thử lại nhé.", 429);
    if (result?.schemaVersion !== 2) return failure("Phần nhận phản hồi đang được cập nhật. Bạn thử lại sau nhé.", 503);
    if (!upstream.ok || result?.ok !== true || result?.responseId !== responseId || result?.invitationId !== invitation.id) return failure(unavailable, 502);
    return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return failure("Chưa nhận được xác nhận. Bạn thử gửi lại nhé; phản hồi sẽ không bị lưu trùng.", 502);
  }
}
