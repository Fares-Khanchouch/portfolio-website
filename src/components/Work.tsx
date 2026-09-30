import { Bot, Plug, Route } from "lucide-react";
import { before, now, type Highlight } from "@/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const ICONS: Record<Highlight["icon"], typeof Bot> = {
  delivery: Route,
  integration: Plug,
  agent: Bot,
};

export default function Work() {
  return (
    <section id="work" className="py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading index="01" label="Experience" title={now.heading} />

        <Reveal>
          <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="text-lg font-semibold text-fg md:text-xl">
              {now.role}
              {"\u00a0"}
              <span className="text-fg-subtle">·</span> <span className="text-accent">{now.company}</span>
            </h3>
            <p className="font-mono text-xs text-fg-subtle">
              {now.dates} · {now.location}
            </p>
          </div>
        </Reveal>

        <ul className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-3">
          {now.highlights.map((h, i) => {
            const Icon = ICONS[h.icon];
            return (
              <Reveal as="li" key={h.title} delay={i * 80}>
                <div className="h-full rounded-xl border border-line bg-surface p-5 shadow-card md:p-6">
                  <div className="mb-3 flex items-center gap-3 lg:mb-2 lg:block">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent lg:mb-4">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <h4 className="font-medium text-fg">{h.title}</h4>
                  </div>
                  <p className="text-sm leading-relaxed text-fg-muted">{h.text}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="mt-16">
          <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">Before</h3>
          <ol className="relative">
            {before.map((r) => (
              <li
                key={r.role + r.dates}
                className="relative pb-8 pl-6 before:absolute before:top-3 before:bottom-0 before:left-0 before:w-px before:bg-line last:pb-0 last:before:hidden"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-2 -left-[3.5px] h-2 w-2 rounded-full border border-accent bg-bg"
                />
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <p className="font-medium text-fg">
                    {r.role}
                    {"\u00a0"}
                    <span className="text-fg-subtle">·</span> <span className="text-fg-muted">{r.company}</span>
                  </p>
                  <p className="shrink-0 font-mono text-xs text-fg-subtle">{r.dates}</p>
                </div>
                <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-fg-muted">{r.summary}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
