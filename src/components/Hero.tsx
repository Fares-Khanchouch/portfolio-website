"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Download } from "lucide-react";
import { useSectionInView } from "@/lib/hooks/useSectionInView";
import { useSectionBackground } from "./BackgroundLayout";
import { hero } from "@/data/content";
import React from "react";

export default function Hero() {
  const { ref, inView } = useSectionInView("Home", 0.5);
  const { setSection } = useSectionBackground();

  React.useEffect(() => {
    if (inView) setSection("hero");
  }, [inView, setSection]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-20 md:py-0"
    >
      <div className="container z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">

          {/* Left: Text */}
          <motion.div
            className="flex flex-col space-y-8 text-center md:text-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Eyebrow */}
            <motion.p
              className="text-sm uppercase tracking-[0.2em] text-[#4a7fa5] font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Cloud &amp; DevOps Engineer
            </motion.p>

            {/* Headline */}
            <h1 className="text-4xl font-bold leading-tight text-[#f8fafc] sm:text-5xl lg:text-6xl">
              {hero.name.split(" ")[0]}{" "}
              <span className="text-[#4a7fa5]">{hero.name.split(" ")[1]}</span>
            </h1>

            {/* Subline */}
            <p className="text-lg text-[#94a3b8] leading-relaxed max-w-md mx-auto md:mx-0">
              {hero.tagline}
            </p>

            {/* Divider */}
            <div className="w-12 h-px bg-[#4a7fa5] mx-auto md:mx-0" />

            {/* CTAs */}
            <motion.div
              className="flex flex-col gap-3 sm:flex-row md:justify-start justify-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <a
                href={hero.cta.primary.href}
                className="flex items-center justify-center rounded-sm bg-[#4a7fa5] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:bg-[#5a8fb5]"
              >
                {hero.cta.primary.label}
              </a>
              <a
                href={hero.cta.secondary.href}
                className="flex items-center justify-center gap-2 rounded-sm border border-[#4a7fa5]/40 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-[#94a3b8] transition-all duration-200 hover:border-[#4a7fa5] hover:text-[#f8fafc]"
                target="_blank"
                rel="noopener noreferrer"
              >
                {hero.cta.secondary.label}
                <Download className="h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Photo */}
          <motion.div
            className="flex items-center justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          >
            <div className="relative w-[280px] h-[360px] sm:w-[340px] sm:h-[430px] md:w-[380px] md:h-[480px]">
              {/* Accent border frame */}
              <div className="absolute inset-0 rounded-xl border border-[#4a7fa5]/20" />
              <div className="absolute -inset-[6px] rounded-xl border border-[#4a7fa5]/10" />

              <Image
                src={hero.photo}
                alt={`${hero.name} portrait`}
                fill
                className="rounded-xl object-cover object-top"
                priority
              />

              {/* Subtle bottom fade */}
              <div className="absolute bottom-0 left-0 right-0 h-16 rounded-b-xl bg-gradient-to-t from-[#0a0f1e]/60 to-transparent" />

              {/* Title badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-[#0d1224] border border-[#4a7fa5]/30 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#4a7fa5]">
                {hero.title}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
