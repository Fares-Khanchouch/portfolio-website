import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data";
import FlowDiagram from "./FlowDiagram";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  return (
    <section id="projects" className="py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading index="02" label="Projects" title="Selected work" />

        <div className="flex flex-col gap-6">
          {projects.map((p, i) => (
            <Reveal as="article" key={p.id} delay={i * 60}>
              <div data-spotlight className="rounded-2xl border border-line bg-surface p-6 shadow-card md:p-8">
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-accent">{p.kind}</p>
                <h3 className="text-xl font-semibold tracking-tight text-fg md:text-2xl">{p.title}</h3>
                <p className="mt-3 max-w-3xl leading-relaxed text-fg-muted">{p.summary}</p>

                <div className="my-6 rounded-xl border border-line bg-bg/40 p-4 md:p-5">
                  <FlowDiagram steps={p.flow} label={`${p.title}: how it works`} />
                </div>

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
                      <li key={t} className="rounded-md border border-line px-2 py-1 font-mono text-xs text-fg-subtle">
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
                        <ArrowUpRight size={15} aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
