// Before -> after for each measure, on its own scale. Text carries the
// numbers; the tracks are decoration.
type Row = { label: string; before: number; after: number; max: number; unit: string; better: "up" | "down" };

const rows: Row[] = [
  { label: "Posting hard requirements addressed", before: 54, after: 100, max: 100, unit: "%", better: "up" },
  { label: "Résumé score, blind LLM reviewer panel", before: 5.1, after: 6.3, max: 10, unit: "/10", better: "up" },
  { label: "Bullets judged overclaimed", before: 6, after: 0, max: 20, unit: "%", better: "down" },
];

export default function ResultsChart() {
  return (
    <figure className="my-8 rounded-xl border border-line bg-surface p-5 shadow-card">
      <figcaption className="mb-5 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
        <span>Before → after, same benchmark</span>
        <span className="flex items-center gap-4 normal-case tracking-normal">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full border border-fg-subtle" /> before
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-accent" /> after
          </span>
        </span>
      </figcaption>
      <ul className="space-y-5">
        {rows.map((r) => {
          const a = (r.before / r.max) * 100;
          const b = (r.after / r.max) * 100;
          const lo = Math.min(a, b);
          const hi = Math.max(a, b);
          return (
            <li key={r.label}>
              <div className="mb-2 flex flex-col gap-1 text-sm sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <span className="text-fg-muted">{r.label}</span>
                <span className="font-mono tabular-nums">
                  <span className="text-fg-subtle">
                    {r.before}
                    {r.unit}
                  </span>
                  <span className="text-fg-subtle"> → </span>
                  <span className="font-semibold text-accent">
                    {r.after}
                    {r.unit}
                  </span>
                </span>
              </div>
              <div aria-hidden="true" className="relative mx-1.5 h-2 rounded-full bg-bg/60">
                <div className="absolute inset-y-0 rounded-full bg-accent/35" style={{ left: `${lo}%`, width: `${hi - lo}%` }} />
                <span className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-fg-subtle bg-bg" style={{ left: `${a}%` }} />
                <span className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent ring-4 ring-accent-soft" style={{ left: `${b}%` }} />
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-5 text-xs text-fg-subtle">
        Panel scores: 11–12 postings per version. Requirements coverage: 24 runs per round.
      </p>
    </figure>
  );
}
