import { about } from "@/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading index="03" label="About" title="A bit about me" />

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
          <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">Tools I work with</h3>
          <ul className="flex flex-wrap gap-2">
            {about.skills.map((s) => (
              <li
                key={s}
                className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-fg-muted"
              >
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
