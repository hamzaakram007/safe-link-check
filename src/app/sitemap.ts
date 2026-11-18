import type { MetadataRoute } from "next";

const SITE_URL = "https://safe-link-check-jade.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date("2026-11-18"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
