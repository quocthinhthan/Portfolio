"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { graduationConfig as config } from "../graduation.config";
import Photo from "./Photo";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import s from "../graduation.module.css";

export default function MemoryGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const gallery = config.images.gallery.slice(0, 6);
  const active = selected === null ? null : gallery[selected];
  useEffect(() => {
    if (!active) return;
    const element = dialog.current;
    element?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { element?.close(); document.body.style.overflow = previous; };
  }, [active]);
  const close = () => setSelected(null);
  return <section className={`${s.section} ${s.memoriesSection}`} aria-labelledby="memories-title">
    <Reveal className={s.sectionHeading}><div><SectionLabel>THE DAYS WE&apos;LL KEEP</SectionLabel><h2 id="memories-title" className={s.editorialTitle}>A moment worth<br /><em>remembering.</em></h2></div><p className={s.bodyCopy}>Có những khoảnh khắc bình thường,<br />sau này lại trở thành điều quý giá.</p></Reveal>
    <div className={s.gallery}>
      {gallery.length ? gallery.map((photo, index) => <Reveal key={photo.src} className={s.galleryItem} delay={index * 0.06}><figure><button className={s.galleryButton} onClick={() => setSelected(index)} aria-label={`Xem ảnh: ${photo.alt}`}><Photo {...photo} /><span className={s.expandIcon}><ArrowUpRight size={18} aria-hidden /></span></button><figcaption><span>{String(index + 1).padStart(2, "0")}</span>{photo.caption}</figcaption></figure></Reveal>) : ["Những ngày ở giảng đường.", "Những người cùng đi qua thanh xuân.", "Và một ngày, chúng mình tốt nghiệp."].map((caption, index) => <Reveal className={s.galleryItem} key={caption} delay={index * 0.06}><figure><div className={s.galleryImage}><Photo src="" alt="" /></div><figcaption><span>0{index + 1}</span>{caption}</figcaption></figure></Reveal>)}
    </div>
    <dialog ref={dialog} className={s.lightbox} aria-label={active?.alt || "Ảnh kỷ niệm"} onCancel={close} onClose={close} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      {active && <div className={s.lightboxContent}><button autoFocus type="button" className={s.lightboxClose} aria-label="Đóng ảnh" onClick={close}><X size={24} /></button><div className={s.lightboxImage}><Photo {...active} fit="contain" sizes="95vw" /></div><p>{active.caption}</p></div>}
    </dialog>
  </section>;
}
