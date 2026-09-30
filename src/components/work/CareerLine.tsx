import { timeline } from "@/data";

// Work and study on one time axis, so the internships read as part of the
// degree and the rest as one continuous line.
const START = { y: 2021, m: 9 };
const NOW = { y: 2026, m: 9 };
const idx = (y: number, m: number) => (y - START.y) * 12 + (m - START.m);
const TOTAL = idx(NOW.y, NOW.m) + 1;
const pct = (v: number) => `${(v / TOTAL) * 100}%`;

export default function CareerLine() {
  const years = [2022, 2023, 2024, 2025, 2026];
  const rows: Array<"work" | "study"> = ["work", "study"];
  return (
    <figure className="rounded-xl border border-line bg-surface p-5 shadow-card md:p-6">
      <figcaption className="sr-only">
        Timeline: engineering degree at ISTY from 2021 to 2024; internships at WAY2CLOUD in 2022 and 2023 and at Nuage Up in 2024;
        freelance automation work from September 2024 to November 2025; Integration Consultant at Axe Finance since December 2025.
      </figcaption>
      <div aria-hidden="true" className="relative">
        {rows.map((row) => (
          <div key={row} className={"relative mb-3 flex items-center gap-[12px] " + (row === "work" ? "sm:mt-5" : "")}>
            <span className="w-[48px] shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">{row}</span>
            <div className="relative h-7 min-w-0 flex-1 rounded-md bg-bg/50">
              {timeline
                .filter((s) => s.kind === row)
                .map((s) => {
                  const a = idx(...s.start);
                  const b = s.end ? idx(...s.end) + 1 : TOTAL;
                  const current = s.end === null;
                  return (
                    <div
                      key={s.detail}
                      title={`${s.detail} · ${s.label}`}
                      className={
                        current
                          ? "absolute inset-y-0 rounded-md border border-accent bg-accent-solid"
                          : row === "study"
                            ? "absolute inset-y-0 rounded-md border border-line-strong bg-surface-hover"
                            : "absolute inset-y-0 rounded-md border border-accent/60 bg-accent-soft"
                      }
                      style={{ left: pct(a), width: `max(6px, ${pct(b - a)})` }}
                    >
                      {b - a < 10 && (
                        <span className="absolute -top-5 left-1/2 hidden -translate-x-1/2 font-mono text-[10px] whitespace-nowrap text-fg-subtle sm:block">
                          {s.label}
                        </span>
                      )}
                      {b - a >= 10 && (
                        <span
                          className={
                            "absolute inset-0 flex items-center truncate px-2 text-[11px] font-medium " +
                            (current ? "text-white" : "text-fg")
                          }
                        >
                          {s.label}
                        </span>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
        <div className="relative ml-[60px] h-4">
          {years.map((y) => (
            <span
              key={y}
              className="absolute -translate-x-1/2 font-mono text-[11px] text-fg-subtle"
              style={{ left: pct(idx(y, 1)) }}
            >
              {y}
            </span>
          ))}
        </div>
      </div>
    </figure>
  );
}
