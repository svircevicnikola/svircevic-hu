import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://svircevic.hu", changeFrequency: "monthly", priority: 1 },
    { url: "https://svircevic.hu/agota", changeFrequency: "monthly", priority: 0.8 },
  ];
}
