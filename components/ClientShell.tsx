"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { I18nProvider, useI18n } from "@/components/I18nProvider";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";
import type { I18nKey } from "@/lib/i18n";
import CursorGlow from "@/components/ui/CursorGlow";
import ParallaxIcons from "@/components/ui/ParallaxIcons";
import { Globe, Moon, Sun, Menu, X } from "lucide-react";

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
  const { theme, toggleTheme } = useTheme();
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Tự động ẩn Header khi cuộn xuống, hiện khi cuộn lên (UX tốt hơn)
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
      setMobileMenuOpen(false);
    } else {
      setHidden(false);
    }
  });

  const navLinks = [
    { href: "#about", label: "nav.about" },
    { href: "#projects", label: "nav.projects" },
    { href: "#skills", label: "nav.skills" },
    { href: "#achievements", label: "nav.achievements" },
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
        {/* Lớp nền Glassmorphism mờ nhòe chuẩn iOS (Hỗ trợ Light & Dark theme) */}
        <div className="relative rounded-2xl md:rounded-full border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-950/40 backdrop-blur-xl md:backdrop-blur-2xl shadow-lg dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] flex justify-between items-center px-5 py-3 transition-all duration-300">
          
          {/* Logo (Giữ nguyên theo yêu cầu) */}
          <div className="cursor-pointer group select-none">
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="font-black text-xl md:text-2xl tracking-tighter text-slate-900 dark:text-slate-100">
              TQT
              <span className="text-sky-500 dark:text-sky-400 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors duration-300 drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]">
                .DEV
              </span>
            </a>
          </div>

          {/* Nav Links (Đã thêm đa ngôn ngữ & Hiệu ứng viền khi hover) */}
          <nav className="hidden md:flex gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-5 py-2 text-base font-bold text-slate-900 dark:text-slate-200 hover:text-sky-600 dark:hover:text-white transition-colors group"
              >
                {/* Text menu được dịch */}
                {t(link.label as I18nKey)}
                
                {/* Hiệu ứng gạch chân phát sáng & viền mỏng khi hover */}
                <span className="absolute inset-x-0 -bottom-px h-px w-full origin-left scale-x-0 bg-gradient-to-r from-sky-500/0 via-sky-500 to-sky-500/0 transition-transform duration-300 group-hover:scale-x-100" />
                <span className="absolute inset-0 rounded-full bg-sky-500/10 dark:bg-sky-400/10 border border-sky-500/30 dark:border-sky-400/30 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Controls: Theme, Lang & Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? t("nav.theme.light") : t("nav.theme.dark")}
              title={theme === "dark" ? t("nav.theme.light") : t("nav.theme.dark")}
              className="flex items-center justify-center size-9 rounded-full text-xs font-bold border border-slate-300 dark:border-slate-700/60 bg-slate-100/90 dark:bg-slate-900/40 text-slate-900 dark:text-slate-200 hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-500/10 transition-all duration-300"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              type="button"
              onClick={() => setLang(lang === "vi" ? "en" : "vi")}
              className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full text-xs font-bold border border-slate-300 dark:border-slate-700/60 bg-slate-100/90 dark:bg-slate-900/40 text-slate-900 dark:text-slate-200 hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-500/10 transition-all duration-300 group"
            >
              <Globe size={14} className="group-hover:animate-spin-slow" />
              <span>{lang === "vi" ? "VN" : "EN"}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center size-9 rounded-full border border-slate-300 dark:border-slate-700/60 bg-slate-100/90 dark:bg-slate-900/40 text-slate-900 dark:text-slate-200 hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 transition-all duration-300"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden mt-2 p-4 rounded-2xl border border-slate-200/60 dark:border-white/10 bg-white/50 dark:bg-slate-950/60 backdrop-blur-xl shadow-xl flex flex-col gap-2"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-slate-800 dark:text-slate-200 font-medium text-base hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-sky-500 dark:hover:text-sky-400 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all"
                >
                  {t(link.label as I18nKey)}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <main className="min-h-screen">{children}</main>
    </>
  );
}
