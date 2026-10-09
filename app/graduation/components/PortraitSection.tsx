import { graduationConfig as config } from "../graduation.config";
import Photo from "./Photo";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import s from "../graduation.module.css";

export default function PortraitSection() {
  return <section id="portrait" className={`${s.section} ${s.portraitSection}`} aria-labelledby="portrait-title">
    <Reveal className={s.portraitCopy}>
      <SectionLabel>THE PERSON BEHIND THE JOURNEY</SectionLabel>
      <h2 id="portrait-title" className={s.editorialTitle}>The end of<br />one chapter.<br /><em>The beginning<br />of another.</em></h2>
      <div className={s.smallRule} />
      <p className={s.bodyCopy}>Có những ngày ta sẽ nhớ rất lâu.<br />Không chỉ vì điều mình đạt được,<br />mà vì những người đã ở bên.</p>
      <p className={s.signature}>{config.student.name}</p>
      <p className={s.microLabel}>GRADUATION · {config.student.year}</p>
    </Reveal>
    <Reveal className={s.portraitFigure} delay={0.12}>
      <figure>
        <div className={s.portraitImage}><Photo {...config.images.portrait} portrait priority /></div>
        <figcaption>{config.student.major} <span>Class of {config.student.year}</span></figcaption>
      </figure>
      <span className={s.verticalCaption}>TDTU / {config.student.startYear} — {config.student.year}</span>
    </Reveal>
  </section>;
}
