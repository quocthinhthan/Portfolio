"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { graduationConfig as config } from "../graduation.config";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import s from "../graduation.module.css";

export default function JourneyTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 65%"] });
  return <section className={`${s.section} ${s.journeySection}`} aria-labelledby="journey-title">
    <Reveal className={s.journeyIntro}><SectionLabel>MY JOURNEY</SectionLabel><h2 id="journey-title" className={s.editorialTitle}>Four years.<br /><em>A thousand<br />little moments.</em></h2><p className={s.bodyCopy}>Không chỉ là những dòng code.<br />Là những lần thử, những lần sai,<br />và những người bạn ở lại.</p><span className={s.journeyRange}>{config.student.startYear} — {config.student.year}</span></Reveal>
    <ol ref={ref} className={s.timeline}>
      <motion.li aria-hidden className={s.timelineProgress} style={{ scaleY: reduced ? 1 : scrollYProgress }} />
      {config.journey.map((item, i) => <li key={item.year} className={s.timelineItem}><Reveal delay={0.03 * i}><span className={s.timelineDot} /><span className={s.timelineYear}>{item.year}</span><h3>{item.title}</h3><p>{item.note}</p></Reveal></li>)}
    </ol>
  </section>;
}
