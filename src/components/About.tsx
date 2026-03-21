"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSectionBackground } from "./BackgroundLayout";
import { useSectionInView } from "@/lib/hooks/useSectionInView";
import { about, sectionTitles } from "@/data/content";
import { skills } from "@/data/skills";
import { BlurFade } from "@/components/ui/blur-fade";
import {
  SiAmazonwebservices, SiGooglecloud, SiTerraform, SiAnsible,
  SiKubernetes, SiDocker, SiGithubactions, SiJenkins,
  SiGo, SiPython, SiJavascript, SiTypescript,
  SiNextdotjs, SiReact, SiNodedotjs, SiTailwindcss,
  SiPrometheus, SiGrafana, SiZapier,
} from "react-icons/si";

type IconComponent = React.ComponentType<{ className?: string; size?: number }>;

const SKILL_ICONS: Record<string, IconComponent> = {
  "AWS": SiAmazonwebservices,
  "GCP": SiGooglecloud,
  "Terraform": SiTerraform,
  "Ansible": SiAnsible,
  "Kubernetes": SiKubernetes,
  "Docker": SiDocker,
  "GitHub Actions": SiGithubactions,
  "Jenkins": SiJenkins,
  "Go": SiGo,
  "Python": SiPython,
  "JavaScript": SiJavascript,
  "TypeScript": SiTypescript,
  "Next.js": SiNextdotjs,
  "React": SiReact,
  "Node.js": SiNodedotjs,
  "Tailwind CSS": SiTailwindcss,
  "Prometheus": SiPrometheus,
  "Grafana": SiGrafana,
  "Zapier": SiZapier,
};

const STATS = [
  { value: "3+", label: "Years Experience" },
  { value: "10+", label: "Tech Stacks" },
  { value: "3", label: "Cloud Platforms" },
];

export default function About() {
  const { setSection } = useSectionBackground();
  const { ref, inView } = useSectionInView("About", 0.25);

  React.useEffect(() => {
    if (inView) setSection("about");
  }, [inView, setSection]);

  return (
    <section id="about" ref={ref} className="py-28 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Section heading */}
        <BlurFade inView delay={0.05}>
          <div className="mb-16 text-center">
            <p className="font-[family-name:var(--font-geist-mono)] text-xs uppercase tracking-[0.22em] text-[#4a7fa5] mb-3">
              01 / About
            </p>
            <h2 className="font-[family-name:var(--font-geist)] text-4xl font-extrabold text-[#f8fafc] md:text-5xl">
              {sectionTitles.about}
            </h2>
          </div>
        </BlurFade>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

          {/* Bio — 2 cols, glass card */}
          <BlurFade inView delay={0.1} className="md:col-span-2">
            <div className="h-full rounded-xl border border-white/[0.07] bg-white/[0.025] p-8 backdrop-blur-sm">
              <h3 className="font-[family-name:var(--font-geist)] text-xl font-bold text-[#f8fafc] mb-4">
                Hi, I&apos;m Fares
              </h3>
              <p className="text-[#b8c7d8] leading-[1.9] text-sm font-normal">
                {about.bio}
              </p>
            </div>
          </BlurFade>

          {/* Location */}
          <BlurFade inView delay={0.15}>
            <div className="relative h-full min-h-[180px] rounded-xl border border-white/[0.07] bg-white/[0.025] p-7 overflow-hidden backdrop-blur-sm">
              <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-[#4a7fa5] mb-3">
                Location
              </p>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4a7fa5] opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4a7fa5]" />
                </span>
                <h3 className="font-[family-name:var(--font-geist)] text-lg font-bold text-[#f8fafc]">
                  {about.location.city}
                </h3>
              </div>
              <p className="text-[#64748b] text-xs leading-relaxed">
                {about.location.description}
              </p>
            </div>
          </BlurFade>

          {/* Stats row */}
          {STATS.map((stat, i) => (
            <BlurFade inView delay={0.2 + i * 0.05} key={stat.label}>
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-6 text-center backdrop-blur-sm">
                <p className="font-[family-name:var(--font-geist)] text-4xl font-extrabold text-[#4a7fa5] mb-1">
                  {stat.value}
                </p>
                <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.15em] text-[#64748b]">
                  {stat.label}
                </p>
              </div>
            </BlurFade>
          ))}

          {/* Languages */}
          <BlurFade inView delay={0.35} className="md:col-span-3">
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-7 backdrop-blur-sm">
              <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-[#4a7fa5] mb-5">
                Languages
              </p>
              <div className="flex flex-wrap gap-4">
                {about.languages.items.map((lang) => (
                  <div key={lang.name} className="flex items-center gap-2.5">
                    <span className="font-[family-name:var(--font-geist)] text-sm font-semibold text-[#f8fafc]">
                      {lang.name}
                    </span>
                    <span className="font-[family-name:var(--font-geist-mono)] text-[10px] text-[#4a7fa5] border border-[#4a7fa5]/30 rounded px-2 py-0.5 bg-[#4a7fa5]/5">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </BlurFade>

          {/* Education */}
          <BlurFade inView delay={0.38} className="md:col-span-3">
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-7 backdrop-blur-sm">
              <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-[#4a7fa5] mb-4">
                {about.education.heading}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-[family-name:var(--font-geist)] text-base font-bold text-[#f8fafc]">
                    {about.education.degree}
                  </h3>
                  <p className="text-sm text-[#94a3b8]">{about.education.school}</p>
                </div>
                <span className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-widest text-[#4a7fa5] shrink-0">
                  {about.education.years}
                </span>
              </div>
            </div>
          </BlurFade>

          {/* Tech stack — full width */}
          <BlurFade inView delay={0.4} className="md:col-span-3">
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-7 backdrop-blur-sm">
              <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-[#4a7fa5] mb-6">
                Tech Stack
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {skills.map((group, gi) => (
                  <motion.div
                    key={group.category}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: gi * 0.07 }}
                  >
                    <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.18em] text-[#4a7fa5]/70 mb-3">
                      {group.category}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => {
                        const Icon = SKILL_ICONS[item];
                        return (
                          <span
                            key={item}
                            className="inline-flex items-center gap-1.5 text-xs text-[#94a3b8] border border-white/[0.08] rounded px-2.5 py-1.5 bg-white/[0.02] transition-all duration-200 hover:border-[#4a7fa5]/40 hover:text-[#f8fafc] hover:bg-[#4a7fa5]/5 cursor-default"
                          >
                            {Icon && <Icon size={11} className="opacity-70 shrink-0" />}
                            {item}
                          </span>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </BlurFade>

        </div>
      </div>
    </section>
  );
}
