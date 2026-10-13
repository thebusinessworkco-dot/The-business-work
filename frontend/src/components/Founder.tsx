"use client";

import { site, whatsappLink } from "@/lib/site";
import { MessageCircle, Instagram } from "lucide-react";

export default function Founder() {
  return (
    <section
      id="founder"
      aria-labelledby="founder-title"
      className="w-full border-t border-border-sand bg-section-cream py-8 sm:py-10 md:py-12"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12">
          {/* Initials treatment */}
          <div className="flex items-center justify-center md:col-span-3">
            <div className="flex h-28 w-28 items-center justify-center rounded-lg border border-border-sand bg-ink text-background shadow-sm">
              <span className="font-headline text-4xl font-semibold tracking-wider">
                AR
              </span>
            </div>
          </div>

          {/* Copy */}
          <div className="space-y-5 md:col-span-9">
            <div className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-accent-ochre">
              Who&apos;s behind {site.name}
            </div>
            <h2
              id="founder-title"
              className="font-headline text-2xl font-medium tracking-tight text-ink sm:text-3xl"
            >
              {site.founder}
            </h2>
            <p className="max-w-2xl font-body text-sm leading-relaxed text-ink-muted sm:text-base">
              I am {site.founder}, founder of {site.name}. I build simple tools
              for businesses in India.
            </p>
            <p className="max-w-2xl font-body text-sm leading-relaxed text-ink-muted sm:text-base">
              I learn how your daily work runs, pick one real problem, and build
              a fix. We add a clear way for a person to step in.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-1.5 font-headline text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:text-accent-ochre"
              >
                <span>{site.email}</span>
              </a>
              <span className="text-border-taupe">•</span>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-headline text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:text-accent-ochre"
              >
                <MessageCircle size={14} aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
              <span className="text-border-taupe">•</span>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-headline text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:text-accent-ochre"
              >
                <Instagram size={14} aria-hidden="true" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
