"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, social } from "@/data";
import { cn } from "@/lib/utils";

// On the home page links are in-page anchors; on other pages they point
// back to the home page's sections.
export default function Navbar({ home = true }: { home?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const href = (id: string) => (home ? `#${id}` : `/#${id}`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-200",
        scrolled || open
          ? "border-b border-line bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6"
      >
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-wider text-fg transition-colors duration-200 hover:text-accent"
          aria-label="Fares Khanchouch, home"
        >
          fk<span className="text-accent">.</span>
        </Link>

        <ul className="hidden items-center gap-7 text-sm text-fg-muted md:flex">
          {nav.map((l) => (
            <li key={l.id}>
              <a href={href(l.id)} className="transition-colors duration-200 hover:text-fg">
                {l.name}
              </a>
            </li>
          ))}
          <li>
            <a
              href={social.resume}
              className="rounded-md border border-line-strong px-3 py-1.5 text-fg transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              Résumé
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-md text-fg md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line px-4 pb-4 md:hidden">
          <ul className="flex flex-col">
            {nav.map((l) => (
              <li key={l.id}>
                <a
                  href={href(l.id)}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base text-fg-muted transition-colors hover:text-fg"
                >
                  {l.name}
                </a>
              </li>
            ))}
            <li>
              <a href={social.resume} className="block py-3 text-base text-accent">
                Résumé (PDF)
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
