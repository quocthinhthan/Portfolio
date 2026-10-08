import { ArrowDown } from "lucide-react";
import { graduationConfig as config } from "../graduation.config";
import { displayDate } from "../utils/calendar";
import Reveal from "./Reveal";
import GuestGreeting from "./GuestGreeting";
import s from "../graduation.module.css";

export default function GraduationHero({ guestName }: { guestName: string }) {
  return <section id="hero" className={s.hero} aria-labelledby="hero-title">
    <div className={s.heroOrb} aria-hidden />
    <Reveal>
      <GuestGreeting guestName={guestName} />
      <p className={s.heroTitle}>The Final <em>Commit</em></p>
      <div className={s.heroDivider} aria-hidden><span />✧<span /></div>
      <p className={s.classYear}>CLASS OF {config.student.year}</p>
      <h1 id="hero-title" className={s.studentName}>{config.student.name}</h1>
      <p className={s.heroDetails}>{config.student.major}<span>{config.student.university}</span></p>
      <div className={s.yearLine}><span>{config.student.startYear}</span><i /><span>{config.student.year}</span></div>
      <p className={s.emotionalCopy}>Một hành trình đã đi đến một cột mốc thật đẹp.<br />Ngày ấy sẽ ý nghĩa hơn rất nhiều nếu có bạn ở đó.</p>
      <a href="#ceremony" className={s.heroEvent}><span>{displayDate(config.ceremony.date)}{config.ceremony.startTime && ` · ${config.ceremony.startTime}`}</span><i aria-hidden />{config.ceremony.location || "Địa điểm sẽ thông báo"}<ArrowDown size={14} aria-hidden /></a>
    </Reveal>
    <a href="#portrait" className={s.scrollCue}>THE STORY CONTINUES <ArrowDown size={14} aria-hidden /></a>
  </section>;
}
