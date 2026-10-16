"use client";

import { MessageCircle, FileSpreadsheet, Instagram, Database, CreditCard, CheckCheck, Phone, MoreVertical, Smile, Mic } from "lucide-react";

export default function SpeedComparison() {
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
                <span>WhatsApp Business</span>
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
                <span>WhatsApp Business</span>
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

      {/* 2. Light Comparison Section: "10x faster than manual work" */}
      <div className="relative w-full bg-[#FAF7E8] py-10 sm:py-14 lg:py-16 text-[#141413] overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 z-10">

          {/* Main Headline */}
          <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-9">
            <div className="font-headline text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#7A756D] mb-2.5">
              SPEED &amp; ACCURACY
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-normal leading-[1.14] tracking-tight text-[#141413]">
              10x faster <span className="italic font-normal">than manual work.</span>
            </h2>
          </div>

          {/* Two Clean, Easy-to-Read Comparison Cards: 50/50 Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-7 items-stretch max-w-5xl mx-auto">

            {/* Left Card: Doing it by Hand (Manual) */}
            <div className="rounded-[24px] sm:rounded-[28px] border border-[#DDD6C5] bg-[#EDE7DA] p-5 sm:p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-headline text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#7A756D]">
                    DOING IT BY HAND
                  </span>
                  <span className="text-[9.5px] sm:text-[10px] font-mono font-semibold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full border border-rose-200">
                    Slow &amp; Tiring
                  </span>
                </div>

                <div className="mt-2.5 font-serif text-2xl sm:text-3xl font-normal text-[#141413]">
                  4+ <span className="text-lg sm:text-xl text-[#7A756D] font-serif italic">hours lost / day</span>
                </div>

                {/* 3 Clear Pain Points */}
                <div className="mt-4 space-y-2.5">
                  <div className="flex items-center gap-2.5 text-xs sm:text-[13px] font-body text-[#2D2A26] bg-white p-2.5 sm:p-3 rounded-xl border border-[#E0DACB] shadow-2xs">
                    <span className="text-rose-500 font-bold shrink-0">✕</span>
                    <span>Copying phone numbers into Excel one by one</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-[13px] font-body text-[#2D2A26] bg-white p-2.5 sm:p-3 rounded-xl border border-[#E0DACB] shadow-2xs">
                    <span className="text-rose-500 font-bold shrink-0">✕</span>
                    <span>Typing the same price and brochure messages all day</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-[13px] font-body text-[#2D2A26] bg-white p-2.5 sm:p-3 rounded-xl border border-[#E0DACB] shadow-2xs">
                    <span className="text-rose-500 font-bold shrink-0">✕</span>
                    <span>Forgetting to call back interested buyers</span>
                  </div>
                </div>
              </div>

              {/* Clean Footer Note */}
              <div className="mt-5 pt-3.5 border-t border-[#DDD6C5] flex items-center justify-between text-[11px] sm:text-xs text-[#7A756D] font-headline">
                <span>Slow replies &amp; lost customers</span>
                <span className="text-rose-700 font-mono font-semibold">Lost time</span>
              </div>
            </div>

            {/* Right Card: With Our Automation (The Business Work) */}
            <div className="rounded-[24px] sm:rounded-[28px] border-2 border-emerald-500/40 bg-white p-5 sm:p-6 flex flex-col justify-between shadow-md relative overflow-hidden">

              <div>
                <div className="flex items-center justify-between relative z-10">
                  <span className="font-headline text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-800">
                    WITH OUR AUTOMATION
                  </span>
                  <span className="text-[9.5px] sm:text-[10px] font-mono font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Auto-Pilot
                  </span>
                </div>

                <div className="mt-2.5 font-serif text-2xl sm:text-3xl font-normal text-[#141413] relative z-10">
                  &lt; 15 <span className="text-lg sm:text-xl text-emerald-700 font-serif italic">second reply</span>
                </div>

                {/* Authentic WhatsApp Chat Mockup (Light Theme) */}
                <div className="mt-4 rounded-xl bg-[#EFEAE2] border border-[#DDD6C5] overflow-hidden shadow-sm relative z-10">

                  {/* WhatsApp Top Header Bar */}
                  <div className="bg-[#008069] px-3 py-2 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      {/* Avatar */}
                      <div className="relative">
                        <div className="h-7 w-7 rounded-full bg-[#00A884] flex items-center justify-center text-white font-bold text-xs shadow-xs">
                          <MessageCircle size={14} />
                        </div>
                        <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-[#25D366] ring-1 ring-white" />
                      </div>
                      <div>
                        <div className="font-headline text-xs font-semibold text-white flex items-center gap-1">
                          <span>The Business Work</span>
                          <span className="text-emerald-200 text-[10px]" title="Verified Business">✓</span>
                        </div>
                        <div className="font-body text-[9.5px] text-emerald-100 flex items-center gap-1">
                          <span>online • Business Account</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 text-white/80">
                      <Phone size={13} className="hover:text-white transition-colors cursor-pointer" />
                      <MoreVertical size={13} className="hover:text-white transition-colors cursor-pointer" />
                    </div>
                  </div>

                  {/* Chat Messages Area */}
                  <div className="p-3 space-y-2 bg-[#EFEAE2]">

                    {/* Date Pill */}
                    <div className="flex justify-center">
                      <span className="rounded-md bg-white/90 px-2 py-0.5 text-[9.5px] font-medium text-[#54656F] shadow-2xs border border-[#DDD6C5]/60">
                        Today
                      </span>
                    </div>

                    {/* Customer Incoming Bubble (Left aligned) */}
                    <div className="flex flex-col items-start max-w-[90%] sm:max-w-[85%]">
                      <div className="rounded-xl rounded-tl-xs bg-white px-3 py-1.5 text-[#111B21] shadow-xs border border-black/5">
                        <p className="font-body text-xs text-[#111B21] leading-relaxed">
                          Hi! What are your pricing plans and when can we schedule a demo?
                        </p>
                        <div className="flex justify-end mt-0.5">
                          <span className="font-mono text-[9px] text-[#667781]">10:24 AM</span>
                        </div>
                      </div>
                    </div>

                    {/* AI Agent Automated Reply (Right aligned, signature WhatsApp green bubble) */}
                    <div className="flex flex-col items-end max-w-[90%] sm:max-w-[88%] ml-auto">
                      <div className="rounded-xl rounded-tr-xs bg-[#D9FDD3] px-3 py-1.5 text-[#111B21] shadow-xs border border-[#C2ECC0]">
                        <div className="flex items-center gap-1 text-[9.5px] font-headline text-emerald-800 mb-0.5 font-bold">
                          <span>⚡ Instant AI Reply (15s)</span>
                        </div>
                        <p className="font-body text-xs text-[#111B21] leading-relaxed">
                          Here is our service guide &amp; packages! You can pick a demo slot directly:{" "}
                          <span className="underline decoration-emerald-600 text-emerald-800 font-medium">thebusinesswork.co/demo</span>
                        </p>
                        <div className="flex items-center justify-end gap-1 mt-0.5">
                          <span className="font-mono text-[9px] text-[#667781]">10:24 AM</span>
                          <CheckCheck size={12} className="text-[#53BDEB]" />
                        </div>
                      </div>
                    </div>

                    {/* System Action Notice */}
                    <div className="flex justify-center pt-0.5">
                      <div className="rounded-md bg-white/95 px-2.5 py-1 text-[10px] font-mono text-emerald-800 border border-[#DDD6C5] flex items-center gap-1 shadow-2xs">
                        <span className="text-amber-500">⚡</span>
                        <span>Lead synced to Google Sheets • Follow-up set</span>
                        <span className="text-emerald-600 font-bold ml-0.5">✓</span>
                      </div>
                    </div>

                  </div>

                  {/* WhatsApp Bottom Bar */}
                  <div className="bg-[#F0F2F5] px-2.5 py-1.5 flex items-center gap-2 border-t border-[#E9EDEF]">
                    <div className="text-[#54656F]">
                      <Smile size={14} />
                    </div>
                    <div className="flex-1 rounded-md bg-white px-2.5 py-1 text-[11px] text-[#8696A0] font-body flex items-center justify-between border border-[#E9EDEF]">
                      <span>Type a message</span>
                    </div>
                    <div className="h-6 w-6 rounded-full bg-[#00A884] flex items-center justify-center text-white shrink-0 shadow-xs">
                      <Mic size={12} />
                    </div>
                  </div>

                </div>
              </div>

              {/* Clean Footer Note */}
              <div className="mt-4 pt-3.5 border-t border-[#E8E2D5] flex items-center justify-between text-[11px] sm:text-xs text-emerald-800 font-headline relative z-10">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Always working
                </span>
                <span className="font-mono text-emerald-700 font-semibold">No waiting around</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
