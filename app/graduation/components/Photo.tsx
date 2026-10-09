"use client";
import Image from "next/image";
import { useState } from "react";
import { graduationConfig as config } from "../graduation.config";
import s from "../graduation.module.css";

export default function Photo({ src, alt, position = "50% 25%", portrait = false, priority = false, fit = "cover", sizes }: { src: string; alt: string; position?: string; portrait?: boolean; priority?: boolean; fit?: "cover" | "contain"; sizes?: string }) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  if (!src || failedSrc === src) return <div className={`${s.photoPlaceholder} ${portrait ? s.portraitPlaceholder : ""}`} role="img" aria-label={portrait ? "Khung chờ ảnh chân dung tốt nghiệp" : "Khung chờ ảnh kỷ niệm đại học"}>
    <div className={s.placeholderArch} aria-hidden />
    <span className={s.placeholderTop}>A MEMORY IN THE MAKING</span>
    <span className={s.placeholderYear}>{config.student.year}</span>
    <span className={s.placeholderCaption}>{portrait ? "Một tấm hình. Bốn năm thanh xuân." : "Những khoảnh khắc sẽ ở lại."}<small>Ảnh sẽ được thêm sau</small></span>
  </div>;
  return <Image src={src} alt={alt} fill sizes={sizes ?? (portrait ? "(max-width: 767px) 90vw, 45vw" : "(max-width: 767px) 90vw, 55vw")} style={{ objectFit: fit, objectPosition: fit === "contain" ? "center" : position }} preload={priority} onError={() => setFailedSrc(src)} />;
}
