"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Fade-and-rise on scroll. The server renders content visible; only
// elements that start below the fold are hidden (after hydration) and
// revealed as they enter the viewport, so crawlers, no-JS visitors and
// reduced-motion users always see everything. The hide/show classes only
// do anything under prefers-reduced-motion: no-preference (globals.css).
export default function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return;
    el.classList.add("reveal-pending");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("reveal-in");
        el.classList.remove("reveal-pending");
        io.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
