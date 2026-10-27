import type { MetadataRoute } from "next";
import { config } from "@/data/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: config.site,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
