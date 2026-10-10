"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, GraduationCap, Heart, CalendarHeart } from "lucide-react";
import { graduationConfig as config } from "../graduation.config";
import { invitationService, type SubmissionResult } from "../services/invitation";
import type { AttendanceStatus } from "../utils/rsvp";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import s from "../graduation.module.css";

const replies = {
  yes: {
    eyebrow: "SEE YOU THERE! 🤍",
    title: "Có bạn, ngày ấy sẽ đẹp hơn.",
    message: "Thịnh rất mong được gặp bạn và cùng lưu lại một kỷ niệm thật đẹp.",
  },
  maybe: {
    eyebrow: "A LITTLE MAYBE, A LOT OF LOVE.",
    title: "Mình cứ để ngỏ lời hẹn nhé.",
    message: "Cảm ơn bạn đã dành thời gian cân nhắc. Khi sắp xếp được, bạn quay lại cập nhật cho Thịnh nhé.",
  },
  no: {
    eyebrow: "THANK YOU FOR BEING PART OF IT.",
    title: "Dù ở đâu, vẫn luôn gần nhau.",
    message: "Cảm ơn bạn đã gửi một chút yêu thương cho chương tiếp theo của Thịnh.",
  },
};

export default function RSVP({ guestName, invitationToken }: { guestName: string; invitationToken?: string }) {
  const [attendance, setAttendance] = useState<AttendanceStatus | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [draft, setDraft] = useState({ name: guestName, message: "" });
  const successRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const reply = attendance ? replies[attendance] : null;
  useEffect(() => { if (result) successRef.current?.focus({ preventScroll: true }); }, [result]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (attendance === null || busy.current || !invitationToken) return;
    busy.current = true; setPending(true); setError("");
    const data = new FormData(event.currentTarget);
    const input = { name: String(data.get("name") || ""), message: String(data.get("message") || "") };
    setDraft(input);
    try { setResult(await invitationService.submitRSVP({ ...input, attendance, invitationToken, website: String(data.get("website") || "") })); }
    catch (error) { setError(error instanceof Error ? error.message : "Chưa gửi được. Bạn thử lại nhé."); }
    finally { busy.current = false; setPending(false); }
  }
  return <section id="rsvp" className={`${s.section} ${s.rsvpSection}`} aria-labelledby="rsvp-title">
    <Reveal className={s.rsvpIntro}><SectionLabel>SAVE A LITTLE TIME FOR ME</SectionLabel><h2 id="rsvp-title" className={s.editorialTitle}>Will I see<br /><em>you there?</em></h2><p className={s.bodyCopy}>Một cái ôm, một tấm ảnh,<br />một kỷ niệm có bạn trong đó.<br />Thịnh rất mong được gặp bạn.</p><Heart size={23} strokeWidth={1} className={s.rsvpHeart} aria-hidden /></Reveal>
    <Reveal className={s.formPanel}>
      <div className={s.rsvpPanelHeader}><span>YOUR REPLY</span><span aria-hidden>✧</span></div>
      {invitationToken && <p className={s.invitedGuest}>Thiệp dành cho <strong>{guestName}</strong></p>}
      {!invitationToken ? <p className={s.bodyCopy}>Để xác nhận tham dự, bạn hãy mở đường dẫn thiệp Thịnh đã gửi riêng cho bạn nhé.</p> : result ? <div ref={successRef} className={s.success} role="status" tabIndex={-1}><span className={s.successIcon}><Check size={26} aria-hidden /></span><p className={s.eyebrow}>{reply?.eyebrow}</p><h3>{reply?.title}</h3><p>{reply?.message}</p>{result.mode === "demo" && <p className={s.demoNotice}>Đây là xác nhận demo. Phản hồi chưa được gửi đến Thịnh và sẽ mất khi tải lại trang.</p>}<button className={s.textButton} onClick={() => setResult(null)}>Chỉnh lại phản hồi <ArrowRight size={14} aria-hidden /></button></div> : <form onSubmit={submit} aria-busy={pending}>
        <div className={s.formTrap} aria-hidden="true"><label htmlFor="rsvp-website">Website</label><input id="rsvp-website" name="website" type="text" autoComplete="off" tabIndex={-1} /></div>
        <fieldset className={s.attendance} disabled={pending}>
          <legend>Bạn sẽ đến chứ?</legend>
          <p className={s.rsvpHint}>Một lời hẹn nhỏ cho ngày đặc biệt này.</p>
          <label className={attendance === "yes" ? s.choiceSelected : s.choice}>
            <span className={s.choiceIcon} aria-hidden><GraduationCap size={22} strokeWidth={1.25} /></span>
            <span className={s.choiceCopy}><span className={s.choiceTitle}>Chắc chắn rồi</span><span className={s.choiceDescription}>Mình sẽ đến chung vui cùng Thịnh.</span></span>
            <input type="radio" name="attendance" value="yes" required checked={attendance === "yes"} onChange={() => setAttendance("yes")} aria-label="Chắc chắn rồi" />
          </label>
          <label className={attendance === "maybe" ? s.choiceSelected : s.choice}>
            <span className={s.choiceIcon} aria-hidden><CalendarHeart size={22} strokeWidth={1.25} /></span>
            <span className={s.choiceCopy}><span className={s.choiceTitle}>Mình sẽ báo lại nhé</span><span className={s.choiceDescription}>Để mình sắp xếp thêm một chút, rồi hẹn Thịnh nhé.</span></span>
            <input type="radio" name="attendance" value="maybe" required checked={attendance === "maybe"} onChange={() => setAttendance("maybe")} aria-label="Mình sẽ báo lại nhé" />
          </label>
          <label className={attendance === "no" ? s.choiceSelected : s.choice}>
            <span className={s.choiceIcon} aria-hidden><Heart size={21} strokeWidth={1.25} /></span>
            <span className={s.choiceCopy}><span className={s.choiceTitle}>Tiếc quá, mình không thể đến</span><span className={s.choiceDescription}>Gửi Thịnh một lời chúc từ xa.</span></span>
            <input type="radio" name="attendance" value="no" required checked={attendance === "no"} onChange={() => setAttendance("no")} aria-label="Tiếc quá, mình không thể đến" />
          </label>
        </fieldset>
        {attendance !== null && <div className={s.formFields}><label htmlFor="rsvp-name">Tên người gửi <span>*</span></label><input id="rsvp-name" name="name" autoComplete="name" required maxLength={48} defaultValue={draft.name} placeholder="Để Thịnh nhận ra bạn nhé" disabled={pending} /><label htmlFor="rsvp-message">Lời nhắn cho Thịnh <span>(không bắt buộc)</span></label><textarea id="rsvp-message" name="message" maxLength={600} rows={3} defaultValue={draft.message} placeholder="Một lời nhắn nhỏ…" disabled={pending} /><button className={s.primaryButton} disabled={pending} type="submit">{pending ? "Đang xác nhận…" : "Gửi phản hồi"}<ArrowRight size={16} aria-hidden /></button></div>}
        {error && <p className={s.formError} role="alert">{error}</p>}
        {config.responses.mode === "demo" && <p className={s.demoNotice}>Bản xem trước · Phản hồi chưa được gửi hoặc lưu lại.</p>}
      </form>}
    </Reveal>
  </section>;
}
