"use client";

// Small SVG toolkit for the project architecture diagrams. Every colour
// comes from the site's CSS tokens, so the diagrams follow dark/light
// themes. Motion (travelling packets, the reconcile loop) starts when the
// diagram first scrolls into view, plays twice and stops; it never runs
// under prefers-reduced-motion.

import { createContext, useContext, useEffect, useId, useRef, useState, type ReactNode } from "react";

const LiveContext = createContext(false);
const IdContext = createContext("dg");

export const useLive = () => useContext(LiveContext);
export const useDiagramId = () => useContext(IdContext);

/** Wraps a diagram: wide layout from md up, tall layout on phones. */
export function Diagram({
  title,
  description,
  wide,
  tall,
  layout = "auto",
}: {
  title: string;
  description: string;
  /** "tall" forces the portrait layout (e.g. in a narrow article column). */
  layout?: "auto" | "tall";
  wide: { viewBox: string; children: ReactNode };
  tall: { viewBox: string; children: ReactNode };
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [live, setLive] = useState(false);
  // useId() can contain characters (":", "«", "»") that break url(#id).
  const id = "dg" + useId().replace(/[^a-zA-Z0-9]/g, "");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setLive(true);
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const svg = (layout: "wide" | "tall", viewBox: string, children: ReactNode, className: string) => (
    <svg
      viewBox={viewBox}
      role="img"
      aria-labelledby={`${id}-${layout}-t ${id}-${layout}-d`}
      className={className}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <title id={`${id}-${layout}-t`}>{title}</title>
      <desc id={`${id}-${layout}-d`}>{description}</desc>
      <defs>
        <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 1 L9 5 L0 9 z" fill="var(--fg-subtle)" />
        </marker>
        <marker id={`${id}-arrow-accent`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 1 L9 5 L0 9 z" fill="var(--accent)" />
        </marker>
      </defs>
      {children}
    </svg>
  );

  return (
    <LiveContext.Provider value={live}>
      <IdContext.Provider value={id}>
        <div ref={ref} className={live ? "dg is-live" : "dg"}>
          {layout === "auto" && svg("wide", wide.viewBox, wide.children, "hidden h-auto w-full md:block")}
          {svg("tall", tall.viewBox, tall.children, "mx-auto block h-auto w-full max-w-[380px] " + (layout === "auto" ? "md:hidden" : ""))}
        </div>
      </IdContext.Provider>
    </LiveContext.Provider>
  );
}

type BoxProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  lines?: string[];
  accent?: boolean;
  align?: "middle" | "start";
};

/** A component box: title plus up to a few monospace detail lines. */
export function Box({ x, y, w, h, title, lines = [], accent, align = "middle" }: BoxProps) {
  const tx = align === "middle" ? x + w / 2 : x + 14;
  const top = y + h / 2 - ((lines.length ? lines.length * 16 + 4 : 0) + 14) / 2 + 12;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill="var(--bg-raised)" />
      {accent && <rect x={x} y={y} width={w} height={h} rx={10} fill="var(--accent-soft)" />}
      <rect
        x={x + 0.5}
        y={y + 0.5}
        width={w - 1}
        height={h - 1}
        rx={9.5}
        fill="none"
        stroke={accent ? "var(--accent)" : "var(--line-strong)"}
        strokeOpacity={accent ? 0.7 : 1}
      />
      <text x={tx} y={top} textAnchor={align} fontSize={13.5} fontWeight={600} fill="var(--fg)">
        {title}
      </text>
      {lines.map((l, i) => (
        <text
          key={l}
          x={tx}
          y={top + 20 + i * 16}
          textAnchor={align}
          fontSize={11}
          fill="var(--fg-muted)"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {l}
        </text>
      ))}
    </g>
  );
}

/** A datastore, drawn as a cylinder. */
export function Store({ x, y, w, h, title, lines = [] }: Omit<BoxProps, "accent" | "align">) {
  const ry = 8;
  const top = y + ry + (h - ry) / 2 - ((lines.length ? lines.length * 16 + 4 : 0) + 14) / 2 + 12;
  return (
    <g>
      <path
        d={`M${x} ${y + ry} v${h - 2 * ry} a${w / 2} ${ry} 0 0 0 ${w} 0 v${-(h - 2 * ry)}`}
        fill="var(--bg-raised)"
        stroke="var(--line-strong)"
      />
      <ellipse cx={x + w / 2} cy={y + ry} rx={w / 2} ry={ry} fill="var(--bg-raised)" stroke="var(--line-strong)" />
      <text x={x + w / 2} y={top} textAnchor="middle" fontSize={13.5} fontWeight={600} fill="var(--fg)">
        {title}
      </text>
      {lines.map((l, i) => (
        <text
          key={l}
          x={x + w / 2}
          y={top + 20 + i * 16}
          textAnchor="middle"
          fontSize={11}
          fill="var(--fg-muted)"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {l}
        </text>
      ))}
    </g>
  );
}

