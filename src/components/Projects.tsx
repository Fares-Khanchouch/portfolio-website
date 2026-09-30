import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data";
import GroundedDiagram from "./diagrams/GroundedDiagram";
import OperatorDiagram from "./diagrams/OperatorDiagram";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  return (
    <section id="projects" className="border-y border-line bg-[var(--band)] py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading index="02" label="Projects" title="Built end to end, and measured" />

        <div className="flex flex-col gap-6">
          {projects.map((p, i) => (
            <Reveal as="article" key={p.id} delay={i * 60}>
              <div data-spotlight className="rounded-2xl border border-line bg-surface p-6 shadow-card md:p-8">
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-accent">{p.kind}</p>
                <h3 className="text-xl font-semibold tracking-tight text-fg md:text-2xl">{p.title}</h3>
                <p className="mt-3 max-w-3xl leading-relaxed text-fg-muted">{p.summary}</p>

                <div className="my-6 rounded-xl border border-line bg-bg/40 p-4 md:p-6">
                  {p.id === "n8n-operator" ? <OperatorDiagram /> : <GroundedDiagram />}
                </div>

                {p.metrics && (
                  <dl className={"mb-6 grid grid-cols-[minmax(0,1fr)] gap-3 " + (p.metrics.length > 1 ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
                    {p.metrics.map((m) => (
                      <div key={m.label} className="rounded-xl border border-line bg-bg/40 px-4 py-3">
                        <dt className="text-xs leading-snug text-fg-subtle">{m.label}</dt>
                        <dd className="mt-1.5 flex flex-wrap items-baseline gap-x-2 font-mono tabular-nums">
                          <span className="text-sm text-fg-subtle line-through decoration-fg-subtle/60">{m.before}</span>
                          <span aria-hidden="true" className="text-fg-subtle">→</span>
                          <span className="sr-only">to</span>
                          <span className="min-w-0 text-2xl font-semibold tracking-tight break-words text-accent">{m.after}</span>
                        </dd>
                      </div>
                    ))}
                    {p.conditions && (
                      <div className="rounded-xl border border-line bg-bg/40 px-4 py-3">
                        <dt className="text-xs leading-snug text-fg-subtle">Health conditions reported</dt>
                        <dd className="mt-2 flex flex-wrap gap-1.5">
                          {p.conditions.map((c) => (
                            <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent-soft px-2.5 py-0.5 font-mono text-[11px] text-fg">
                              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                              {c}
                            </span>
                          ))}
                        </dd>
                      </div>
                    )}
                  </dl>
                )}

                <ul className="space-y-2">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
                      <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {pt}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                    {p.tags.map((t) => (
                      <li key={t} className="rounded-md border border-line px-2 py-1 font-mono text-xs text-fg-muted">
                        {t}
                      </li>
                    ))}
                  </ul>
                  {p.link &&
                    (p.link.external ? (
                      <a
                        href={p.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent"
                      >
                        {p.link.label}
                        <ArrowUpRight size={15} aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    ) : (
                      <Link href={p.link.href} className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                        {p.link.label}
                        <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
                      </Link>
                    ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
