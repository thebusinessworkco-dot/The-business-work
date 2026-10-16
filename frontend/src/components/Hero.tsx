"use client";

import { useContactModal } from "./ContactModal";

export default function Hero() {
  const { openModal } = useContactModal();

  return (
    <section aria-labelledby="hero-title" className="relative w-full overflow-hidden bg-[#FAF7E8] pt-12 pb-16 sm:pt-20 sm:pb-24">
      {/* Hero Content Container */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 text-center z-10">
        
        {/* Eyebrow Label: Dark, bold, crisp */}
        <div className="mb-2 sm:mb-3 inline-block font-headline text-[11px] sm:text-xs font-bold uppercase tracking-[0.24em] text-[#141413]">
          THE BUSINESS WORK AUTOMATION
        </div>

        {/* Main Serif Headline: Dark, larger, prominent */}
        <h1
          id="hero-title"
          className="mx-auto max-w-4xl font-serif text-[38px] sm:text-5xl md:text-6xl lg:text-[70px] font-medium leading-[1.08] tracking-tight text-[#141413]"
        >
          We make business simpler,
          <span className="block italic mt-1 font-normal">just automate.</span>
        </h1>

        {/* Subtitle: Darker text, slightly bigger, high legibility */}
        <p className="mx-auto mt-3.5 sm:mt-5 max-w-[360px] sm:max-w-xl md:max-w-2xl font-body text-[15px] sm:text-lg md:text-xl leading-relaxed text-[#141413] font-medium">
          We build simple tools for your business. They reply to customers on WhatsApp,
          save your leads, and sync your daily work automatically.
        </p>

        {/* CTA Button */}
        <div className="mt-6 sm:mt-8 flex flex-col items-center justify-center gap-2.5">
          <button
            onClick={() => openModal(undefined, "hero")}
            className="group inline-flex items-center justify-center gap-2.5 rounded-xl sm:rounded-lg border-2 border-[#141413] bg-[#EBDDFE] px-7 sm:px-9 py-3 sm:py-3.5 font-headline text-xs sm:text-sm font-bold tracking-wide text-[#141413] shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-all hover:bg-[#E2CEFF] active:scale-[0.97] cursor-pointer"
          >
            <span className="grid grid-cols-2 gap-0.5 w-3 sm:w-3.5 h-3 sm:h-3.5">
              <span className="bg-[#141413] rounded-[0.5px]"></span>
              <span className="bg-[#141413] rounded-[0.5px]"></span>
              <span className="bg-[#141413] rounded-[0.5px]"></span>
              <span className="bg-[#141413] rounded-[0.5px]"></span>
            </span>
            <span>Discuss Your Project</span>
          </button>

          <p className="font-body text-xs sm:text-sm text-[#4A4742] font-semibold">
            Available on WhatsApp, Google Sheets, CRM, and Custom Apps
          </p>
        </div>
      </div>
    </section>
  );
}
