// Small, static drawings of how each part of the current role works.
// Theme tokens only; decorative (the card text says the same in words).

const mono = { fontFamily: "var(--font-mono)" } as const;

export function DeliveryRail() {
  const phases = ["Scope", "Build", "UAT", "SAT", "Go-live", "Support"];
  const gap = 56;
  return (
    <svg viewBox="0 0 320 78" aria-hidden="true" className="h-auto w-full">
      <line x1={20} y1={30} x2={20 + gap * 5} y2={30} stroke="var(--line-strong)" strokeWidth={2} />
      <line x1={20} y1={30} x2={20 + gap * 4} y2={30} stroke="var(--accent)" strokeWidth={2} />
      {phases.map((p, i) => {
        const x = 20 + i * gap;
        const live = i === 4;
        return (
          <g key={p}>
            <circle cx={x} cy={30} r={live ? 7 : 5} fill={i <= 4 ? "var(--accent)" : "var(--bg-raised)"} stroke="var(--accent)" strokeWidth={1.5} />
            {live && <circle cx={x} cy={30} r={12} fill="none" stroke="var(--accent)" strokeOpacity={0.35} />}
            <text x={x} y={58} textAnchor="middle" fontSize={10.5} fill={live ? "var(--fg)" : "var(--fg-muted)"} style={mono}>
              {p}
            </text>
          </g>
        );
      })}
      <text x={20 + gap * 4} y={12} textAnchor="middle" fontSize={10} fill="var(--accent)" style={mono}>
        ×2 releases
      </text>
    </svg>
  );
}

export function IntegrationFlow() {
  const box = (x: number, y: number, w: number, label: string, accent = false) => (
    <g>
      <rect x={x} y={y} width={w} height={28} rx={7} fill={accent ? "var(--accent-soft)" : "var(--bg-raised)"} stroke={accent ? "var(--accent)" : "var(--line-strong)"} strokeOpacity={accent ? 0.7 : 1} />
      <text x={x + w / 2} y={y + 18} textAnchor="middle" fontSize={10.5} fill="var(--fg)" style={mono}>
        {label}
      </text>
    </g>
  );
  const lock = (x: number, y: number) => (
    <g>
      <rect x={x} y={y + 5} width={10} height={8} rx={1.5} fill="none" stroke="var(--accent)" strokeWidth={1.2} />
      <path d={`M${x + 2.5} ${y + 5} v-2 a2.5 2.5 0 0 1 5 0 v2`} fill="none" stroke="var(--accent)" strokeWidth={1.2} />
    </g>
  );
  return (
    <svg viewBox="0 0 340 92" aria-hidden="true" className="h-auto w-full">
      <path d="M6 12 v20 a28 5 0 0 0 56 0 v-20" fill="var(--bg-raised)" stroke="var(--line-strong)" />
      <ellipse cx={34} cy={12} rx={28} ry={5} fill="var(--bg-raised)" stroke="var(--line-strong)" />
      <text x={34} y={31} textAnchor="middle" fontSize={9.5} fill="var(--fg-muted)" style={mono}>
        core
      </text>
      <text x={34} y={52} textAnchor="middle" fontSize={9.5} fill="var(--fg-subtle)" style={mono}>
        banking
      </text>
      <path fill="none" d="M62 24 H92" stroke="var(--fg-subtle)" strokeOpacity={0.6} strokeWidth={1.3} />
      {box(94, 10, 80, "C# REST", true)}
      <path fill="none" d="M174 24 H204" stroke="var(--fg-subtle)" strokeOpacity={0.6} strokeWidth={1.3} />
      {box(206, 10, 108, "credit workflow")}
      <path fill="none" d="M260 38 V58 H232" stroke="var(--fg-subtle)" strokeOpacity={0.6} strokeWidth={1.3} strokeDasharray="3 3" />
      {box(150, 58, 80, "SMS alerts")}
      {lock(240, 64)}
      <text x={256} y={72} fontSize={9.5} fill="var(--fg-muted)" style={mono}>
        OAuth · API key
      </text>
      <text x={256} y={85} fontSize={9.5} fill="var(--fg-muted)" style={mono}>
        IP whitelist
      </text>
    </svg>
  );
}

