import s from "../graduation.module.css";

export default function GuestGreeting({ guestName }: { guestName: string }) {
  return <div className={s.guestGreeting} aria-label="Người được mời">
    <p className={s.guestGreetingLabel}>Trân trọng kính mời</p>
    <p className={s.guestGreetingName}>{guestName || "Quý thầy cô, gia đình & bạn bè"}</p>
    <span className={s.guestGreetingRule} aria-hidden />
  </div>;
}
