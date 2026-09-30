import Reveal from "./Reveal";

export default function SectionHeading({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title: string;
}) {
  return (
    <Reveal className="mb-8 md:mb-10">
      <p className="mb-3 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">
        <span>
          <span aria-hidden="true">{index} / </span>
          {label}
        </span>
        <span aria-hidden="true" className="h-px max-w-40 flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-fg md:text-4xl">{title}</h2>
    </Reveal>
  );
}
