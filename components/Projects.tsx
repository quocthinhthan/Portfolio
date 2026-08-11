// components/Projects.tsx
"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence
} from "framer-motion";

import { projects, Project } from "@/lib/data";
import {
  Github, ExternalLink, Terminal, Code2, Cpu,
  Database, Server, Cloud, Lock, Brain, HeartPulse,
  Activity, Zap, ShieldCheck, Globe, ArrowRight, X,
  ChevronLeft, ChevronRight, MoveHorizontal
} from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const totalCards = projects.length + 1; // Projects + GitHub CTA Card

  // Scroll directly to a specific card aligned with header
  const scrollToCard = (index: number) => {
    if (!scrollRef.current) return;
    const cards = Array.from(scrollRef.current.children) as HTMLElement[];
    if (!cards || cards.length === 0) return;

    const clampedIndex = Math.max(0, Math.min(index, cards.length - 1));
    const targetCard = cards[clampedIndex];
    if (!targetCard) return;

    const container = scrollRef.current;

    if (clampedIndex === 0) {
      container.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      const cardLeft = targetCard.offsetLeft;
      const paddingLeft = parseFloat(getComputedStyle(container).paddingLeft) || 0;
      container.scrollTo({
        left: Math.max(0, cardLeft - paddingLeft),
        behavior: "smooth"
      });
    }

    setActiveCardIndex(clampedIndex);
  };

  const handleNextCard = () => {
    scrollToCard(activeCardIndex + 1);
  };

  const handlePrevCard = () => {
    scrollToCard(activeCardIndex - 1);
  };

  // Sync activeCardIndex on manual scroll / touch swipe / drag release
  const handleScroll = () => {
    if (!scrollRef.current || isMouseDown) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const paddingLeft = parseFloat(getComputedStyle(container).paddingLeft) || 0;
    const cards = Array.from(container.children) as HTMLElement[];

    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, i) => {
      const distance = Math.abs((card.offsetLeft - paddingLeft) - scrollLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    });

    setActiveCardIndex(closestIndex);
  };

  // Drag-to-scroll Mouse Event Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsMouseDown(true);
    setIsDragging(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.6; // Scroll speed multiplier
    if (Math.abs(walk) > 6) {
      setIsDragging(true);
    }
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  return (
    <>
      <section
        id="projects"
        className="relative py-24 md:py-32 bg-slate-50 dark:bg-[#020617] overflow-hidden transition-colors duration-300"
      >
        {/* Parallax Icons */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
           <ParallaxIcons />
        </div>

        {/* SECTION HEADER */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-10 relative z-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-500 font-mono text-sm tracking-[0.2em] uppercase mb-3">
              <Terminal size={16} />
              <span>{t("projects.section.label" as any) || "Engineering Output"}</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
              {t("projects.title.line1" as any) || "Featured"}{" "}
              <span className="text-sky-600 dark:text-sky-500">{t("projects.title.line2" as any) || "Projects"}.</span>
            </h2>

            <p className="mt-3 text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-xl leading-relaxed">
              {t("projects.intro.desc" as any) || "Tuyển tập các hệ thống Backend được xây dựng với sự chú trọng tối đa vào khả năng mở rộng."}
            </p>
          </motion.div>

          {/* ARROW NAVIGATION CONTROLS */}
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={handlePrevCard}
              disabled={activeCardIndex === 0}
              aria-label="Previous project card"
              className="p-3 rounded-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-sky-500 hover:bg-sky-50 dark:hover:bg-sky-500/10 disabled:opacity-40 disabled:hover:border-slate-200 dark:disabled:hover:border-white/10 transition-all active:scale-95 shadow-sm dark:shadow-md cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={handleNextCard}
              disabled={activeCardIndex === totalCards - 1}
              aria-label="Next project card"
              className="p-3 rounded-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-sky-500 hover:bg-sky-50 dark:hover:bg-sky-500/10 disabled:opacity-40 disabled:hover:border-slate-200 dark:disabled:hover:border-white/10 transition-all active:scale-95 shadow-sm dark:shadow-md cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* PROJECTS CAROUSEL (TRACK) */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onScroll={handleScroll}
          className="relative z-10 w-full overflow-x-auto select-none cursor-grab active:cursor-grabbing py-4 flex gap-6 snap-x snap-mandatory px-[calc((100vw-85vw)/2)] sm:px-[calc((100vw-350px)/2)] lg:px-[calc((100vw-1280px)/2)]"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              t={t}
              index={index}
              onOpen={() => setSelectedProject(project)}
            />
          ))}

          {/* GitHub CTA Card */}
          <GithubCtaCard />
        </div>
      </section>

      {/* Detail Modal */}
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
  project, t, index, onOpen
}: {
  project: Project; 
  t: any; 
  index: number; 
  onOpen: () => void;
}) {
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
      onClick={onOpen}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ rotateX, rotateY }}
      className="
        relative snap-start
        w-[85vw] sm:w-[350px] lg:w-[calc((100%-3rem)/3)] min-h-[500px] md:min-h-[540px] flex-shrink-0
        rounded-[2.2rem] md:rounded-[2.8rem] p-6 md:p-9 flex flex-col justify-between overflow-hidden
        bg-white dark:bg-[#0F172A] border-[1.5px] border-slate-200 dark:border-white/10
        shadow-lg dark:shadow-none
        hover:border-sky-500/60 hover:shadow-[0_25px_60px_-15px_rgba(56,189,248,0.25)]
        transition-all duration-300
        cursor-pointer group select-none
      "
    >
      <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] mix-blend-overlay pointer-events-none"
           style={{ backgroundImage: `url(/noise.png)` }} />

      <div className="relative z-10 pointer-events-none">
        <div className="flex flex-wrap gap-2 mb-5">
          {project.techStack.slice(0, 3).map(tech => (
            <span key={tech} className="pl-2.5 pr-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider rounded-full border border-slate-900/10 dark:border-white/10 flex items-center gap-2 bg-slate-900 dark:bg-slate-800/80 text-white dark:text-sky-200 shadow-sm">
              {getTechIcon(tech)} {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
             <span className="pl-2 pr-3 py-1.5 text-[11px] font-extrabold bg-slate-800 text-white dark:bg-slate-800/50 dark:text-slate-300 rounded-full border border-slate-900/10 dark:border-white/5">
                +{project.techStack.length - 3}
             </span>
          )}
        </div>

        <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
          {t(`proj.${project.id}.title` as any)}
        </h3>

        <p className="text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed pl-4 border-l-2 border-sky-500/50 line-clamp-3 font-medium">
          {t(`proj.${project.id}.short` as any) || "Mô tả dự án..."}
        </p>
        
        <p className="mt-4 text-sm text-sky-600 dark:text-sky-400 font-bold underline decoration-sky-500/30 underline-offset-4 group-hover:text-sky-500 dark:group-hover:text-sky-300">
            {t("projects.card.view_details" as any) || "Nhấn để xem chi tiết →"}
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 opacity-90">
          {project.features.slice(0, 2).map((f, i) => (
            <div key={i} className="flex items-start gap-2.5 text-slate-800 dark:text-slate-200 text-xs font-semibold bg-slate-100 dark:bg-white/5 p-2.5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
              {getFeatureIcon(f)}
              <span className="truncate">{t(f as any)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto flex gap-3 mt-8 pt-3 pb-1 border-t border-slate-200 dark:border-white/10 z-20">
        <a 
          href={project.githubUrl} 
          target="_blank"
          onClick={(e) => e.stopPropagation()}
          className="flex-1 py-3.5 flex items-center justify-center gap-2 rounded-2xl font-bold bg-slate-900 dark:bg-white text-white dark:text-black text-sm hover:bg-sky-600 dark:hover:bg-slate-200 hover:scale-[1.03] active:scale-95 transition-all shadow-md"
        >
          <Github size={18} /> {t("projects.btn.source" as any) || "Mã nguồn"}
        </a>
        
        {project.demoUrl && (
          <a 
            href={project.demoUrl} 
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 py-3.5 flex items-center justify-center gap-2 rounded-2xl font-bold border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white text-sm hover:bg-sky-600 hover:text-white hover:scale-[1.03] active:scale-95 transition-all"
          >
            <ExternalLink size={18} /> {t("projects.btn.demo" as any) || "Demo"}
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
            className="group relative snap-start w-[85vw] sm:w-[350px] lg:w-[calc((100%-3rem)/3)] min-h-[500px] md:min-h-[540px] flex-shrink-0 perspective-[1000px] cursor-pointer select-none"
        >
             <div className="
                w-full h-full rounded-[2.2rem] md:rounded-[2.5rem]
                bg-gradient-to-br from-slate-100 to-white dark:from-[#0F172A] dark:to-[#020617]
                border-2 border-dashed border-slate-300 dark:border-slate-700
                hover:border-sky-500 dark:hover:border-sky-500 hover:bg-white dark:hover:bg-slate-900
                transition-all duration-500
                flex flex-col items-center justify-center text-center p-8 md:p-10
                group-hover:scale-[1.02] group-hover:shadow-[0_0_50px_-10px_rgba(56,189,248,0.3)]
             ">
                 <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-sky-500 blur-[50px] opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full" />
                    <Github size={80} className="text-slate-700 dark:text-slate-400 group-hover:text-sky-600 dark:group-hover:text-white transition-colors duration-300 relative z-10" />
                 </div>
                 <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
                    {t("projects.github.view_more" as any) || "View More"}<br/>
                    <span className="text-sky-600 dark:text-sky-400">Repositories</span>
                 </h3>
                 <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-xs mb-8">
                    {t("projects.github.desc" as any) || "Explore all open-source projects, tools, and code samples on GitHub."}
                 </p>
                 <span className="inline-flex items-center gap-2 text-sm font-bold text-sky-600 dark:text-sky-400 group-hover:translate-x-1 transition-transform">
                    github.com/quocthinhthan →
                 </span>
             </div>
        </motion.a>
    );
}

// ===============================
// PROJECT MODAL
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
                        className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="
                            relative w-full max-w-4xl max-h-[90vh] 
                            bg-white dark:bg-[#0B1121] border border-slate-200 dark:border-slate-700 rounded-[2rem] 
                            shadow-2xl overflow-y-auto overflow-x-hidden
                            z-10 custom-scrollbar
                        "
                    >
                        <button 
                            type="button"
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 hover:rotate-90 transition-all z-50"
                        >
                            <X size={24} />
                        </button>

                        <div className="p-6 md:p-12">
                             <div className="flex items-center gap-3 mb-6 pr-8">
                                <span className="text-3xl sm:text-4xl lg:text-6xl font-black text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-slate-500">
                                    {t(`proj.${project.id}.title` as any)}
                                </span>
                             </div>

                             <div className="flex flex-wrap gap-2 mb-8">
                                {project.techStack.map(tech => (
                                    <span key={tech} className="px-3 py-1.5 text-xs font-extrabold uppercase rounded-full border border-slate-900/10 dark:border-white/10 bg-slate-900 text-white dark:bg-sky-500/10 dark:text-sky-300">
                                        {tech}
                                    </span>
                                ))}
                             </div>

                             <div className="grid md:grid-cols-3 gap-8 md:gap-10">
                                <div className="md:col-span-2 space-y-6">
                                    <h4 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <Terminal className="text-sky-500" /> {t("projects.modal.description" as any) || "Description"}
                                    </h4>
                                    <div 
                                      className="text-slate-700 dark:text-slate-300 leading-relaxed text-base md:text-lg space-y-2"
                                      dangerouslySetInnerHTML={{ 
                                          __html: t(`proj.${project.id}.full` as any) || project.fullDesc 
                                      }}
                                    />
                                    
                                    <div className="pt-6">
                                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                            <Zap className="text-amber-500 dark:text-yellow-400" /> {t("projects.modal.features" as any) || "Key Features"}
                                        </h4>
                                        <ul className="grid grid-cols-1 gap-3">
                                            {project.features.map((f, i) => (
                                                <li key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                                    {getFeatureIcon(f)}
                                                    <span className="text-slate-800 dark:text-slate-300 text-sm md:text-base font-medium">{t(f as any)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                        <h5 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
                                            {t("projects.modal.links" as any) || "Project Links"}
                                        </h5>
                                        <div className="flex flex-col gap-3">
                                            <a href={project.githubUrl} target="_blank" className="flex items-center justify-center gap-3 py-3 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:scale-105 transition-transform shadow-md">
                                                <Github size={18} /> {t("projects.btn.source_code" as any) || "Source Code"}
                                            </a>
                                            {project.demoUrl && (
                                                <a href={project.demoUrl} target="_blank" className="flex items-center justify-center gap-3 py-3 bg-sky-600 text-white font-bold rounded-xl hover:bg-sky-500 transition-colors">
                                                    <ExternalLink size={18} /> {t("projects.btn.live_demo" as any) || "Live Demo"}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                        <h5 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
                                            {t("projects.modal.role" as any) || "Role"}
                                        </h5>
                                        <p className="text-slate-900 dark:text-white font-medium">{project.role}</p>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}