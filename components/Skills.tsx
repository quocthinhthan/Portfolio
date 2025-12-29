"use client";

import { motion, Variants } from "framer-motion";
import { skills } from "@/lib/data";
import { useI18n } from "@/components/I18nProvider";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { Terminal, Cpu, Sparkles } from "lucide-react";

// Animation Stagger cho mượt mà
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 80 }
  },
};

export default function Skills() {
  const { t } = useI18n();

  return (
    <section id="skills" className="relative py-32 px-4 max-w-6xl mx-auto overflow-hidden">

      {/* 2. Header Style Terminal */}
      <div className="flex flex-col items-center mb-20 relative z-10">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-sky-500 font-mono text-sm tracking-[0.2em] uppercase mb-4"
        >
            <Terminal size={16} />
            <span>Technical Stack</span>
        </motion.div>

        <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white text-center"
        >
            {t("skills.title")}<span className="text-sky-500">.</span>
        </motion.h2>
        <div className="h-1 w-24 bg-gradient-to-r from-sky-500 to-violet-500 rounded-full mt-6" />
      </div>
      
      {/* 3. Grid Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10"
      >
        {skills.map((skillGroup, idx) => (
          <motion.div key={idx} variants={itemVariants} className="h-full">
            <SpotlightCard 
                className="h-full p-8 rounded-3xl border border-white/10 bg-[#0F172A] shadow-2xl"
                spotlightColor="rgba(56, 189, 248, 0.2)" // Ánh sáng Sky Blue khi hover
            >
              {/* Card Header */}
              <div className="flex items-center gap-5 mb-8 pb-6 border-b border-white/5">
                <div className="relative p-3 rounded-2xl bg-[#0B1121] border border-white/10 group-hover:border-sky-500/30 transition-colors">
                  <div className="absolute inset-0 bg-sky-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <skillGroup.icon className="w-8 h-8 text-sky-400 relative z-10" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                        {skillGroup.category}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono mt-1 uppercase tracking-wider">
                        Detected: {skillGroup.items.length} Modules
                    </p>
                </div>
              </div>
              
              {/* Skill Tags Grid */}
              <div className="flex flex-wrap gap-2.5">
                {skillGroup.items.map((skill, sIdx) => (
                  <motion.div
                    key={sIdx}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="
                        relative px-3.5 py-2 
                        bg-[#0B1121] text-slate-300 text-sm font-semibold 
                        rounded-lg border border-white/5 
                        hover:border-sky-500/40 hover:bg-sky-500/10 hover:text-sky-300
                        transition-all duration-300 cursor-default
                        flex items-center gap-2 group/tag
                    "
                  >
                    {/* Tiny decorative dot */}
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover/tag:bg-sky-400 transition-colors" />
                    {skill}
                  </motion.div>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}