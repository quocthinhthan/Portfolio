"use client";
import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { graduationConfig as config } from "../graduation.config";
import { invitationService, type GuestNote } from "../services/invitation";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import s from "../graduation.module.css";

export default function Guestbook({ guestName }: { guestName: string }) {
  const [notes, setNotes] = useState<GuestNote[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const busy = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    busy.current = true; setPending(true); setError(""); setStatus("");
    try {
      const result = await invitationService.submitNote({ name: String(data.get("name") || ""), message: String(data.get("message") || "") });
      setNotes(previous => [result.note, ...previous].slice(0, 6));
      setStatus(result.mode === "demo" ? "Đã thêm lời nhắn vào bản xem trước. Chưa gửi đến Thịnh; lời nhắn sẽ mất khi tải lại trang." : "Cảm ơn bạn đã để lại một lời chúc cho chương mới.");
      form.reset();
    } catch (error) { setError(error instanceof Error ? error.message : "Chưa gửi được. Bạn thử lại nhé."); }
    finally { busy.current = false; setPending(false); }
  }
  return <section className={s.guestbookSection} aria-labelledby="guestbook-title"><div className={s.section}>
    <Reveal className={s.sectionHeading}><div><SectionLabel>A LITTLE WORD, A LASTING MEMORY</SectionLabel><h2 id="guestbook-title" className={s.editorialTitle}>Leave a note<br /><em>for my next chapter.</em></h2></div><p className={s.bodyCopy}>Một lời chúc hôm nay,<br />một điều ấm áp để mai này đọc lại.</p></Reveal>
    <Reveal><form className={s.noteForm} onSubmit={submit} aria-busy={pending}><div className={s.noteName}><label htmlFor="note-name">Tên của bạn</label><input id="note-name" name="name" autoComplete="name" required maxLength={48} defaultValue={guestName} placeholder="Bạn là…" disabled={pending} /></div><div className={s.noteMessage}><label htmlFor="note-message">Lời nhắn cho chương mới</label><textarea id="note-message" name="message" required maxLength={600} rows={2} placeholder="Chúc Thịnh…" disabled={pending} /></div><button type="submit" className={s.primaryButton} disabled={pending}>{pending ? "Đang thêm…" : "Leave a note"}<ArrowUpRight size={16} aria-hidden /></button></form>
      {config.responses.mode === "demo" && <p className={s.demoNotice}>Sổ lưu niệm đang ở chế độ demo. Lời nhắn chỉ hiển thị trong phiên xem này.</p>}
      <p className={s.formStatus} role="status">{status}</p>{error && <p className={s.formError} role="alert">{error}</p>}
    </Reveal>
    <div className={s.notes}>{notes.length ? notes.map(note => <blockquote key={note.id} className={s.note}><span className={s.quoteMark} aria-hidden>“</span><p>{note.message}</p><footer>— {note.name}</footer></blockquote>) : <div className={s.emptyNote}><span aria-hidden>“</span><p>Trang giấy còn trống.<br /><em>Mình dành chỗ này cho lời nhắn của bạn.</em></p><span className={s.microLabel}>THE MEMORY BOOK · {config.student.year}</span></div>}</div>
  </div></section>;
}
