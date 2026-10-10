import Link from "next/link";
import { invitationSerif } from "../../graduation.font";
import s from "../../graduation.module.css";

export default function InvalidInvitation() {
  return <main className={`${s.page} ${s.invalidInvitation} ${invitationSerif.variable}`}>
    <div><p className={s.eyebrow}>A PERSONAL INVITATION</p><h1>Đường dẫn thiệp<br /><em>chưa hợp lệ.</em></h1><p>Bạn kiểm tra lại đường dẫn Thịnh đã gửi riêng nhé.</p><Link className={s.textButton} href="/graduation">Xem thông tin buổi lễ</Link></div>
  </main>;
}
