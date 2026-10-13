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
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "The Business Work | Simple Tools for Your Business",
  },
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The Business Work | Simple Tools for Your Business",
    description: site.description,
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
