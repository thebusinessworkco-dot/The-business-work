"use client";

import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import { useContactModal } from "./ContactModal";

export default function DemoCTA() {
  const { openModal } = useContactModal();

  return (
    <section
      id="demo-cta"
      aria-labelledby="demo-cta-heading"
      className="relative w-full overflow-hidden border-t border-[#E8E2D5] bg-[#FAF7E8] py-14 text-[#141413] sm:py-20 md:py-24"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EBDDFE]/40 blur-[100px] sm:h-[500px] sm:w-[500px] sm:blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl space-y-4 px-4 text-center sm:space-y-6 sm:px-6 lg:px-12">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#DCD6C7] bg-white px-3.5 py-1 font-headline text-[10px] uppercase tracking-widest text-[#7A756D] shadow-2xs sm:gap-2 sm:px-4 sm:py-1.5 sm:text-xs">
          <Sparkles size={12} className="text-[#6D32A8]" aria-hidden="true" />
          <span>CUSTOM DIGITAL SYSTEMS</span>
        </div>

        <h2
          id="demo-cta-heading"
          className="font-serif text-2xl font-normal leading-[1.14] tracking-tight text-[#141413] sm:text-4xl md:text-[44px] lg:text-[48px]"
        >
          Want something like this for your <span className="text-[#E4572E]">business</span>?
        </h2>

        <p className="mx-auto max-w-2xl font-body text-sm leading-relaxed text-[#555047] sm:text-base md:text-lg">
          We build practical digital systems around the way your business works.
        </p>

        <div className="flex flex-col flex-wrap items-center justify-center gap-2.5 pt-2 sm:flex-row sm:gap-3">
          <button
            type="button"
            onClick={() => openModal(undefined, "demo-cta")}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#141413] bg-[#EBDDFE] px-7 py-3 font-headline text-xs font-bold tracking-wide text-[#141413] shadow-xs transition-all hover:bg-[#E2CEFF] active:scale-[0.98] sm:w-auto sm:text-sm"
          >
            <span className="grid h-3 w-3 grid-cols-2 gap-0.5" aria-hidden="true">
              <span className="rounded-[0.5px] bg-[#141413]" />
              <span className="rounded-[0.5px] bg-[#141413]" />
              <span className="rounded-[0.5px] bg-[#141413]" />
              <span className="rounded-[0.5px] bg-[#141413]" />
            </span>
            <span>Discuss Your Project</span>
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </button>

          <a
            href={whatsappLink(
              "Hi! I explored the live demos on your website and want to discuss building something similar for my business."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#141413] bg-white px-6 py-3 font-headline text-xs font-bold text-[#141413] shadow-xs transition-all hover:bg-[#FAF7E8] active:scale-[0.98] sm:w-auto sm:text-sm"
          >
            <MessageCircle size={16} className="text-[#25D366]" aria-hidden="true" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <p className="pt-2 font-body text-[11px] text-[#7A756D] sm:pt-3 sm:text-xs">
          Or write directly to{" "}
          <a
            className="font-medium text-[#141413] underline decoration-[#141413]/30 underline-offset-4 hover:text-[#6D32A8]"
            href={`mailto:${site.emails.sales}`}
          >
            {site.emails.sales}
          </a>{" "}
          · {site.location}
        </p>
      </div>
    </section>
  );
}
