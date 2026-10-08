"use client";
import { ArrowUpRight, CalendarPlus, MapPin } from "lucide-react";
import { graduationConfig as config } from "../graduation.config";
import { createCalendarEvent, displayDate, downloadCalendar } from "../utils/calendar";
import Reveal from "./Reveal";
import s from "../graduation.module.css";

export default function InvitationCard() {
  const { ceremony, student } = config;
  const ready = !!createCalendarEvent(ceremony, student.name);
  const mapUrl = /^https:\/\/(www\.)?(google\.com|maps\.google\.com|maps\.app\.goo\.gl)\//.test(ceremony.mapUrl) ? ceremony.mapUrl : "";
  return <section id="ceremony" className={s.ceremonySection} aria-labelledby="ceremony-title">
    <Reveal className={s.invitationCard}>
      <p className={s.eyebrow}>YOU&apos;RE INVITED</p>
      <div className={s.cardStar} aria-hidden>✧</div>
      <h2 id="ceremony-title">Lễ tốt nghiệp</h2>
      <p className={s.cardName}>{student.name}</p>
      <p className={s.cardMajor}>{student.major} <span>·</span> Class of {student.year}</p>
      <dl className={s.eventGrid}>
        <div><dt>DATE / NGÀY</dt><dd>{displayDate(ceremony.date)}</dd></div>
        <div><dt>TIME / GIỜ</dt><dd>{ceremony.startTime || "Sẽ thông báo"}</dd><span className={s.timezone}>Giờ Việt Nam · UTC+7</span></div>
        <div className={s.eventLocation}><dt>LOCATION / ĐỊA ĐIỂM</dt><dd>{ceremony.location || "Sẽ thông báo"}</dd>{ceremony.address && <span className={s.address}>{ceremony.address}</span>}</div>
      </dl>
      <div className={s.cardActions}>
        {mapUrl ? <a className={s.darkButton} href={mapUrl} target="_blank" rel="noopener noreferrer"><MapPin size={16} aria-hidden />Chỉ đường<ArrowUpRight size={14} aria-hidden /></a> : <button className={s.darkButton} disabled><MapPin size={16} aria-hidden />Chỉ đường</button>}
        <button className={s.calendarButton} type="button" disabled={!ready} aria-describedby={!ready ? "calendar-hint" : undefined} onClick={() => downloadCalendar(ceremony, student.name)}><CalendarPlus size={16} aria-hidden />Thêm vào lịch</button>
      </div>
      {!ready && <p id="calendar-hint" className={s.cardHint}>Ngày giờ chính thức sẽ được cập nhật trên tấm thiệp này.</p>}
      <p className={s.cardClosing}>Sự hiện diện của bạn là món quà ý nghĩa nhất.</p>
    </Reveal>
  </section>;
}
