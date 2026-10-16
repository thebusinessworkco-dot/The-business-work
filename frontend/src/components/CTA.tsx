"use client";

import { ArrowRight, MessageCircle, Instagram, Sparkles } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import { useContactModal } from "./ContactModal";

export default function CTA() {
  const { openModal } = useContactModal();

  return (
    <section id="contact" aria-labelledby="cta-title" className="relative w-full overflow-hidden bg-[#FAF7E8] border-t border-[#E8E2D5] text-[#141413] py-10 sm:py-16 md:py-20">
      {/* Subtle ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] sm:h-[500px] sm:w-[500px] rounded-full bg-[#EBDDFE]/40 blur-[100px] sm:blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-4xl space-y-4 sm:space-y-6 px-4 sm:px-6 lg:px-12 text-center z-10">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#DCD6C7] bg-white px-3.5 py-1 sm:px-4 sm:py-1.5 font-headline text-[10px] sm:text-xs uppercase tracking-widest text-[#7A756D] shadow-xs">
          <Sparkles size={12} className="text-[#6D32A8]" />
          <span>START SAVING HOURS EVERY WEEK</span>
        </div>

        <h2 id="cta-title" className="font-serif text-2xl sm:text-4xl md:text-[44px] lg:text-[48px] font-normal tracking-tight text-[#141413] leading-[1.14]">
          Ready to make business simpler,
          <span className="block italic mt-0.5 sm:mt-1 font-normal text-[#141413]">just automate.</span>
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 pt-1 sm:pt-2 flex-wrap">
          <button
            onClick={() => openModal(undefined, "cta")}
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-[#141413] bg-[#EBDDFE] px-6 sm:px-7 py-2.5 sm:py-3.5 font-headline text-xs sm:text-sm font-semibold tracking-wide text-[#141413] shadow-xs transition-all hover:bg-[#E2CEFF] active:scale-[0.98]"
          >
            <span className="grid grid-cols-2 gap-0.5 w-3 h-3">
              <span className="bg-[#141413] rounded-[0.5px]"></span>
              <span className="bg-[#141413] rounded-[0.5px]"></span>
              <span className="bg-[#141413] rounded-[0.5px]"></span>
              <span className="bg-[#141413] rounded-[0.5px]"></span>
            </span>
            <span>Discuss Your Project</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-[#DCD6C7] bg-white px-5 sm:px-6 py-2.5 sm:py-3.5 font-headline text-xs sm:text-sm font-semibold text-[#141413] shadow-xs transition-all hover:bg-[#FAF7E8] active:scale-[0.98]"
          >
            <MessageCircle size={15} className="text-[#25D366]" aria-hidden="true" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-[#DCD6C7] bg-white px-5 sm:px-6 py-2.5 sm:py-3.5 font-headline text-xs sm:text-sm font-semibold text-[#141413] shadow-xs transition-all hover:bg-[#FAF7E8] active:scale-[0.98]"
          >
            <Instagram size={15} className="text-[#E1306C]" aria-hidden="true" />
            <span>Follow on Instagram</span>
          </a>
        </div>

        <p className="pt-2 sm:pt-3 font-body text-[11px] sm:text-xs text-[#7A756D]">
          Or write directly to{" "}
          <a
            className="text-[#141413] font-medium underline decoration-[#141413]/30 underline-offset-4 hover:text-[#6D32A8]"
            href={`mailto:${site.email}`}
          >
            {site.email}
          </a>{" "}
          · {site.location}
        </p>
      </div>
    </section>
  );
}
