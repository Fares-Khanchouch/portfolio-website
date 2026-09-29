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
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 90px",
          background: "#0a0f1e",
          backgroundImage: "radial-gradient(circle at 85% 20%, rgba(74,127,165,0.35), transparent 55%)",
          color: "#f8fafc",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div style={{ fontSize: 24, letterSpacing: 5, textTransform: "uppercase", color: "#7fb0d4", marginBottom: 28 }}>
            {hero.eyebrow}
          </div>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2 }}>{site.name}</div>
          <div style={{ fontSize: 38, marginTop: 24, color: "#a3b1c6" }}>{hero.headline}</div>
          <div style={{ fontSize: 26, marginTop: 44, color: "#8a98ae" }}>fareskhanchouch.com</div>
        </div>
        <img
          src={src}
          width={300}
          height={300}
          alt=""
          style={{ borderRadius: 28, border: "3px solid rgba(255,255,255,0.14)" }}
        />
      </div>
    ),
    size,
  );
}
