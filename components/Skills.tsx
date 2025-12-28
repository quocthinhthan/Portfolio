"use client";
import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import { useI18n } from "@/components/I18nProvider";
import SpotlightCard from "@/components/ui/SpotlightCard"; // Tận dụng component có sẵn
import { Code2, Terminal } from "lucide-react";

// Animation cho container chứa các nhóm skill
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Animation cho từng item (nhóm skill và từng tag)
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
        type: "spring",
        stiffness: 100
    }
  },
};

export default function Skills() {
  const { t } = useI18n();

  return (
    <section id="skills" className="py-24 px-4 max-w-6xl mx-auto relative">
      {/* Hiệu ứng ánh sáng nền mờ cho Section */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-sky-500/5 blur-[120px] -z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center gap-2 mb-4 text-sky-500 font-mono text-sm tracking-widest uppercase">
          <Terminal size={18} />
          <span>Technical Stack</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-400 to-purple-500">
          {t("skills.title")}
        </h2>
      </motion.div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {skills.map((skillGroup, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <SpotlightCard className="h-full p-8 border border-slate-800/50 bg-slate-900/40 backdrop-blur-md hover:border-sky-500/50 transition-colors duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 group-hover:scale-110 transition-transform">
                  <skillGroup.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 tracking-tight">
                  {skillGroup.category}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((skill, sIdx) => (
                  <motion.span
                    key={sIdx}
                    whileHover={{ 
                        scale: 1.1, 
                        y: -2,
                        backgroundColor: "rgba(56, 189, 248, 0.15)",
                        borderColor: "rgba(56, 189, 248, 0.4)"
                    }}
                    className="px-4 py-2 bg-slate-800/50 text-slate-300 text-xs font-bold rounded-lg border border-slate-700/50 transition-all cursor-default flex items-center gap-2"
                  >
                    <div className="w-1 h-1 rounded-full bg-sky-500" />
                    {skill}
                  </motion.span>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}