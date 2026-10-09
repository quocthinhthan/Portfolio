"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { graduationConfig as config } from "../graduation.config";
import Reveal from "./Reveal";
import s from "../graduation.module.css";

export default function FinalCommit() {
  const reduced = useReducedMotion();
  return <section className={s.commitSection} aria-label="The Final Commit — một lời cảm ơn">
    <Reveal><p className={s.eyebrow}>ONE LAST COMMIT. SO MANY FIRSTS AHEAD.</p></Reveal>
    <motion.div className={s.terminal} initial={reduced ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
      <div className={s.terminalBar}><span aria-hidden>○ ○ ○</span><span>university / journey</span></div>
      <p className={s.terminalCommand}><span>$</span> git log university</p>
      <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} transition={{ delay: reduced ? 0 : 0.4, duration: reduced ? 0 : 0.8 }}>
        <p className={s.commitHash}>commit {config.student.year}.graduation</p>
        <p className={s.commitAuthor}>Author: {config.student.name}</p>
        <ul>{[config.student.major, `${config.student.year - config.student.startYear} years completed`, "countless memories", "friendships created", "degree unlocked"].map(line => <li key={line}><Check size={13} aria-hidden />{line}</li>)}</ul>
        <p className={s.commitStatus}><span>status:</span> READY FOR THE NEXT CHAPTER</p>
      </motion.div>
    </motion.div>
    <Reveal delay={0.15}><p className={s.commitThanks}>Thank you for being<br /><em>part of my journey.</em></p></Reveal>
  </section>;
}
