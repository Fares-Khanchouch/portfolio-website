import {
  Bot,
  Code2,
  GraduationCap,
  Languages,
  MapPin,
  Plug,
  Server,
} from "lucide-react";
import { about, projects } from "@/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const FACT_ICONS = {
  "Based in": MapPin,
  Education: GraduationCap,
  Languages,
} as const;
const GROUP_ICONS = [Bot, Plug, Code2, Server];

// A tool counts as "shown in a project" when a project tag names it.
const projectTags = projects.flatMap((p) => p.tags.map((t) => t.toLowerCase()));
const inProjects = (tool: string) =>
  projectTags.some((t) =>
    new RegExp(
      `(^|[\\s(])${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}($|[\\s)])`,
    ).test(tool.toLowerCase()),
  );

export default function About() {
  return (
    <section id="about" className="pt-14 pb-4 md:pt-20 md:pb-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading index="03" label="About" title="The short version" />

        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[3fr_2fr] lg:gap-14">
          <Reveal>
            <p className="text-2xl leading-snug font-medium tracking-tight text-balance [overflow-wrap:anywhere] text-fg md:text-3xl">
              {about.lede.text}{" "}
              <span className="text-accent">{about.lede.accent}</span>
            </p>
            <div className="mt-6 space-y-4 border-l-2 border-accent/40 pl-5">
              {about.paragraphs.map((p) => (
                <p
                  key={p}
                  className="text-base leading-relaxed text-fg-muted md:text-lg"
                >
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <dl className="divide-y divide-line rounded-xl border border-line bg-surface shadow-card">
              {about.facts.map((f) => {
                const Icon =
                  FACT_ICONS[f.label as keyof typeof FACT_ICONS] ?? MapPin;
                const langs =
                  f.label === "Languages" ? f.value.split(" · ") : null;
                return (
                  <div
                    key={f.label}
                    className="relative py-4 pr-5 pl-[68px]"
                  >
                    <dt className="mb-1 font-mono text-[11px] tracking-[0.18em] text-fg-subtle uppercase">
                      <span className="absolute top-[18px] left-5 flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
                        <Icon size={16} aria-hidden="true" />
                      </span>
                      {f.label}
                    </dt>
                    {langs ? (
                      <dd className="flex flex-wrap gap-1.5">
                        {langs.map((l) => (
                          <span
                            key={l}
                            className="rounded-lg border border-line bg-bg/40 px-2.5 py-0.5 text-[13px] text-fg"
                          >
                            {l}
                          </span>
                        ))}
                      </dd>
                    ) : (
                      <dd className="text-sm leading-relaxed [overflow-wrap:anywhere] text-fg">
                        {f.value}
                      </dd>
                    )}
                  </div>
                );
              })}
            </dl>
          </Reveal>
        </div>

        <Reveal className="mt-14">
          <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs tracking-[0.2em] text-fg-subtle uppercase">
            <h3>Tools I work with</h3>
            <span aria-hidden="true" className="h-px min-w-8 flex-1 bg-line" />
            <span className="flex items-center gap-2 text-[11px] tracking-[0.1em] normal-case">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-accent"
              />
              used in the projects above
            </span>
          </div>
          <div className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {about.skillGroups.map((g, i) => {
              const Icon = GROUP_ICONS[i % GROUP_ICONS.length];
              return (
                <div
                  key={g.name}
                  className="rounded-xl border border-line bg-surface p-4 shadow-card transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-line-strong"
                >
                  <h4 className="mb-3 flex items-center gap-2.5 text-sm font-medium text-fg">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <Icon size={15} aria-hidden="true" />
                    </span>
                    {g.name}
                  </h4>
                  <ul className="flex flex-wrap gap-1.5">
                    {g.items.map((s) => {
                      const used = inProjects(s);
                      return (
                        <li
                          key={s}
                          className={
                            "inline-flex max-w-full items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-xs [overflow-wrap:anywhere] " +
                            (used
                              ? "border-accent/40 bg-accent-soft text-fg"
                              : "border-line bg-bg/40 text-fg-muted")
                          }
                        >
                          {used && (
                            <span
                              aria-hidden="true"
                              className="h-1.5 w-1.5 rounded-full bg-accent"
                            />
                          )}
                          {s}
                          {used && (
                            <span className="sr-only">
                              {" "}
                              (used in a project above)
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
