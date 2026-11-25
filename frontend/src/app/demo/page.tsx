import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoList from "@/components/DemoList";
import DemoCTA from "@/components/DemoCTA";
import JsonLd from "@/components/JsonLd";
import { demos } from "@/content/demos";
import { site, getCleanSiteUrl } from "@/lib/site";

const siteUrl = getCleanSiteUrl();
const canonicalUrl = `${siteUrl}/demo`;
const title = "Live Demos";
const fullTitle = `${title} | ${site.name}`;
const description =
  "Explore real, interactive business software built by The Business Work. Try live systems yourself and see how they simplify everyday business operations.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/demo",
  },
  openGraph: {
    title: fullTitle,
    description,
    url: canonicalUrl,
    siteName: site.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-preview.png`,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "The Business Work Live Demos Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: fullTitle,
    description,
    images: [`${siteUrl}/og-preview.png`],
  },
};

export default function DemoPage() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: title,
        description,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
          url: siteUrl,
          name: site.name,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Live Demos",
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLdData} />
      <Header />

      <main id="main" className="min-h-screen bg-[#FAF7E8] pt-20 sm:pt-24 lg:pt-28">
        <h1 className="sr-only">Live Interactive Business Software Demos</h1>

        {/* Demo Listing Section */}
        <section
          aria-label="Interactive Software Demos"
          className="mx-auto max-w-7xl px-4 pb-20 pt-4 sm:px-6 sm:pb-28 sm:pt-6 lg:px-12"
        >
          <DemoList initialDemos={demos} />
        </section>

        {/* Conversion CTA Section */}
        <DemoCTA />
      </main>

      <Footer />
    </>
  );
}
