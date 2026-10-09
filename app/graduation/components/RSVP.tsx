"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, GraduationCap, Heart } from "lucide-react";
import { graduationConfig as config } from "../graduation.config";
import { invitationService, type SubmissionResult } from "../services/invitation";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import s from "../graduation.module.css";

export default function RSVP({ guestName }: { guestName: string }) {
  const [attending, setAttending] = useState<boolean | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [draft, setDraft] = useState({ name: guestName, message: "" });
  const successRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  useEffect(() => { if (result) successRef.current?.focus({ preventScroll: true }); }, [result]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (attending === null || busy.current) return;
    busy.current = true; setPending(true); setError("");
    const data = new FormData(event.currentTarget);
    const input = { name: String(data.get("name") || ""), message: String(data.get("message") || "") };
    setDraft(input);
    try { setResult(await invitationService.submitRSVP({ ...input, attending })); }
    catch (error) { setError(error instanceof Error ? error.message : "Chưa gửi được. Bạn thử lại nhé."); }
    finally { busy.current = false; setPending(false); }
  }
  return <section id="rsvp" className={`${s.section} ${s.rsvpSection}`} aria-labelledby="rsvp-title">
    <Reveal className={s.rsvpIntro}><SectionLabel>SAVE A LITTLE TIME FOR ME</SectionLabel><h2 id="rsvp-title" className={s.editorialTitle}>Will I see<br /><em>you there?</em></h2><p className={s.bodyCopy}>Một cái ôm, một tấm ảnh,<br />một kỷ niệm có bạn trong đó.<br />Thịnh rất mong được gặp bạn.</p><Heart size={23} strokeWidth={1} className={s.rsvpHeart} aria-hidden /></Reveal>
    <Reveal className={s.formPanel}>
      <div className={s.rsvpPanelHeader}><span>YOUR REPLY</span><span aria-hidden>✧</span></div>
      {result ? <div ref={successRef} className={s.success} role="status" tabIndex={-1}><span className={s.successIcon}><Check size={26} aria-hidden /></span><p className={s.eyebrow}>{attending ? "SEE YOU THERE! 🤍" : "THANK YOU FOR BEING PART OF IT."}</p><h3>{attending ? "Có bạn, ngày ấy sẽ đẹp hơn." : "Dù ở đâu, vẫn luôn gần nhau."}</h3><p>{attending ? "Your presence will make this day even more memorable." : "Cảm ơn bạn đã gửi một chút yêu thương cho chương tiếp theo của Thịnh."}</p>{result.mode === "demo" && <p className={s.demoNotice}>Đây là xác nhận demo. Phản hồi chưa được gửi đến Thịnh và sẽ mất khi tải lại trang.</p>}<button className={s.textButton} onClick={() => setResult(null)}>Chỉnh lại phản hồi <ArrowRight size={14} aria-hidden /></button></div> : <form onSubmit={submit} aria-busy={pending}>
        <fieldset className={s.attendance} disabled={pending}>
          <legend>Bạn sẽ đến chứ?</legend>
          <p className={s.rsvpHint}>Một lời hẹn nhỏ cho ngày đặc biệt này.</p>
          <label className={attending === true ? s.choiceSelected : s.choice}>
            <span className={s.choiceIcon} aria-hidden><GraduationCap size={22} strokeWidth={1.25} /></span>
            <span className={s.choiceCopy}><span className={s.choiceTitle}>Chắc chắn rồi</span><span className={s.choiceDescription}>Mình sẽ đến chung vui cùng Thịnh.</span></span>
            <input type="radio" name="attendance" required checked={attending === true} onChange={() => setAttending(true)} aria-label="Chắc chắn rồi" />
          </label>
          <label className={attending === false ? s.choiceSelected : s.choice}>
            <span className={s.choiceIcon} aria-hidden><Heart size={21} strokeWidth={1.25} /></span>
            <span className={s.choiceCopy}><span className={s.choiceTitle}>Tiếc quá, mình không thể đến</span><span className={s.choiceDescription}>Gửi Thịnh một lời chúc từ xa.</span></span>
            <input type="radio" name="attendance" required checked={attending === false} onChange={() => setAttending(false)} aria-label="Tiếc quá, mình không thể đến" />
          </label>
        </fieldset>
        {attending !== null && <div className={s.formFields}><label htmlFor="rsvp-name">Tên của bạn <span>*</span></label><input id="rsvp-name" name="name" autoComplete="name" required maxLength={48} defaultValue={draft.name} placeholder="Để Thịnh nhận ra bạn nhé" disabled={pending} /><label htmlFor="rsvp-message">Lời nhắn cho Thịnh <span>(không bắt buộc)</span></label><textarea id="rsvp-message" name="message" maxLength={600} rows={3} defaultValue={draft.message} placeholder="Một lời nhắn nhỏ…" disabled={pending} /><button className={s.primaryButton} disabled={pending} type="submit">{pending ? "Đang xác nhận…" : "Xác nhận"}<ArrowRight size={16} aria-hidden /></button></div>}
        {error && <p className={s.formError} role="alert">{error}</p>}
        {config.responses.mode === "demo" && <p className={s.demoNotice}>Bản xem trước · Phản hồi chưa được gửi hoặc lưu lại.</p>}
      </form>}
    </Reveal>
  </section>;
}
