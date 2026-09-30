"use client";

import { useEffect } from "react";

// One document-level listener: any element with [data-spotlight] gets
// --mx/--my set to the pointer position inside it, which globals.css turns
// into a soft highlight that follows the cursor. Mouse/pen only; nothing
// happens on touch or when the visitor prefers reduced motion.
export default function Spotlight() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-spotlight]");
      if (!el) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
    };
  }, []);
  return null;
}
