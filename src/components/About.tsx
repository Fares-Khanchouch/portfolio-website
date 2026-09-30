import { about } from "@/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading index="03" label="About" title="The short version" />

        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 md:grid-cols-[3fr_2fr] md:gap-14">
          <Reveal className="space-y-5">
            {about.paragraphs.map((p) => (
              <p key={p} className="text-lg leading-relaxed text-fg-muted">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={80}>
            <dl className="divide-y divide-line rounded-xl border border-line bg-surface shadow-card">
              {about.facts.map((f) => (
                <div key={f.label} className="px-5 py-4">
                  <dt className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">{f.label}</dt>
                  <dd className="text-sm leading-relaxed text-fg">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal className="mt-12">
          <h3 className="mb-5 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
            Tools I work with
            <span aria-hidden="true" className="h-px flex-1 bg-line" />
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {about.skillGroups.map((g) => (
              <div key={g.name}>
                <h4 className="mb-2.5 text-sm font-medium text-fg">{g.name}</h4>
                <ul className="flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <li key={s} className="rounded-md border border-line px-2 py-1 font-mono text-xs text-fg-muted">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
