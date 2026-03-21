"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSectionBackground } from "./BackgroundLayout";
import { useSectionInView } from "@/lib/hooks/useSectionInView";
import { projects, type Project } from "@/data/projects";
import { sectionTitles } from "@/data/content";
import { X } from "lucide-react";

export default function Projects() {
  const { setSection } = useSectionBackground();
  const { ref, inView } = useSectionInView("Projects", 0.3);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  React.useEffect(() => {
    if (inView) setSection("projects");
  }, [inView, setSection]);

  // Lock body scroll when modal open
  React.useEffect(() => {
    document.body.style.overflow = activeProject ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeProject]);

  return (
    <section ref={ref} id="projects" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-[#f8fafc] mb-16 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {sectionTitles.projects}
          <span className="block w-8 h-px bg-[#4a7fa5] mx-auto mt-4" />
        </motion.h2>

        {/* Project cards */}
        <div className="flex flex-col gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              {/* Image */}
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0d1224]/80" />
              </div>

              {/* Body */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#f8fafc] mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-[#94a3b8] mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-[#4a7fa5] border border-[#4a7fa5]/30 rounded px-2.5 py-0.5 bg-[#4a7fa5]/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setActiveProject(project)}
                    className="text-xs font-semibold uppercase tracking-wider text-[#4a7fa5] hover:text-[#5a8fb5] transition-colors"
                  >
                    View Details →
                  </button>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#64748b] hover:text-[#94a3b8] transition-colors"
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Panel */}
            <motion.div
              className="relative z-10 bg-[#0d1224] border border-white/8 rounded-xl max-w-3xl w-full max-h-[85vh] overflow-y-auto"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 text-[#64748b] hover:text-[#f8fafc] transition-colors z-10"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* Header image */}
              {activeProject.detail.architectureImage && (
                <div className="relative w-full h-48">
                  <Image
                    src={activeProject.detail.architectureImage}
                    alt={`${activeProject.title} architecture`}
                    fill
                    className="object-cover object-top rounded-t-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0d1224] rounded-t-xl" />
                </div>
              )}

              <div className="p-8 pt-6">
                {/* Title */}
                <h3 className="text-2xl font-bold text-[#f8fafc] mb-2">
                  {activeProject.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-[#4a7fa5] border border-[#4a7fa5]/30 rounded px-2.5 py-0.5 bg-[#4a7fa5]/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Overview */}
                <div className="mb-6">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-[#4a7fa5] mb-3">
                    Overview
                  </h4>
                  <p className="text-sm text-[#94a3b8] leading-relaxed">
                    {activeProject.detail.overview}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-[#4a7fa5] mb-3">
                    Core Features
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeProject.detail.features.map((f) => (
                      <div
                        key={f.title}
                        className="rounded-lg border border-white/5 bg-white/[0.02] p-4"
                      >
                        <p className="text-sm font-semibold text-[#f8fafc] mb-1">{f.title}</p>
                        <p className="text-xs text-[#64748b] leading-relaxed">{f.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-[#4a7fa5] mb-3">
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {activeProject.detail.achievements.map((a, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[#94a3b8] leading-relaxed">
                        <span className="mt-[7px] w-1 h-1 rounded-full bg-[#4a7fa5] shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Roadmap */}
                {activeProject.detail.roadmap && (
                  <div className="mb-6">
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-[#4a7fa5] mb-3">
                      Roadmap
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {activeProject.detail.roadmap.map((area) => (
                        <div
                          key={area.area}
                          className="rounded-lg border border-white/5 bg-white/[0.02] p-4"
                        >
                          <p className="text-xs font-semibold text-[#f8fafc] mb-2">{area.area}</p>
                          <ul className="space-y-1">
                            {area.items.map((item, i) => (
                              <li key={i} className="text-xs text-[#64748b]">— {item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="pt-4 border-t border-white/5 flex justify-end">
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold uppercase tracking-wider text-[#4a7fa5] hover:text-[#5a8fb5] transition-colors"
                  >
                    View on GitHub ↗
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
