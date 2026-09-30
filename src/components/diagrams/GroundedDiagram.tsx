"use client";

import { Box, Caption, Check, Diagram, Doc, Edge, Packet, Pill, Store } from "./kit";

// Architecture of the job-market data platform and grounded generation
// (facts: job-search-mcp vault, proj.jobpipe.*).

function Guards({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill="var(--bg-raised)" />
      <rect x={x} y={y} width={w} height={h} rx={10} fill="var(--accent-soft)" />
      <rect x={x + 0.5} y={y + 0.5} width={w - 1} height={h - 1} rx={9.5} fill="none" stroke="var(--accent)" strokeOpacity={0.7} />
      <text x={x + w / 2} y={y + 23} textAnchor="middle" fontSize={13.5} fontWeight={600} fill="var(--fg)">
        Guards
      </text>
      <Check x={x + 12} y={y + 50} label="numbers" />
      <Check x={x + 12} y={y + 72} label="technologies" />
      <Check x={x + 12} y={y + 94} label="cross-document" />
    </g>
  );
}

const WIDE = {
  main: "M118 113 C134 113 134 120 150 120 H896",
  vault: "M494 268 H774 V184",
  refused: "M774 58 V36 H628 V76",
  evals: "M188 365 H808",
};

const TALL = {
  main: "M180 52 V296 H99 V696",
  vault: "M275 398 V610 H176",
  refused: "M24 596 H8 V469 H22",
};

