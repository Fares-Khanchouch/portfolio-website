import Image from "next/image";
import { ArrowRight, FileText, Github, Linkedin } from "lucide-react";
import { hero, social } from "@/data";

const enter = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as React.CSSProperties;

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-24 pb-12 md:pt-40 md:pb-16">
      {/* Background: slow-drifting dotted grid and one soft glow. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-grid grid-drift absolute inset-0" />
        <div className="absolute -top-56 right-[5%] h-[460px] w-[460px] rounded-full bg-[var(--glow)] opacity-40 blur-[120px]" />
      </div>

      <div className="relative mx-auto grid max-w-5xl items-center gap-7 px-4 sm:px-6 md:grid-cols-[1fr_auto] md:gap-16">
        <div className="order-2 md:order-1">
          <p className="enter mb-5 flex items-baseline gap-3 font-mono text-xs uppercase tracking-[0.16em] text-balance text-accent sm:tracking-[0.2em]">
            <span aria-hidden="true" className="h-px w-8 shrink-0 -translate-y-[0.3em] bg-accent" />
            {hero.eyebrow}
          </p>

          <h1 className="enter text-[2.75rem] font-semibold leading-[1.02] tracking-tight text-fg sm:text-6xl lg:text-7xl" style={enter(80)}>
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
              href="#work"
              className="group inline-flex h-11 items-center gap-2 rounded-md bg-accent-solid px-5 text-sm font-medium text-white transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-accent-solid-hover"
            >
              See my work
              <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href={social.resume}
              className="inline-flex h-11 items-center gap-2 rounded-md border border-line-strong px-5 text-sm font-medium text-fg transition-[border-color,color,transform] duration-200 hover:-translate-y-px hover:border-accent hover:text-accent"
            >
              <FileText size={16} aria-hidden="true" />
              Résumé
            </a>
            <div className="flex items-center gap-1 max-sm:-ml-3 max-sm:basis-full">
              <a
                href={social.github}
                target="_blank"
                rel="me noopener noreferrer"
                aria-label="GitHub profile"
                className="flex h-11 w-11 items-center justify-center rounded-md text-fg-muted transition-colors duration-200 hover:bg-surface-hover hover:text-fg"
              >
                <Github size={19} aria-hidden="true" />
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="me noopener noreferrer"
                aria-label="LinkedIn profile"
                className="flex h-11 w-11 items-center justify-center rounded-md text-fg-muted transition-colors duration-200 hover:bg-surface-hover hover:text-fg"
              >
                <Linkedin size={19} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="enter order-1 md:order-2" style={enter(120)}>
          {/* Phones: a tight head-and-shoulders crop, left-aligned with the text,
              so the name and buttons stay above the fold. */}
          <div className="relative w-24 overflow-hidden rounded-2xl shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] md:hidden">
            <Image
              src={hero.avatar}
              alt={hero.photoAlt}
              width={512}
              height={512}
              priority
              sizes="96px"
              className="h-auto w-full"
            />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-[var(--photo-ring)]" />
          </div>
          {/* Tablet and up: 3:4 portrait, about as tall as the text block. */}
          <div className="relative hidden overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_rgba(0,0,0,0.55)] md:block md:w-64 lg:w-80">
            <Image
              src={hero.photo}
              alt={hero.photoAlt}
              width={960}
              height={1280}
              priority
              sizes="(min-width: 1024px) 320px, 256px"
              className="aspect-[3/4] h-auto w-full object-cover object-top"
            />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-[var(--photo-ring)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
