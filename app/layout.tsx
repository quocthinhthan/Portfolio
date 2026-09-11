import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientShell from "@/components/ClientShell";
import { Analytics } from '@vercel/analytics/next';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thân Quốc Thịnh | Backend Developer & Business Analyst (.NET / Java)",
  description:
    "Portfolio của Thân Quốc Thịnh – Backend Developer & Business Analyst (BA), GPA 8.48/10 ĐH Tôn Đức Thắng. Chuyên sâu về .NET (C#, ASP.NET Core), Java (Spring Boot), Microservices, SQL Server và phân tích nghiệp vụ.",
  keywords: [
    "Thân Quốc Thịnh",
    "Than Quoc Thinh",
    ".NET Developer",
    "ASP.NET Core",
    "C# Developer",
    "Java Developer",
    "Spring Boot",
    "Backend Developer",
    "Business Analyst",
    "BA IT",
    "Microservices",
    "software engineer",
    "backend developer vietnam"
  ],
  authors: [{ name: "Thân Quốc Thịnh" }],
  creator: "Thân Quốc Thịnh",
  openGraph: {
    title: "Thân Quốc Thịnh | Backend Developer & Business Analyst (.NET / Java)",
    description:
      "Portfolio cá nhân của Thân Quốc Thịnh – Backend Developer & Business Analyst (BA) chuyên sâu về .NET (C#) và Java (Spring Boot), GPA 8.48/10.",
    url: "https://thanquocthinh.id.vn",
    siteName: "Than Quoc Thinh Portfolio",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/avatar_share.jpg", 
        width: 1200,
        height: 850,
        alt: "Thân Quốc Thịnh Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thân Quốc Thịnh | Backend Developer & Business Analyst (.NET / Java)",
    description: "Portfolio cá nhân của Thân Quốc Thịnh – Chuyên sâu .NET & Java, GPA 8.48/10",
    images: ["/avatar_share.jpg"], 
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  if (saved === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                    document.documentElement.style.colorScheme = 'light';
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                    document.documentElement.style.colorScheme = 'dark';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        
        <ClientShell>{children}</ClientShell>
        <Analytics />

        {/* Schema Markup tối ưu SEO Google: .NET, Java, BA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Thân Quốc Thịnh",
              url: "https://thanquocthinh.id.vn",
              jobTitle: "Backend Developer & Business Analyst",
              alumniOf: "Ton Duc Thang University",
              knowsAbout: [
                ".NET",
                "C#",
                "ASP.NET Core",
                "Java",
                "Spring Boot",
                "Business Analysis",
                "Requirements Engineering",
                "Microservices",
                "Docker",
                "SQL Server",
                "MySQL",
                "Event-driven Architecture"
              ],
              sameAs: [
                "https://github.com/quocthinhthan",
                "https://linkedin.com/in/quocthinhthan"
              ]
            })
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}