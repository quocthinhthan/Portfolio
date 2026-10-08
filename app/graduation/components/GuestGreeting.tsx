import { Cormorant_Garamond } from "next/font/google";
import s from "../graduation.module.css";

const guestFont = Cormorant_Garamond({
  weight: "600",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-guest",
});

export default function GuestGreeting({ guestName }: { guestName: string }) {
  return <div className={`${s.guestGreeting} ${guestFont.variable}`} aria-label="Người được mời">
    <p className={s.guestGreetingLabel}>Trân trọng kính mời</p>
    <p className={s.guestGreetingName}>{guestName || "Quý thầy cô, gia đình & bạn bè"}</p>
    <span className={s.guestGreetingRule} aria-hidden />
  </div>;
}
