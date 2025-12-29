"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { I18nProvider, useI18n } from "@/components/I18nProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import CursorGlow from "@/components/ui/CursorGlow";
import ParallaxIcons from "@/components/ui/ParallaxIcons";
import { Globe } from "lucide-react";

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18nProvider>
      <ThemeProvider>
        <ParallaxIcons />
        <CursorGlow />
        <ShellInner>{children}</ShellInner>
      </ThemeProvider>
    </I18nProvider>
  );
}

function ShellInner({ children }: { children: React.ReactNode }) {
  const { lang, setLang, t } = useI18n();
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  // Tự động ẩn Header khi cuộn xuống, hiện khi cuộn lên (UX tốt hơn)
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navLinks = [
    { href: "#about", label: "nav.about" },
    { href: "#projects", label: "nav.projects" },
    { href: "#skills", label: "nav.skills" },
    { href: "#contact", label: "nav.contact" },
  ];

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50"
      >
        {/* Lớp nền Glassmorphism cao cấp */}
        <div className="relative rounded-full border border-white/10 bg-slate-950/70 backdrop-blur-xl shadow-[0_0_30px_-10px_rgba(0,0,0,0.5)] flex justify-between items-center px-6 py-3 transition-all duration-300">
          
          {/* Logo (Giữ nguyên theo yêu cầu) */}
          <div className="font-black text-xl md:text-2xl tracking-tighter text-slate-100 cursor-pointer group select-none">
            <a href="#">
              TQT
              <span className="text-sky-400 group-hover:text-purple-400 transition-colors duration-300 drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]">
                .DEV
              </span>
            </a>
          </div>

          {/* Nav Links (Đã thêm đa ngôn ngữ & Hiệu ứng) */}
          <nav className="hidden md:flex gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-5 py-2 text-base font-medium text-slate-300 hover:text-white transition-colors group"
              >
                {/* Text menu được dịch */}
                {t(link.label as any)}
                
                {/* Hiệu ứng gạch chân phát sáng khi hover */}
                <span className="absolute inset-x-0 -bottom-px h-px w-full origin-left scale-x-0 bg-gradient-to-r from-sky-500/0 via-sky-500 to-sky-500/0 transition-transform duration-300 group-hover:scale-x-100" />
                <span className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            ))}
          </nav>

          {/* Nút đổi ngôn ngữ */}
          <div className="flex items-center">
            <button
              onClick={() => setLang(lang === "vi" ? "en" : "vi")}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border border-slate-700 bg-slate-900/50 text-slate-300 hover:border-sky-500 hover:text-sky-400 hover:bg-sky-500/10 transition-all duration-300 group"
            >
              <Globe size={14} className="group-hover:animate-spin-slow" />
              <span>{lang === "vi" ? "VN" : "EN"}</span>
            </button>
          </div>
        </div>
      </motion.header>

      <main className="min-h-screen">{children}</main>
    </>
  );
}