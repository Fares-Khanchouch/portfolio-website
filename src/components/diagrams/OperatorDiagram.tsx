"use client";

import { Box, Caption, Diagram, Edge, Packet, useDiagramId, useLive } from "./kit";

// Architecture of the n8n Kubernetes operator (facts: vault proj.n8nop.*).

function CustomResource({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const rows = ["replicas", "n8n version", "PostgreSQL", "service / TLS ingress"];
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill="var(--bg-raised)" />
      <rect x={x + 0.5} y={y + 0.5} width={w - 1} height={h - 1} rx={9.5} fill="none" stroke="var(--line-strong)" />
      <text x={x + 16} y={y + 26} fontSize={13.5} fontWeight={600} fill="var(--fg)">
        Custom resource
      </text>
      <Caption x={x + 16} y={y + 44}>one YAML file</Caption>
      {rows.map((r, i) => (
        <g key={r}>
          <circle cx={x + 20} cy={y + 68 + i * 21} r={2.5} fill="var(--accent)" />
          <text x={x + 30} y={y + 72 + i * 21} fontSize={11.5} fill="var(--fg-muted)" style={{ fontFamily: "var(--font-mono)" }}>
            {r}
          </text>
        </g>
      ))}
    </g>
  );
}

function Operator({ x, y, w, h, cx, cy }: { x: number; y: number; w: number; h: number; cx: number; cy: number }) {
  const live = useLive();
  const id = useDiagramId();
  const r = 46;
  const pt = (deg: number, rad = r) => [cx + rad * Math.cos((deg * Math.PI) / 180), cy + rad * Math.sin((deg * Math.PI) / 180)];
  const stages = [
    { label: "observe", deg: -90, anchor: "middle" },
    { label: "compare", deg: 30, anchor: "start" },
    { label: "act", deg: 150, anchor: "end" },
  ] as const;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill="var(--bg-raised)" />
      <rect x={x} y={y} width={w} height={h} rx={10} fill="var(--accent-soft)" />
      <rect x={x + 0.5} y={y + 0.5} width={w - 1} height={h - 1} rx={9.5} fill="none" stroke="var(--accent)" strokeOpacity={0.7} />
      <text x={x + w / 2} y={y + 26} textAnchor="middle" fontSize={13.5} fontWeight={600} fill="var(--fg)">
        Operator (Go)
      </text>
      {/* observe -> compare -> act -> observe, as three arrowed arcs */}
      {stages.map((st, i) => {
        const next = stages[(i + 1) % 3];
        const [ax, ay] = pt(st.deg + 16);
        const [bx, by] = pt(next.deg - 16 + (next.deg < st.deg ? 360 : 0));
        return (
          <path
            key={st.label}
            d={`M${ax} ${ay} A${r} ${r} 0 0 1 ${bx} ${by}`}
            fill="none"
            stroke="var(--accent)"
            strokeOpacity={0.75}
            strokeWidth={1.6}
            markerEnd={`url(#${id}-arrow-accent)`}
          />
        );
      })}
      {stages.map((st) => {
        const [sx, sy] = pt(st.deg);
        const [lx, ly] = pt(st.deg, r + 13);
        return (
          <g key={st.label}>
            <circle cx={sx} cy={sy} r={4} fill="var(--bg-raised)" stroke="var(--accent)" strokeWidth={1.6} />
            <Caption x={lx} y={ly + (st.deg === -90 ? -2 : 8)} anchor={st.anchor}>
              {st.label}
            </Caption>
          </g>
        );
      })}
      {live && (
        <circle r={3.5} fill="var(--accent)">
          <animateMotion
            dur="3s"
            repeatCount={2}
            path={`M${cx} ${cy - r} A${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r}`}
          />
        </circle>
      )}
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize={11} fill="var(--fg)" style={{ fontFamily: "var(--font-mono)" }}>
        reconcile
      </text>
      <text x={x + w / 2} y={y + h - 14} textAnchor="middle" fontSize={10.5} fill="var(--fg-subtle)" style={{ fontFamily: "var(--font-mono)" }}>
        deleted resources are recreated
      </text>
    </g>
  );
}

const resources: [string, string][] = [
  ["n8n", "Deployment · replicas"],
  ["PostgreSQL", "database"],
  ["Secrets", "credentials"],
  ["PVC", "persistent storage"],
  ["Service", "in-cluster access"],
  ["Ingress", "optional TLS"],
];

export default function OperatorDiagram() {
  return (
    <Diagram
      title="Architecture: n8n Kubernetes operator"
      description="One custom resource (replicas, n8n version, PostgreSQL, service or TLS ingress) is applied to the cluster. The Go operator's reconcile loop observes, compares and acts: it creates and updates n8n, PostgreSQL, secrets, persistent storage, a service and an optional TLS ingress in the instance's namespace, recreates anything deleted, and reports status (Ready, N8nReady, PostgresReady, access URLs) back on the custom resource."
      wide={{
        viewBox: "-8 0 976 344",
        children: (
          <>
            <Edge d="M214 150 H286" />
            <Edge d="M524 150 H586" />
            <Edge d="M772 286 V318 H107 V240" dashed />
            <Packet d="M214 150 H590" dur="2.6s" />
            <Packet d="M772 286 V318 H107 V240" dur="3.2s" begin="1.2s" />

            <CustomResource x={0} y={62} w={214} h={176} />
            <Caption x={250} y={140} anchor="middle">apply</Caption>
            <Operator x={288} y={48} w={236} h={204} cx={406} cy={158} />
            <Caption x={555} y={140} anchor="middle">manages</Caption>

            <rect x={588.5} y={14.5} width={367} height={271} rx={16} fill="none" stroke="var(--line-strong)" strokeDasharray="4 4" />
            <Caption x={606} y={38}>isolated per instance</Caption>
            {resources.map(([t, l], i) => (
              <Box key={t} x={606 + (i % 2) * 174} y={56 + Math.floor(i / 2) * 66} w={164} h={54} title={t} lines={[l]} />
            ))}
            <Caption x={440} y={336} anchor="middle" accent>status: Ready · N8nReady · PostgresReady · access URLs</Caption>
          </>
        ),
      }}
      tall={{
        viewBox: "-4 0 368 730",
        children: (
          <>
            <Edge d="M184 158 V198" />
            <Edge d="M184 396 V436" />
            <Edge d="M184 670 V696 H8 V83 H26" dashed />
            <Packet d="M184 158 V440" dur="2.6s" />
            <Packet d="M184 670 V696 H8 V83 H26" dur="4s" begin="1s" />

            <CustomResource x={28} y={8} w={312} h={150} />
            <Caption x={194} y={182}>apply</Caption>
            <Operator x={28} y={200} w={312} h={196} cx={184} cy={304} />
            <Caption x={194} y={420}>manages</Caption>

            <rect x={14.5} y={438.5} width={341} height={231} rx={16} fill="none" stroke="var(--line-strong)" strokeDasharray="4 4" />
            <Caption x={30} y={460}>isolated per instance</Caption>
            {resources.map(([t, l], i) => (
              <Box key={t} x={26 + (i % 2) * 166} y={474 + Math.floor(i / 2) * 64} w={156} h={54} title={t} lines={[l]} />
            ))}
            <Caption x={184} y={722} anchor="middle" accent>status: Ready · N8nReady · PostgresReady</Caption>
          </>
        ),
      }}
    />
  );
}
