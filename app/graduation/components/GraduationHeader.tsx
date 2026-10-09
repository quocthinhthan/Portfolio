"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import s from "../graduation.module.css";

export default function GraduationHeader() {
  const header = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let previousY = Math.max(0, window.scrollY);
    let direction = 0;
    let distance = 0;
    let frame = 0;

    const update = () => {
      frame = 0;
      // Clamp rubber-band scrolling on touch devices to the actual page bounds.
      const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const y = Math.min(maxY, Math.max(0, window.scrollY));
      const delta = y - previousY;
      previousY = y;

      if (y <= (header.current?.offsetHeight ?? 86)) {
        distance = 0;
        direction = 0;
        setHidden(false);
        return;
      }

      if (!delta) return;
      const nextDirection = Math.sign(delta);
      distance = nextDirection === direction ? distance + Math.abs(delta) : Math.abs(delta);
      direction = nextDirection;

      // A small threshold prevents flickering from tiny direction changes.
      if (distance >= 10) {
        setHidden(direction > 0 && !header.current?.contains(document.activeElement));
        distance = 0;
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <header ref={header} className={`${s.header}${hidden ? ` ${s.headerHidden}` : ""}`} onFocusCapture={() => setHidden(false)}>
    <Link href="/" className={s.brand} aria-label="Về portfolio của Thân Quốc Thịnh">TQT<span>.</span></Link>
    <a href="#hero" className={s.headerTitle}>A MILESTONE TO SHARE</a>
    <a href="#rsvp" className={s.headerRsvp}>Hẹn gặp bạn <ArrowUpRight size={14} aria-hidden /></a>
  </header>;
}
