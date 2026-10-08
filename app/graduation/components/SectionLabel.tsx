import type { ReactNode } from "react";
import s from "../graduation.module.css";

/** CSS counts rendered labels in document order; hidden sections take no number. */
export default function SectionLabel({ children }: { children: ReactNode }) {
  return <p className={`${s.eyebrow} ${s.sectionLabel}`}>{children}</p>;
}
