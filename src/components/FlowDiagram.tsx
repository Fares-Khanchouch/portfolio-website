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
      className="flex flex-col items-start md:grid md:items-stretch md:gap-x-3"
      style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
    >
      {steps.map((s, i) => (
        <li key={s} className="relative flex flex-col items-start md:block">
          {i > 0 && (
            // Phones: vertical connector above the step. md+: horizontal
            // connector in the gap to the left of the step.
            <span
              aria-hidden="true"
              className="relative ml-5 block h-3 w-px overflow-hidden bg-line-strong md:absolute md:top-1/2 md:-left-3 md:ml-0 md:h-px md:w-3"
            >
              <span
                className={cn(
                  "absolute inset-0 origin-top bg-accent transition-transform duration-500 ease-out md:origin-left",
                  lit(i) ? "scale-100" : "scale-y-0 md:scale-x-0 md:scale-y-100",
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
