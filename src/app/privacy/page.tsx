import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { privacySections, lastUpdated } from "@/content/legal/privacy";
import { getLegalRobots } from "@/lib/legal";
import { site, getCleanSiteUrl } from "@/lib/site";

export function generateMetadata(): Metadata {
  const siteUrl = getCleanSiteUrl();
  const robots = getLegalRobots("privacy");

  return {
    title: "Privacy Policy | The Business Work",
    description:
      "Learn how The Business Work collects, uses, and protects personal data from commercial project enquiries under Indian data protection practices.",
    alternates: {
      canonical: "/privacy",
    },
    openGraph: {
      title: "Privacy Policy | The Business Work",
      description:
        "Information on personal data collection, processing, and security practices at The Business Work.",
      url: `${siteUrl}/privacy`,
      type: "website",
    },
    robots,
  };
}

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated={lastUpdated}
      sections={privacySections}
      summaryNote="This policy explains how The Business Work collects, processes, and protects personal data submitted through our website and enquiry channels."
    />
  );
}
