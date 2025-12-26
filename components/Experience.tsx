"use client";
import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import { useI18n } from "@/components/I18nProvider";

export default function Experience() {
  const { t } = useI18n();

  // Map IDs to i18n keys
  const expData = [
    { id: "tdtu", ...experience[0] },
    { id: "intern", ...experience[1] }
  ];

  return (
    <section id="experience" className="py-32 px-4 max-w-4xl mx-auto relative z-10">
      
      {/* Tiêu đề có hiệu ứng hiện lên */}
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-500"
      >
        {t("experience.title")}
      </motion.h2>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-800 md:left-1/2 md:-translate-x-1/2 bg-gradient-to-b from-transparent via-slate-700 to-transparent" />

        <div className="space-y-16">
          {expData.map((exp, index) => {
            const isRight = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isRight ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, type: "spring" }}
                className="relative"
              >
                <div className="absolute left-4 top-2 w-4 h-4 rounded-full bg-slate-950 border-4 border-sky-500 md:left-1/2 md:-translate-x-1/2 z-10 shadow-[0_0_15px_rgba(14,165,233,0.5)]" />

                <div className={`pl-12 md:pl-0 md:flex md:items-start ${isRight ? "md:flex-row-reverse" : "md:flex-row"}`}>
                  <div className={`md:w-1/2 ${isRight ? "md:pl-12" : "md:pr-12 text-left md:text-right"}`}>
                    <span className="inline-block px-3 py-1 mb-2 text-xs font-bold tracking-wider text-sky-400 bg-sky-900/20 rounded border border-sky-500/20">
                      {exp.year}
                    </span>
                    <h3 className="text-xl font-bold text-slate-100">
                      {t(`exp.${exp.id}.title` as any)}
                    </h3>
                    <h4 className="text-md font-medium text-slate-400 mb-4">
                      {t(`exp.${exp.id}.company` as any)}
                    </h4>
                    {/* Card Description Dark Mode */}
                    <div className="text-slate-400 text-sm leading-relaxed bg-slate-900/50 p-5 rounded-xl border border-slate-800 hover:border-slate-600 transition-colors shadow-lg">
                      {t(`exp.${exp.id}.desc` as any)}
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}