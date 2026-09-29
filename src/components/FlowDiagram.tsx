"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// A project's pipeline as a row of steps; a highlight walks the steps in
// order while the diagram is on screen. Static (every step lit) when the
// visitor prefers reduced motion. The list itself is plain, readable HTML.
export default function FlowDiagram({ steps, label }: { steps: string[]; label: string }) {
  const ref = useRef<HTMLOListElement | null>(null);
  const [active, setActive] = useState(-1); // -1 = static, everything lit

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setInterval> | undefined;
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = undefined;
    };
    const start = () => {
      if (timer || reduce.matches) return;
      setActive(0);
      timer = setInterval(() => setActive((a) => (a + 1) % (steps.length + 2)), 900);
    };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), {
      threshold: 0.4,
    });
    io.observe(el);
    const onChange = () => {
      if (reduce.matches) {
        stop();
        setActive(-1);
      }
    };
    reduce.addEventListener("change", onChange);
    return () => {
      stop();
      io.disconnect();
      reduce.removeEventListener("change", onChange);
    };
  }, [steps.length]);

  const lit = (i: number) => active === -1 || i <= active;

  return (
    <ol
      ref={ref}
      aria-label={label}
      className="flex flex-wrap items-center gap-y-2.5"
    >
      {steps.map((s, i) => (
        <li key={s} className="flex items-center">
          {i > 0 && (
            <span aria-hidden="true" className="relative block h-px w-4 overflow-hidden bg-line-strong sm:w-6">
              <span
                className={cn(
                  "absolute inset-0 origin-left bg-accent transition-transform duration-500 ease-out",
                  lit(i) ? "scale-x-100" : "scale-x-0",
                )}
              />
            </span>
          )}
          <span
            className={cn(
              "rounded-md border px-3 py-1.5 font-mono text-xs whitespace-nowrap transition-[color,background-color,border-color,box-shadow] duration-300",
              lit(i)
                ? "border-accent/50 bg-accent-soft text-fg"
                : "border-line bg-transparent text-fg-subtle",
              active === i && "shadow-[0_0_0_4px_var(--accent-soft)]",
            )}
          >
            {s}
          </span>
        </li>
      ))}
    </ol>
  );
}
