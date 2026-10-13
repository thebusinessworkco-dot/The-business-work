"use client";

import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { useContactModal } from "./ContactModal";

const rows = [
  { sys: "STEP 01 // ENQUIRIES", name: "WhatsApp & Website Enquiries", result: "Answered & Saved", strong: true },
  { sys: "STEP 02 // DAILY WORK", name: "Forms, Sheets & Business Apps", result: "Synced Automatically", strong: false },
  { sys: "STEP 03 // NEW SALES", name: "Lead Follow-ups & Customer List", result: "Scheduled Follow-ups", strong: true },
];

export default function Hero() {
  const { openModal } = useContactModal();
  return (
    <section aria-labelledby="hero-title" className="w-full bg-section-cream">
      <div className="mx-auto max-w-7xl px-6 pt-6 pb-8 sm:pt-8 sm:pb-10 md:pt-10 md:pb-12 lg:pt-12 lg:pb-12 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="space-y-8 lg:col-span-7">
          <h1 id="hero-title" className="text-balance font-headline text-4xl font-medium leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[62px]">
            We Make Business Simpler.
          </h1>
          <p className="max-w-[620px] font-body text-base leading-relaxed text-ink-muted sm:text-lg">
            We build simple tools for your business. They answer customers on WhatsApp, keep a list of your leads, and send reminders for you.
          </p>
          <p className="max-w-[620px] font-body text-sm leading-relaxed text-ink-muted">
            They fit your daily work. We add a clear way for a person to step in.
          </p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            <button
              onClick={() => openModal(undefined, "hero")}
              className="group inline-flex items-center justify-center gap-2.5 bg-ink px-6 sm:px-7 py-3.5 font-headline text-xs font-semibold uppercase tracking-wider text-background transition-colors hover:bg-accent-ochre"
            >
              <span>Discuss Your Project</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-full border border-border-taupe bg-surface-card px-6 sm:px-7 py-3.5 font-headline text-xs font-medium uppercase tracking-wider text-ink transition-all hover:border-ink hover:bg-[#EFEAE0]"
            >
              See services
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-6 border-t border-border-sand pt-6 font-headline text-[12px] uppercase tracking-wider text-ink-muted">
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-accent-ochre" />Made for your business</span>
            <span className="hidden text-border-taupe sm:inline">•</span>
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-ink" />A person can step in</span>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-lg border border-border-sand bg-surface-card p-7 shadow-[0_4px_24px_-8px_rgba(24,23,22,0.06)] sm:p-8">
            <div className="mb-6 flex items-center justify-between border-b border-border-sand pb-5">
              <div className="flex items-center gap-2.5">
                <div className="h-2 w-2 bg-ink" />
                <span className="font-headline text-xs font-semibold uppercase tracking-[0.16em] text-ink">How Your Tools Connect</span>
              </div>
              <span className="rounded border border-border-sand bg-surface-muted px-2 py-0.5 font-headline text-[10px] uppercase tracking-wider text-ink-muted">Example</span>
            </div>
            <div className="space-y-4">
              {rows.map((r) => (
                <div key={r.sys} className="rounded border border-border-sand/80 bg-background p-4 transition-colors hover:border-border-taupe">
                  <div className="mb-2 font-headline text-[11px] uppercase tracking-wider text-ink-faint">{r.sys}</div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-headline text-sm font-medium text-ink">{r.name}</div>
                    <span aria-hidden className="font-mono text-border-taupe">➔</span>
                    <div className={`rounded border border-border-sand bg-surface-card px-2.5 py-1 font-body text-xs font-semibold ${r.strong ? "text-accent-ochre" : "text-ink"}`}>
                      {r.result}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-border-sand pt-4 font-headline text-[11px] uppercase tracking-wider text-ink-muted">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent-ochre" />Less repeat work</span>
              <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-ink" />A person can step in</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
}
