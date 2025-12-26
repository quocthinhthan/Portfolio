"use client";

import { I18nProvider, useI18n } from "@/components/I18nProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import CursorGlow from "@/components/ui/CursorGlow"; // Import hiệu ứng chuột

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18nProvider>
      <ThemeProvider>
        {/* Hiệu ứng đèn pin theo chuột toàn trang */}
        <CursorGlow />
        <ShellInner>{children}</ShellInner>
      </ThemeProvider>
    </I18nProvider>
  );
}

function ShellInner({ children }: { children: React.ReactNode }) {
  const { lang, setLang } = useI18n();

  return (
    <>
      {/* Floating Header - Tăng kích thước và độ rõ */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-xl shadow-2xl flex justify-between items-center px-6 py-4 transition-all duration-300">
        
        {/* Logo to hơn */}
        <div className="font-black text-xl md:text-2xl tracking-tighter text-slate-100 cursor-pointer group">
          <a href="#">
            TQT<span className="text-sky-400 group-hover:text-purple-400 transition-colors duration-300">.DEV</span>
          </a>
        </div>

        {/* Nav Links to hơn */}
        <nav className="hidden md:flex gap-8 text-base font-medium text-slate-300">
           <a href="#about" className="hover:text-white hover:scale-105 transition-all">About</a>
           <a href="#projects" className="hover:text-white hover:scale-105 transition-all">Projects</a>
           <a href="#skills" className="hover:text-white hover:scale-105 transition-all">Skills</a>
           <a href="#contact" className="hover:text-white hover:scale-105 transition-all">Contact</a>
        </nav>

        {/* Nút đổi ngôn ngữ */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "vi" ? "en" : "vi")}
            className="px-4 py-2 rounded-lg text-sm font-bold border border-slate-700 text-slate-200 hover:border-sky-500 hover:bg-sky-500/10 hover:text-sky-400 transition-all"
          >
            {lang === "vi" ? "VN" : "EN"}
          </button>
        </div>
      </header>

      <main className="min-h-screen">
        {children}
      </main>

    </>
  );
}