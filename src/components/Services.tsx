"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { services } from "@/content/services";
import SectionHeading from "./SectionHeading";
import { useContactModal } from "./ContactModal";

export default function Services() {
  const [openId, setOpenId] = useState<string | null>(null);
  const { openModal } = useContactModal();

  return (
    <section id="services" aria-labelledby="services-title" className="w-full border-y border-border-sand bg-surface-muted/60 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeading
          eyebrow="01 / SERVICES"
          title="Four areas. One custom solution."
          id="services-title"
          aside="These are capabilities, not fixed packages. Most clients need a combination, built around their own workflow."
        />

        <ul className="divide-y divide-border-sand">
          {services.map((s) => {
            const isOpen = openId === s.id;
            const Icon = s.icon;
            return (
              <li key={s.id} className="-mx-4 rounded px-4 transition-colors hover:bg-surface-card/60">
                <button
                  id={`service-trigger-${s.id}`}
                  type="button"
                  className="group w-full py-8 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`panel-${s.id}`}
                  onClick={() => setOpenId(isOpen ? null : s.id)}
                >
                  <span className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
                    <span className="font-headline text-xs font-semibold uppercase tracking-wider text-ink-muted transition-colors group-hover:text-ink lg:col-span-1">
                      {s.index} // 04
                    </span>
                    <span className="lg:col-span-4">
                      <span className="flex items-center gap-3">
                        <Icon size={20} className="text-accent-ochre" aria-hidden />
                        <span className="font-headline text-xl font-medium text-ink transition-colors group-hover:text-accent-ochre">{s.title}</span>
                      </span>
                      <span className="mt-2 inline-block rounded border border-border-sand bg-surface-card px-2.5 py-0.5 font-headline text-[10px] uppercase tracking-wider text-ink-muted">
                        {s.tag}
                      </span>
                    </span>
                    <span className="font-body text-sm leading-relaxed text-ink-muted lg:col-span-6">{s.summary}</span>
                    <span className="flex justify-end text-ink-muted lg:col-span-1" aria-hidden>
                      {isOpen ? <Minus size={22} /> : <Plus size={22} />}
                    </span>
                  </span>
                </button>

                <div
                  id={`panel-${s.id}`}
                  role="region"
                  aria-labelledby={`service-trigger-${s.id}`}
                  hidden={!isOpen}
                  className="pb-8"
                >
                  <div className="grid grid-cols-1 gap-6 rounded border border-border-sand bg-surface-card p-6 md:grid-cols-3">
                    <div>
                      <div className="mb-2 font-headline text-xs uppercase tracking-wider text-ink-muted">Problem it solves</div>
                      <p className="font-body text-sm leading-relaxed text-ink">{s.solves}</p>
                    </div>
                    <div>
                      <div className="mb-2 font-headline text-xs uppercase tracking-wider text-ink-muted">Capabilities</div>
                      <ul className="list-disc space-y-1 pl-4 font-body text-sm leading-relaxed text-ink">
                        {s.capabilities.map((c) => <li key={c}>{c}</li>)}
                      </ul>
                    </div>
                    <div>
                      <div className="mb-2 font-headline text-xs uppercase tracking-wider text-ink-muted">Depends on</div>
                      <p className="font-body text-sm leading-relaxed text-ink">{s.depends}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link
                      href={`/services/${s.id}`}
                      className="inline-flex items-center gap-2 font-headline text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:text-accent-ochre"
                    >
                      <span>Read about {s.title}</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 border border-border-sand bg-surface-card p-6 sm:flex-row sm:items-center md:p-8">
          <div className="max-w-2xl">
            <div className="mb-2 font-headline text-xs font-semibold uppercase tracking-[0.2em] text-accent-ochre">Custom solutions</div>
            <p className="font-body text-sm leading-relaxed text-ink sm:text-base">
              Not sure which one you need? Describe the problem. We&apos;ll recommend the simplest solution, which may combine WhatsApp, AI, a CRM and a calendar, or be just one small workflow.
            </p>
          </div>
          <button onClick={() => openModal()} className="shrink-0 bg-ink px-6 py-3.5 font-headline text-xs font-semibold uppercase tracking-wider text-background transition-colors hover:bg-accent-ochre">
            Discuss Your Project
          </button>
        </div>
      </div>
    </section>
  );
}
