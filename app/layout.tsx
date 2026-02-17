import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientShell from "@/components/ClientShell";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thân Quốc Thịnh | Software Engineer Portfolio",
  description:
    "Portfolio của Thân Quốc Thịnh – sinh viên Kỹ thuật Phần mềm tại TDTU, Web Developer với Next.js, React, Flutter, Backend.",
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
    images: [
      {
        url: "/about_avatar1.jpg", 
        width: 1200,
        height: 630,
        alt: "Thân Quốc Thịnh Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thân Quốc Thịnh | Software Engineer",
    description: "Portfolio cá nhân của Thân Quốc Thịnh",
    images: ["/about_avatar1.jpg"], 
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

        {/* Đã di chuyển script vào bên trong body */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Thân Quốc Thịnh",
              url: "https://thanquocthinh.id.vn",
              jobTitle: "Software Engineer",
              knowsAbout: ["Business Analysis", "Springboot", "Node.js", "React", "Flutter", "Backend", "Microservices"],
              sameAs: [
                "https://github.com/your-github", // Đừng quên thay link thật của Thịnh vào đây nhé!
                "https://linkedin.com/in/your-linkedin"
              ]
            })
          }}
        />
      </body>
    </html>
  );
}