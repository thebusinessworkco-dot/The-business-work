import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { termsSections, lastUpdated } from "@/content/legal/terms";
import { getLegalRobots } from "@/lib/legal";
import { site, getCleanSiteUrl } from "@/lib/site";

export function generateMetadata(): Metadata {
  const siteUrl = getCleanSiteUrl();
  const robots = getLegalRobots("terms");

  return {
    title: "Terms of Service",
    description:
      "Terms and conditions governing your use of The Business Work website, commercial enquiries, and digital automation capabilities.",
    alternates: {
      canonical: "/terms",
    },
    openGraph: {
      title: "Terms of Service | The Business Work",
      description:
        "Review the terms governing access to The Business Work website and digital service enquiries.",
      url: `${siteUrl}/terms`,
      siteName: site.name,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: `${siteUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: "Terms of Service — The Business Work",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Terms of Service | The Business Work",
      description:
        "Review the terms governing access to The Business Work website and digital service enquiries.",
      images: [`${siteUrl}/opengraph-image`],
    },
    robots,
  };
}

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      lastUpdated={lastUpdated}
      sections={termsSections}
      summaryNote="These terms describe the guidelines, platform limitations, and contractual boundaries governing your use of The Business Work website."
    />
  );
}
