"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Download, ArrowDown } from "lucide-react";
import { useSectionInView } from "@/lib/hooks/useSectionInView";
import { useSectionBackground } from "./BackgroundLayout";
import { hero } from "@/data";
import React from "react";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
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
      className="relative flex min-h-screen w-full items-center overflow-hidden"
    >
      {/* ── Background atmosphere ── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Right-side glow — behind the figure */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#4a7fa5] opacity-[0.07] blur-[130px]" />
        {/* Secondary soft glow top-right */}
        <div className="absolute -top-20 right-1/4 w-[400px] h-[400px] rounded-full bg-[#2a5f85] opacity-[0.05] blur-[100px]" />
        {/* Bottom-left counter glow */}
        <div className="absolute bottom-0 -left-20 w-[350px] h-[350px] rounded-full bg-[#1a3f65] opacity-[0.04] blur-[90px]" />
        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />
      </div>

      {/* ── Main content grid ── */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center min-h-screen">

          {/* ── Left: Text ── */}
          <motion.div
            className="flex flex-col gap-6 text-center md:text-left py-32 md:py-0"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 justify-center md:justify-start">
              <span className="h-px w-8 bg-[#4a7fa5] shrink-0" />
              <span className="font-[family-name:var(--font-geist-mono)] text-xs uppercase tracking-[0.22em] text-[#4a7fa5]">
                {hero.eyebrow}
              </span>
            </motion.div>

            {/* Name — two-line stacked */}
            <motion.h1
              variants={fadeUp}
              className="font-[family-name:var(--font-geist)] font-extrabold leading-[1.0] tracking-tight text-[#f8fafc]"
            >
              <span className="block text-[3rem] sm:text-[4.5rem] lg:text-[5.5rem]">Fares</span>
              <span className="block text-[3rem] sm:text-[4.5rem] lg:text-[5.5rem] relative">
                <span className="text-[#4a7fa5]">Khanchouch</span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[2px] bg-[#4a7fa5] origin-left"
                  style={{ width: "100%" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
            </motion.h1>

            {/* Divider */}
            <motion.div variants={fadeUp} className="flex justify-center md:justify-start">
              <div className="h-px w-12 bg-gradient-to-r from-[#4a7fa5] to-transparent" />
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              className="max-w-sm text-base text-[#64748b] leading-relaxed mx-auto md:mx-0"
            >
              {hero.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col gap-3 sm:flex-row justify-center md:justify-start pt-2"
            >
              <a
                href={hero.cta.primary.href}
                className="group relative flex items-center justify-center overflow-hidden rounded bg-[#4a7fa5] px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#5a8fb5]"
              >
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

          {/* ── Right: Floating cutout figure ── */}
          <motion.div
            className="hidden md:flex items-center justify-end self-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              {/* Glow behind figure */}
              <div className="absolute inset-0 -z-10 scale-75 translate-y-8 rounded-full bg-[#4a7fa5] opacity-[0.12] blur-[60px]" />

              {/* Cutout photo — black bg disappears via mix-blend-mode */}
              <div
                className="relative"
                style={{ width: "380px", height: "520px" }}
              >
                <Image
                  src="/fares-cutout.png"
                  alt={`${hero.name} portrait`}
                  fill
                  sizes="(max-width: 1280px) 420px, 500px"
                  quality={95}
                  className="object-cover object-top"
                  style={{ mixBlendMode: "lighten" }}
                  priority
                />
                {/* Fade to floor */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0f1e] to-transparent" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-[#4a7fa5]/40">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 text-[#4a7fa5]/35" />
        </motion.div>
      </motion.div>
    </section>
  );
}
