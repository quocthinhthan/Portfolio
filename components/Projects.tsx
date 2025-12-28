// components/Projects.tsx
"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useMotionValue,
  useSpring,
  AnimatePresence
} from "framer-motion";

import { projects, Project } from "@/lib/data";
import {
  Github, ExternalLink, Terminal, Code2, Cpu,
  Database, Server, Cloud, Lock, Brain, HeartPulse,
  Activity, Zap, ShieldCheck, Globe, ArrowRight, X
} from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
// 🟢 Import ParallaxIcons
import ParallaxIcons from "@/components/ui/ParallaxIcons"; 

// ===============================
// ICON HELPERS
// ===============================
const getTechIcon = (tech: string) => {
  const lower = tech.toLowerCase();
  if (lower.includes("ai") || lower.includes("gpt")) return <Brain size={14} className="text-purple-400" />;
  if (lower.includes("health")) return <HeartPulse size={14} className="text-rose-400" />;
  if (lower.includes("sql") || lower.includes("mongo") || lower.includes("redis")) return <Database size={14} className="text-amber-400" />;
  if (lower.includes("server") || lower.includes("node") || lower.includes("nest")) return <Server size={14} className="text-blue-400" />;
  if (lower.includes("docker") || lower.includes("aws")) return <Cloud size={14} className="text-sky-400" />;
  if (lower.includes("auth") || lower.includes("jwt")) return <Lock size={14} className="text-emerald-400" />;
  return <Code2 size={14} className="text-slate-400" />;
};

const getFeatureIcon = (feature: string) => {
  const lower = feature.toLowerCase();
  if (lower.includes("hiệu năng") || lower.includes("performance")) return <Zap size={16} className="text-yellow-400" />;
  if (lower.includes("bảo mật") || lower.includes("secure")) return <ShieldCheck size={16} className="text-emerald-400" />;
  if (lower.includes("api") || lower.includes("connect")) return <Globe size={16} className="text-sky-400" />;
  if (lower.includes("real-time") || lower.includes("monitor")) return <Activity size={16} className="text-rose-400" />;
  return <Cpu size={16} className="text-slate-400" />;
};

// ===============================
// MAIN COMPONENT
// ===============================
export default function Projects() {
  const { t } = useI18n();
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <>
      <section
        ref={targetRef}
        id="projects"
        className="relative h-[500vh] bg-[#020617] overflow-clip"
      >
        {/* Parallax Icons */}
        <div className="absolute inset-0 z-0 opacity-40">
           <ParallaxIcons />
        </div>

        {/* Background Gradients */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.05),transparent_60%)]" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg,#0f172a 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="sticky top-0 h-screen flex items-center overflow-hidden perspective-[1000px] z-10">

          {/* LEFT SIDE TITLE */}
          <div className="hidden md:flex w-[30%] h-full flex-col justify-center px-12 lg:px-16 pointer-events-none select-none relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-3 text-sky-500 font-mono text-sm tracking-[0.2em] uppercase">
                <Terminal size={16} />
                {/* 🟢 i18n applied */}
                <span>{t("projects.section.label" as any) || "Engineering Output"}</span>
              </div>

              <h2 className="text-6xl lg:text-8xl font-black text-white leading-none tracking-tighter">
                {/* 🟢 i18n applied (Tách dòng để giữ layout) */}
                {t("projects.title.line1" as any) || "Featured"}<br />
                {t("projects.title.line2" as any) || "Projects"}
                <span className="text-sky-500">.</span>
              </h2>

              <div className="h-1 w-20 bg-gradient-to-r from-sky-500 to-violet-500 rounded-full" />

              <p className="text-slate-400 text-lg max-w-sm font-light leading-relaxed">
                {t("projects.intro.desc" as any) || "Tuyển tập các hệ thống Backend được xây dựng với sự chú trọng tối đa vào khả năng mở rộng."}
              </p>
            </motion.div>
          </div>

          {/* MOVING TRACK */}
          <div className="w-full md:w-[70%] h-full flex items-center pl-8 md:pl-30">
            <motion.div style={{ x }} className="flex gap-24 pr-[10vw] py-10">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  t={t}
                  index={index}
                  total={projects.length}
                  progress={scrollYProgress}
                  onOpen={() => setSelectedProject(project)} 
                />
              ))}

              <GithubCtaCard />
            </motion.div>
          </div>

          {/* PROGRESS LINE */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-900/50">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
              className="h-full bg-gradient-to-r from-sky-500 via-violet-500 to-sky-500"
            />
          </div>
        </div>
      </section>

      {/* MODAL DETAIL */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        t={t}
      />
    </>
  );
}

