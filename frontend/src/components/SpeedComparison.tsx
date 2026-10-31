"use client";

import { useRef, useEffect } from "react";
import {
  MessageCircle,
  FileSpreadsheet,
  Instagram,
  Database,
  CreditCard,
} from "lucide-react";

export default function SpeedComparison() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative w-full z-20">
      {/* 1. Light Marquee Banner: "CONNECTS WITH YOUR DAILY APPS & TOOLS" */}
      <div className="relative w-full border-y border-[#E8E2D5] bg-[#FAF7E8] py-8 sm:py-10 text-[#141413] overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 text-center mb-5 sm:mb-6">
          <p className="font-headline text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#7A756D]">
            CONNECTS WITH YOUR DAILY APPS &amp; TOOLS
          </p>
        </div>

        {/* Marquee Track with gradient fade on left and right */}
        <div className="relative w-full overflow-hidden">
          {/* Gradient Edge Masks for smooth fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#FAF7E8] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#FAF7E8] to-transparent z-10" />

          {/* Infinite Moving Marquee Row */}
          <div className="animate-logo-marquee flex items-center gap-10 sm:gap-14 select-none opacity-90 hover:opacity-100 transition-opacity">
            {/* Set 1 */}
            <div className="flex items-center gap-10 sm:gap-14 shrink-0">
              {/* WhatsApp Business */}
              <div className="flex items-center gap-2 text-[#141413] font-headline text-sm sm:text-base font-semibold">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366]/20 text-[#15803D]">
                  <MessageCircle size={16} />
                </span>
                <span>WhatsApp <span className="text-[#E4572E]">Business</span></span>
              </div>

              {/* Google Sheets */}
              <div className="flex items-center gap-2 text-[#141413] font-headline text-sm sm:text-base font-semibold">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#34A853]/20 text-[#15803D]">
                  <FileSpreadsheet size={16} />
                </span>
                <span>Google Sheets</span>
              </div>

              {/* Instagram DM */}
              <div className="flex items-center gap-2 text-[#141413] font-headline text-sm sm:text-base font-semibold">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E1306C]/20 text-[#BE185D]">
                  <Instagram size={16} />
                </span>
                <span>Instagram DMs</span>
              </div>

              {/* Notion */}
              <div className="flex items-center gap-2 text-[#141413] font-headline text-sm sm:text-base font-semibold">
                <span className="flex h-6 w-6 items-center justify-center rounded border border-[#141413]/60 font-serif font-black text-xs text-[#141413]">
                  N
                </span>
                <span>Notion</span>
              </div>

              {/* Razorpay */}
              <div className="flex items-center gap-2 text-[#141413] font-headline text-sm sm:text-base font-semibold">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#008ECC]/15 text-[#0369A1]">
                  <CreditCard size={15} />
                </span>
                <span>Razorpay</span>
              </div>

              {/* CRM & Databases */}
              <div className="flex items-center gap-2 text-[#141413] font-headline text-sm sm:text-base font-semibold">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#141413]/10 text-[#141413]">
                  <Database size={15} />
                </span>
                <span>CRM &amp; ERP</span>
              </div>
            </div>

            {/* Set 2 (Exact Duplicate for gapless infinite marquee) */}
            <div className="flex items-center gap-10 sm:gap-14 shrink-0" aria-hidden="true">
              {/* WhatsApp Business */}
              <div className="flex items-center gap-2 text-[#141413] font-headline text-sm sm:text-base font-semibold">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366]/20 text-[#15803D]">
                  <MessageCircle size={16} />
                </span>
                <span>WhatsApp <span className="text-[#E4572E]">Business</span></span>
              </div>

              {/* Google Sheets */}
              <div className="flex items-center gap-2 text-[#141413] font-headline text-sm sm:text-base font-semibold">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#34A853]/20 text-[#15803D]">
                  <FileSpreadsheet size={16} />
                </span>
                <span>Google Sheets</span>
              </div>

              {/* Instagram DM */}
              <div className="flex items-center gap-2 text-[#141413] font-headline text-sm sm:text-base font-semibold">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E1306C]/20 text-[#BE185D]">
                  <Instagram size={16} />
                </span>
                <span>Instagram DMs</span>
              </div>

              {/* Notion */}
              <div className="flex items-center gap-2 text-[#141413] font-headline text-sm sm:text-base font-semibold">
                <span className="flex h-6 w-6 items-center justify-center rounded border border-[#141413]/60 font-serif font-black text-xs text-[#141413]">
                  N
                </span>
                <span>Notion</span>
              </div>

              {/* Razorpay */}
              <div className="flex items-center gap-2 text-[#141413] font-headline text-sm sm:text-base font-semibold">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#008ECC]/15 text-[#0369A1]">
                  <CreditCard size={15} />
                </span>
                <span>Razorpay</span>
              </div>

              {/* CRM & Databases */}
              <div className="flex items-center gap-2 text-[#141413] font-headline text-sm sm:text-base font-semibold">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#141413]/10 text-[#141413]">
                  <Database size={15} />
                </span>
                <span>CRM &amp; ERP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Expansive Make.com-style Display Showcase */}
      <div className="relative w-full bg-[#FAF7E8] py-10 sm:py-16 lg:py-20 text-[#141413] overflow-hidden">
        <div className="relative mx-auto w-full max-w-[1360px] 2xl:max-w-[1440px] px-3 sm:px-6 lg:px-8 z-10">
          {/* Main Headline */}
          <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-12">
            <div className="font-headline text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#7A756D] mb-2.5">
              SPEED &amp; ACCURACY
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-normal leading-[1.14] tracking-tight text-[#141413]">
              10x faster <span className="italic font-normal">than manual work.</span>
            </h2>
            <p className="mt-3 font-body text-sm sm:text-base text-[#555047] max-w-xl mx-auto leading-relaxed">
              Automated workflows running quietly in the background—handling leads, chats, and data while you focus on business.
            </p>
          </div>

          {/* Make.com-style Display Screen Frame */}
          <div className="w-full">
            <div className="relative w-full rounded-[20px] sm:rounded-[30px] md:rounded-[38px] lg:rounded-[42px] border-[6px] sm:border-[10px] md:border-[12px] lg:border-[14px] border-[#18181B] bg-[#18181B] shadow-[0_28px_80px_-15px_rgba(20,20,19,0.28),0_10px_30px_-10px_rgba(0,0,0,0.12)] ring-1 ring-black/20">
              <div className="relative w-full aspect-video overflow-hidden rounded-[14px] sm:rounded-[20px] md:rounded-[26px] lg:rounded-[28px] bg-[#141413]">
                <video
                  ref={videoRef}
                  src="/thebusinesswork_hero_18s_2k.mp4"
                  poster="/hero-video-poster.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
