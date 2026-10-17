import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import DiscussProjectButton from "@/components/DiscussProjectButton";
import ServiceCapabilities from "@/components/ServiceCapabilities";
import { services } from "@/content/services";
import { getServiceJsonLd } from "@/lib/jsonld";
import { site, getCleanSiteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = services.find((s) => s.id === params.slug);
  if (!service) return {};

  const siteUrl = getCleanSiteUrl();
  const canonicalUrl = `${siteUrl}/services/${service.id}`;
  const title = service.seoTitle ?? service.title;
  const description = service.metaDescription ?? service.summary;

  return {
    title,
    description,
    alternates: {
      canonical: `/services/${service.id}`,
    },
    openGraph: {
      title: `${title} | ${site.name}`,
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
          alt: `${service.title} — ${site.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [`${siteUrl}/opengraph-image`],
    },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.id === params.slug);
  if (!service) notFound();

  const otherServices = services.filter((s) => s.id !== service.id);
  const jsonLd = getServiceJsonLd(service);

  return (
    <>
      <JsonLd data={jsonLd} />
      <Header />

      <main id="main" className="w-full pt-28 md:pt-32 bg-[#FAF7E8]">
        {/* Breadcrumb Navigation */}
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <nav aria-label="Breadcrumb" className="mb-8 border-b border-[#E8E2D5] pb-4">
            <ol className="flex flex-wrap items-center gap-2 font-headline text-xs uppercase tracking-wider text-[#7A756D]">
              <li>
                <Link href="/" className="transition-colors hover:text-[#141413]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#DDD6C5]">
                <ChevronRight size={14} />
              </li>
              <li>
                <Link href="/#services" className="transition-colors hover:text-[#141413]">
                  Services
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#DDD6C5]">
                <ChevronRight size={14} />
              </li>
              <li className="font-bold text-[#141413]" aria-current="page">
                {service.title}
              </li>
            </ol>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-6 pb-14 sm:pb-16 lg:px-12">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-6 lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#DDD6C5] bg-white px-3.5 py-1.5 font-headline text-[11px] font-bold uppercase tracking-[0.2em] text-[#7A756D] shadow-xs">
                <span>{service.index} {"//"} 04</span>
                <span className="text-[#DDD6C5]">·</span>
                <span>{service.tag}</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[62px] font-normal tracking-tight text-[#141413] leading-[1.08]">
                {service.title}
              </h1>
              <p className="max-w-2xl font-body text-base leading-relaxed text-[#5A554E] sm:text-lg">
                {service.intro}
              </p>
              <div className="pt-2">
                <DiscussProjectButton serviceTitle={service.title} />
              </div>
            </div>

            <div className="space-y-4 rounded-2xl border border-[#DDD6C5] bg-[#EDE7DA] p-6 lg:p-7 shadow-xs lg:col-span-4">
              <div className="font-headline text-[11px] font-bold uppercase tracking-[0.2em] text-[#7A756D]">
                Problem It Solves
              </div>
              <p className="font-body text-sm sm:text-[15px] leading-relaxed text-[#141413] font-medium">
                {service.solves}
              </p>
              <div className="border-t border-[#DDD6C5] pt-3.5 font-headline text-[11px] uppercase tracking-wider text-[#7A756D]">
                Built around how you work today
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="w-full border-t border-[#E8E2D5] bg-[#FAF7E8] py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-8 sm:mb-10">
              <div className="mb-2 font-headline text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#7A756D]">
                What we build
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#141413]">
                What this service includes
              </h2>
            </div>
            <ServiceCapabilities
              capabilities={service.capabilities}
              serviceTitle={service.title}
            />
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="w-full border-t border-[#E8E2D5] bg-[#FAF7E8] py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-8 sm:mb-10">
              <div className="mb-2 font-headline text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#7A756D]">
                Real examples
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#141413]">
                Where this helps
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {service.useCases.map((uc, i) => (
                <div
                  key={uc}
                  className="rounded-2xl border border-[#E8E2D5] bg-white p-7 shadow-xs transition-all hover:border-[#141413]"
                >
                  <div className="mb-3 font-headline text-[11px] font-bold uppercase tracking-wider text-[#7A756D]">
                    Example {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-body text-[15px] sm:text-base font-normal leading-relaxed text-[#141413]">
                    {uc}
                  </h3>
                </div>
              ))}
            </div>
            {service.solutionLink && (
              <div className="mt-8 rounded-2xl border border-[#DDD6C5] bg-[#EDE7DA] p-6 sm:p-7 shadow-xs">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="font-headline text-[11px] font-bold uppercase tracking-wider text-[#7A756D]">
                      Dedicated Guide
                    </div>
                    <h3 className="font-serif text-lg font-medium text-[#141413]">
                      {service.solutionLink.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed text-[#5A554E]">
                      {service.solutionLink.description}
                    </p>
                  </div>
                  <Link
                    href={service.solutionLink.href}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#DDD6C5] bg-white px-4 py-2 font-headline text-xs uppercase tracking-wider text-[#141413] transition-colors hover:border-[#141413] hover:bg-[#FAF7E8]"
                  >
                    <span>Read solution guide</span>
                    <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full border-t border-[#E8E2D5] bg-[#FAF7E8] py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-8 sm:mb-10">
              <div className="mb-2 font-headline text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#7A756D]">
                Simple steps
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#141413]">
                How we build it
              </h2>
            </div>
            <ol className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {service.howItWorks.map((step, i) => (
                <li
                  key={step}
                  className="flex flex-col justify-between rounded-2xl border border-[#E8E2D5] bg-white p-6 shadow-xs hover:border-[#141413] transition-all"
                >
                  <div className="mb-4 font-headline text-xs font-bold uppercase tracking-wider text-[#6D32A8]">
                    Step {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-body text-sm sm:text-[15px] leading-relaxed text-[#141413]">
                    {step}
                  </h3>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Limits & What To Know */}
        <section className="w-full border-t border-[#E8E2D5] bg-[#FAF7E8] py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="rounded-3xl border border-[#DDD6C5] bg-[#EDE7DA] p-8 sm:p-10 shadow-xs">
              <div className="mb-6 flex items-center gap-3">
                <AlertCircle size={22} className="text-[#141413]" aria-hidden="true" />
                <h2 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-[#141413]">
                  Things to know before we start
                </h2>
              </div>
              <ul className="space-y-4">
                {service.limits.map((limit) => (
                  <li key={limit} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#141413]" />
                    <span className="font-body text-sm sm:text-[15px] leading-relaxed text-[#4A4742]">
                      {limit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full border-t border-[#E8E2D5] bg-[#FAF7E8] py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-8 sm:mb-10 text-center">
              <div className="mb-2 font-headline text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#7A756D]">
                Clear answers
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#141413]">
                Common questions
              </h2>
            </div>
            <div className="space-y-4">
              {service.faq.map((f) => (
                <details
                  key={f.question}
                  className="group rounded-2xl border border-[#E8E2D5] bg-white p-6 shadow-xs transition-colors hover:border-[#DDD6C5]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between font-headline text-base font-bold text-[#141413]">
                    <span>{f.question}</span>
                    <span className="ml-4 font-mono text-[#7A756D] transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 font-body text-sm sm:text-[15px] leading-relaxed text-[#5A554E]">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="w-full border-t border-[#E8E2D5] bg-[#FAF7E8] py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="flex flex-col items-start justify-between gap-8 rounded-3xl border-2 border-[#141413] bg-[#141413] p-8 sm:flex-row sm:items-center sm:p-12 text-[#FAF7E8] shadow-lg">
              <div className="max-w-xl space-y-2">
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-white">
                  Ready to start with {service.title}?
                </h2>
                <p className="font-body text-sm sm:text-base leading-relaxed text-[#E8E2D5]/80">
                  Tell us what takes too much of your time. We will suggest a simple fix with clear costs before we start.
                </p>
              </div>
              <DiscussProjectButton
                serviceTitle={service.title}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl border-2 border-[#141413] bg-[#EBDDFE] px-7 py-3.5 font-headline text-xs sm:text-sm font-bold tracking-wide text-[#141413] shadow-sm transition-all hover:bg-[#E2CEFF] active:scale-[0.98] cursor-pointer"
              />
            </div>
          </div>
        </section>

        {/* Other Services Section */}
        <section className="w-full border-t border-[#E8E2D5] bg-[#FAF7E8] py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-8 sm:mb-10">
              <div className="mb-2 font-headline text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#7A756D]">
                Other tools
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#141413]">
                Other services we offer
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {otherServices.map((other) => (
                <Link
                  key={other.id}
                  href={`/services/${other.id}`}
                  className="group flex flex-col justify-between rounded-2xl border border-[#E8E2D5] bg-white p-7 shadow-xs transition-all hover:border-[#141413] hover:shadow-md"
                >
                  <div>
                    <div className="mb-3 font-headline text-xs font-bold uppercase tracking-wider text-[#6D32A8]">
                      {other.tag}
                    </div>
                    <h3 className="mb-3 font-serif text-2xl font-normal text-[#141413] transition-colors group-hover:text-[#6D32A8]">
                      {other.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed text-[#5A554E]">
                      {other.summary}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 font-headline text-xs font-bold uppercase tracking-wider text-[#141413]">
                    <span>Read more</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
