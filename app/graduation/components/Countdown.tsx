"use client";
import { useEffect, useState } from "react";
import { graduationConfig as config } from "../graduation.config";
import { countdownState, displayDate } from "../utils/calendar";
import Reveal from "./Reveal";
import s from "../graduation.module.css";

export default function Countdown() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const update = () => setNow(new Date());
    const initial = window.setTimeout(update, 0);
    const interval = window.setInterval(update, 1000);
    return () => { clearTimeout(initial); clearInterval(interval); };
  }, []);
  const state = now ? countdownState(config.ceremony, now) : { status: "unconfirmed" as const };
  return <section className={s.countdownSection} aria-label="Đếm ngược tới buổi lễ"><Reveal>
    <p className={s.eyebrow}>SEE YOU IN</p>
    {state.status === "upcoming" ? <div className={s.countdown} role="timer" aria-label="Thời gian còn lại đến buổi lễ">{[[state.days, "DAYS"], [state.hours, "HOURS"], [state.minutes, "MINUTES"], [state.seconds, "SECONDS"]].map(([value, label]) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}</div> : <>
      <h2 className={s.countdownTitle}>{state.status === "today" ? "Today is the day." : state.status === "past" ? "A day to remember." : "Good things take time."}</h2>
      <p className={s.bodyCopy}>{state.status === "unconfirmed" ? "Một ngày thật đẹp đang ở phía trước. Mình sẽ sớm hẹn bạn ngày giờ cụ thể." : displayDate(config.ceremony.date)}</p>
    </>}
  </Reveal></section>;
}
