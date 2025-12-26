"use client";

import { useI18n } from "@/components/I18nProvider";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="py-8 text-center text-slate-600 dark:text-slate-500 text-sm border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
      <p>
        © {new Date().getFullYear()} Thân Quốc Thịnh. {t("footer.builtWith")}
      </p>
    </footer>
  );
}