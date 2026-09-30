"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// A project's pipeline as a row of steps, always fully readable. The first
// time it scrolls into view a signal passes through the steps once (skipped
// under reduced motion). The list itself is plain, readable HTML.
export default function FlowDiagram({ steps, label }: { steps: string[]; label: string }) {
  const ref = useRef<HTMLOListElement | null>(null);
  const [active, setActive] = useState(-1); // step the signal is on; -1 = none

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect(); // play once per page view
        let step = 0;
        setActive(0);
        timer = setInterval(() => {
          step += 1;
          if (step >= steps.length) {
            clearInterval(timer);
            setActive(-1);
          } else {
            setActive(step);
          }
        }, 450);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [steps.length]);

  return (
    <ol
      ref={ref}
      aria-label={label}
      className="flex flex-col items-start md:grid md:items-stretch md:gap-x-4"
      style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
    >
      {steps.map((s, i) => (
        <li key={s} className="relative flex flex-col items-start md:block">
          {i > 0 && (
            // An arrow into this step: vertical above it on phones, horizontal
            // in the gap to its left from md up.
            <span
              aria-hidden="true"
              className="relative ml-5 flex h-4 w-px flex-col items-center md:absolute md:top-1/2 md:-left-4 md:ml-0 md:h-px md:w-4 md:-translate-y-1/2 md:flex-row"
            >
              <span className="relative block h-full w-full overflow-hidden bg-line-strong">
                <span
                  className={cn(
                    "absolute inset-0 bg-accent/60 transition-colors duration-300",
                    active === i && "bg-accent",
                  )}
                />
              </span>
              <span
                className={cn(
                  "block h-0 w-0 shrink-0 border-x-[3.5px] border-t-[4px] border-x-transparent transition-colors duration-500 md:border-x-0 md:border-t-0 md:border-y-[3.5px] md:border-l-[4px] md:border-y-transparent",
                  "border-t-accent/60 md:border-l-accent/60",
                  active === i && "border-t-accent md:border-l-accent",
                )}
              />
            </span>
          )}
          <span
            className={cn(
              "block rounded-md border px-3 py-1.5 font-mono text-xs leading-snug transition-[color,background-color,border-color,box-shadow] duration-300 md:flex md:h-full md:w-full md:items-center md:justify-center md:px-2 md:text-center",
              "border-accent/50 bg-accent-soft text-fg",
              active === i && "border-accent shadow-[0_0_0_4px_var(--accent-soft)]",
            )}
          >
            {s}
          </span>
        </li>
      ))}
    </ol>
  );
}
