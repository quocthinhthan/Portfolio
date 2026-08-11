"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { personalInfo } from "@/lib/data";
import { useI18n } from "@/components/I18nProvider";
import { Github, Terminal } from "lucide-react";
import BackgroundBeams from "./ui/BackgroundBeams";
import { useEffect, useState } from "react";

const TypewriterEffect = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText(""); 
    let i = 0;
    const timer = setInterval(() => {
      if (i <= text.length) {
        setDisplayedText(text.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 50); 
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="font-mono text-sky-600 dark:text-sky-400 font-bold tracking-tight">
      {displayedText}
      <span className="cursor-block"></span>
    </span>
  );
};

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="min-h-[100dvh] relative flex flex-col justify-center items-center text-center px-4 py-20 overflow-hidden">
      
      <BackgroundBeams />

      <div className="relative z-20 flex flex-col items-center max-w-5xl mx-auto mt-0 md:mt-[-5vh]">
        
        {/* AVATAR */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
           <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 blur-lg opacity-30 dark:opacity-40 animate-spin-slow"></div>
          
          <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 shadow-xl dark:shadow-2xl">
            <Image
              src="/avatar.jpg"
              alt="Avatar"
              width={160}
              height={160}
              className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
              priority
            />
          </div>
        </motion.div>

        {/* BADGE */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-300/80 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/40 backdrop-blur-md text-slate-800 dark:text-sky-100 text-xs font-bold uppercase tracking-widest shadow-sm dark:shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            {t("hero.badge")}
          </span>
        </motion.div>

        {/* NAME */}
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl font-black mb-4 tracking-tighter"
        >
          <span className="hero-name bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-slate-100 dark:to-slate-500 drop-shadow-sm">
            {t("personal.name")} 
          </span>
        </motion.h1>

        {/* ROLE */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="h-10 flex items-center justify-center gap-3 mb-10 text-lg md:text-xl"
        >
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-mono text-sm bg-white dark:bg-slate-900 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-800 shadow-sm">
             <Terminal size={16} className="text-sky-600 dark:text-sky-400" />
             <span>Dev ~/</span>
          </div>
          {/* Hiệu ứng gõ chữ */}
          <TypewriterEffect text={t("personal.role")} />
        </motion.div>

        {/* BUTTONS */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-5"
        >
          {/* --- NÚT VIEW PROJECTS --- */}
          <a
            href="#projects"
            className="group relative px-8 py-3.5 rounded-full bg-sky-600 dark:bg-sky-500 text-white dark:text-slate-950 font-extrabold text-base overflow-hidden hover:bg-sky-700 dark:hover:bg-sky-400 hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:scale-105 transition-all duration-300 shadow-md"
          >
            {/* Lớp phủ Shine */}
            <div className="shine-layer absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg]" />
            
            <span className="relative z-10 flex items-center gap-2">
              {t("hero.cta.projects")}
            </span>
          </a>
          
          {/* NÚT CONTACT */}
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-900/50 backdrop-blur-sm text-slate-800 dark:text-white font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500 transition-all hover:scale-105 shadow-sm"
          >
            {t("hero.cta.contact")}
          </a>

          {/* GITHUB ICON */}
          <a
            href={personalInfo.github}
            target="_blank"
            className="p-3.5 rounded-full border border-slate-300 dark:border-slate-800 bg-white/90 dark:bg-slate-900/50 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-sky-500 hover:bg-sky-500/10 hover:shadow-lg hover:shadow-sky-500/20 transition-all hover:-translate-y-1 shadow-sm"
          >
            <Github size={24} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
