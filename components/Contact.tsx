"use client";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { Mail, Github, Linkedin, FileText, Send } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";

export default function Contact() {
  const { t } = useI18n();

  return (
    <section id="contact" className="py-24 px-4 text-center relative overflow-hidden">
        {/* Background glow for contact */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-6 text-white">{t("contact.title")}</h2>
        <p className="text-slate-400 mb-12 text-lg leading-relaxed max-w-2xl mx-auto">
          {t("contact.desc")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
            <a href={`mailto:${personalInfo.email}`} 
               className="flex items-center gap-4 p-4 rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-all hover:border-primary/50 group">
                <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                    <Mail size={20} />
                </div>
                <div className="text-left">
                    <div className="text-xs text-slate-500 font-mono uppercase">Email</div>
                    <div className="text-slate-200 text-sm font-medium">{personalInfo.email}</div>
                </div>
            </a>

             <a href={personalInfo.linkedin} target="_blank"
               className="flex items-center gap-4 p-4 rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-all hover:border-blue-500/50 group">
                <div className="p-3 rounded-full bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <Linkedin size={20} />
                </div>
                <div className="text-left">
                    <div className="text-xs text-slate-500 font-mono uppercase">LinkedIn</div>
                    <div className="text-slate-200 text-sm font-medium">Connect with me</div>
                </div>
            </a>
        </div>

        {/* Hiding temporary CV download button  */}
        {/* <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/cv.pdf"
          download
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          <FileText size={20} /> {t("contact.downloadCv")}
        </motion.a> */}

      </motion.div>
    </section>
  );
}