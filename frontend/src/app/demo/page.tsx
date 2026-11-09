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
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "The Business Work Live Demos Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: fullTitle,
    description,
    images: [`${siteUrl}/opengraph-image`],
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
        {/* Hero Section */}
        <section
          aria-labelledby="demo-hero-title"
          className="relative mx-auto max-w-5xl px-4 pb-12 pt-8 text-center sm:px-6 sm:pb-16 sm:pt-12 lg:px-8"
        >
          {/* Eyebrow Label */}
          <div className="mb-3 inline-block font-headline text-[11px] font-bold uppercase tracking-[0.24em] text-[#141413] sm:text-xs">
            01 // LIVE EXPERIENCES
          </div>

          {/* Main Headline */}
          <h1
            id="demo-hero-title"
            className="mx-auto max-w-4xl font-serif text-[34px] font-medium leading-[1.1] tracking-tight text-[#141413] sm:text-5xl md:text-6xl lg:text-[68px]"
          >
            Don&apos;t just see what we build.{" "}
            <span className="block font-normal italic text-[#E4572E] sm:inline">
              Experience it.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-2xl font-body text-base leading-relaxed text-[#555047] sm:mt-6 sm:text-lg">
            Explore real, interactive business software built by The Business Work. Try the
            systems yourself and see how they simplify everyday operations.
          </p>
        </section>

        {/* Demo Listing Section */}
        <section
          aria-label="Interactive Software Demos"
          className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 sm:pb-28 lg:px-12"
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
