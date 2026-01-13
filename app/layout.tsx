import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientShell from "@/components/ClientShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thân Quốc Thịnh | Software Engineer Portfolio",
  description:
    "Portfolio của Thân Quốc Thịnh – sinh viên Kỹ thuật Phần mềm, Web Developer với Next.js, React, Flutter, Backend.",
  keywords: [
    "Thân Quốc Thịnh",
    "Than Quoc Thinh",
    "portfolio",
    "software engineer",
    "nextjs developer",
    "sinh viên IT",
    "web developer vietnam"
  ],
  authors: [{ name: "Thân Quốc Thịnh" }],
  creator: "Thân Quốc Thịnh",
  openGraph: {
    title: "Thân Quốc Thịnh | Software Engineer",
    description:
      "Portfolio cá nhân của Thân Quốc Thịnh – Web Developer, Backend Developer",
    url: "https://thanquocthinh.id.vn",
    siteName: "Than Quoc Thinh Portfolio",
    locale: "vi_VN",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" }
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.png"
  }
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientShell>{children}</ClientShell>
      </body>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Thân Quốc Thịnh",
            url: "https://thanquocthinh.id.vn",
            jobTitle: "Software Engineer",
            knowsAbout: ["Business Analysis","Springboot", "Node.js" , "React", "Flutter", "Backend", "Microservices"],
            sameAs: [
              "https://github.com/your-github",
              "https://linkedin.com/in/your-linkedin"
            ]
          })
        }}
      />
    </html>
  );
}
