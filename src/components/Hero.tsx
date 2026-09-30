import { getImageProps } from "next/image";
import { ArrowRight, Bot, FileText, Github, Linkedin } from "lucide-react";
import { hero, now, social } from "@/data";

const enter = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as React.CSSProperties;

export default function Hero() {
  const common = { alt: hero.photoAlt, fetchPriority: "high", loading: "eager" } as const;
  const {
    props: { srcSet: _d, ...desktopRest },
  } = getImageProps({ ...common, src: hero.photo, width: 960, height: 1280, sizes: "(min-width: 1024px) 320px, 288px" });
  const desktop = { srcSet: _d, sizes: desktopRest.sizes };
  const { props: mobile } = getImageProps({ ...common, src: hero.avatar, width: 512, height: 512, sizes: "96px" });
  return (
    <section id="top" data-spotlight data-spotlight-size="lg" className="relative overflow-x-clip pt-28 pb-12 md:pt-40 md:pb-16">
      {/* Background: slow-drifting dotted grid and one soft glow. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-grid grid-drift absolute inset-0" />
        <div className="absolute top-16 right-[4%] h-[440px] w-[440px] rounded-full bg-[var(--glow)] opacity-70 blur-[110px] max-md:-top-24 max-md:opacity-40" />
        <div className="absolute bottom-0 left-[8%] hidden h-[260px] w-[360px] md:block rounded-full bg-[var(--glow)] opacity-25 blur-[120px]" />
      </div>

      <div className="relative mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)] items-center gap-7 px-4 sm:px-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-stretch md:gap-10 lg:gap-16">
        <div className="order-2 md:order-1">
          <p className="enter mb-5 flex items-baseline leading-none gap-3 [overflow-wrap:anywhere] font-mono text-xs uppercase tracking-[0.16em] text-balance text-accent max-[380px]:tracking-[0.12em] sm:tracking-[0.2em]">
            <span aria-hidden="true" className="h-px w-8 shrink-0 -translate-y-[0.3em] bg-accent" />
            {hero.eyebrow}
          </p>

          <h1 className="rise break-words text-[clamp(2rem,13vw,2.75rem)] font-semibold leading-[1.02] tracking-tight text-fg sm:text-6xl lg:text-7xl" style={enter(80)}>
            {hero.firstName}
            <br />
            {hero.lastName}
          </h1>

          <p className="enter mt-5 text-xl font-medium text-fg/90 md:text-2xl" style={enter(160)}>
            {hero.headline}
          </p>

          <p className="enter mt-4 max-w-md text-base leading-relaxed text-pretty text-fg-muted md:text-lg" style={enter(240)}>
            {hero.tagline}
          </p>

          <div className="enter mt-9 flex flex-wrap items-center gap-3" style={enter(320)}>
            <a
              href="#projects"
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-accent-solid px-5 text-sm font-medium text-white shadow-accent transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-accent-solid-hover"
            >
              See my work
              <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href={social.resume}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-input-border px-5 text-sm font-medium text-fg transition-[border-color,color,transform] duration-200 hover:-translate-y-px hover:border-accent hover:text-accent"
            >
              <FileText size={16} aria-hidden="true" />
              Résumé
            </a>
            <div className="flex items-center gap-1 max-sm:-ml-3 max-sm:mt-1 max-sm:basis-full">
              <a
                href={social.github}
                target="_blank"
                rel="me noopener noreferrer"
                aria-label="GitHub profile"
                className="flex h-11 w-11 items-center justify-center rounded-full text-fg-muted transition-colors duration-200 hover:bg-surface-hover hover:text-fg"
              >
                <Github size={19} aria-hidden="true" />
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="me noopener noreferrer"
                aria-label="LinkedIn profile"
                className="flex h-11 w-11 items-center justify-center rounded-full text-fg-muted transition-colors duration-200 hover:bg-surface-hover hover:text-fg"
              >
                <Linkedin size={19} aria-hidden="true" />
              </a>
            </div>
          </div>

          <dl className="enter mt-10 grid max-w-xl grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4" style={enter(400)}>
            {hero.proof.map((p) => (
              <div
                key={p.label}
                className="relative flex flex-col-reverse justify-end border-t border-line pt-4 before:absolute before:-top-px before:left-0 before:h-0.5 before:w-6 before:rounded-full before:bg-accent"
              >
                <dt className="mt-1 text-[13px] leading-snug text-balance text-fg-muted [overflow-wrap:anywhere]">{p.label}</dt>
                <dd className="text-3xl font-semibold tracking-tight text-fg tabular-nums [overflow-wrap:anywhere]">{p.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="enter-soft relative order-1 flex flex-wrap items-center gap-4 md:order-2 md:flex-nowrap md:items-stretch md:gap-0" style={enter(120)}>
          {/* Art direction: phones load only the tight head-and-shoulders crop
              (left-aligned with the text, so the name and buttons stay above
              the fold); tablets and up load only the 3:4 portrait. */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 hidden translate-x-4 translate-y-4 rounded-2xl border border-accent/25 bg-accent-soft md:block" />
          <div aria-hidden="true" className="hero-grid-plate absolute -right-10 -bottom-10 -z-10 hidden h-40 w-40 md:block" />
          <div className="relative w-24 shrink-0 overflow-hidden rounded-xl shadow-[var(--photo-shadow-sm)] md:h-full md:w-[288px] md:rounded-2xl md:shadow-[var(--photo-shadow)] lg:w-[320px]">
            <picture>
              <source media="(min-width: 768px)" srcSet={desktop.srcSet} sizes={desktop.sizes} />
              <img
                {...mobile}
                alt={hero.photoAlt}
                className="aspect-square h-auto w-full object-cover object-top md:absolute md:inset-0 md:aspect-auto md:h-full"
              />
            </picture>
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-[var(--photo-ring)]" />
          </div>

          {/* Phones: the current role sits beside the small photo. */}
          <div className="min-w-[8rem] flex-1 [overflow-wrap:anywhere] md:hidden">
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
              <span aria-hidden="true" className="live-dot" />
              Now
            </p>
            <p className="mt-1 text-sm font-medium text-fg">{now.role}</p>
            <p className="text-sm text-fg-muted">{now.company}</p>
          </div>

          {/* Tablet and up: two floating cards on the photo. */}
          <div aria-hidden="true" className="float-a absolute bottom-10 -left-6 hidden lg:-left-12 rounded-2xl border border-line-strong bg-bg/85 px-4 py-3 shadow-[0_16px_40px_-18px_rgba(0,0,0,0.6)] backdrop-blur-md md:block">
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
              <span className="live-dot" />
              Now
            </p>
            <p className="mt-1 text-sm font-medium whitespace-nowrap text-fg">{now.role}</p>
            <p className="text-xs whitespace-nowrap text-fg-muted">
              {now.company} · {now.location}
            </p>
          </div>
          <div aria-hidden="true" className="float-b absolute top-8 right-2 hidden xl:-right-6 items-center gap-3 rounded-2xl border border-line-strong bg-bg/85 py-2.5 pr-4 pl-2.5 shadow-[0_16px_40px_-18px_rgba(0,0,0,0.6)] backdrop-blur-md md:flex">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <Bot size={18} />
            </span>
            <span>
              <span className="block text-sm font-medium whitespace-nowrap text-fg">
                {hero.toolingBadge.value} {hero.toolingBadge.label}
              </span>
              <span className="block text-xs whitespace-nowrap text-fg-muted">{hero.toolingBadge.detail}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
