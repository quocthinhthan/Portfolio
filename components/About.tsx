"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useI18n } from "@/components/I18nProvider";
import { 
  Terminal, User, Code2, Cpu, Sparkles, 
  GraduationCap, MapPin 
} from "lucide-react";
import Image from "next/image"; 

export default function About() {
  const { t } = useI18n();
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      id="about" 
      ref={ref}
      className="relative py-32 px-4 overflow-hidden bg-[#020617]"
    >
      {/* 1. Background Elements (Giống Projects) */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.15),transparent_70%)]" />
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg,#cbd5e1 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* 2. Section Header (Style Terminal) */}
        <div className="flex flex-col items-center mb-16 text-center">
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-2 text-sky-500 font-mono text-sm tracking-[0.2em] uppercase mb-4"
             >
                <Terminal size={16} />
                <span>System Identity</span>
             </motion.div>
             
             <motion.h2 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl font-black text-white"
             >
                {t("about.title")}<span className="text-sky-500">.</span>
             </motion.h2>
             
             <div className="h-1 w-24 bg-gradient-to-r from-sky-500 to-violet-500 rounded-full mt-6" />
        </div>

        {/* 3. Main Content Card (IDE/Glass Style) */}
        <motion.div
            style={{ y, opacity }}
            className="group relative bg-[#0F172A] border border-white/10 rounded-3xl p-1 overflow-hidden shadow-2xl"
        >
             {/* Gradient Border Effect */}
             <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 via-transparent to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

             {/* Inner Card */}
             <div className="bg-[#0B1121] rounded-[1.3rem] p-8 md:p-12 relative overflow-hidden">
                
                {/* Decorative Window Controls */}
                <div className="absolute top-6 left-6 flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>

                <div className="grid md:grid-cols-5 gap-12 mt-6">
                    
                    {/* Left: Avatar/Icon Graphic */}
                    <div className="md:col-span-2 flex flex-col items-center justify-center">
                        <div className="relative w-40 h-40 md:w-56 md:h-56 mb-6">
                          {/* --- GIỮ NGUYÊN CÁC HIỆU ỨNG VÒNG XOAY --- */}
                          {/* Animated Glow Rings */}
                          <div className="absolute inset-0 bg-sky-500/20 rounded-full blur-3xl animate-pulse" />
                          <div className="absolute inset-0 border border-sky-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
                          <div className="absolute inset-1 border border-dashed border-violet-500/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                          
                          {/* --- THAY THẾ ICON USER BẰNG ẢNH CỦA BẠN --- */}
                          <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-slate-700/50 bg-slate-950 z-10 shadow-2xl">
                              <Image 
                                  src="/about_avatar1.jpg" 
                                  alt="Thân Quốc Thịnh"
                                  fill
                                  className="object-cover hover:scale-110 transition-transform duration-500"
                                  sizes="(max-width: 768px) 100px, 150px"
                              />
                          </div>
                      </div>

                        {/* Quick Stats Badges */}
                        <div className="flex flex-wrap justify-center gap-3">
                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold font-mono">
                                <Code2 size={12} /> Backend
                            </span>
                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold font-mono">
                                <GraduationCap size={12} /> GPA 8.32
                            </span>
                        </div>
                    </div>

                    {/* Right: Text Content */}
                    <div className="md:col-span-3 flex flex-col justify-center space-y-6">
                         <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                            <span className="text-sky-500">{">"}</span> Hello_World
                         </h3>
                         
                         <p className="text-slate-400 text-lg leading-relaxed">
                            {t("about.p1")}
                            <span className="text-sky-400 font-bold glow-text"> {t("about.backend")}</span>.
                         </p>

                         <p className="text-slate-400 text-lg leading-relaxed border-l-2 border-slate-700 pl-4">
                            {t("about.p2")}
                         </p>

                         {/* Mini Tech Quote / Decor */}
                         <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-3 text-slate-500 text-sm font-mono italic">
                            <Cpu size={14} />
                            <span>"Clean Architecture & Scalability Enthusiast"</span>
                         </div>
                    </div>
                </div>
             </div>
        </motion.div>

        {/* 4. Extra Decorative Blobs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

      </div>
    </section>
  );
}