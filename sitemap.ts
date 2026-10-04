import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://svircevic.hu", changeFrequency: "monthly", priority: 1 }];
}
