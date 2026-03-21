"use client";

import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks/useSectionInView";
import { useSectionBackground } from "./BackgroundLayout";
import React from "react";
import { experiences, sectionTitles } from "@/data";
import { BlurFade } from "@/components/ui/blur-fade";

export default function WorkHistory() {
  const { ref, inView } = useSectionInView("Work History", 0.2);
  const { setSection } = useSectionBackground();

  React.useEffect(() => {
    if (inView) setSection("work");
  }, [inView, setSection]);

  return (
    <section ref={ref} id="work" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <BlurFade inView delay={0.05}>
          <div className="mb-16 text-center">
            <p className="font-[family-name:var(--font-geist-mono)] text-xs uppercase tracking-[0.22em] text-[#4a7fa5] mb-3">
              02 / Experience
            </p>
            <h2 className="font-[family-name:var(--font-geist)] text-4xl font-extrabold text-[#f8fafc] md:text-5xl">
              {sectionTitles.work}
            </h2>
          </div>
        </BlurFade>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical track line — desktop */}
          <div className="hidden md:block absolute left-[200px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          <div className="flex flex-col gap-16">
            {experiences.map((item, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col md:flex-row gap-6 md:gap-0 relative group"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Left: date + company */}
                <div className="md:w-[200px] md:pr-10 flex flex-col md:items-end md:text-right shrink-0 pt-1">
                  <span className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.16em] text-[#4a7fa5] mb-1.5">
                    {item.date}
                  </span>
                  <span className="text-xs text-[#64748b] font-medium">
                    {item.company}
                  </span>
                  <span className="text-xs text-[#4a5568]">
                    {item.location}
                  </span>
                </div>

                {/* Timeline dot — desktop */}
                <div className="hidden md:block absolute left-[200px] top-2 -translate-x-1/2 z-10">
                  <span className="flex h-3 w-3 items-center justify-center rounded-full border-2 border-[#4a7fa5] bg-[#0a0f1e] transition-transform duration-300 group-hover:scale-125" />
                </div>

                {/* Mobile accent dot */}
                <div className="md:hidden flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4a7fa5] shrink-0" />
                  <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-widest text-[#4a7fa5]">
                    {item.date}
                  </span>
                </div>

                {/* Right: content card */}
                <div className="md:pl-12 flex-1">
                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#4a7fa5]/20 hover:bg-white/[0.04]">
                    <h3 className="font-[family-name:var(--font-geist)] text-xl font-bold text-[#f8fafc] mb-5">
                      {item.title}
                    </h3>
                    <ul className="space-y-3">
                      {item.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-[#94a3b8] leading-relaxed">
                          <span className="mt-2 w-1 h-1 rounded-full bg-[#4a7fa5] shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
