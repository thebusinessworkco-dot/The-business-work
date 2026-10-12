"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import { site, whatsappLink, isPlaceholder } from "@/lib/site";
import { useContactModal } from "./ContactModal";

export default function CTA() {
  const { openModal } = useContactModal();
  return (
    <section id="contact" aria-labelledby="cta-title" className="w-full border-t border-border-sand bg-surface-muted/70 py-28 md:py-36">
      <div className="mx-auto max-w-4xl space-y-8 px-6 text-center">
        <h2 id="cta-title" className="font-headline text-4xl font-medium tracking-tight text-ink sm:text-5xl lg:text-6xl">
          Let&apos;s make your business work smarter.
        </h2>
        <p className="mx-auto max-w-2xl font-body text-base leading-relaxed text-ink-muted sm:text-lg">
          Tell us how your business works. Share the problem, even if you don&apos;t know which technology you need, and we&apos;ll come back with a suggested approach.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
          <button
            onClick={() => openModal()}
            className="group inline-flex w-full items-center justify-center gap-3 rounded bg-ink px-8 py-4 font-headline text-xs font-semibold uppercase tracking-wider text-background transition-colors hover:bg-accent-ochre sm:w-auto"
          >
            <span>Send an Enquiry</span>
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
          {!isPlaceholder("whatsapp") && (
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-3 rounded border border-border-taupe bg-surface-card px-8 py-4 font-headline text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:border-ink hover:bg-[#EAE4D7] sm:w-auto"
            >
              <MessageCircle size={18} aria-hidden />
              <span>Chat on WhatsApp</span>
            </a>
          )}
        </div>
        {!isPlaceholder("email") && (
          <p className="pt-6 font-headline text-xs uppercase tracking-wider text-ink-muted">
            Or write to <a className="text-ink underline decoration-border-taupe underline-offset-4 hover:text-accent-ochre" href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        )}
        <p className="pt-2 font-body text-xs text-ink-muted">
          What you should know: Third-party costs (AI model usage, WhatsApp provider charges and hosting) are quoted separately.
        </p>
      </div>
    </section>
  );
}
