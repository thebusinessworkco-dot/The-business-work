import type { MetadataRoute } from "next";
import { getCleanSiteUrl, LAST_MODIFIED } from "@/lib/site";
import { services } from "@/content/services";
import { isLegalIndexable } from "@/lib/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getCleanSiteUrl();
  const lastModified = new Date(LAST_MODIFIED);

  const homeEntry: MetadataRoute.Sitemap[number] = {
    url: siteUrl,
    lastModified,
    changeFrequency: "monthly",
    priority: 1.0,
  };

  const serviceEntries: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${siteUrl}/services/${s.id}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const legalEntries: MetadataRoute.Sitemap = [];

  // /privacy and /terms are automatically included once all placeholders are resolved
  // and indexing is permitted via NEXT_PUBLIC_ALLOW_INDEXING="true"
  if (isLegalIndexable("privacy")) {
    legalEntries.push({
      url: `${siteUrl}/privacy`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    });
  }

  if (isLegalIndexable("terms")) {
    legalEntries.push({
      url: `${siteUrl}/terms`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    });
  }

  return [homeEntry, ...serviceEntries, ...legalEntries];
}
