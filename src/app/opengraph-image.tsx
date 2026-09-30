import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hero, site } from "@/data";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Built once at build time: the social-share card for every page that
// doesn't define its own.
export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "public", "avatar-512.jpg"));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;
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
          backgroundImage: "radial-gradient(circle at 85% 15%, rgba(46,110,192,0.45), transparent 50%)",
          color: "#f8fafc",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 700 }}>
            <div style={{ display: "flex", alignItems: "center", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#86b8f0", marginBottom: 26 }}>
              <div style={{ width: 40, height: 2, background: "#86b8f0", marginRight: 18 }} />
              {hero.eyebrow}
            </div>
            <div style={{ fontSize: 80, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2 }}>{site.name}</div>
            <div style={{ fontSize: 36, marginTop: 20, color: "#dbe3ee" }}>{hero.headline}</div>
            <div style={{ fontSize: 22, marginTop: 18, color: "#8a98ae" }}>fareskhanchouch.com</div>
          </div>
          <img
            src={src}
            width={250}
            height={250}
            alt=""
            style={{ borderRadius: 28, border: "3px solid rgba(255,255,255,0.14)" }}
          />
        </div>
        <div style={{ display: "flex", borderTop: "2px solid rgba(255,255,255,0.1)", paddingTop: 30 }}>
          {hero.proof.map((p) => (
            <div key={p.label} style={{ display: "flex", flexDirection: "column", width: "25%" }}>
              <div style={{ fontSize: 46, fontWeight: 700, letterSpacing: -1 }}>{p.value}</div>
              <div style={{ fontSize: 19, marginTop: 6, color: "#8a98ae", maxWidth: 230 }}>{p.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
