import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Industries from "@/components/Industries";
import Work from "@/components/Work";
import Principles from "@/components/Principles";
import Founder from "@/components/Founder";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getHomeJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: {
    absolute: "The Business Work | AI Automation & Digital Systems",
  },
  description:
    "We help small and medium businesses in India automate customer enquiries, bookings, lead follow-ups and repetitive admin — using WhatsApp, AI and connected business tools.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The Business Work | AI Automation & Digital Systems",
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
        <Founder />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
