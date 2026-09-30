import Image from "next/image";
import { ArrowRight, FileText, Github, Linkedin } from "lucide-react";
import { hero, now, social } from "@/data";

const enter = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as React.CSSProperties;

export default function Hero() {
  return (
    <section
      id="top"
      data-spotlight
      data-spotlight-size="lg"
      className="relative overflow-x-clip pt-20 pb-14 sm:pt-24 lg:flex lg:min-h-[min(100svh,960px)] lg:items-center lg:pt-28 lg:pb-16"
    >
      {/* Background: slow-drifting dotted grid and one soft glow. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-grid grid-drift absolute inset-0" />
        <div className="absolute top-10 right-[2%] h-[480px] w-[480px] rounded-full bg-[var(--glow)] opacity-60 blur-[120px] max-lg:opacity-40" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)] gap-y-4 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-x-12 lg:px-8">
        {/* Text first in the DOM, so reading order is right. */}
        <div className="order-2 lg:order-1 lg:col-span-7">
          <p className="enter mb-5 flex items-baseline gap-3 font-mono text-xs leading-none tracking-[0.16em] text-balance text-accent uppercase [overflow-wrap:anywhere] max-[380px]:tracking-[0.12em] sm:tracking-[0.2em] lg:mb-6">
            <span aria-hidden="true" className="h-px w-8 shrink-0 -translate-y-[0.3em] bg-accent" />
            {hero.eyebrow}
          </p>

          <h1
            className="rise text-[clamp(2.5rem,13.5vw,3.5rem)] leading-[0.95] font-extrabold tracking-tight break-words sm:text-[4.5rem] lg:text-[5rem] xl:text-[6rem]"
            style={enter(80)}
          >
            <span className="block text-fg">{hero.firstName}</span>
            <span className="name-rule relative inline-block max-w-full text-accent [overflow-wrap:anywhere]">{hero.lastName}</span>
          </h1>

          <p className="enter mt-6 text-xl font-medium text-fg/90 md:text-2xl" style={enter(160)}>
            {hero.headline}
          </p>

          <p className="enter mt-3 max-w-[34rem] text-base leading-relaxed text-pretty text-fg-muted md:text-lg" style={enter(240)}>
            {hero.tagline}
          </p>

          <div className="enter mt-8 flex flex-wrap items-center gap-3" style={enter(320)}>
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
            <div className="flex items-center gap-1 max-sm:mt-1 max-sm:-ml-3 max-sm:basis-full">
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

          <dl className="enter mt-10 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 lg:max-w-2xl" style={enter(400)}>
            {hero.proof.map((p) => (
              <div
                key={p.label}
                className="relative flex flex-col-reverse justify-end border-t border-line pt-4 before:absolute before:-top-px before:left-0 before:h-0.5 before:w-6 before:rounded-full before:bg-accent"
              >
                <dt className="mt-1 text-[13px] leading-snug text-balance text-fg-muted [overflow-wrap:anywhere]">{p.label}</dt>
                <dd className="text-3xl font-bold tracking-tight text-fg tabular-nums [overflow-wrap:anywhere]">{p.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Portrait: the background-removed figure, fading out at the bottom. */}
        <div className="enter-soft order-1 lg:order-2 lg:col-span-5" style={enter(120)}>
          <div className="relative -mx-4 h-[clamp(260px,36svh,320px)] sm:-mx-6 md:h-[420px] lg:mx-0 lg:h-[min(640px,calc(100svh-200px))]">
            <div
              aria-hidden="true"
              className="absolute top-[4%] right-[6%] aspect-square w-[50%] rounded-full border border-accent/20 bg-accent-soft md:w-[40%] lg:top-[3%] lg:right-auto lg:left-1/2 lg:w-[80%] lg:-translate-x-1/2"
            />
            <div aria-hidden="true" className="absolute inset-x-[15%] top-[35%] bottom-[5%] rounded-full bg-[var(--glow)] opacity-60 blur-[80px]" />
            <div className="portrait-fade absolute inset-y-0 right-0 w-[64%] sm:right-6 sm:w-[50%] md:w-[46%] lg:inset-x-0 lg:w-full">
              <Image
                src={hero.cutout}
                alt={hero.photoAlt}
                fill
                priority
                fetchPriority="high"
                quality={80}
                sizes="(min-width: 1280px) 440px, (min-width: 1024px) 38vw, (min-width: 768px) 46vw, 64vw"
                className="object-cover object-top lg:object-contain lg:object-bottom"
              />
            </div>

            <div className="absolute bottom-5 left-4 z-10 max-w-[46%] rounded-2xl border border-line-strong bg-bg/85 px-3.5 py-2.5 shadow-[0_16px_40px_-18px_rgba(0,0,0,0.6)] backdrop-blur-md sm:left-6 lg:bottom-[16%] lg:-left-10 lg:max-w-none lg:px-4 lg:py-3 lg:[animation:float_7s_ease-in-out_infinite] motion-reduce:lg:animate-none">
              <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-fg-subtle uppercase">
                <span aria-hidden="true" className="live-dot" />
                Now
              </p>
              <p className="mt-1 text-sm font-medium text-fg">{now.role}</p>
              <p className="text-xs text-fg-muted">
                {now.company}
                <span className="hidden lg:inline"> · {now.location}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
