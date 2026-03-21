"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { social } from "@/data/social";

const navLinks = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Work", id: "work" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 640) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-[#0a0f1e]/90 backdrop-blur-md border-b border-white/5 shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="#home" className="text-xl font-bold leading-tight tracking-tight sm:text-2xl">
          <span className="text-[#f8fafc]">Fares </span>
          <span className="text-[#4a7fa5] font-extrabold">Khanchouch</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden sm:flex items-center space-x-8 text-sm font-medium text-[#94a3b8]">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className="uppercase tracking-wider transition-colors duration-200 hover:text-[#4a7fa5] relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#4a7fa5] transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
          <li>
            <a
              href={social.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#4a7fa5] text-[#4a7fa5] px-4 py-1.5 rounded text-xs uppercase tracking-wider hover:bg-[#4a7fa5] hover:text-white transition-colors duration-200"
            >
              Resume
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={cn("block w-5 h-px bg-[#f8fafc] transition-all duration-300", menuOpen && "rotate-45 translate-y-2")} />
          <span className={cn("block w-5 h-px bg-[#f8fafc] transition-all duration-300", menuOpen && "opacity-0")} />
          <span className={cn("block w-5 h-px bg-[#f8fafc] transition-all duration-300", menuOpen && "-rotate-45 -translate-y-2")} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden bg-[#0a0f1e]/95 backdrop-blur-md border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium uppercase tracking-wider text-[#94a3b8] hover:text-[#4a7fa5] transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href={social.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium uppercase tracking-wider text-[#4a7fa5] hover:text-white transition-colors"
          >
            Resume
          </a>
        </div>
      )}
    </header>
  );
}
