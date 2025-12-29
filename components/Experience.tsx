"use client";
import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import { useI18n } from "@/components/I18nProvider";
import { 
  Terminal, Calendar, Briefcase, GraduationCap, 
  MapPin, ArrowRight 
} from "lucide-react";

export default function Experience() {
  const { t } = useI18n();

  const expData = [
    { id: "tdtu", type: "education", ...experience[0] },
    { id: "intern", type: "work", ...experience[1] }
  ];

  return (
    <section id="experience" className="relative py-32 px-4 max-w-5xl mx-auto overflow-hidden ">
      
      {/* 1. Background Elements (Đồng bộ với các section khác) */}
      
      {/* 2. Header Style Terminal */}
      <div className="flex flex-col items-center mb-20 relative z-10">
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-sky-500 font-mono text-sm tracking-[0.2em] uppercase mb-4"
         >
            <Terminal size={16} />
            <span>Career Path</span>
         </motion.div>

         <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white text-center"
         >
            {t("experience.title")}<span className="text-sky-500">.</span>
         </motion.h2>
         <div className="h-1 w-24 bg-gradient-to-r from-sky-500 to-violet-500 rounded-full mt-6" />
      </div>

      {/* 3. Timeline Container */}
      <div className="relative z-10">
        {/* Đường kẻ dọc trục giữa (Gradient đẹp hơn) */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-slate-700 to-transparent" />

        <div className="space-y-16">
          {expData.map((exp, index) => {
            const isRight = index % 2 === 0;
            const Icon = exp.id === "tdtu" ? GraduationCap : Briefcase; // Chọn icon phù hợp

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative flex items-center md:justify-between ${isRight ? "flex-row-reverse" : ""}`}
              >
                {/* TIMELINE NODE (Icon ở giữa) */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#020617] border-4 border-slate-800 flex items-center justify-center z-20 shadow-[0_0_20px_rgba(56,189,248,0.3)] group hover:border-sky-500 transition-colors duration-500">
                    <Icon size={20} className="text-slate-400 group-hover:text-sky-400 transition-colors" />
                </div>

                {/* EMPTY SPACE (Để đẩy card sang một bên) */}
                <div className="hidden md:block w-5/12" />

                {/* CARD CONTENT */}
                <div className="w-full pl-20 md:pl-0 md:w-5/12">
                   <div className={`
                      group relative p-6 rounded-2xl border border-white/10 bg-[#0F172A] 
                      hover:border-sky-500/50 hover:shadow-[0_10px_40px_-10px_rgba(56,189,248,0.15)] 
                      transition-all duration-300
                      ${isRight ? "text-left md:text-right" : "text-left"}
                   `}>
                      
                      {/* Badge Năm */}
                      <div className={`flex items-center gap-2 mb-3 text-xs font-bold font-mono text-sky-400 ${isRight ? "md:justify-end" : "justify-start"}`}>
                          <Calendar size={14} />
                          <span className="px-2 py-1 rounded bg-sky-500/10 border border-sky-500/20">
                            {exp.year}
                          </span>
                      </div>

                      <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                        {t(`exp.${exp.id}.title` as any)}
                      </h3>
                      
                      <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 mt-1">
                        {t(`exp.${exp.id}.company` as any)}
                      </h4>

                      {/* Description Box */}
                      <div className={`
                        text-slate-400 text-sm leading-relaxed p-4 rounded-xl bg-[#0B1121] border border-white/5 
                        group-hover:border-white/10 transition-colors
                        ${isRight ? "text-left" : "text-left"} 
                      `}>
                         {t(`exp.${exp.id}.desc` as any)}
                      </div>

                      {/* Decorative Corner Arrow */}
                      <div className={`absolute top-6 text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity ${isRight ? "left-4 rotate-180" : "right-4"}`}>
                          <ArrowRight size={16} />
                      </div>
                   </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}