"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Section background color mapping
const SECTION_COLORS: Record<string, string> = {
  hero: "#0f172a",      // dark blue
  about: "#0a0a0a",     // black
  work: "#0f172a",      // dark blue
  projects: "#0a0a0a",  // black
  contact: "#0f172a",   // dark blue
};

interface SectionBackgroundContextType {
  setSection: (section: string) => void;
  currentSection: string;
}
const SectionBackgroundContext = createContext<SectionBackgroundContextType>({
  setSection: () => {},
  currentSection: "hero",
});

export function useSectionBackground() {
  return useContext(SectionBackgroundContext);
}

export default function BackgroundLayout({ children }: { children: ReactNode }) {
  const [currentSection, setCurrentSection] = useState<string>("hero");
  const setSection = useCallback((section: string) => {
    setCurrentSection(section);
  }, []);

  console.log('BackgroundLayout: currentSection', currentSection, 'color', SECTION_COLORS[currentSection]);
  return (
    <SectionBackgroundContext.Provider value={{ setSection, currentSection }}>
      {/* Animated global background color */}
      <AnimatePresence mode="wait">
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-0 w-full h-full"
          initial={{ backgroundColor: SECTION_COLORS.hero }}
          animate={{ backgroundColor: SECTION_COLORS[currentSection] ?? SECTION_COLORS.hero }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          style={{ position: "fixed", inset: 0 }}
        />
      </AnimatePresence>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow relative z-10">{children}</main>
        <Footer />
      </div>
    </SectionBackgroundContext.Provider>
  );
} 