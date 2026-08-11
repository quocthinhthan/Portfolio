"use client";

import { motion } from "framer-motion";
import { BadgeCheck, CalendarDays, FileBadge, Terminal, Trophy } from "lucide-react";
import { achievements } from "@/lib/data";
import { useI18n } from "@/components/I18nProvider";
import type { I18nKey } from "@/lib/i18n";

export default function Achievements() {
  const { t } = useI18n();

  return (
    <section id="achievements" className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-500/10 blur-[110px]" />
        <div className="absolute right-[8%] bottom-0 h-60 w-60 rounded-full bg-sky-500/10 blur-[90px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 text-sky-600 dark:text-sky-500 font-mono text-sm tracking-[0.2em] uppercase mb-4">
            <Terminal size={16} />
            <span>{t("achievements.label")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
            {t("achievements.title")}<span className="text-sky-600 dark:text-sky-500">.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-slate-600 dark:text-slate-400 leading-relaxed">
            {t("achievements.description")}
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.45fr_0.85fr] gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="group relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#0F172A] p-7 md:p-9 shadow-lg dark:shadow-2xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(56,189,248,0.12),transparent_45%),radial-gradient(circle_at_95%_100%,rgba(168,85,247,0.12),transparent_42%)]" />
            <div className="relative">
              <div className="flex items-center justify-between gap-4 mb-9">
                <div className="flex items-center gap-3 text-sky-600 dark:text-sky-400 font-mono text-xs font-bold tracking-[0.16em] uppercase">
                  <span className="flex size-10 items-center justify-center rounded-2xl border border-sky-500/30 bg-sky-500/10">
                    <Trophy size={19} />
                  </span>
                  {t("achievements.awards")}
                </div>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Verified
                </span>
              </div>

              {achievements.map((achievement) => (
                <div key={achievement.id} className="relative pl-7 border-l border-sky-500/40">
                  <span className="absolute -left-[5px] top-1.5 size-2 rounded-full bg-sky-500 dark:bg-sky-400 shadow-[0_0_14px_rgba(56,189,248,0.9)]" />
                  <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    {t(`achievements.${achievement.id}.title` as I18nKey)}
                  </h3>
                  <p className="mt-4 max-w-xl text-slate-700 dark:text-slate-400 leading-relaxed">
                    {t(`achievements.${achievement.id}.description` as I18nKey)}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-mono text-sky-600 dark:text-sky-400">
                    <CalendarDays size={15} />
                    <span>{achievement.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.12 }}
            className="relative overflow-hidden rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 p-7 md:p-9 shadow-sm"
          >
            <div className="absolute -right-12 -top-12 size-40 rounded-full border border-violet-500/20" />
            <div className="relative flex h-full min-h-60 flex-col justify-between">
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                  <FileBadge size={22} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">{t("achievements.certificates")}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {t("achievements.certificates.empty")}
                </p>
              </div>
              <div className="flex items-center gap-2 pt-8 text-xs font-mono uppercase tracking-widest text-slate-500">
                <BadgeCheck size={15} className="text-violet-600 dark:text-violet-400" />
                Credential-ready
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
