import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SpeedComparison from "@/components/SpeedComparison";
import ReviewsSlanted from "@/components/ReviewsSlanted";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Industries from "@/components/Industries";
import Principles from "@/components/Principles";
import BlockerScrollAnimation from "@/components/BlockerScrollAnimation";
import Founder from "@/components/Founder";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getHomeJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: {
    absolute: "The Business Work | AI & Business Automation",
  },
  description:
    "Simplify customer enquiries, follow-ups and daily work with AI agents, WhatsApp automation and connected business systems.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The Business Work | AI & Business Automation",
    description:
      "Simplify customer enquiries, follow-ups and daily work with AI agents, WhatsApp automation and connected business systems.",
    url: "https://www.thebusinesswork.com",
    siteName: site.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.thebusinesswork.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "The Business Work - AI & Business Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Business Work | AI & Business Automation",
    description:
      "Simplify customer enquiries, follow-ups and daily work with AI agents, WhatsApp automation and connected business systems.",
    images: ["https://www.thebusinesswork.com/opengraph-image"],
  },
};

export default function Home() {
  const jsonLd = getHomeJsonLd();

  const homeServices = services.map((s) => ({
    id: s.id,
    index: s.index,
    title: s.title,
    tag: s.tag,
    summary: s.summary,
    solves: s.solves,
    capabilities: s.capabilities.map((c) => ({ name: c.name })),
    depends: s.depends,
  }));

  return (
    <>
      <JsonLd data={jsonLd} />
      <Header />
      <main id="main" className="w-full pt-20 sm:pt-24">
        <Hero />
        <SpeedComparison />
        <ReviewsSlanted />
        <Services items={homeServices} />
        <Process />
        <Industries />
        <Principles />
        <BlockerScrollAnimation />
        <Founder />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
