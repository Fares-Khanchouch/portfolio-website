import { Bot, Plug, Route } from "lucide-react";
import { before, now, type Highlight } from "@/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import CareerLine from "./work/CareerLine";
import { AgentTooling, DeliveryRail, IntegrationFlow } from "./work/Drawings";

const ICONS: Record<Highlight["icon"], typeof Bot> = {
  delivery: Route,
  integration: Plug,
  agent: Bot,
};

const DRAWINGS: Record<Highlight["icon"], () => React.JSX.Element> = {
  delivery: DeliveryRail,
  integration: IntegrationFlow,
  agent: AgentTooling,
};

function HighlightCard({ h, large = false }: { h: Highlight; large?: boolean }) {
  const Icon = ICONS[h.icon];
  const Drawing = DRAWINGS[h.icon];
  return (
    <div
      className={
        "flex h-full flex-col rounded-2xl border border-line bg-surface p-5 shadow-card md:p-6 " +
        (large ? "lg:p-7" : "")
      }
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <Icon size={20} aria-hidden="true" />
        </span>
        <h4 className={"min-w-0 font-medium break-words text-fg " + (large ? "text-lg" : "")}>{h.title}</h4>
      </div>
      <p className={"leading-relaxed text-fg-muted " + (large ? "max-w-xl" : "text-sm")}>{h.text}</p>
      {h.details && (
        <ul className="mt-5 grid grid-cols-[minmax(0,1fr)] gap-x-6 gap-y-3 sm:grid-cols-2">
          {h.details.map((d) => (
            <li key={d} className="flex min-w-0 gap-2.5 text-sm leading-snug [overflow-wrap:anywhere] text-fg-muted">
              <span aria-hidden="true" className="mt-[7px] h-1 w-3 shrink-0 rounded-full bg-accent" />
              {d}
            </li>
          ))}
        </ul>
      )}
      <div className={"-mx-2 mt-6 flex items-center rounded-xl border border-line bg-bg/40 p-2 sm:mx-0 sm:p-3 " + (large ? "dot-field lg:flex-1 lg:p-6" : "lg:mt-auto")}>
        <Drawing />
      </div>
    </div>
  );
}

export default function Work() {
  const byIcon = Object.fromEntries(now.highlights.map((h) => [h.icon, h])) as Record<Highlight["icon"], Highlight>;
  return (
    <section id="work" className="py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading index="01" label="Experience" title={now.heading} />

        <Reveal>
          <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="text-lg font-semibold text-fg md:text-xl">
              {now.role}
              {" "}
              <span className="text-fg-subtle">·</span> <span className="text-accent">{now.company}</span>
            </h3>
            <p className="flex items-center gap-2 font-mono text-xs text-fg-subtle">
              <span aria-hidden="true" className="live-dot" />
              {now.dates} · {now.location}
            </p>
          </div>
        </Reveal>

        {/* Bento: agent tooling large on the left, the other two stacked. */}
        <ul className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-5 lg:grid-rows-2">
          <Reveal as="li" className="lg:col-span-3 lg:row-span-2">
            <HighlightCard h={byIcon.agent} large />
          </Reveal>
          <Reveal as="li" className="lg:col-span-2" delay={80}>
            <HighlightCard h={byIcon.delivery} />
          </Reveal>
          <Reveal as="li" className="lg:col-span-2" delay={160}>
            <HighlightCard h={byIcon.integration} />
          </Reveal>
        </ul>

        <Reveal className="mt-16">
          <h3 className="mb-4 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
            Career line
            <span aria-hidden="true" className="h-px flex-1 bg-line" />
          </h3>
          <CareerLine />
        </Reveal>

        <Reveal className="mt-10">
          <h3 className="mb-6 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
            Before
            <span aria-hidden="true" className="h-px flex-1 bg-line" />
          </h3>
          <ol className="divide-y divide-line rounded-xl border border-line bg-surface shadow-card">
            {before.map((r) => (
              <li
                key={r.role + r.dates}
                className="grid gap-x-8 gap-y-1.5 px-5 py-5 transition-colors duration-200 hover:bg-surface-hover md:grid-cols-[9rem_minmax(0,1fr)] md:px-6"
              >
                <p className="font-mono text-xs text-fg-subtle md:pt-1">{r.dates}</p>
                <div className="min-w-0">
                  <p className="font-medium [overflow-wrap:anywhere] text-fg">
                    {r.role}
                    {" "}
                    <span className="text-fg-subtle">·</span> <span className="text-fg-muted">{r.company}</span>
                  </p>
                  <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-fg-muted">{r.summary}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tools">
                    {r.tags.map((t) => (
                      <li key={t} className="rounded-md border border-line bg-bg/40 px-2 py-0.5 font-mono text-[11px] text-fg-muted">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
