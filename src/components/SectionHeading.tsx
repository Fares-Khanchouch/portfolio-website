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
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
        <span aria-hidden="true">{index} / </span>
        {label}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-fg md:text-4xl">{title}</h2>
    </Reveal>
  );
}
