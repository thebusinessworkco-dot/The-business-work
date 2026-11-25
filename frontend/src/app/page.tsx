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
    absolute: "The Business Work | Business Automation in India",
  },
  description:
    "AI Agents & Chatbots, WhatsApp & Social Automation, CRM & Workflow Automation, and Restaurant & Cafe Table Ordering for businesses in India.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The Business Work | Business Automation in India",
    description:
      "AI Agents & Chatbots, WhatsApp & Social Automation, CRM & Workflow Automation, and Restaurant & Cafe Table Ordering for businesses in India.",
    url: "https://www.thebusinesswork.com",
    siteName: site.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.thebusinesswork.com/og-preview.png",
        secureUrl: "https://www.thebusinesswork.com/og-preview.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "The Business Work | We Make Business Simpler",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Business Work | Business Automation in India",
    description:
      "AI Agents & Chatbots, WhatsApp & Social Automation, CRM & Workflow Automation, and Restaurant & Cafe Table Ordering for businesses in India.",
    images: ["https://www.thebusinesswork.com/og-preview.png"],
  },
};

export default function Home() {
  const jsonLd = getHomeJsonLd();
  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "The Business Work — Business Automation Showcase",
    description:
      "Automated WhatsApp, AI agent, and CRM workflows running in the background for Indian businesses.",
    thumbnailUrl: "https://www.thebusinesswork.com/hero-video-poster.jpg",
    contentUrl: "https://www.thebusinesswork.com/thebusinesswork_hero_18s_2k.mp4",
    uploadDate: "2026-10-13T00:00:00.000Z",
    duration: "PT18S",
  };

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
      <JsonLd data={videoJsonLd} />
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
