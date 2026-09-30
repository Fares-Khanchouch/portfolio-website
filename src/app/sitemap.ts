import type { MetadataRoute } from "next";
import { site, writeup } from "@/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: site.updated, changeFrequency: "monthly", priority: 1 },
    {
      url: `${site.url}/writing/${writeup.slug}`,
      lastModified: writeup.date,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
