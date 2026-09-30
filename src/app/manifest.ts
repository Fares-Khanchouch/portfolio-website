import type { MetadataRoute } from "next";
import { site } from "@/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Fares K.",
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#0a0f1e",
    theme_color: "#0a0f1e",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/avatar-512.jpg", sizes: "512x512", type: "image/jpeg" },
    ],
  };
}
