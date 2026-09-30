// Two refusals the guards produce, in the pipeline's own message format.
// The wording of the rewrites is an illustration; the messages are real.
const rows = [
  {
    fact: "Built a Kubernetes operator in Go that deploys n8n with PostgreSQL from a single custom resource, replacing 8+ hand-written manifests …",
    rewrite: "… replacing 20+ hand-written manifests.",
    error: "projects: rewrite of 'proj.n8nop.b1' invents number(s) not in the original: 20, 20+",
  },
  {
    fact: "Migrated a client's financial records (100,000+ rows on clients and assets) from Excel to Airtable via API scripts …",
    rewrite: "Migrated a client's financial records (100,000+ rows) from Excel to Snowflake via API scripts …",
    error: "experience: rewrite of 'exp.free.b6' names snowflake, which appear(s) nowhere in the vault",
  },
];

export default function GuardExample() {
  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-line bg-surface shadow-card">
      <figcaption className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
        <span>Example: two rewrites the guards refuse</span>
        <span className="text-accent">refused</span>
      </figcaption>
      <div className="divide-y divide-line">
        {rows.map((r) => (
          <div key={r.error} className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-2 px-4 py-4 text-sm [overflow-wrap:anywhere]">
            <p>
              <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">Fact</span>
              <span className="text-fg-muted">{r.fact}</span>
            </p>
            <p>
              <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">Rewrite</span>
              <span className="text-fg">{r.rewrite}</span>
            </p>
            <p className="rounded-md border border-[var(--danger)]/40 bg-[var(--danger)]/10 px-3 py-2 font-mono text-xs leading-relaxed [overflow-wrap:anywhere] text-[var(--danger)]">
              {r.error}
            </p>
          </div>
        ))}
      </div>
    </figure>
  );
}
