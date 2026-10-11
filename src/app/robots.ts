import type { MetadataRoute } from "next";
import { isIndexingAllowed, getCleanSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getCleanSiteUrl();
  const allowIndexing = isIndexingAllowed();

  if (allowIndexing) {
    return {
      rules: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/api/"],
        },
      ],
      sitemap: `${siteUrl}/sitemap.xml`,
      host: siteUrl,
    };
  }

  // Safety switch: disallow all crawling on staging, preview, and pre-launch deployments
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
      },
    ],
  };
}