// ===============================
// PROJECT CARD
// ===============================
function ProjectCard({
  project, t, index, total, progress, onOpen
}: {
  project: Project; 
  t: any; 
  index: number; 
  total: number; 
  progress: MotionValue<number>;
  onOpen: () => void;
}) {
  
  // 1. Tính toán Range (Plateau Logic)
  const step = 1 / total;
  const start = (step * index) - 0.1;
  const end = start + step + 0.3;
  
  const peakStart = start + (step * 0.2); 
  const peakEnd = start + (step * 0.9);   

  const range = [start, peakStart, peakEnd, end];

  // 2. Transform Hooks
  const zIndex = useTransform(progress, range, [1, 50, 50, 1]);
  const scale = useTransform(progress, range, [0.85, 1.08, 1.08, 0.85]);
  const opacity = useTransform(progress, range, [0.25, 1, 1, 0]);
  const blur = useTransform(progress, range, ["blur(2px)", "blur(0px)", "blur(0px)", "blur(12px)"]);

  const borderColor = useTransform(progress, range,
    ["rgba(255,255,255,0.05)", "rgba(56,189,248,0.6)", "rgba(56,189,248,0.6)", "rgba(255,255,255,0.05)"]
  );

  const boxShadow = useTransform(progress, range,
    ["none", "0 35px 80px -20px rgba(56,189,248,0.35)", "0 35px 80px -20px rgba(56,189,248,0.35)", "none"]
  );

  const innerLightOpacity = useTransform(progress, range, [0, 1, 1, 0]);

  // 3. Tilt Effect
  const rotateX = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });

  const handleMouseMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rotateX.set(-(e.clientY - rect.top - rect.height / 2) / 40);
    rotateY.set((e.clientX - rect.left - rect.width / 2) / 40);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      layoutId={`card-${project.id}`}
      onClick={onOpen}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      style={{ opacity, scale, zIndex, borderColor, boxShadow, rotateX, rotateY, filter: blur, willChange: "filter, transform" }}
      className="
        relative
        w-[78vw] md:w-[48vw] lg:w-[42vw] h-[64vh] flex-shrink-0
        rounded-[2.8rem] p-8 md:p-10 flex flex-col justify-between overflow-hidden
        bg-[#0F172A] border-[1.5px] border-white/10
        shadow-[0_20px_60px_-15px_rgba(0,0,0,0.65)]
        cursor-pointer group
      "
    >
      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
           style={{ backgroundImage: `url(/noise.png)` }} />

      <motion.div
        style={{ opacity: innerLightOpacity }}
        animate={{ x: ["-20%", "120%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-1 bg-[radial-gradient(circle_at_20%_-10%,rgba(56,189,248,0.25),transparent_60%)] pointer-events-none"
      />

      <div className="relative z-10 pointer-events-none">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.slice(0, 3).map(tech => (
            <span key={tech} className="pl-2 pr-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full border border-white/10 flex items-center gap-2 bg-slate-800/80 text-sky-100">
              {getTechIcon(tech)} {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
             <span className="pl-2 pr-3 py-1.5 text-[11px] font-bold bg-slate-800/50 text-slate-400 rounded-full border border-white/5">
                +{project.techStack.length - 3}
             </span>
          )}
        </div>

        <motion.h3 layoutId={`title-${project.id}`} className="text-4xl lg:text-5xl font-extrabold text-white mb-5 group-hover:text-sky-400 transition-colors">
          {t(`proj.${project.id}.title` as any)}
        </motion.h3>

        <p className="text-slate-400 text-lg leading-relaxed pl-4 border-l-2 border-sky-500/30 line-clamp-3">
          {t(`proj.${project.id}.full` as any) || "Mô tả dự án..."}
        </p>
        
        {/* 🟢 i18n applied */}
        <p className="mt-4 text-sm text-sky-500 font-bold underline decoration-sky-500/30 underline-offset-4 group-hover:text-sky-300">
            {t("projects.card.view_details" as any) || "Click to view details →"}
        </p>

        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 opacity-80">
          {project.features.slice(0, 2).map((f, i) => (
            <div key={i} className="flex items-start gap-3 text-slate-200 text-xs bg-white/5 p-3 rounded-xl border border-white/10">
              {getFeatureIcon(f)}
              <span className="truncate">{f}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto flex gap-4 mt-8 pt-3 pb-2 border-t border-white/10 z-20">
        <a 
          href={project.githubUrl} 
          target="_blank"
          onClick={(e) => e.stopPropagation()}
          className="flex-1 py-4 flex items-center justify-center gap-3 rounded-2xl font-bold bg-white text-black hover:scale-[1.03] active:scale-95 transition-all shadow-xl"
        >
          {/* 🟢 i18n applied */}
          <Github size={20} /> {t("projects.btn.source" as any) || "Source"}
        </a>
        
        {project.demoUrl && (
          <a 
            href={project.demoUrl} 
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 py-4 flex items-center justify-center gap-3 rounded-2xl font-bold border border-white/10 bg-slate-900 text-white hover:bg-sky-600 hover:scale-[1.03] active:scale-95 transition-all"
          >
            {/* 🟢 i18n applied */}
            <ExternalLink size={20} /> {t("projects.btn.demo" as any) || "Demo"}
          </a>
        )}
      </div>
    </motion.div>
  );
}

// ===============================
// GITHUB CTA CARD
// ===============================
function GithubCtaCard() {
    // 🟢 Thêm hook useI18n vào đây (trước đó bị thiếu)
    const { t } = useI18n(); 

    const rotateX = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
    const rotateY = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  
    const handleMouseMove = (e: any) => {
      const rect = e.currentTarget.getBoundingClientRect();
      rotateX.set(-(e.clientY - rect.top - rect.height / 2) / 40);
      rotateY.set((e.clientX - rect.left - rect.width / 2) / 40);
    };
  
    const resetTilt = () => {
      rotateX.set(0);
      rotateY.set(0);
    };

    return (
        <motion.a 
            href="https://github.com/quocthinhthan"
            target="_blank"
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
            style={{ rotateX, rotateY }}
            className="group relative w-[80vw] md:w-[35vw] h-[64vh] flex-shrink-0 perspective-[1000px] cursor-pointer"
        >
             <div className="
                w-full h-full rounded-[2.5rem]
                bg-gradient-to-br from-[#0F172A] to-[#020617]
                border-2 border-dashed border-slate-700
                hover:border-sky-500 hover:bg-slate-900
                transition-all duration-500
                flex flex-col items-center justify-center text-center p-10
                group-hover:scale-[1.02] group-hover:shadow-[0_0_50px_-10px_rgba(56,189,248,0.3)]
             ">
                 <div className="mb-8 relative">
                    <div className="absolute inset-0 bg-sky-500 blur-[50px] opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full" />
                    <Github size={90} className="text-slate-400 group-hover:text-white transition-colors duration-300 relative z-10" />
                 </div>
                 <h3 className="text-4xl font-black text-white mb-4">
                    {/* 🟢 i18n applied */}
                    {t("projects.github.view_more" as any) || "View More"}<br/>
                    {t("projects.github.on" as any) || "on"} <span className="text-sky-500">GitHub</span>
                 </h3>
                 <div className="flex items-center gap-3 text-sky-400 font-bold uppercase tracking-widest text-xs group-hover:gap-5 transition-all bg-sky-500/10 px-6 py-3 rounded-full border border-sky-500/20">
                    {/* 🟢 i18n applied */}
                    <span>{t("projects.github.visit_profile" as any) || "Visit Profile"}</span>
                    <ArrowRight size={16} />
                 </div>
             </div>
        </motion.a>
    )
}

// ===============================
// MODAL COMPONENT (MỚI)
// ===============================
function ProjectModal({ project, isOpen, onClose, t }: { project: Project | null, isOpen: boolean, onClose: () => void, t: any }) {
    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    <motion.div
                        layoutId={`card-${project.id}`}
                        className="
                            relative w-full max-w-4xl max-h-[90vh] 
                            bg-[#0B1121] border border-slate-700 rounded-[2rem] 
                            shadow-2xl overflow-y-auto overflow-x-hidden
                            z-10 custom-scrollbar
                        "
                    >
                        <button 
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 hover:rotate-90 transition-all z-50"
                        >
                            <X size={24} />
                        </button>

                        <div className="p-8 md:p-12">
                             <div className="flex items-center gap-3 mb-6">
                                <span className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">
                                    {t(`proj.${project.id}.title` as any)}
                                </span>
                             </div>

                             <div className="flex flex-wrap gap-2 mb-8">
                                {project.techStack.map(tech => (
                                    <span key={tech} className="px-3 py-1.5 text-xs font-bold uppercase rounded-full border border-white/10 bg-sky-500/10 text-sky-300">
                                        {tech}
                                    </span>
                                ))}
                             </div>

                             <div className="grid md:grid-cols-3 gap-10">
                                <div className="md:col-span-2 space-y-6">
                                    {/* 🟢 i18n applied */}
                                    <h4 className="text-xl font-bold text-white flex items-center gap-2">
                                        <Terminal className="text-sky-500" /> {t("projects.modal.description" as any) || "Description"}
                                    </h4>
                                    <p className="text-slate-300 leading-relaxed text-lg">
                                        {t(`proj.${project.id}.full` as any) || "Mô tả chi tiết đang cập nhật..."}
                                    </p>
                                    
                                    <div className="pt-6">
                                        {/* 🟢 i18n applied */}
                                        <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                            <Zap className="text-yellow-400" /> {t("projects.modal.features" as any) || "Key Features"}
                                        </h4>
                                        <ul className="grid grid-cols-1 gap-3">
                                            {project.features.map((f, i) => (
                                                <li key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800">
                                                    {getFeatureIcon(f)}
                                                    <span className="text-slate-300">{f}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                                        {/* 🟢 i18n applied */}
                                        <h5 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
                                            {t("projects.modal.links" as any) || "Project Links"}
                                        </h5>
                                        <div className="flex flex-col gap-3">
                                            <a href={project.githubUrl} target="_blank" className="flex items-center justify-center gap-3 py-3 bg-white text-black font-bold rounded-xl hover:scale-105 transition-transform">
                                                {/* 🟢 i18n applied */}
                                                <Github size={18} /> {t("projects.btn.source_code" as any) || "Source Code"}
                                            </a>
                                            {project.demoUrl && (
                                                <a href={project.demoUrl} target="_blank" className="flex items-center justify-center gap-3 py-3 bg-sky-600 text-white font-bold rounded-xl hover:bg-sky-500 transition-colors">
                                                    {/* 🟢 i18n applied */}
                                                    <ExternalLink size={18} /> {t("projects.btn.live_demo" as any) || "Live Demo"}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                                        {/* 🟢 i18n applied */}
                                        <h5 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
                                            {t("projects.modal.role" as any) || "Role"}
                                        </h5>
                                        <p className="text-white font-medium">{project.role}</p>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}