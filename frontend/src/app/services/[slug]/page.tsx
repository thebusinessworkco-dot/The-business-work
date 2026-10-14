import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight, CheckCircle2, AlertCircle } from "lucide-react";
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

      <main id="main" className="w-full pt-28 md:pt-32 bg-section-cream">
        {/* Breadcrumb Navigation */}
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <nav aria-label="Breadcrumb" className="mb-8 border-b border-border-sand pb-4">
            <ol className="flex flex-wrap items-center gap-2 font-headline text-xs uppercase tracking-wider text-ink-muted">
              <li>
                <Link href="/" className="transition-colors hover:text-ink">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-border-taupe">
                <ChevronRight size={14} />
              </li>
              <li>
                <Link href="/#services" className="transition-colors hover:text-ink">
                  Services
                </Link>
              </li>
              <li aria-hidden="true" className="text-border-taupe">
                <ChevronRight size={14} />
              </li>
              <li className="font-semibold text-ink" aria-current="page">
                {service.title}
              </li>
            </ol>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-6 pb-12 sm:pb-14 lg:px-12">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-8">
              <div className="inline-flex items-center gap-2.5 rounded border border-border-sand bg-surface-card px-3 py-1 font-headline text-xs font-semibold uppercase tracking-wider text-accent-ochre">
                <span>{service.index} {"//"} 04</span>
                <span className="text-border-taupe">·</span>
                <span>{service.tag}</span>
              </div>
              <h1 className="font-headline text-4xl font-medium tracking-tight text-ink sm:text-5xl lg:text-6xl">
                {service.title}
              </h1>
              <p className="max-w-2xl font-body text-base leading-relaxed text-ink-muted sm:text-lg">
                {service.intro}
              </p>
              <div className="pt-2">
                <DiscussProjectButton serviceTitle={service.title} />
              </div>
            </div>

            <div className="space-y-4 rounded-lg border border-border-sand bg-surface-card p-6 lg:col-span-4">
              <div className="font-headline text-xs font-semibold uppercase tracking-wider text-accent-ochre">
                Problem It Solves
              </div>
              <p className="font-body text-sm leading-relaxed text-ink">
                {service.solves}
              </p>
              <div className="border-t border-border-sand pt-4 font-headline text-xs uppercase tracking-wider text-ink-faint">
                Built around how you work today
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="w-full border-t border-border-sand bg-section-sand py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-8 sm:mb-10">
              <div className="mb-2 font-headline text-xs font-semibold uppercase tracking-[0.2em] text-accent-ochre-dark">
                What we build
              </div>
              <h2 className="font-headline text-3xl font-medium tracking-tight text-ink">
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
        <section className="w-full border-t border-border-sand bg-section-clay py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-8 sm:mb-10">
              <div className="mb-2 font-headline text-xs font-semibold uppercase tracking-[0.2em] text-accent-ochre-dark">
                Real examples
              </div>
              <h2 className="font-headline text-3xl font-medium tracking-tight text-ink">
                Where this helps
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {service.useCases.map((uc, i) => (
                <div
                  key={uc}
                  className="rounded-lg border border-border-sand bg-surface-card p-7 transition-colors hover:border-border-taupe"
                >
                  <div className="mb-3 font-headline text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    Example {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-body text-base font-normal leading-relaxed text-ink">
                    {uc}
                  </h3>
                </div>
              ))}
            </div>
            {service.solutionLink && (
              <div className="mt-8 rounded-lg border border-border-sand bg-surface-card p-6 sm:p-7">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="font-headline text-xs font-semibold uppercase tracking-wider text-accent-ochre-dark">
                      Dedicated Guide
                    </div>
                    <h3 className="font-headline text-base font-medium text-ink">
                      {service.solutionLink.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed text-ink-muted">
                      {service.solutionLink.description}
                    </p>
                  </div>
                  <Link
                    href={service.solutionLink.href}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border-taupe bg-background px-4 py-2 font-headline text-xs uppercase tracking-wider text-ink transition-colors hover:border-ink hover:bg-[#EFEAE0]"
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
        <section className="w-full border-t border-border-sand bg-section-sage py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-8 sm:mb-10">
              <div className="mb-2 font-headline text-xs font-semibold uppercase tracking-[0.2em] text-accent-ochre-dark">
                Simple steps
              </div>
              <h2 className="font-headline text-3xl font-medium tracking-tight text-ink">
                How we build it
              </h2>
            </div>
            <ol className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {service.howItWorks.map((step, i) => (
                <li
                  key={step}
                  className="flex flex-col justify-between rounded border border-border-sand bg-surface-card p-6"
                >
                  <div className="mb-4 font-headline text-xs font-semibold uppercase tracking-wider text-accent-ochre-dark">
                    Step {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-body text-sm leading-relaxed text-ink">
                    {step}
                  </h3>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Limits & What To Know */}
        <section className="w-full border-t border-border-sand bg-section-cream py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="rounded-lg border border-border-sand bg-surface-card p-8 sm:p-10">
              <div className="mb-6 flex items-center gap-3">
                <AlertCircle size={20} className="text-accent-ochre" aria-hidden="true" />
                <h2 className="font-headline text-2xl font-medium tracking-tight text-ink">
                  Things to know before we start
                </h2>
              </div>
              <ul className="space-y-4">
                {service.limits.map((limit) => (
                  <li key={limit} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-ochre" />
                    <span className="font-body text-sm leading-relaxed text-ink-muted">
                      {limit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full border-t border-border-sand bg-section-sand py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-8 sm:mb-10 text-center">
              <div className="mb-2 font-headline text-xs font-semibold uppercase tracking-[0.2em] text-accent-ochre-dark">
                Clear answers
              </div>
              <h2 className="font-headline text-3xl font-medium tracking-tight text-ink">
                Common questions
              </h2>
            </div>
            <div className="space-y-4">
              {service.faq.map((f) => (
                <details
                  key={f.question}
                  className="group rounded border border-border-sand bg-surface-card p-6 transition-colors hover:border-border-taupe"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between font-headline text-base font-medium text-ink">
                    <span>{f.question}</span>
                    <span className="ml-4 font-mono text-ink-muted transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 font-body text-sm leading-relaxed text-ink-muted">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="w-full border-t border-border-sand bg-section-cream py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="dark-section flex flex-col items-start justify-between gap-8 rounded-lg border border-section-ochre bg-section-ochre p-8 sm:flex-row sm:items-center sm:p-12 text-section-cream">
              <div className="max-w-xl space-y-2">
                <h2 className="font-headline text-2xl font-medium tracking-tight text-section-cream sm:text-3xl">
                  Ready to start with {service.title}?
                </h2>
                <p className="font-body text-sm leading-relaxed text-section-cream">
                  Tell us what takes too much of your time. We will suggest a simple fix with clear costs before we start.
                </p>
              </div>
              <DiscussProjectButton
                serviceTitle={service.title}
                className="inline-flex items-center justify-center gap-2.5 rounded bg-section-cream px-7 py-3.5 font-headline text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-section-cream"
              />
            </div>
          </div>
        </section>

        {/* Other Services Section */}
        <section className="w-full border-t border-border-sand bg-section-sage py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-8 sm:mb-10">
              <div className="mb-2 font-headline text-xs font-semibold uppercase tracking-[0.2em] text-accent-ochre-dark">
                Other tools
              </div>
              <h2 className="font-headline text-3xl font-medium tracking-tight text-ink">
                Other services we offer
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {otherServices.map((other) => (
                <Link
                  key={other.id}
                  href={`/services/${other.id}`}
                  className="group flex flex-col justify-between rounded-lg border border-border-sand bg-surface-card p-7 transition-all hover:border-ink hover:bg-[#EFEAE0]"
                >
                  <div>
                    <div className="mb-3 font-headline text-xs uppercase tracking-wider text-accent-ochre-dark">
                      {other.tag}
                    </div>
                    <h3 className="mb-3 font-headline text-xl font-medium text-ink transition-colors group-hover:text-accent-ochre-dark">
                      {other.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed text-ink-muted">
                      {other.summary}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 font-headline text-xs uppercase tracking-wider text-ink">
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
