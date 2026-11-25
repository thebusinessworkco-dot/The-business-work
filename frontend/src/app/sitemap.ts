import type { MetadataRoute } from "next";
import { getCleanSiteUrl, LAST_MODIFIED } from "@/lib/site";
import { services } from "@/content/services";
import { solutions } from "@/content/solutions";
import { isLegalDraft } from "@/lib/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getCleanSiteUrl();
  const lastModified = new Date(LAST_MODIFIED);

  const homeEntry: MetadataRoute.Sitemap[number] = {
    url: siteUrl,
    lastModified,
    changeFrequency: "monthly",
    priority: 1.0,
    videos: [
      {
        title: "The Business Work — Business Automation Showcase",
        thumbnail_loc: `${siteUrl}/hero-video-poster.jpg`,
        description:
          "Automated WhatsApp, AI agent, and CRM workflows running in the background for Indian businesses.",
        content_loc: `${siteUrl}/thebusinesswork_hero_18s_2k.mp4`,
      },
    ],
  };

  const demoEntry: MetadataRoute.Sitemap[number] = {
    url: `${siteUrl}/demo`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  };

  const serviceEntries: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${siteUrl}/services/${s.id}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const solutionEntries: MetadataRoute.Sitemap = solutions.map((sol) => ({
    url: `${siteUrl}/solutions/${sol.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const legalEntries: MetadataRoute.Sitemap = [];

  // /privacy and /terms are excluded while [[TO CONFIRM placeholders remain,
  // and included automatically once all placeholders are resolved.
  if (!isLegalDraft("privacy")) {
    legalEntries.push({
      url: `${siteUrl}/privacy`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    });
  }

  if (!isLegalDraft("terms")) {
    legalEntries.push({
      url: `${siteUrl}/terms`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    });
  }

  return [homeEntry, demoEntry, ...serviceEntries, ...solutionEntries, ...legalEntries];
}
