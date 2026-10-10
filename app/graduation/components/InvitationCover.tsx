"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { graduationConfig as config } from "../graduation.config";
import { displayDate } from "../utils/calendar";
import GuestGreeting from "./GuestGreeting";
import s from "../graduation.module.css";

export default function InvitationCover({ guestName, onOpen }: { guestName: string; onOpen: () => void }) {
  const reduced = useReducedMotion();
  return <motion.main className={s.cover} exit={reduced ? { opacity: 0 } : { opacity: 0, y: -24, scale: 1.015, filter: "blur(8px)" }} transition={{ duration: reduced ? 0.01 : 0.9, ease: [0.22, 1, 0.36, 1] }} aria-label="Thiệp mời tốt nghiệp">
    <div className={s.coverGlow} aria-hidden />
    <div className={s.grain} aria-hidden />
    <div className={s.particles} aria-hidden><i /><i /><i /><i /><i /></div>
    <div className={s.coverTop}><Link href="/" className={s.brand} aria-label="Về portfolio">TQT<span>.DEV</span></Link><span>A PERSONAL INVITATION</span><ArrowUpRight size={16} aria-hidden /></div>
    <div className={s.coverContent}>
      <p className={s.eyebrow}>GRADUATION <span>·</span> {config.student.year}</p>
      <div className={s.coverOrnament} aria-hidden><span />✧<span /></div>
      <GuestGreeting guestName={guestName} />
      <div className={s.coverSender}><p>Đến dự lễ tốt nghiệp của</p><h1>{config.student.name}</h1></div>
      <p className={s.coverHeading}>A small milestone,<br /><em>a meaningful day.</em></p>
      <button type="button" className={s.openButton} onClick={onOpen}><span>{guestName ? "Mở thiệp" : "Mở thiệp"}</span><ArrowRight size={18} aria-hidden /></button>
      <p className={s.coverFootnote}>Made with gratitude. Sent with love.</p>
    </div>
    <div className={s.coverBottom}><span>{displayDate(config.ceremony.date)}{config.ceremony.startTime && ` · ${config.ceremony.startTime}`}</span><span>{config.ceremony.location || "Địa điểm sẽ thông báo"}</span><span>{config.student.startYear} — {config.student.year}</span></div>
  </motion.main>;
}
