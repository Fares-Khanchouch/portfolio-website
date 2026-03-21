"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSectionBackground } from "./BackgroundLayout";
import { useSectionInView } from "@/lib/hooks/useSectionInView";
import { about, sectionTitles } from "@/data/content";
import { skills } from "@/data/skills";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
  }),
};

export default function About() {
  const { setSection } = useSectionBackground();
  const { ref, inView } = useSectionInView("About", 0.3);

  React.useEffect(() => {
    if (inView) setSection("about");
  }, [inView, setSection]);

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 px-4"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section heading */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-[#f8fafc] mb-16 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {sectionTitles.about}
          <span className="block w-8 h-px bg-[#4a7fa5] mx-auto mt-4" />
        </motion.h2>

        {/* Top bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Bio — spans 2 cols */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-2 rounded-xl border border-white/5 bg-white/[0.03] p-7 flex flex-col justify-center"
          >
            <h3 className="text-lg font-semibold text-[#f8fafc] mb-3">
              Hi, I&apos;m Fares Khanchouch
            </h3>
            <p className="text-[#94a3b8] leading-relaxed text-sm">
              {about.bio}
            </p>
          </motion.div>

          {/* Location */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative rounded-xl border border-white/5 bg-white/[0.03] p-7 overflow-hidden"
          >
            <h3 className="text-lg font-semibold text-[#f8fafc] mb-2 relative z-10">
              {about.location.heading}
            </h3>
            <p className="text-[#94a3b8] text-sm relative z-10 leading-relaxed">
              {about.location.description}
            </p>
            <Image
              src="/globe.png"
              alt="Globe"
              width={160}
              height={160}
              className="absolute right-0 bottom-0 w-36 h-36 object-cover opacity-10 z-0"
              style={{ transform: "translate(20%, 20%)" }}
            />
          </motion.div>
        </div>

        {/* Languages */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-xl border border-white/5 bg-white/[0.03] p-7 mb-4"
        >
          <h3 className="text-lg font-semibold text-[#f8fafc] mb-4">
            {about.languages.heading}
          </h3>
          <div className="flex flex-wrap gap-3">
            {about.languages.items.map((lang) => (
              <div key={lang.name} className="flex items-center gap-2">
                <span className="text-sm font-medium text-[#f8fafc]">{lang.name}</span>
                <span className="text-xs text-[#4a7fa5] border border-[#4a7fa5]/30 rounded px-2 py-0.5">
                  {lang.level}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills grid */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-xl border border-white/5 bg-white/[0.03] p-7"
        >
          <h3 className="text-lg font-semibold text-[#f8fafc] mb-6">Tech Stack</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((group) => (
              <div key={group.category}>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#4a7fa5] mb-3">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs text-[#94a3b8] border border-white/10 rounded px-2.5 py-1 bg-white/[0.02] hover:border-[#4a7fa5]/40 hover:text-[#f8fafc] transition-colors duration-150"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
