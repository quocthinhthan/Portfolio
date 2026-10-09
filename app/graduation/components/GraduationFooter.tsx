import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { graduationConfig as config } from "../graduation.config";
import Reveal from "./Reveal";
import s from "../graduation.module.css";

export default function GraduationFooter() {
  return <footer className={s.footer}><Reveal>
    <span className={s.footerStar} aria-hidden>✧</span>
    <p className={s.eyebrow}>THE END OF A CHAPTER.</p>
    <h2>The beginning<br /><em>of another.</em></h2>
    <p className={s.footerName}>{config.student.name}</p>
    <p className={s.footerDetails}>{config.student.major} · {config.student.year}<br />{config.student.university}</p>
    <p className={s.nextChapter}>&gt; next_chapter<span aria-hidden>_</span></p>
    <Link href="/" className={s.textButton}>Back to Portfolio <ArrowUpRight size={14} aria-hidden /></Link>
  </Reveal><div className={s.footerBottom}><span>{config.student.name.toLocaleUpperCase("vi")} © {config.student.year}</span><span>WITH GRATITUDE, ALWAYS.</span></div></footer>;
}
