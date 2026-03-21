"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Download, ArrowDown } from "lucide-react";
import { useSectionInView } from "@/lib/hooks/useSectionInView";
import { useSectionBackground } from "./BackgroundLayout";
import { hero } from "@/data/content";
import React from "react";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

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
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* Premium atmosphere — single soft radial from top-right, no grid */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Main glow — top right */}
        <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-[#4a7fa5] opacity-[0.05] blur-[120px]" />
        {/* Secondary glow — bottom left */}
        <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-[#2a5f85] opacity-[0.04] blur-[100px]" />
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16 md:gap-12">

          {/* ── Left: Text ── */}
          <motion.div
            className="flex flex-col gap-7 text-center md:text-left"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 justify-center md:justify-start">
              <span className="h-px w-8 bg-[#4a7fa5]" />
              <span className="font-[family-name:var(--font-geist-mono)] text-xs uppercase tracking-[0.22em] text-[#4a7fa5]">
                Cloud &amp; DevOps Engineer
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={fadeUp}
              className="font-[family-name:var(--font-geist)] text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-[#f8fafc] sm:text-6xl lg:text-7xl"
            >
              Fares{" "}
              <span className="relative inline-block">
                <span className="text-[#4a7fa5]">Khanchouch</span>
                {/* Underline accent */}
                <motion.span
                  className="absolute -bottom-1 left-0 h-[2px] w-full bg-[#4a7fa5] origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
            </motion.h1>

            {/* Role */}
            <motion.p
              variants={fadeUp}
              className="font-[family-name:var(--font-geist)] text-lg font-medium text-[#94a3b8] sm:text-xl"
            >
              {hero.title}
            </motion.p>

            {/* Divider */}
            <motion.div variants={fadeUp} className="flex justify-center md:justify-start">
              <div className="h-px w-16 bg-gradient-to-r from-[#4a7fa5] to-transparent" />
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              className="max-w-md text-base text-[#64748b] leading-relaxed mx-auto md:mx-0"
            >
              {hero.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col gap-3 sm:flex-row justify-center md:justify-start"
            >
              <a
                href={hero.cta.primary.href}
                className="group relative flex items-center justify-center overflow-hidden rounded bg-[#4a7fa5] px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#5a8fb5]"
              >
                {/* Shimmer on hover */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                {hero.cta.primary.label}
              </a>
              <a
                href={hero.cta.secondary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded border border-[#4a7fa5]/30 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-[#94a3b8] transition-all duration-300 hover:border-[#4a7fa5] hover:text-[#f8fafc] hover:bg-[#4a7fa5]/5"
              >
                {hero.cta.secondary.label}
                <Download className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          </motion.div>

          {/* ── Right: Portrait ── */}
          <motion.div
            className="flex items-center justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              {/* Outer decorative border */}
              <div className="absolute -inset-3 rounded-2xl border border-[#4a7fa5]/10" />
              <div className="absolute -inset-6 rounded-3xl border border-[#4a7fa5]/05" />

              {/* Corner accents */}
              <span className="absolute -top-px -left-px w-8 h-8 border-t-2 border-l-2 border-[#4a7fa5] rounded-tl-xl" />
              <span className="absolute -bottom-px -right-px w-8 h-8 border-b-2 border-r-2 border-[#4a7fa5] rounded-br-xl" />

              {/* Photo */}
              <div className="relative w-[260px] h-[340px] sm:w-[310px] sm:h-[400px] md:w-[360px] md:h-[460px] rounded-xl overflow-hidden">
                <Image
                  src={hero.photo}
                  alt={`${hero.name} portrait`}
                  fill
                  className="object-cover object-top"
                  priority
                />
                {/* Bottom gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/50 via-transparent to-transparent" />
              </div>

              {/* Title badge */}
              <motion.div
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <span className="font-[family-name:var(--font-geist-mono)] inline-block rounded bg-[#0d1224] border border-[#4a7fa5]/25 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[#4a7fa5]">
                  {hero.title}
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-[#4a7fa5]/50">scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <ArrowDown className="h-4 w-4 text-[#4a7fa5]/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