export default function GroundedDiagram({ layout = "auto" }: { layout?: "auto" | "tall" }) {
  return (
    <Diagram
      layout={layout}
      title="Architecture: job-market data platform and grounded LLM generation"
      description="Ingest: a crawler reads 63,000+ company job boards through 24 applicant-tracking-system adapters, with rate limiting, ETag caching and resumable runs, into a normalized SQLite store of 1.1M+ postings. Generate: a brief (the posting's key terms and requirements plus a menu of facts) goes to the LLM, which picks and rewords facts from a versioned fact vault. Guards check every claim against the vault for invented numbers, invented technologies and cross-document consistency; refused text goes back for a rewrite. Accepted output is rendered to a one-page PDF. An evaluation harness runs AI agents through the real pipeline on 12 benchmark postings and scores the output with blind LLM reviewer panels."
      wide={{
        viewBox: "-8 0 976 400",
        children: (
          <>
            <Caption x={0} y={18}>Ingest</Caption>
            <Caption x={440} y={18}>Generate</Caption>

            <Edge d="M118 79 C134 79 134 120 150 120" arrow={false} />
            <Edge d="M118 147 C134 147 134 120 150 120" arrow={false} />
            <Edge d="M118 113 C134 113 134 120 148 120" />
            <Edge d="M278 120 H306" />
            <Edge d="M408 120 H438" />
            <Edge d="M494 226 V166" />
            <Edge d="M548 120 H578" />
            <Edge d="M676 120 H706" />
            <Edge d={WIDE.refused} dashed accent />
            <Edge d={WIDE.vault} />
            <Edge d="M840 120 H870" />

            <Packet d={WIDE.main} dur="5s" />
            <Packet d={WIDE.vault} dur="3s" begin="1s" />
            <Packet d={WIDE.refused} dur="2.4s" begin="2s" />

            <Pill x={0} y={66} w={118} label="Greenhouse" />
            <Pill x={0} y={100} w={118} label="Workday" />
            <Pill x={0} y={134} w={118} label="SuccessFactors" />
            <Caption x={59} y={184} anchor="middle">+ 21 more</Caption>

            <Box x={150} y={76} w={128} h={88} title="Crawler" lines={["63k+ boards", "rate limiting", "ETag caching"]} />
            <Store x={308} y={72} w={100} h={96} title="SQLite" lines={["1.1M+ postings", "normalized"]} />
            <Box x={440} y={76} w={108} h={88} title="Brief" lines={["key terms", "requirements", "fact menu"]} />
            <Store x={440} y={226} w={108} h={84} title="Fact vault" lines={["versioned", "EN · FR"]} />
            <Box x={580} y={76} w={96} h={88} title="LLM" lines={["picks facts", "rewords", "orders"]} accent />
            <Guards x={708} y={58} w={132} h={124} />
            <Doc x={872} y={89} />
            <Caption x={896} y={188} anchor="middle">1 page</Caption>

            <Caption x={701} y={30} anchor="middle" accent>refused → rewrite</Caption>
            <Caption x={661} y={260} anchor="middle">checked against</Caption>

            <rect x={0.5} y={320.5} width={919} height={73} rx={14} fill="none" stroke="var(--line-strong)" strokeDasharray="4 4" />
            <Caption x={18} y={343} accent>Eval harness</Caption>
            <Edge d={WIDE.evals} arrow={false} />
            <Packet d={WIDE.evals} dur="4s" begin="0.5s" />
            <Pill x={18} y={352} w={170} label="12 benchmark postings" />
            <Pill x={208} y={352} w={196} label="AI agents run the pipeline" />
            <Pill x={424} y={352} w={196} label="blind LLM reviewer panels" />
            <Pill x={640} y={352} w={150} label="scorecard" />
            <Pill x={810} y={352} w={96} label="next fix" accent />
          </>
        ),
      }}
      tall={{
        viewBox: "-4 0 368 920",
        children: (
          <>
            <Caption x={0} y={14}>Ingest</Caption>
            <Edge d="M56 52 C56 78 180 70 180 94" arrow={false} />
            <Edge d="M304 52 C304 78 180 70 180 94" arrow={false} />
            <Edge d="M180 52 V94" />
            <Edge d="M180 160 V190" />
            <Edge d="M180 270 V296 H99 V318" />
            <Edge d="M200 359 H176" />
            <Edge d="M99 398 V428" />
            <Edge d="M99 508 V538" />
            <Edge d={TALL.refused} dashed accent />
            <Edge d={TALL.vault} />
            <Edge d="M99 652 V680" />

            <Packet d={TALL.main} dur="5.5s" />
            <Packet d={TALL.vault} dur="3s" begin="1s" />
            <Packet d={TALL.refused} dur="2.4s" begin="2s" />

            <Pill x={0} y={26} w={112} label="Greenhouse" />
            <Pill x={124} y={26} w={112} label="Workday" />
            <Pill x={248} y={26} w={112} label="SuccessFactors" />
            <Caption x={252} y={88}>+ 21 more</Caption>

            <Box x={40} y={96} w={280} h={64} title="Crawler" lines={["63k+ boards · rate limits · ETags"]} />
            <Store x={90} y={192} w={180} h={78} title="SQLite" lines={["1.1M+ postings", "normalized"]} />

            <Caption x={0} y={306}>Generate</Caption>
            <Box x={24} y={320} w={150} h={78} title="Brief" lines={["key terms", "requirements"]} />
            <Store x={200} y={316} w={150} h={82} title="Fact vault" lines={["versioned"]} />
            <Box x={24} y={430} w={150} h={78} title="LLM" lines={["picks facts", "rewords"]} accent />
            <Caption x={106} y={527} accent>refused → rewrite</Caption>
            <Caption x={287} y={430} rotate={90}>checked against</Caption>
            <Guards x={24} y={540} w={150} h={112} />
            <Doc x={75} y={682} />
            <Caption x={140} y={718}>fit to 1 page</Caption>

            <rect x={0.5} y={790.5} width={359} height={123} rx={14} fill="none" stroke="var(--line-strong)" strokeDasharray="4 4" />
            <Caption x={16} y={812} accent>Eval harness</Caption>
            <Edge d="M166 837 H194" />
            <Edge d="M270 850 V859 H91 V866" />
            <Edge d="M166 881 H194" />
            <Pill x={16} y={824} w={150} label="12 benchmark postings" />
            <Pill x={196} y={824} w={148} label="AI agents run it" />
            <Pill x={16} y={868} w={150} label="blind LLM panels" />
            <Pill x={196} y={868} w={148} label="scorecard → fix" accent />
          </>
        ),
      }}
    />
  );
}
