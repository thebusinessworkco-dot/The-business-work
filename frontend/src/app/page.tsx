import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Industries from "@/components/Industries";
import Work from "@/components/Work";
import Principles from "@/components/Principles";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getHomeJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: {
    absolute: "The Business Work | AI Automation & Systems Agency India",
  },
  description:
    "Practical AI agents, WhatsApp automation, and CRM workflows custom-built for businesses in India. Reduce repetitive tasks and automate operations.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The Business Work | AI Automation & Systems Agency India",
    description:
      "Practical AI agents, WhatsApp automation, and CRM workflows custom-built for businesses in India.",
  },
};

export default function Home() {
  const jsonLd = getHomeJsonLd();

  return (
    <>
      <JsonLd data={jsonLd} />
      <Header />
      <main id="main" className="w-full pt-16 sm:pt-20">
        <Hero />
        <Services />
        <Process />
        <Industries />
        <Work />
        <Principles />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
