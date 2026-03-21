"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSectionBackground } from "./BackgroundLayout";
import { useSectionInView } from "@/lib/hooks/useSectionInView";
import { projects, type Project } from "@/data/projects";
import { sectionTitles } from "@/data/content";
import { X, ArrowUpRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";

export default function Projects() {
  const { setSection } = useSectionBackground();
  const { ref, inView } = useSectionInView("Projects", 0.2);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  React.useEffect(() => {
    if (inView) setSection("projects");
  }, [inView, setSection]);

  React.useEffect(() => {
    document.body.style.overflow = activeProject ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeProject]);

  return (
    <section ref={ref} id="projects" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <BlurFade inView delay={0.05}>
          <div className="mb-16 text-center">
            <p className="font-[family-name:var(--font-geist-mono)] text-xs uppercase tracking-[0.22em] text-[#4a7fa5] mb-3">
              03 / Work
            </p>
            <h2 className="font-[family-name:var(--font-geist)] text-4xl font-extrabold text-[#f8fafc] md:text-5xl">
              {sectionTitles.projects}
            </h2>
          </div>
        </BlurFade>

        {/* Project cards */}
        <div className="flex flex-col gap-5">
          {projects.map((project, idx) => (
            <BlurFade inView delay={0.1 + idx * 0.1} key={project.id}>
              <motion.div
                className="group relative rounded-xl border border-white/[0.07] bg-white/[0.025] overflow-hidden cursor-pointer backdrop-blur-sm"
                whileHover={{ borderColor: "rgba(74,127,165,0.25)" }}
                transition={{ duration: 0.2 }}
                onClick={() => setActiveProject(project)}
              >
                <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] md:min-h-[220px]">

                  {/* Image */}
                  <div className="relative overflow-hidden h-48 md:h-auto">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0d1224]/70 hidden md:block" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0d1224]/70 md:hidden" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center p-7 md:p-8">
                    {/* Index */}
                    <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-[#4a7fa5]/50 mb-3">
                      {String(idx + 1).padStart(2, "0")}
                    </span>

                    <h3 className="font-[family-name:var(--font-geist)] text-2xl font-bold text-[#f8fafc] mb-3 group-hover:text-[#5a8fb5] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#94a3b8] leading-relaxed mb-5 max-w-md">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-[family-name:var(--font-geist-mono)] text-[10px] text-[#4a7fa5] border border-[#4a7fa5]/25 rounded px-2.5 py-1 bg-[#4a7fa5]/5 uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-5">
                      <button
                        onClick={(e) => { e.stopPropagation(); setActiveProject(project); }}
                        className="text-xs font-semibold uppercase tracking-[0.15em] text-[#4a7fa5] hover:text-[#5a8fb5] transition-colors flex items-center gap-1.5"
                      >
                        Case Study
                        <ArrowUpRight className="h-3 w-3" />
                      </button>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-[#64748b] hover:text-[#94a3b8] transition-colors flex items-center gap-1.5 uppercase tracking-[0.1em]"
                      >
                        GitHub
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </BlurFade>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

            <motion.div
              className="relative z-10 bg-[#0d1224] border border-white/[0.08] rounded-none md:rounded-2xl w-full md:max-w-3xl max-h-[92vh] overflow-y-auto"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header image */}
              {activeProject.detail.architectureImage && (
                <div className="relative w-full h-52">
                  <Image
                    src={activeProject.detail.architectureImage}
                    alt={`${activeProject.title} architecture`}
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0d1224]" />
                </div>
              )}

              {/* Modal body */}
              <div className="p-8">
                {/* Close */}
                <button
                  onClick={() => setActiveProject(null)}
                  className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-[#64748b] hover:text-[#f8fafc] hover:border-white/20 transition-colors z-10"
                >
                  <X size={14} />
                </button>

                {/* Title + tags */}
                <h3 className="font-[family-name:var(--font-geist)] text-2xl font-bold text-[#f8fafc] mb-3">
                  {activeProject.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-[family-name:var(--font-geist-mono)] text-[10px] text-[#4a7fa5] border border-[#4a7fa5]/25 rounded px-2.5 py-1 bg-[#4a7fa5]/5 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Overview */}
                <div className="mb-8">
                  <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-[#4a7fa5] mb-3">Overview</p>
                  <p className="text-sm text-[#94a3b8] leading-[1.9]">{activeProject.detail.overview}</p>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-[#4a7fa5] mb-4">Core Features</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeProject.detail.features.map((f) => (
                      <div key={f.title} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                        <p className="font-[family-name:var(--font-geist)] text-sm font-semibold text-[#f8fafc] mb-1.5">{f.title}</p>
                        <p className="text-xs text-[#64748b] leading-relaxed">{f.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-8">
                  <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-[#4a7fa5] mb-4">Key Achievements</p>
                  <ul className="space-y-2.5">
                    {activeProject.detail.achievements.map((a, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[#94a3b8] leading-relaxed">
                        <span className="mt-2 w-1 h-1 rounded-full bg-[#4a7fa5] shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Roadmap */}
                {activeProject.detail.roadmap && (
                  <div className="mb-8">
                    <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-[#4a7fa5] mb-4">Roadmap</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {activeProject.detail.roadmap.map((area) => (
                        <div key={area.area} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                          <p className="font-[family-name:var(--font-geist)] text-xs font-semibold text-[#f8fafc] mb-2">{area.area}</p>
                          <ul className="space-y-1">
                            {area.items.map((item, i) => (
                              <li key={i} className="text-xs text-[#64748b] leading-relaxed">— {item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="pt-5 border-t border-white/[0.06] flex justify-end">
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#4a7fa5] hover:text-[#5a8fb5] transition-colors"
                  >
                    View on GitHub
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
