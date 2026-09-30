"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// A project's pipeline as a row of steps; a highlight walks the steps in
// order once when the diagram scrolls into view, then every step stays lit. Static (every step lit) when the
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
    // Walk the steps once each time the diagram comes into view, then rest
    // with every step lit (-1).
    const start = () => {
      if (timer || reduce.matches) return;
      setActive(0);
      let step = 0;
      timer = setInterval(() => {
        step += 1;
        if (step >= steps.length) {
          stop();
          setActive(-1);
        } else {
          setActive(step);
        }
      }, 700);
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
                    "absolute inset-0 origin-top bg-accent transition-transform duration-500 ease-out md:origin-left",
                    lit(i) ? "scale-100" : "scale-y-0 md:scale-x-0 md:scale-y-100",
                  )}
                />
              </span>
              <span
                className={cn(
                  "block h-0 w-0 shrink-0 border-x-[3.5px] border-t-[4px] border-x-transparent transition-colors duration-500 md:border-x-0 md:border-t-0 md:border-y-[3.5px] md:border-l-[4px] md:border-y-transparent",
                  lit(i) ? "border-t-accent md:border-l-accent" : "border-t-line-strong md:border-l-line-strong",
                )}
              />
            </span>
          )}
          <span
            className={cn(
              "block rounded-md border px-3 py-1.5 font-mono text-xs leading-snug transition-[color,background-color,border-color,box-shadow] duration-300 md:flex md:h-full md:w-full md:items-center md:justify-center md:px-2 md:text-center",
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
