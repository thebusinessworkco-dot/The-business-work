"use client";

import Link from "next/link";
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

        {/* CTA Buttons: Start Your Free Trial Project + Explore Live Demos */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center justify-center gap-3">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={() => openModal(undefined, "hero")}
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl sm:rounded-lg border-2 border-[#141413] bg-[#EBDDFE] px-7 sm:px-9 py-3 sm:py-3.5 font-headline text-xs sm:text-sm font-bold tracking-wide text-[#141413] shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-all hover:bg-[#E2CEFF] active:scale-[0.97] cursor-pointer"
            >
              <span className="grid grid-cols-2 gap-0.5 w-3 sm:w-3.5 h-3 sm:h-3.5" aria-hidden="true">
                <span className="bg-[#141413] rounded-[0.5px]"></span>
                <span className="bg-[#141413] rounded-[0.5px]"></span>
                <span className="bg-[#141413] rounded-[0.5px]"></span>
                <span className="bg-[#141413] rounded-[0.5px]"></span>
              </span>
              <span>Start Your Free Trial Project</span>
            </button>

            <Link
              href="/demo"
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl sm:rounded-lg border-2 border-[#141413] bg-white px-7 sm:px-9 py-3 sm:py-3.5 font-headline text-xs sm:text-sm font-bold tracking-wide text-[#141413] shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-all hover:bg-[#F6F3EC] active:scale-[0.97] cursor-pointer"
            >
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]"></span>
              </span>
              <span>Explore Live Demos</span>
            </Link>
          </div>

          <p className="inline-flex items-center gap-2 rounded-full border border-[#E2D9C5] bg-white/80 px-4 py-1.5 font-body text-xs sm:text-sm font-semibold text-[#141413] mt-1">
            <span className="h-2 w-2 rounded-full bg-[#E4572E] shrink-0" aria-hidden="true" />
            <span>Try your workflow free first. Zero upfront cost — pay only if you love it.</span>
          </p>

          <p className="font-body text-xs sm:text-sm text-[#4A4742] font-semibold">
            Available on WhatsApp, Google Sheets, CRM, and Custom Apps
          </p>
        </div>
      </div>
    </section>
  );
}
