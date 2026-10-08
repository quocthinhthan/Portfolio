export type GraduationPhoto = { src: string; alt: string; caption: string; position?: string };

// All dates and times below are local to Vietnam (UTC+07:00).
// Leave date/time empty until confirmed. Never put a display label in these fields.
export const graduationConfig = {
  siteUrl: "https://thanquocthinh.id.vn",
  sections: {
    showMemories: false, // Set to true when the memory photographs are ready.
  },
  student: {
    name: "Thân Quốc Thịnh",
    major: "Software Engineering",
    university: "Ton Duc Thang University",
    year: 2026,
    startYear: 2022,
  },
  ceremony: {
    date: "2026-10-17", // YYYY-MM-DD, e.g. 2026-11-15
    startTime: "14:00", // HH:mm (24-hour), e.g. 08:00
    endTime: "17:00", // HH:mm; empty = two hours after start; earlier = next day
    timeZone: "Asia/Ho_Chi_Minh",
    location: "Đại học Tôn Đức Thắng",
    address: "19 Nguyễn Hữu Thọ, Phường Tân Hưng, Quận 7, TP.HCM", // Add the confirmed hall / venue here.
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Đại+học+Tôn+Đức+Thắng",
    description: "Cùng Thân Quốc Thịnh lưu lại một cột mốc thật đẹp — lễ tốt nghiệp ngành Software Engineering, Class of 2026.",
  },
  images: {
    // Put your photo at public/images/graduation/portrait.jpg, then set src below.
    portrait: { src: "/images/graduation/portrait.jpg", alt: "Ảnh tốt nghiệp của Thân Quốc Thịnh", position: "50% 25%" },
    // Local public paths work with Next/Image. Up to six photos, e.g.:
    // { src: "/images/graduation/gallery/01.jpg", alt: "Cùng bạn bè tại TDTU", caption: "Những người bạn, những năm tháng.", position: "50% 30%" }
    gallery: [] as GraduationPhoto[],
  },
  journey: [
    { year: "2022", title: "The Beginning", note: "Một khởi đầu, thật nhiều háo hức." },
    { year: "2023", title: "Learning", note: "Học những điều mới. Hiểu thêm chính mình." },
    { year: "2024", title: "Building", note: "Từng ý tưởng dần trở thành hiện thực." },
    { year: "2025", title: "Growing", note: "Lớn lên cùng những người đồng hành." },
    { year: "2026", title: "Graduated.", note: "Mang theo kỷ niệm. Bước vào chương mới." },
  ],
  // A replaceable adapter lives in services/invitation.ts. Demo data is not sent or persisted.
  responses: { mode: "demo" as "demo" | "live" },
};
