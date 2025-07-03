"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Download } from "lucide-react";
import { useSectionInView } from "@/lib/hooks/useSectionInView";
import { useSectionBackground } from "./BackgroundLayout";
import React from "react";

export default function Hero() {
  const { ref, inView } = useSectionInView("Home", 0.5);
  const { setSection } = useSectionBackground();

  React.useEffect(() => {
    if (inView) {
      console.log('Section in view: hero', { inView });
      setSection("hero");
    }
  }, [inView, setSection]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-20 md:py-0"
    >
      <div className="container z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
          {/* Left: Text Content */}
          <motion.div
            className="flex flex-col space-y-10 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Headline */}
            <h1 className="text-4xl font-bold leading-snug text-[#f8fafc] sm:text-5xl">
              <span className="block">
                Hi, I'm Fares —{" "}
                <span className="font-extrabold text-[#3b82f6]">
                  Cloud & DevOps Engineer
                </span>
              </span>
              <span className="block">
                I build scalable systems and automate modern infrastructure.
              </span>
            </h1>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col gap-4 pt-4 sm:flex-row md:justify-start justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            >
              <a
                href="#contact"
                className="group flex items-center justify-center rounded-full bg-[#3b82f6] px-8 py-4 text-lg text-white shadow-lg transition-all duration-300 hover:bg-blue-600"
              >
                Contact Me
              </a>
              <a
                href="/resume.pdf"
                className="group flex items-center justify-center gap-2 rounded-full border border-[#64748b] px-8 py-4 text-lg text-[#f8fafc] transition-all duration-300 hover:bg-[#64748b] hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume
                <Download className="h-5 w-5" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Avatar */}
          <motion.div
            className="relative mx-auto h-[350px] w-[350px] sm:h-[500px] sm:w-[500px] md:mx-0"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <motion.div
              className="h-full w-full"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Image
                src="/avatar.png"
                alt="Fares' portrait"
                width={500}
                height={500}
                className="h-full w-full object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.25)]"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}