export function AgentTooling() {
  // 50 typed tools as a 10x5 grid; 11 skills as a row of larger chips.
  const tools = Array.from({ length: 50 }, (_, i) => i);
  const skills = Array.from({ length: 11 }, (_, i) => i);
  return (
    <svg viewBox="0 0 560 210" aria-hidden="true" className="h-auto w-full">
      {/* agent */}
      <circle cx={46} cy={86} r={30} fill="var(--accent-soft)" stroke="var(--accent)" strokeOpacity={0.7} />
      <text x={46} y={90} textAnchor="middle" fontSize={11} fill="var(--fg)" style={mono}>
        agent
      </text>
      {/* agent -> MCP servers */}
      <path fill="none" d="M76 86 H120" stroke="var(--fg-subtle)" strokeOpacity={0.6} strokeWidth={1.4} />
      {/* MCP servers with 50 tools */}
      <rect x={122} y={28} width={196} height={116} rx={10} fill="var(--bg-raised)" stroke="var(--line-strong)" />
      <text x={136} y={48} fontSize={11.5} fontWeight={600} fill="var(--fg)">
        MCP servers
      </text>
      <text x={304} y={48} textAnchor="end" fontSize={10} fill="var(--accent)" style={mono}>
        50 typed tools
      </text>
      {tools.map((t) => (
        <rect
          key={t}
          x={138 + (t % 10) * 17.2}
          y={62 + Math.floor(t / 10) * 15}
          width={10}
          height={10}
          rx={2.5}
          fill="var(--accent)"
          opacity={0.35 + ((t * 37) % 10) / 20}
        />
      ))}
      {/* MCP -> knowledge base + dependency graph */}
      <path d="M318 62 C350 62 350 46 380 46" fill="none" stroke="var(--fg-subtle)" strokeOpacity={0.6} strokeWidth={1.4} />
      <path d="M318 110 C350 110 350 126 380 126" fill="none" stroke="var(--fg-subtle)" strokeOpacity={0.6} strokeWidth={1.4} />
      <path d="M382 30 v28 a44 7 0 0 0 88 0 v-28" fill="var(--bg-raised)" stroke="var(--line-strong)" />
      <ellipse cx={426} cy={30} rx={44} ry={7} fill="var(--bg-raised)" stroke="var(--line-strong)" />
      <text x={426} y={54} textAnchor="middle" fontSize={10.5} fill="var(--fg)" style={mono}>
        knowledge base
      </text>
      {/* dependency graph */}
      <rect x={382} y={100} width={170} height={52} rx={10} fill="var(--bg-raised)" stroke="var(--line-strong)" />
      {[
        [400, 126],
        [432, 112],
        [432, 140],
        [466, 126],
        [498, 114],
        [530, 130],
      ].map(([x, y], i, a) => (
        <g key={i}>
          {i > 0 && <line x1={a[i - 1][0]} y1={a[i - 1][1]} x2={x} y2={y} stroke="var(--accent)" strokeOpacity={0.5} />}
          <circle cx={x} cy={y} r={4} fill="var(--accent)" />
        </g>
      ))}
      <text x={467} y={168} textAnchor="middle" fontSize={10} fill="var(--fg-subtle)" style={mono}>
        dependency graph · provenance
      </text>
      {/* skills */}
      <text x={122} y={172} fontSize={10} fill="var(--accent)" style={mono}>
        11 Claude skills
      </text>
      {skills.map((s) => (
        <rect key={s} x={122 + s * 18} y={182} width={13} height={13} rx={3.5} fill="var(--accent-soft)" stroke="var(--accent)" strokeOpacity={0.7} />
      ))}
      {/* cited answer back to the agent */}
      <path d="M46 116 V190 H116" fill="none" stroke="var(--accent)" strokeOpacity={0.8} strokeWidth={1.4} strokeDasharray="4 4" />
      <text x={52} y={206} fontSize={9.5} fill="var(--fg-subtle)" style={mono}>
        cited answers
      </text>
    </svg>
  );
}
