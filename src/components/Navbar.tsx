"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Work History", id: "work" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-white/80 backdrop-blur shadow-md dark:bg-black/60" : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Stylized Full Name */}
        <Link href="#home" className="text-xl font-bold leading-tight tracking-tight sm:text-2xl">
          <span className="text-slate-100 dark:text-white">
            Fares{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 bg-clip-text text-transparent font-extrabold">
              Khanchouch
            </span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <ul className="hidden sm:flex items-center space-x-8 text-sm font-semibold text-white">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="uppercase tracking-wider transition-all duration-300 hover:text-blue-300 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
