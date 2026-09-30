// Small, static drawings of how each part of the current role works.
// Theme tokens only; decorative (the card text says the same in words).
// Labels are 12-13 units so they stay readable at the cards' real width.

const mono = { fontFamily: "var(--font-mono)" } as const;
const edge = { fill: "none", stroke: "var(--fg-subtle)", strokeOpacity: 0.6, strokeWidth: 1.4 } as const;

export function DeliveryRail() {
  const phases = ["Scope", "Build", "UAT", "SAT", "Go-live", "Support"];
  const x0 = 30;
  const gap = 62;
  const live = 4;
  return (
    <svg viewBox="-8 0 382 84" aria-hidden="true" className="mx-auto h-auto w-full max-w-[420px]">
      <line x1={x0} y1={34} x2={x0 + gap * 5} y2={34} stroke="var(--line-strong)" strokeWidth={2} />
      <line x1={x0} y1={34} x2={x0 + gap * live} y2={34} stroke="var(--accent)" strokeWidth={2} />
      {phases.map((p, i) => {
        const x = x0 + i * gap;
        const on = i === live;
        return (
          <g key={p}>
            {on && <circle cx={x} cy={34} r={13} fill="var(--accent-soft)" stroke="var(--accent)" strokeOpacity={0.4} />}
            <circle cx={x} cy={34} r={on ? 7 : 5} fill={i <= live ? "var(--accent)" : "var(--bg-raised)"} stroke="var(--accent)" strokeWidth={1.5} />
            <text x={x} y={66} textAnchor="middle" fontSize={12} fill={on ? "var(--fg)" : "var(--fg-muted)"} style={mono}>
              {p}
            </text>
          </g>
        );
      })}
      <text x={x0 + gap * live} y={12} textAnchor="middle" fontSize={12} fill="var(--accent)" style={mono}>
        ×2 releases
      </text>
    </svg>
  );
}

export function IntegrationFlow() {
  const box = (x: number, y: number, w: number, label: string, accent = false) => (
    <g>
      <rect x={x} y={y} width={w} height={30} rx={8} fill={accent ? "var(--accent-soft)" : "var(--bg-raised)"} stroke={accent ? "var(--accent)" : "var(--line-strong)"} strokeOpacity={accent ? 0.7 : 1} />
      <text x={x + w / 2} y={y + 19.5} textAnchor="middle" fontSize={12} fill="var(--fg)" style={mono}>
        {label}
      </text>
    </g>
  );
  return (
    <svg viewBox="0 0 356 112" aria-hidden="true" className="mx-auto h-auto w-full max-w-[420px]">
      {/* core banking system */}
      <path d="M4 12 v26 a30 6 0 0 0 60 0 v-26" fill="var(--bg-raised)" stroke="var(--line-strong)" />
      <ellipse cx={34} cy={12} rx={30} ry={6} fill="var(--bg-raised)" stroke="var(--line-strong)" />
      <text x={34} y={33} textAnchor="middle" fontSize={11} fill="var(--fg-muted)" style={mono}>
        core
      </text>
      <text x={34} y={62} textAnchor="middle" fontSize={11} fill="var(--fg-subtle)" style={mono}>
        banking
      </text>
      <path {...edge} d="M64 26 H92" />
      {box(94, 11, 84, "C# REST", true)}
      <path {...edge} d="M178 26 H206" />
      {box(208, 11, 144, "credit workflow")}
      {/* alerts, secured */}
      <path {...edge} d="M136 41 V76" />
      {box(94, 76, 84, "SMS alerts")}
      <path {...edge} d="M178 91 H192" />
      <g>
        <rect x={194} y={72} width={158} height={38} rx={10} fill="var(--accent-soft)" stroke="var(--accent)" strokeOpacity={0.5} />
        <g transform="translate(205 84)">
          <rect x={0} y={5} width={11} height={9} rx={2} fill="none" stroke="var(--accent)" strokeWidth={1.3} />
          <path d="M2.7 5 v-2.2 a2.8 2.8 0 0 1 5.6 0 v2.2" fill="none" stroke="var(--accent)" strokeWidth={1.3} />
        </g>
        <text x={224} y={88} fontSize={11} fill="var(--fg)" style={mono}>
          OAuth · API keys
        </text>
        <text x={224} y={102} fontSize={11} fill="var(--fg-muted)" style={mono}>
          IP whitelist
        </text>
      </g>
    </svg>
  );
}
