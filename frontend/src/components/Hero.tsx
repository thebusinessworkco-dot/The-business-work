"use client";

import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { useContactModal } from "./ContactModal";

export default function Hero() {
  const { openModal } = useContactModal();

  return (
    <section aria-labelledby="hero-title" className="relative w-full overflow-hidden bg-[#FAF7E8] pt-12 pb-16 sm:pt-20 sm:pb-24">
      {/* Hero Content Container */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 text-center z-10">
        
        {/* Eyebrow Label: Dark, bold, crisp */}
        <div className="mb-2 sm:mb-3 inline-block font-headline text-[11px] sm:text-xs font-bold uppercase tracking-[0.24em] text-[#141413]">
          THE <span className="text-[#E4572E]">BUSINESS</span> WORK AUTOMATION
        </div>

        {/* Main Serif Headline: Dark, larger, prominent */}
        <h1
          id="hero-title"
          className="mx-auto max-w-4xl font-serif text-[38px] sm:text-5xl md:text-6xl lg:text-[70px] font-medium leading-[1.08] tracking-tight text-[#141413]"
        >
          We make <span className="text-[#E4572E]">business</span> simpler,
          <span className="block italic mt-1 font-normal">just automate.</span>
        </h1>

        {/* CTA Buttons: Discuss Your Project + Try Demo on WhatsApp */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center justify-center gap-3">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={() => openModal(undefined, "hero")}
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl sm:rounded-lg border-2 border-[#141413] bg-[#EBDDFE] px-7 sm:px-9 py-3 sm:py-3.5 font-headline text-xs sm:text-sm font-bold tracking-wide text-[#141413] shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-all hover:bg-[#E2CEFF] active:scale-[0.97] cursor-pointer"
            >
              <span className="grid grid-cols-2 gap-0.5 w-3 sm:w-3.5 h-3 sm:h-3.5">
                <span className="bg-[#141413] rounded-[0.5px]"></span>
                <span className="bg-[#141413] rounded-[0.5px]"></span>
                <span className="bg-[#141413] rounded-[0.5px]"></span>
                <span className="bg-[#141413] rounded-[0.5px]"></span>
              </span>
              <span>Discuss Your Project</span>
            </button>

            <a
              href={whatsappLink("Hi! I would like to try a live demo of The Business Work automation tools.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl sm:rounded-lg border-2 border-[#141413] bg-white px-7 sm:px-9 py-3 sm:py-3.5 font-headline text-xs sm:text-sm font-bold tracking-wide text-[#141413] shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-all hover:bg-[#F6F3EC] active:scale-[0.97] cursor-pointer"
            >
              <MessageCircle size={17} className="text-[#25D366] shrink-0" />
              <span>Try Live Demo</span>
            </a>
          </div>

          <p className="font-body text-xs sm:text-sm text-[#4A4742] font-semibold mt-1">
            Available on WhatsApp, Google Sheets, CRM, and Custom Apps
          </p>
        </div>
      </div>
    </section>
  );
}
