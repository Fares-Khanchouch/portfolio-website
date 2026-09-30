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

function AgentToolingWide() {
  // 50 typed tools as a 10x5 grid; 11 skills as a row of chips.
  const tools = Array.from({ length: 50 }, (_, i) => i);
  const skills = Array.from({ length: 11 }, (_, i) => i);
  const hot = new Set([3, 16, 22, 38, 47]);
  const nodes = [
    [392, 146],
    [422, 134],
    [422, 156],
    [456, 146],
    [490, 136],
    [522, 150],
  ];
  return (
    <svg viewBox="0 0 560 234" aria-hidden="true" className="hidden h-auto w-full sm:block">
      {/* agent */}
      <circle cx={44} cy={88} r={34} fill="var(--accent-soft)" stroke="var(--accent)" strokeOpacity={0.7} />
      <text x={44} y={92.5} textAnchor="middle" fontSize={13} fontWeight={600} fill="var(--fg)" style={mono}>
        agent
      </text>
      <path {...edge} d="M78 88 H116" />
      {/* MCP servers with 50 tools */}
      <rect x={118} y={22} width={212} height={132} rx={12} fill="var(--bg-raised)" stroke="var(--line-strong)" />
      <text x={134} y={46} fontSize={13} fontWeight={600} fill="var(--fg)">
        MCP servers
      </text>
      {tools.map((t) => (
        <rect
          key={t}
          x={134 + (t % 10) * 18.2}
          y={60 + Math.floor(t / 10) * 17}
          width={12}
          height={12}
          rx={3}
          fill="var(--accent)"
          opacity={hot.has(t) ? 1 : 0.28 + ((t * 37) % 10) / 40}
        />
      ))}
      <text x={118} y={176} fontSize={12} fill="var(--accent)" style={mono}>
        typed tools
      </text>
      {/* skills */}
      {skills.map((s) => (
        <rect key={s} x={118 + s * 19.4} y={190} width={14} height={14} rx={4} fill="var(--accent-soft)" stroke="var(--accent)" strokeOpacity={0.7} />
      ))}
      <text x={336} y={201.5} fontSize={12} fill="var(--accent)" style={mono}>
        Claude skills
      </text>
      {/* MCP -> knowledge base + dependency graph */}
      <path {...edge} d="M330 58 C352 58 352 44 372 44" />
      <path {...edge} d="M330 118 C352 118 352 132 372 132" />
      <path d="M374 22 v34 a88 9 0 0 0 176 0 v-34" fill="var(--bg-raised)" stroke="var(--line-strong)" />
      <ellipse cx={462} cy={22} rx={88} ry={9} fill="var(--bg-raised)" stroke="var(--line-strong)" />
      <text x={462} y={52} textAnchor="middle" fontSize={12} fill="var(--fg)" style={mono}>
        knowledge base
      </text>
      <rect x={374} y={96} width={176} height={96} rx={12} fill="var(--bg-raised)" stroke="var(--line-strong)" />
      <text x={388} y={118} fontSize={12} fill="var(--fg)" style={mono}>
        dependency graph
      </text>
      {nodes.map(([x, y], i, a) => (
        <g key={i}>
          {i > 0 && <line x1={a[i - 1][0]} y1={a[i - 1][1]} x2={x} y2={y} stroke="var(--accent)" strokeOpacity={0.5} />}
          <circle cx={x} cy={y} r={4.5} fill="var(--accent)" />
        </g>
      ))}
      <text x={388} y={178} fontSize={11} fill="var(--fg-subtle)" style={mono}>
        provenance on every edge
      </text>
      {/* cited answers back to the agent */}
      <path d="M44 122 V206 H104" fill="none" stroke="var(--accent)" strokeOpacity={0.8} strokeWidth={1.4} strokeDasharray="4 4" />
      <text x={30} y={226} fontSize={12} fill="var(--fg-subtle)" style={mono}>
        cited answers
      </text>
    </svg>
  );
}

// Phones: the same picture stacked top to bottom, so labels stay >= 11px.
function AgentToolingTall() {
  const tools = Array.from({ length: 50 }, (_, i) => i);
  const skills = Array.from({ length: 11 }, (_, i) => i);
  const hot = new Set([3, 16, 22, 38, 47]);
  const nodes = [
    [170, 280],
    [194, 270],
    [194, 290],
    [222, 280],
    [246, 272],
    [268, 286],
  ];
  return (
    <svg viewBox="0 0 300 364" aria-hidden="true" className="mx-auto h-auto w-full max-w-[360px] sm:hidden">
      <circle cx={150} cy={34} r={30} fill="var(--accent-soft)" stroke="var(--accent)" strokeOpacity={0.7} />
      <text x={150} y={38.5} textAnchor="middle" fontSize={13} fontWeight={600} fill="var(--fg)" style={mono}>
        agent
      </text>
      <path {...edge} d="M150 64 V92" />
      <rect x={20} y={94} width={260} height={118} rx={12} fill="var(--bg-raised)" stroke="var(--line-strong)" />
      <text x={36} y={118} fontSize={13} fontWeight={600} fill="var(--fg)">
        MCP servers
      </text>
      <text x={264} y={118} textAnchor="end" fontSize={12} fill="var(--accent)" style={mono}>
        typed tools
      </text>
      {tools.map((t) => (
        <rect
          key={t}
          x={36 + (t % 10) * 23}
          y={132 + Math.floor(t / 10) * 15}
          width={12}
          height={11}
          rx={3}
          fill="var(--accent)"
          opacity={hot.has(t) ? 1 : 0.28 + ((t * 37) % 10) / 40}
        />
      ))}
      <path {...edge} d="M82 212 V236" />
      <path {...edge} d="M218 212 V236" />
      <path d="M20 244 v40 a62 7 0 0 0 124 0 v-40" fill="var(--bg-raised)" stroke="var(--line-strong)" />
      <ellipse cx={82} cy={244} rx={62} ry={7} fill="var(--bg-raised)" stroke="var(--line-strong)" />
      <text x={82} y={276} textAnchor="middle" fontSize={11.5} fill="var(--fg)" style={mono}>
        knowledge base
      </text>
      <rect x={156} y={238} width={124} height={80} rx={10} fill="var(--bg-raised)" stroke="var(--line-strong)" />
      <text x={166} y={256} fontSize={11} fill="var(--fg)" style={mono}>
        dependency graph
      </text>
      {nodes.map(([x, y], i, a) => (
        <g key={i}>
          {i > 0 && <line x1={a[i - 1][0]} y1={a[i - 1][1]} x2={x} y2={y} stroke="var(--accent)" strokeOpacity={0.5} />}
          <circle cx={x} cy={y} r={4} fill="var(--accent)" />
        </g>
      ))}
      <text x={166} y={306} fontSize={11} fill="var(--fg-subtle)" style={mono}>
        with provenance
      </text>
      <text x={20} y={338} fontSize={12} fill="var(--accent)" style={mono}>
        Claude skills
      </text>
      {skills.map((s) => (
        <rect key={s} x={20 + s * 19.6} y={346} width={14} height={14} rx={4} fill="var(--accent-soft)" stroke="var(--accent)" strokeOpacity={0.7} />
      ))}
    </svg>
  );
}

export function AgentTooling() {
  return (
    <>
      <AgentToolingWide />
      <AgentToolingTall />
    </>
  );
}