/** A small pill, e.g. one ATS provider or one evaluation step. */
export function Pill({ x, y, w, label, accent }: { x: number; y: number; w: number; label: string; accent?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={26} rx={13} fill="var(--bg-raised)" />
      <rect
        x={x + 0.5}
        y={y + 0.5}
        width={w - 1}
        height={25}
        rx={12.5}
        fill={accent ? "var(--accent-soft)" : "none"}
        stroke={accent ? "var(--accent)" : "var(--line-strong)"}
        strokeOpacity={accent ? 0.6 : 1}
      />
      <text x={x + w / 2} y={y + 17} textAnchor="middle" fontSize={11.5} fill="var(--fg)">
        {label}
      </text>
    </g>
  );
}

/** A connector. `flow` overlays an animated accent dash while live. */
export function Edge({
  d,
  flow,
  dashed,
  accent,
  arrow = true,
}: {
  d: string;
  flow?: boolean;
  dashed?: boolean;
  accent?: boolean;
  arrow?: boolean;
}) {
  const id = useDiagramId();
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={accent ? "var(--accent)" : "var(--fg-subtle)"}
        strokeOpacity={accent ? 0.9 : 0.55}
        strokeWidth={1.4}
        strokeDasharray={dashed ? "4 4" : undefined}
        markerEnd={arrow ? `url(#${id}-arrow${accent ? "-accent" : ""})` : undefined}
      />
      {flow && <path d={d} className="dg-flow" fill="none" stroke="var(--accent)" strokeWidth={1.6} />}
    </g>
  );
}

/** A dot travelling along a path while the diagram is live. */
export function Packet({ d, dur, begin = "0s" }: { d: string; dur: string; begin?: string }) {
  const live = useLive();
  if (!live) return null;
  return (
    <circle r={3.5} fill="var(--accent)" opacity={0}>
      {/* Plays twice when the diagram comes into view, then stops. */}
      <animateMotion dur={dur} begin={begin} repeatCount={2} path={d} keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur={dur} begin={begin} repeatCount={2} fill="freeze" />
    </circle>
  );
}

/** Small uppercase monospace caption. */
export function Caption({
  x,
  y,
  children,
  anchor = "start",
  accent,
  rotate,
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: "start" | "middle" | "end";
  accent?: boolean;
  rotate?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={10.5}
      letterSpacing="0.12em"
      fill={accent ? "var(--accent)" : "var(--fg-subtle)"}
      transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
      style={{ fontFamily: "var(--font-mono)", textTransform: "uppercase" }}
    >
      {children}
    </text>
  );
}

/** A check-marked row, used inside the guards box. */
export function Check({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <circle cx={x + 7} cy={y - 4} r={7} fill="var(--accent-soft)" stroke="var(--accent)" strokeOpacity={0.7} />
      <path d={`M${x + 3.5} ${y - 4} l2.5 2.5 l4.5 -5`} fill="none" stroke="var(--accent)" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      <text x={x + 20} y={y} fontSize={11.5} fill="var(--fg)" style={{ fontFamily: "var(--font-mono)" }}>
        {label}
      </text>
    </g>
  );
}

/** A document with a folded corner (the rendered PDF). */
export function Doc({ x, y, w = 48, h = 62, label = "PDF" }: { x: number; y: number; w?: number; h?: number; label?: string }) {
  const f = 12;
  return (
    <g>
      <path
        d={`M${x} ${y} h${w - f} l${f} ${f} v${h - f} h${-w} z`}
        fill="var(--bg-raised)"
        stroke="var(--accent)"
        strokeOpacity={0.7}
      />
      <path d={`M${x + w - f} ${y} v${f} h${f}`} fill="none" stroke="var(--accent)" strokeOpacity={0.7} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={x + 9} y={y + 22 + i * 9} width={w - 18 - (i === 2 ? 10 : 0)} height={3} rx={1.5} fill="var(--fg-subtle)" opacity={0.5} />
      ))}
      <text x={x + w / 2} y={y + h + 16} textAnchor="middle" fontSize={11} fontWeight={600} fill="var(--fg)" style={{ fontFamily: "var(--font-mono)" }}>
        {label}
      </text>
    </g>
  );
}
