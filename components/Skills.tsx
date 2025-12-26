"use client";
import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import { useI18n } from "@/components/I18nProvider";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Skills() {
  const { t } = useI18n();

  return (
    <section id="skills" className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center">{t("skills.title")}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((skillGroup, idx) => (
          <motion.div
            key={idx}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
            className="bg-white/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
          >
            <div className="flex items-center gap-3 mb-6">
              <skillGroup.icon className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">{skillGroup.category}</h3>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {skillGroup.items.map((skill, sIdx) => (
                <motion.span
                  key={sIdx}
                  variants={item}
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm rounded-full border border-slate-200 dark:border-slate-700"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}