"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Item = { id: string; title: string };

// Highlights the section being read (same observer pattern as the navbar).
function useActive(items: Item[]) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);
  useEffect(() => {
    const els = items.map((t) => document.getElementById(t.id)).filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "0px 0px -70% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);
  return active;
}

/** Sticky contents beside the article (xl and up). */
export function SideToc({ items }: { items: Item[] }) {
  const active = useActive(items);
  return (
    <div className="absolute top-0 right-full mr-28 hidden h-full w-44 xl:block">
      <nav aria-label="Contents" className="sticky top-32">
        <p className="mb-3 font-mono text-[11px] tracking-[0.16em] text-fg-subtle uppercase">Contents</p>
        <ol className="border-l border-line text-sm">
          {items.map((t) => (
            <li key={t.id}>
              <a
                href={`#${t.id}`}
                aria-current={active === t.id ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l-2 py-1.5 pl-3.5 leading-snug transition-colors duration-200 hover:text-fg",
                  active === t.id ? "border-accent text-fg" : "border-transparent text-fg-subtle",
                )}
              >
                {t.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}

/** Collapsible contents at the top of the article (below xl). */
export function InlineToc({ items }: { items: Item[] }) {
  return (
    <details className="group mb-10 rounded-xl border border-line bg-surface shadow-card xl:hidden">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between px-4 font-mono text-xs tracking-[0.16em] text-fg-subtle uppercase [&::-webkit-details-marker]:hidden">
        Contents
        <span aria-hidden="true" className="text-base transition-transform duration-200 group-open:rotate-45">
          +
        </span>
      </summary>
      <nav aria-label="Contents">
        <ol className="border-t border-line px-2 py-2 text-sm">
          {items.map((t, i) => (
            <li key={t.id}>
              <a href={`#${t.id}`} className="flex min-h-11 items-center gap-3 rounded-lg px-2 text-fg-muted hover:bg-surface-hover hover:text-fg">
                <span className="font-mono text-xs text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
                {t.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </details>
  );
}
