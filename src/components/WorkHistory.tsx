"use client";

import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks/useSectionInView";
import { useSectionBackground } from "./BackgroundLayout";
import React from "react";
import { experiences } from "@/data/work";
import { sectionTitles } from "@/data/content";

export default function WorkHistory() {
  const { ref, inView } = useSectionInView("Work History", 0.3);
  const { setSection } = useSectionBackground();

  React.useEffect(() => {
    if (inView) setSection("work");
  }, [inView, setSection]);

  return (
    <section
      ref={ref}
      id="work"
      className="py-24 px-4"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-[#f8fafc] mb-16 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {sectionTitles.work}
          <span className="block w-8 h-px bg-[#4a7fa5] mx-auto mt-4" />
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — desktop */}
          <span className="hidden md:block absolute left-[180px] top-0 bottom-0 w-px bg-white/8" />

          <div className="flex flex-col gap-14">
            {experiences.map((item, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col md:flex-row gap-6 md:gap-0 relative"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {/* Left: date + company */}
                <div className="md:w-[180px] md:pr-8 flex flex-col md:items-end md:text-right shrink-0">
                  <span className="text-xs uppercase tracking-widest text-[#4a7fa5] mb-1">
                    {item.date}
                  </span>
                  <span className="text-sm text-[#64748b]">
                    {item.company}, {item.location}
                  </span>
                </div>

                {/* Timeline dot — desktop */}
                <div className="hidden md:flex absolute left-[180px] top-1 -translate-x-1/2 items-center justify-center">
                  <span className="w-3 h-3 rounded-full border-2 border-[#4a7fa5] bg-[#0a0f1e]" />
                </div>

                {/* Right: content */}
                <div className="md:pl-10 flex-1">
                  <h3 className="text-xl font-semibold text-[#f8fafc] mb-4">
                    {item.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {item.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[#94a3b8] leading-relaxed">
                        <span className="mt-[7px] w-1 h-1 rounded-full bg-[#4a7fa5] shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
