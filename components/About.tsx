"use client";
import { motion } from "framer-motion";
import { useI18n } from "@/components/I18nProvider";

export default function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="py-20 px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">{t("about.title")}</h2>
        <div className="bg-white/60 dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 backdrop-blur-sm">
          <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-4">
            {t("about.p1")}
            <span className="text-primary font-bold"> {t("about.backend")}</span>.
          </p>
          <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
            {t("about.p2")}
          </p>
        </div>
      </motion.div>
    </section>
  );
}