import Image from "next/image";
import { ArrowRight, FileText, Github, Linkedin } from "lucide-react";
import { hero, social } from "@/data";

const enter = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as React.CSSProperties;

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-12 md:pt-40 md:pb-20">
      {/* Background: slow-drifting dotted grid and one soft glow. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-grid grid-drift absolute inset-0" />
        <div className="absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-[var(--glow)] opacity-60 blur-[120px]" />
      </div>

      <div className="relative mx-auto grid max-w-5xl items-center gap-12 px-4 sm:px-6 md:grid-cols-[1fr_auto] md:gap-16">
        <div className="order-2 md:order-1">
          <p className="enter mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            {hero.eyebrow}
          </p>

          <h1 className="enter text-5xl font-semibold leading-[1.02] tracking-tight text-fg sm:text-6xl lg:text-7xl" style={enter(80)}>
            {hero.firstName}
            <br />
            {hero.lastName}
          </h1>

          <p className="enter mt-5 text-xl font-medium text-fg md:text-2xl" style={enter(160)}>
            {hero.headline}
          </p>

          <p className="enter mt-4 max-w-md text-base leading-relaxed text-fg-muted md:text-lg" style={enter(240)}>
            {hero.tagline}
          </p>

          <div className="enter mt-9 flex flex-wrap items-center gap-3" style={enter(320)}>
            <a
              href="#work"
              className="group inline-flex h-11 items-center gap-2 rounded-md bg-accent-solid px-5 text-sm font-medium text-white transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-[#35668a]"
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
            <div className="ml-1 flex items-center gap-1">
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="flex h-11 w-11 items-center justify-center rounded-md text-fg-muted transition-colors duration-200 hover:bg-surface-hover hover:text-fg"
              >
                <Github size={19} aria-hidden="true" />
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="flex h-11 w-11 items-center justify-center rounded-md text-fg-muted transition-colors duration-200 hover:bg-surface-hover hover:text-fg"
              >
                <Linkedin size={19} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="enter order-1 md:order-2" style={enter(120)}>
          <div className="relative mx-auto w-40 sm:w-48 md:w-72 lg:w-80">
            <div aria-hidden="true" className="absolute -inset-3 rounded-[28px] bg-[var(--glow)] opacity-50 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-line-strong">
              <Image
                src={hero.photo}
                alt={hero.photoAlt}
                width={960}
                height={1440}
                priority
                sizes="(min-width: 1024px) 320px, (min-width: 768px) 288px, 192px"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
