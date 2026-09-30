"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { FileText, Menu, X } from "lucide-react";
import { nav, social } from "@/data";
import { cn } from "@/lib/utils";

// Floating pill navigation. On the home page links are in-page anchors and
// a highlight slides to the section in view; on other pages they point back
// to the home page's sections.
export default function Navbar({ home = true }: { home?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // Which section is in the middle band of the viewport (home page only).
  useEffect(() => {
    if (!home) return;
    const els = nav
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = e.target.id;
          setActive((a) => (e.isIntersecting ? id : a === id ? null : a));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const onTop = () => window.scrollY < 200 && setActive(null);
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, [home]);

  // Move the sliding highlight under the active link.
  const placePill = useCallback(() => {
    const el = active ? linkRefs.current[active] : null;
    setPill(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
  }, [active]);
  useLayoutEffect(placePill, [placePill]);
  useEffect(() => {
    window.addEventListener("resize", placePill);
    return () => window.removeEventListener("resize", placePill);
  }, [placePill]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    // Keep the page underneath still while the menu is open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const href = (id: string) => (home ? `#${id}` : `/#${id}`);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-4">
      <nav
        aria-label="Main"
        className={cn(
          "mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full border pr-2 pl-5 transition-[background-color,border-color,box-shadow] duration-300",
          scrolled || open
            ? "border-line-strong bg-bg/80 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            : "border-line bg-bg/40 backdrop-blur-md",
        )}
      >
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-wider text-fg transition-colors duration-200 hover:text-accent"
        >
          <span aria-hidden="true">
            fk<span className="text-accent">.</span>
          </span>
          <span className="sr-only">Fares Khanchouch, home</span>
        </Link>

        <ul className="relative hidden items-center text-sm text-fg-muted md:flex">
          <span
            aria-hidden="true"
            className={cn(
              "absolute top-1/2 h-8 -translate-y-1/2 rounded-full border border-line bg-surface-hover transition-[left,width,opacity] duration-300 ease-out",
              pill ? "opacity-100" : "opacity-0",
            )}
            style={pill ? { left: pill.left, width: pill.width } : undefined}
          />
          {nav.map((l) => (
            <li key={l.id}>
              <a
                ref={(el) => {
                  linkRefs.current[l.id] = el;
                }}
                href={href(l.id)}
                aria-current={active === l.id ? "true" : undefined}
                className={cn(
                  "block rounded-full px-3.5 py-1.5 transition-colors duration-200 hover:text-fg",
                  active === l.id && "text-fg",
                )}
              >
                {l.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <a
            href={social.resume}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-accent-solid px-4 text-sm font-medium text-white transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-accent-solid-hover"
          >
            <FileText size={15} aria-hidden="true" />
            Résumé
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-fg transition-colors hover:bg-surface-hover md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          onBlur={(e) => {
            const next = e.relatedTarget as Node | null;
            if (next && !e.currentTarget.closest("header")?.contains(next)) setOpen(false);
          }}
          className="mx-auto mt-2 max-h-[calc(100dvh-6rem)] max-w-5xl overflow-y-auto overscroll-contain rounded-3xl border border-line-strong bg-bg p-2 shadow-[0_20px_40px_-16px_rgba(0,0,0,0.5)] md:hidden"
        >
          <ul className="flex flex-col">
            {nav.map((l, i) => (
              <li key={l.id}>
                <a
                  href={href(l.id)}
                  onClick={() => setOpen(false)}
                  aria-current={active === l.id ? "true" : undefined}
                  className={cn(
                    "flex items-center justify-between rounded-2xl px-4 py-3.5 text-base text-fg-muted transition-colors hover:bg-surface-hover hover:text-fg",
                    active === l.id && "bg-surface-hover text-fg",
                  )}
                >
                  {l.name}
                  <span aria-hidden="true" className="font-mono text-xs text-fg-subtle">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
