import { timeline } from "@/data";

// Work and study on one time axis, so the internships read as part of the
// degree and the rest as one continuous line.
const START = { y: 2021, m: 9 };
const NOW = { y: 2026, m: 9 };
const idx = (y: number, m: number) => (y - START.y) * 12 + (m - START.m);
const TOTAL = idx(NOW.y, NOW.m) + 1;
const pct = (v: number) => `${(v / TOTAL) * 100}%`;
const range = (s: (typeof timeline)[number]) =>
  `${s.start[0]}${s.end ? (s.end[0] !== s.start[0] ? `–${s.end[0]}` : "") : "–now"}`;

export default function CareerLine() {
  const years = [2022, 2023, 2024, 2025, 2026];
  const rows: Array<"work" | "study"> = ["work", "study"];
  const studyEnd = pct(idx(2024, 8) + 1);
  return (
    <figure className="rounded-xl border border-line bg-surface p-5 shadow-card md:p-6">
      <figcaption className="sr-only">
        Timeline: engineering degree at ISTY from 2021 to 2024; internships at
        WAY2CLOUD in 2022 and 2023 and at Nuage Up in 2024; freelance automation
        work from September 2024 to November 2025; Integration Consultant at Axe
        Finance since December 2025.
      </figcaption>
      <div aria-hidden="true">
        <div className="relative pt-6">
          {/* year gridlines and the "now" marker, behind both rows */}
          <div className="pointer-events-none absolute inset-y-0 right-0 left-[60px]">
            {years.map((y) => (
              <span
                key={y}
                className="absolute top-5 bottom-5 w-px bg-line"
                style={{ left: pct(idx(y, 1)) }}
              />
            ))}
            <span className="absolute top-0 -right-px bottom-5 w-px bg-accent/70" />
            <span className="absolute -top-0.5 right-0 flex translate-x-1/2 items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] text-accent uppercase">
              <span className="live-dot" />
            </span>
          </div>

          {rows.map((row) => (
            <div
              key={row}
              className="relative mb-3 flex items-center gap-[12px]"
            >
              <span className="w-[48px] shrink-0 font-mono text-[11px] tracking-[0.14em] text-fg-subtle uppercase">
                {row}
              </span>
              <div
                className="relative h-7 min-w-0 flex-1 rounded-md border border-line bg-bg/60"
                style={
                  row === "study"
                    ? {
                        maskImage: `linear-gradient(to right, #000 ${studyEnd}, transparent calc(${studyEnd} + 18%))`,
                      }
                    : undefined
                }
              >
                {timeline
                  .filter((s) => s.kind === row)
                  .map((s) => {
                    const a = idx(...s.start);
                    const b = s.end ? idx(...s.end) + 1 : TOTAL;
                    const current = s.end === null;
                    const wide = b - a >= 10;
                    return (
                      <div
                        key={s.detail}
                        title={`${s.detail} · ${s.label}`}
                        className={
                          "absolute -inset-y-px rounded-md border " +
                          (current
                            ? "border-accent bg-accent-solid shadow-accent"
                            : row === "study"
                              ? "border-line-strong bg-surface-hover"
                              : "border-accent/70 bg-accent/30")
                        }
                        style={{
                          left: pct(a),
                          width: `max(6px, ${pct(b - a)})`,
                        }}
                      >
                        {!wide && (
                          <span className="absolute -top-5 left-1/2 hidden -translate-x-1/2 font-mono text-[10px] whitespace-nowrap text-fg-subtle sm:block">
                            {s.label}
                          </span>
                        )}
                        {wide && (
                          <span
                            className={
                              "absolute inset-0 hidden truncate px-2 text-[11px] leading-[26px] font-medium sm:block " +
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

        {/* phones: the bars are too narrow for names, so list them */}
        <ul className="mt-5 grid grid-cols-[minmax(0,1fr)] gap-y-2 border-t border-line pt-4 font-mono text-[11px] text-fg-muted sm:hidden">
          {[...timeline].reverse().map((s) => (
            <li key={s.detail} className="flex items-center gap-2.5">
              <span
                className={
                  "h-2.5 w-2.5 shrink-0 rounded-sm border " +
                  (s.end === null
                    ? "border-accent bg-accent-solid"
                    : s.kind === "study"
                      ? "border-line-strong bg-surface-hover"
                      : "border-accent/70 bg-accent/30")
                }
              />
              <span className="min-w-0 truncate">
                <span className="text-fg">{s.label}</span> · {s.detail}
              </span>
              <span className="ml-auto shrink-0 text-fg-subtle">
                {range(s)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
