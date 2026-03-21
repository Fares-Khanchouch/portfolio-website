"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSectionBackground } from "./BackgroundLayout";
import { useSectionInView } from "@/lib/hooks/useSectionInView";
import { about, sectionTitles, skills } from "@/data";
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
              {/* Tunisia map — inline SVG, real path from tn.svg, viewBox cropped to TN */}
              <svg
                viewBox="308 208 84 128"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -right-3 -bottom-3 h-40 w-auto pointer-events-none select-none"
                aria-hidden="true"
              >
                <defs>
                  <filter id="tn-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="1.8" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* Sea tint */}
                <rect x="308" y="208" width="84" height="128" fill="#4a7fa5" fillOpacity="0.04" />
                {/* Tunisia shape */}
                <path
                  d="M382.3,273.09l0,.51-.58,3.66-.12,1.31-.09,2.23v2.67l1.3,2.26,0,1-.5,1.14-2.39,1.31-3.09,1.69-2.64,1.6-2.91,1.76-.89,1.14-1.44.87-1.2.87-.22.84-.85,1.58-1.1,1.26-2.76.6-.51.37-1.28,1.9-.59.74-.72,1.56.93,4,1.15,4.13.22,1.71v1.43l-.65,1.54L359.9,321l-1.08,1.62-2.07,2.89-.6.72-1.43.85L352,328.18l-1.94,1-1-4.42-.84-3.78-.7-3.12-1.22-5.51-1-4.7-1-4.69-1-4.27-.94-4.31-.41-.63-2.84-2-2.62-1.88-2.72-2.14-2.95-2.32-.48-2.93L328.8,278l-1.6-2.48-.6-.64-3.22-1.61-1.86-1.18-.51-.69-.36-1.81L319.33,266l-1.51-3.28-.56-2.23-.07-2.81.29-2,.66-.86,3.15-2.54,1.46-3,1.8-1.14,1.56-.86,1.27-1,1.12-1.62.86-1.72.14-1.87.36-3,.58-2.07,1.33-2.36-.56-1.9-.71-2,.2-3.56-.18-1.45-.57-1.28-.58-1.64,0-1.37.56-3.6.43-2.76.68-3.6-.24-1-.51-.76-1.53-.79,0-.48.37-.53,2.26-1.76,1.21-2.59,1-.53,1.54-.94-.06-1-.34-1.08,4-1.22,3.81-3.2,1.35-.79,8.86-3,1.16.2,1.29.43-.37,1.11-.51.87.75,1.55,1.07-.95-.27-.63-.06-.84,1.82-.07,1.62.13,1.77.92-.13,3.49,2.37,3.41-.67,1.69,1.93,1,1.72-1.2.86-1.78,3.17-1,3-2.61,1.66-.27.38,2.15.8,1.87-1.14.66-1.44,2-2.75,5-2.53,1.47-1.9,1.93-.61,1.38-.19,1.59.48,2.86,1.38,2.9,1.6,1.75,1.54.54,3.58,2.75-.06,1.64.5,1.93.19,2.36,1.24,1.88-2.66,4.08-1.46,3-2.84,4-2.54,2.62-5.42,3.9-1.34,1.29-.86,1.33-.4,1.4.14,1.64,1.79,4,2.38,2.36,2.42,1.28,4.2-.51-.14,1.54.3,1.85,1.7-.09,1.15-.29,1-1.8,2.05,1.23,1.07,3.75,1.74,1.17.2.44-.61.28-.48.43.52.31,1.68.46,1-.29,1.72.86Zm-3.68-30.63-2.5,1.42.48-1.23,1.65-1.5.43.36Zm-5.2,20.17-.43.09-.78.53-.42.06-1.18-.6h-.45l-.57-.42.19-2.27.19-.64,2.87-.09,1.55,1.36.26.36.06.39-.72.76-.57.46Z"
                  fill="#4a7fa5"
                  fillOpacity="0.18"
                  stroke="#4a7fa5"
                  strokeWidth="0.6"
                  strokeOpacity="0.55"
                  strokeLinejoin="round"
                  filter="url(#tn-glow)"
                />
                {/* Tunis capital dot */}
                <circle cx="361" cy="226" r="2" fill="#4a7fa5" fillOpacity="0.9" />
                <circle cx="361" cy="226" r="4" fill="#4a7fa5" fillOpacity="0.2" />
              </svg>
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
