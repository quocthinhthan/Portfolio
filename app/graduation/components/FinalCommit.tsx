"use client";
import Reveal from "./Reveal";
import s from "../graduation.module.css";

export default function FinalCommit() {
  return <section id="thank-you" className={s.commitSection} aria-label="Lời cảm ơn">
    <Reveal delay={0.15}><p className={s.commitThanks}>Thank you for being<br /><em>part of my journey.</em></p></Reveal>
  </section>;
}
