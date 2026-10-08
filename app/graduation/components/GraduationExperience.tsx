"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import InvitationCover from "./InvitationCover";
import GraduationHero from "./GraduationHero";
import PortraitSection from "./PortraitSection";
import InvitationCard from "./InvitationCard";
import Countdown from "./Countdown";
import JourneyTimeline from "./JourneyTimeline";
import MemoryGallery from "./MemoryGallery";
import RSVP from "./RSVP";
import Guestbook from "./Guestbook";
import FinalCommit from "./FinalCommit";
import GraduationFooter from "./GraduationFooter";
import { graduationConfig as config } from "../graduation.config";
import s from "../graduation.module.css";

export default function GraduationExperience({ guestName }: { guestName: string }) {
  const [phase, setPhase] = useState<"closed" | "opening" | "open">("closed");
  const main = useRef<HTMLElement>(null);
  const locked = phase !== "open";
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [locked]);
  useEffect(() => {
    if (phase === "open") main.current?.focus({ preventScroll: true });
  }, [phase]);

  return (
    <MotionConfig reducedMotion="user">
      <div className={s.page}>
        <AnimatePresence onExitComplete={() => setPhase("open")}>
          {phase === "closed" && <InvitationCover key="cover" guestName={guestName} onOpen={() => setPhase("opening")} />}
        </AnimatePresence>
        {phase !== "closed" && <div inert={phase === "opening"} aria-hidden={phase === "opening"}>
          <a href="#ceremony" className={s.skipLink}>Đến thông tin buổi lễ</a>
          <header className={s.header}>
            <Link href="/" className={s.brand} aria-label="Về portfolio của Thân Quốc Thịnh">TQT<span>.</span></Link>
            <a href="#hero" className={s.headerTitle}>A MILESTONE TO SHARE</a>
            <a href="#rsvp" className={s.headerRsvp}>Hẹn gặp bạn <ArrowUpRight size={14} aria-hidden /></a>
          </header>
          <main ref={main} tabIndex={-1} className={s.main} aria-label="Thiệp mời tốt nghiệp của Thân Quốc Thịnh">
            <GraduationHero />
            <PortraitSection />
            <InvitationCard />
            <Countdown />
            <JourneyTimeline />
            {config.sections.showMemories && <MemoryGallery />}
            <RSVP guestName={guestName} />
            <Guestbook guestName={guestName} />
            <FinalCommit />
          </main>
          <GraduationFooter />
        </div>}
        <noscript><p className={s.noScript}>Vui lòng bật JavaScript để mở thiệp và gửi lời chúc. Thông tin lễ tốt nghiệp sẽ được cập nhật tại đây.</p></noscript>
      </div>
    </MotionConfig>
  );
}
