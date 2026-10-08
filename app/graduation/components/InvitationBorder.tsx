"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import s from "../graduation.module.css";

// Layered strokes leave a short, tapered tail behind each moving point.
const trails = [
  { length: 78, opacity: 0.22 },
  { length: 48, opacity: 0.38 },
  { length: 22, opacity: 0.65 },
  { length: 2.5, opacity: 1 },
];

export default function InvitationBorder() {
  const frame = useRef<HTMLDivElement>(null);
  // Wait until the card is readable, and replay three laps on a later visit.
  const visible = useInView(frame, { amount: 0.6, margin: "-68px 0px 0px 0px" });
  const reduced = useReducedMotion();
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (reduced || !frame.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(frame.current);
    return () => observer.disconnect();
  }, [reduced]);

  const right = size.width - 1;
  const bottom = size.height - 1;
  // Both paths start at bottom-left, meet at top-right halfway through,
  // and return around opposite sides of the same responsive border.
  const paths = [
    `M 1 ${bottom} V 1 H ${right} V ${bottom} H 1 Z`,
    `M 1 ${bottom} H ${right} V 1 H 1 V ${bottom} Z`,
  ];

  return <div ref={frame} className={`${s.cardBorderMotion} ${visible && !reduced ? s.cardBorderActive : ""}`} aria-hidden="true">
    {!reduced && size.width > 0 && <svg width="100%" height="100%" viewBox={`0 0 ${size.width} ${size.height}`} fill="none" focusable="false">
      {paths.map((path, direction) => <g key={direction}>
        {trails.map(({ length, opacity }) => <path
          key={length}
          d={path}
          pathLength={1000}
          className={s.cardBorderTrail}
          strokeOpacity={opacity}
          strokeDasharray={`${length} ${1000 - length}`}
          style={{ "--trail-start": `${length}px`, "--trail-end": `${length - 1000}px` } as CSSProperties}
        />)}
      </g>)}
    </svg>}
  </div>;
}
