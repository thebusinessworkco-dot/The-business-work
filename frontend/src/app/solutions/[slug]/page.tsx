import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight, AlertCircle, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import DiscussProjectButton from "@/components/DiscussProjectButton";
import { solutions } from "@/content/solutions";
import { getSolutionJsonLd } from "@/lib/jsonld";
import { site, getCleanSiteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const solution = solutions.find((s) => s.slug === params.slug);
  if (!solution) return {};

  const siteUrl = getCleanSiteUrl();
  const canonicalUrl = `${siteUrl}/solutions/${solution.slug}`;
  const title = solution.seoTitle;
  const description = solution.metaDescription;

  return {
    title,
    description,
    alternates: {
      canonical: `/solutions/${solution.slug}`,
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
          alt: `${solution.title} — ${site.name}`,
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

export default function SolutionPage({ params }: { params: { slug: string } }) {
  const solution = solutions.find((s) => s.slug === params.slug);
  if (!solution) notFound();

  const jsonLd = getSolutionJsonLd(solution);

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
                  Solutions
                </Link>
              </li>
              <li aria-hidden="true" className="text-border-taupe">
                <ChevronRight size={14} />
              </li>
              <li className="font-semibold text-ink" aria-current="page">
                {solution.title}
              </li>
            </ol>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-6 pb-12 sm:pb-14 lg:px-12">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-8">
              <div className="inline-flex items-center gap-2.5 rounded border border-border-sand bg-surface-card px-3 py-1 font-headline text-xs font-semibold uppercase tracking-wider text-accent-ochre">
                <span>{solution.eyebrow}</span>
                <span className="text-border-taupe">·</span>
                <span>{solution.tag}</span>
              </div>
              <h1 className="font-headline text-4xl font-medium tracking-tight text-ink sm:text-5xl lg:text-6xl">
                {solution.title}
              </h1>
              <p className="max-w-2xl font-body text-base leading-relaxed text-ink-muted sm:text-lg">
                {solution.summary}
              </p>
              <div className="pt-2">
                <DiscussProjectButton serviceTitle={solution.title} label={solution.ctaButtonText} />
              </div>
            </div>

            <div className="space-y-4 rounded-lg border border-border-sand bg-surface-card p-6 lg:col-span-4">
              <div className="font-headline text-xs font-semibold uppercase tracking-wider text-accent-ochre">
                Current Status
              </div>
              <p className="font-body text-sm leading-relaxed text-ink">
                {solution.statusNote}
              </p>
              <div className="border-t border-border-sand pt-4 font-headline text-xs uppercase tracking-wider text-ink-faint">
                Custom quotation-based setup
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="w-full border-t border-border-sand bg-section-clay py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-8 sm:mb-10">
              <div className="mb-2 font-headline text-xs font-semibold uppercase tracking-[0.2em] text-accent-ochre-dark">
                The problem
              </div>
              <h2 className="font-headline text-3xl font-medium tracking-tight text-ink">
                {solution.problemTitle}
              </h2>
              <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-ink-muted">
                {solution.problemDescription}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {solution.problemPoints.map((point, i) => (
                <div
                  key={point}
                  className="rounded-lg border border-border-sand bg-surface-card p-7 transition-colors hover:border-border-taupe"
                >
                  <div className="mb-3 font-headline text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    Issue {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="font-body text-sm leading-relaxed text-ink">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Architecture & How It Runs Section */}
        <section className="w-full border-t border-border-sand bg-section-sand py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-8 sm:mb-10">
              <div className="mb-2 font-headline text-xs font-semibold uppercase tracking-[0.2em] text-accent-ochre-dark">
                How it runs
              </div>
              <h2 className="font-headline text-3xl font-medium tracking-tight text-ink">
                {solution.solutionTitle}
              </h2>
              <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-ink-muted">
                {solution.solutionDescription}
              </p>
            </div>
            <ol className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {solution.steps.map((st, i) => (
                <li
                  key={st.title}
                  className="flex flex-col justify-between rounded border border-border-sand bg-surface-card p-6"
                >
                  <div>
                    <div className="mb-4 font-headline text-xs font-semibold uppercase tracking-wider text-accent-ochre-dark">
                      Step {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mb-2 font-headline text-base font-medium text-ink">
                      {st.title}
                    </h3>
                  </div>
                  <p className="font-body text-sm leading-relaxed text-ink-muted">
                    {st.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Rules & Limitations Section */}
        <section className="w-full border-t border-border-sand bg-section-cream py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="rounded-lg border border-border-sand bg-surface-card p-8 sm:p-10">
              <div className="mb-6 flex items-center gap-3">
                <AlertCircle size={20} className="text-accent-ochre" aria-hidden="true" />
                <h2 className="font-headline text-2xl font-medium tracking-tight text-ink">
                  {solution.rulesTitle}
                </h2>
              </div>
              <ul className="space-y-4">
                {solution.rules.map((rule) => (
                  <li key={rule} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-ochre" />
                    <span className="font-body text-sm leading-relaxed text-ink-muted">
                      {rule}
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
              {solution.faq.map((f) => (
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
                  {solution.ctaTitle}
                </h2>
                <p className="font-body text-sm leading-relaxed text-section-cream">
                  {solution.ctaDescription}
                </p>
              </div>
              <DiscussProjectButton
                serviceTitle={solution.title}
                label={solution.ctaButtonText}
                className="inline-flex items-center justify-center gap-2.5 rounded bg-section-cream px-7 py-3.5 font-headline text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-section-cream"
              />
            </div>
          </div>
        </section>

        {/* Related Services Section */}
        <section className="w-full border-t border-border-sand bg-section-sage py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-8 sm:mb-10">
              <div className="mb-2 font-headline text-xs font-semibold uppercase tracking-[0.2em] text-accent-ochre-dark">
                Core services
              </div>
              <h2 className="font-headline text-3xl font-medium tracking-tight text-ink">
                Related services we offer
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {solution.relatedServices.map((rel) => (
                <Link
                  key={rel.href}
                  href={rel.href}
                  className="group flex flex-col justify-between rounded-lg border border-border-sand bg-surface-card p-7 transition-all hover:border-ink hover:bg-[#EFEAE0]"
                >
                  <div>
                    <h3 className="mb-3 font-headline text-xl font-medium text-ink transition-colors group-hover:text-accent-ochre-dark">
                      {rel.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed text-ink-muted">
                      {rel.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 font-headline text-xs uppercase tracking-wider text-ink">
                    <span>Explore service</span>
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
