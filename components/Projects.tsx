"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import { X, Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import SpotlightCard from "./ui/SpotlightCard";

export default function Projects() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { t } = useI18n();
  const selectedProject = projects.find((p) => p.id === selectedId);

  return (
    <section id="projects" className="py-24 px-4 max-w-7xl mx-auto relative">
      <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
        {t("projects.title")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            layoutId={project.id}
            onClick={() => setSelectedId(project.id)}
            className="cursor-pointer group"
          >
            <SpotlightCard className="h-full p-6 flex flex-col hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                 <motion.h3 className="text-xl font-bold text-slate-100 group-hover:text-primary transition-colors">
                  {t(`proj.${project.id}.title` as any)}
                </motion.h3>
                <ArrowUpRight className="text-slate-600 group-hover:text-primary transition-colors" size={20}/>
              </div>
              
              <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                {t(`proj.${project.id}.short` as any)}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.techStack.slice(0, 3).map((tech) => (
                  <span key={tech} className="text-xs font-mono px-2 py-1 rounded bg-slate-800/80 text-primary border border-primary/20">
                    {tech}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              layoutId={selectedId}
              className="w-full max-w-2xl bg-[#0B1121] border border-slate-700 rounded-2xl p-6 md:p-8 relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                className="absolute top-4 right-4 p-2 bg-slate-800 rounded-full hover:bg-slate-700 text-white transition-colors"
              >
                <X size={20} />
              </button>

              <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                {t(`proj.${selectedProject.id}.title` as any)}
              </h2>
              
              <div className="flex flex-wrap gap-2 mb-8">
                 {selectedProject.techStack.map(tech => (
                     <span key={tech} className="px-3 py-1 bg-slate-800 rounded-md text-xs font-mono text-primary border border-primary/20">
                         {tech}
                     </span>
                 ))}
              </div>

              <div className="space-y-6 text-slate-300">
                <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                    <h4 className="font-bold text-white mb-2 uppercase text-xs tracking-wider opacity-70">{t("projects.modal.role")}</h4>
                    <p className="text-primary font-semibold">{t(`proj.${selectedProject.id}.role` as any || selectedProject.role)}</p>
                </div>
                
                <div>
                    <h4 className="font-bold text-white mb-2 uppercase text-xs tracking-wider opacity-70">{t("projects.modal.description")}</h4>
                    <p className="leading-relaxed">{t(`proj.${selectedProject.id}.full` as any)}</p>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-2 uppercase text-xs tracking-wider opacity-70">{t("projects.modal.features")}</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedProject.features.map((f, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                              {f}
                            </li>
                        ))}
                    </ul>
                </div>
              </div>

              <div className="mt-10 flex gap-4 pt-6 border-t border-slate-800">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-white font-medium transition-colors"
                >
                  <Github size={18} /> GitHub
                </a>
                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-slate-900 font-bold rounded-xl hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/20"
                  >
                    <ExternalLink size={18} /> Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}