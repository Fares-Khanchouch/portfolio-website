import { ImageResponse } from "next/og";
import { site, writeup } from "@/data";

export const alt = writeup.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Share card for the write-up: its title and the three measured results.
export default function OpengraphImage() {
  const results = [
    { value: "54% → 100%", label: "hard requirements addressed" },
    { value: "5.1 → 6.3", label: "blind LLM-reviewer résumé score, /10" },
    { value: "6% → 0%", label: "bullets judged overclaimed" },
  ];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 84px 56px",
          background: "#0a0f1e",
          backgroundImage: "radial-gradient(circle at 90% 10%, rgba(46,110,192,0.45), transparent 50%)",
          color: "#f8fafc",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#86b8f0" }}>
            <div style={{ width: 40, height: 2, background: "#86b8f0", marginRight: 18 }} />
            Write-up · {site.name}
          </div>
          <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5, marginTop: 30, maxWidth: 1000 }}>
            {writeup.title}
          </div>
        </div>
        <div style={{ display: "flex", borderTop: "2px solid rgba(255,255,255,0.1)", paddingTop: 30 }}>
          {results.map((r) => (
            <div key={r.label} style={{ display: "flex", flexDirection: "column", width: "33%" }}>
              <div style={{ fontSize: 42, fontWeight: 700, color: "#86b8f0" }}>{r.value}</div>
              <div style={{ fontSize: 20, marginTop: 6, color: "#8a98ae", maxWidth: 300 }}>{r.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
