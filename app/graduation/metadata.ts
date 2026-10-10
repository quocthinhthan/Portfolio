import type { Metadata } from "next";
import { graduationConfig as config } from "./graduation.config";

const title = `Graduation ${config.student.year} — ${config.student.name}`;
const description = `You're invited to celebrate the graduation of ${config.student.name} — ${config.student.major}, Class of ${config.student.year}.`;
export const graduationMetadata: Metadata = {
  metadataBase: new URL(config.siteUrl), title, description,
  alternates: { canonical: "/graduation" },
  openGraph: { title, description, url: "/graduation", type: "website", locale: "vi_VN", images: [{ url: "/graduation/opengraph-image", width: 1200, height: 630, alt: title }] },
  twitter: { card: "summary_large_image", title, description, images: ["/graduation/opengraph-image"] },
};
