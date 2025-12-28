"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { personalInfo } from "@/lib/data";
import { useI18n } from "@/components/I18nProvider";
import { Github, Terminal } from "lucide-react";
import BackgroundBeams from "./ui/BackgroundBeams";
import { useEffect, useState } from "react";
import ParallaxIcons from "./ui/ParallaxIcons";

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
    <span className="font-mono text-sky-400 font-bold tracking-tight">
      {displayedText}
      <span className="cursor-block"></span>
    </span>
  );
};

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="h-screen relative flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      
      <BackgroundBeams />

      <div className="relative z-20 flex flex-col items-center max-w-5xl mx-auto mt-[-5vh]">
        
        {/* AVATAR */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
           <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 blur-lg opacity-40 animate-spin-slow"></div>
          
          <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-slate-800 bg-slate-950 shadow-2xl">
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
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-700/50 bg-slate-900/40 backdrop-blur-md text-sky-100 text-xs font-bold uppercase tracking-widest shadow-lg">
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
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-100 to-slate-500 drop-shadow-sm">
            {personalInfo.name}
          </span>
        </motion.h1>

        {/* ROLE */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="h-10 flex items-center justify-center gap-3 mb-10 text-lg md:text-xl"
        >
          <div className="flex items-center gap-2 text-slate-500 font-mono text-sm bg-slate-900 px-2 py-1 rounded border border-slate-800">
             <Terminal size={16} />
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
            // Thêm class 'group' vào thẻ cha
            className="group relative px-8 py-3.5 rounded-full bg-sky-500 text-slate-950 font-extrabold text-base overflow-hidden hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:scale-105 transition-all duration-300"
          >
            {/* Lớp phủ Shine - CÓ CLASS shine-layer */}
            <div className="shine-layer absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg]" />
            
            <span className="relative z-10 flex items-center gap-2">
              {t("hero.cta.projects")}
            </span>
          </a>
          
          {/* NÚT CONTACT */}
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full border border-slate-700 bg-slate-900/50 backdrop-blur-sm text-white font-medium hover:bg-slate-800 hover:border-slate-500 transition-all hover:scale-105"
          >
            {t("hero.cta.contact")}
          </a>

          {/* GITHUB ICON */}
          <a
            href={personalInfo.github}
            target="_blank"
            className="p-3.5 rounded-full border border-slate-800 bg-slate-900/50 text-slate-400 hover:text-white hover:border-sky-500 hover:bg-sky-500/10 hover:shadow-lg hover:shadow-sky-500/20 transition-all hover:-translate-y-1"
          >
            <Github size={24} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}