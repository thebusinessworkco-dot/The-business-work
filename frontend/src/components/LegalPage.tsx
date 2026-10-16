import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { LegalSection } from "@/content/legal/types";
import { hasUnresolvedPlaceholders } from "@/lib/legal";
import { AlertTriangle, ArrowLeft } from "lucide-react";

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
  summaryNote?: string;
}

export default function LegalPage({
  title,
  lastUpdated,
  sections,
  summaryNote,
}: LegalPageProps) {
  const isDraft = hasUnresolvedPlaceholders(sections);

  return (
    <>
      <Header />
      <main id="main" className="w-full pt-28 md:pt-32 bg-[#FAF8F5]">
        <div className="mx-auto max-w-4xl px-6 pb-24 lg:px-12">
          {/* Back link */}
          <div className="mb-8 border-b border-border-sand pb-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-headline text-xs uppercase tracking-wider text-ink-muted transition-colors hover:text-ink"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              <span>Back to home</span>
            </Link>
          </div>

          {/* Draft banner if unresolved placeholders exist */}
          {isDraft && (
            <div
              role="alert"
              className="mb-10 rounded-lg border border-[#C4823F]/40 bg-[#FDFBF7] p-5 text-ink shadow-sm"
            >
              <div className="flex items-start gap-3.5">
                <AlertTriangle
                  size={20}
                  className="mt-0.5 shrink-0 text-accent-ochre"
                  aria-hidden="true"
                />
                <div className="space-y-1">
                  <div className="font-headline text-xs font-semibold uppercase tracking-wider text-accent-ochre">
                    DRAFT: not yet reviewed by a lawyer
                  </div>
                  <p className="font-body text-sm leading-relaxed text-ink-muted">
                    This document is a technical and operational draft reflecting what our software
                    currently collects and does. It contains highlighted placeholders (marked with{" "}
                    <code className="rounded bg-surface-muted px-1.5 py-0.5 font-mono text-xs text-ink">
                      [[TO CONFIRM: ...]]
                    </code>
                    ) that must be reviewed, confirmed, and finalized by a qualified legal professional
                    prior to public deployment.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Page Heading & Meta */}
          <div className="space-y-4">
            <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-[#141413]">
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 font-headline text-xs uppercase tracking-wider text-ink-muted">
              <span>Last updated: {lastUpdated}</span>
              <span>·</span>
              <span>The Business Work</span>
            </div>
            {summaryNote && (
              <p className="font-body text-base leading-relaxed text-ink-muted">
                {summaryNote}
              </p>
            )}
          </div>

          {/* Table of Contents */}
          <nav
            aria-label="Table of contents"
            className="my-10 rounded-lg border border-border-sand bg-surface-card p-6"
          >
            <div className="mb-4 font-headline text-xs font-semibold uppercase tracking-wider text-accent-ochre">
              Table of Contents
            </div>
            <ol className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="font-body text-sm text-ink-muted transition-colors hover:text-ink hover:underline hover:decoration-border-taupe hover:underline-offset-2"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Content Sections */}
          <article className="max-w-3xl space-y-12">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`heading-${section.id}`}
                className="scroll-mt-24 space-y-4 border-b border-border-sand/60 pb-10 last:border-b-0"
              >
                <h2
                  id={`heading-${section.id}`}
                  className="font-headline text-2xl font-medium tracking-tight text-ink"
                >
                  {section.heading}
                </h2>

                {section.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className="font-body text-base leading-relaxed text-ink"
                  >
                    {p}
                  </p>
                ))}

                {section.list && section.list.length > 0 && (
                  <ul className="space-y-3 pt-2">
                    {section.list.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-ochre" />
                        <span className="font-body text-sm leading-relaxed text-ink">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
