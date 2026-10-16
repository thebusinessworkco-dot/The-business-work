import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Industries() {
  return (
    <section
      id="industries"
      aria-labelledby="industries-title"
      className="relative w-full border-y border-[#E8E2D5] bg-[#FAF7E8] py-20 sm:py-28 overflow-hidden"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 z-10">
        
        {/* Centered Editorial Header (Exact Wispr Flow Screenshot) */}
        <div className="text-center max-w-4xl mx-auto mb-14 sm:mb-20">
          <div className="inline-block font-headline text-[10px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-[#7A756D] mb-4">
            03 // SECTORS WE SUPPORT
          </div>
          <h2
            id="industries-title"
            className="font-serif text-3xl sm:text-4xl md:text-[46px] lg:text-[50px] font-normal tracking-tight text-[#141413] leading-[1.12]"
          >
            Fits into your workflow. <br className="hidden sm:inline" />
            <span className="italic font-normal">Doesn&apos;t change it.</span>
          </h2>
        </div>

        {/* 3-Column Open Grid (Exact Wispr Flow Feature Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-14 lg:gap-16 max-w-6xl mx-auto">
          
          {/* 01: Healthcare & Clinics (Circular Arrow Loop with Pulse Capsule) */}
          <div className="flex flex-col items-center text-center">
            <div className="h-20 sm:h-24 flex items-center justify-center mb-3">
              <div className="relative flex items-center justify-center w-16 h-16">
                <svg className="w-16 h-16 text-[#141413]" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                  <path
                    d="M 32 8 A 24 24 0 1 1 12 38"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 28 4 L 33 9 L 27 13"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="absolute inline-flex items-center gap-1 rounded-full bg-[#F59E0B] px-2.5 py-1.5 shadow-xs">
                  <span className="w-1 h-1 rounded-full bg-[#141413]" />
                  <span className="w-[1.5px] h-3 bg-[#141413] rounded-full" />
                  <span className="w-[1.5px] h-2 bg-[#141413] rounded-full" />
                  <span className="w-1 h-1 rounded-full bg-[#141413]" />
                </div>
              </div>
            </div>
            <h3 className="font-serif text-2xl sm:text-[26px] font-normal text-[#141413] mb-2.5">
              Healthcare &amp; clinics
            </h3>
            <p className="font-body text-xs sm:text-[13px] text-[#555047] leading-relaxed max-w-xs">
              We help clinics handle booking questions, send reminders, and alert staff. AI never gives medical advice.
            </p>
            <Link
              href="/solutions/whatsapp-appointment-booking-clinics"
              className="mt-3 inline-flex items-center gap-1 font-headline text-xs font-semibold text-[#141413] hover:text-[#6D32A8] transition-colors"
            >
              <span>See clinic booking solution</span>
              <span aria-hidden="true" className="font-bold">›</span>
            </Link>
          </div>

          {/* 02: Local Businesses (Hopping Curve over App Icons) */}
          <div className="flex flex-col items-center text-center">
            <div className="h-20 sm:h-24 flex items-center justify-center mb-3">
              <div className="relative flex flex-col items-center justify-center">
                <svg className="w-24 h-6 text-[#141413] mb-1" viewBox="0 0 96 24" fill="none" aria-hidden="true">
                  <path
                    d="M 16 20 C 24 4, 38 4, 48 20 C 58 4, 74 4, 86 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 80 8 L 88 10 L 84 16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#F59E0B] flex items-center justify-center text-[#141413] text-[9px] font-bold shadow-xs">
                    ••••
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-[#F59E0B] flex items-center justify-center text-[#141413] text-xs shadow-xs">
                    👥
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-[#F59E0B] flex items-center justify-center text-[#141413] text-xs shadow-xs">
                    💬
                  </div>
                </div>
              </div>
            </div>
            <h3 className="font-serif text-2xl sm:text-[26px] font-normal text-[#141413] mb-2.5">
              Local businesses
            </h3>
            <p className="font-body text-xs sm:text-[13px] text-[#555047] leading-relaxed max-w-xs">
              We help salons, shops and local stores answer messages, book visits, and follow up automatically.
            </p>
          </div>

          {/* 03: Sales Teams & Agencies (Pill ➔ Magnifying Glass & Sparkle) */}
          <div className="flex flex-col items-center text-center">
            <div className="h-20 sm:h-24 flex items-center justify-center mb-3">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-[#F59E0B] px-2.5 py-1.5 flex items-center gap-0.5 shadow-xs">
                  <span className="w-[1.5px] h-3 bg-[#141413] rounded-full" />
                  <span className="w-[1.5px] h-4 bg-[#141413] rounded-full" />
                  <span className="w-[1.5px] h-2 bg-[#141413] rounded-full" />
                  <span className="w-[1.5px] h-3.5 bg-[#141413] rounded-full" />
                </div>
                <span className="font-bold text-[#141413] text-sm">→</span>
                <div className="rounded-full border-2 border-[#141413] bg-[#FAF7E8] p-1.5 flex items-center justify-center relative shadow-xs">
                  <span className="text-sm">🔍</span>
                  <span className="absolute -top-1 -right-1 text-[10px] text-[#F59E0B]">✨</span>
                </div>
              </div>
            </div>
            <h3 className="font-serif text-2xl sm:text-[26px] font-normal text-[#141413] mb-2.5">
              Sales teams &amp; agencies
            </h3>
            <p className="font-body text-xs sm:text-[13px] text-[#555047] leading-relaxed max-w-xs">
              We help sales teams see who is ready to buy, save customer details, and send quick follow-ups.
            </p>
          </div>

          {/* 04: E-commerce (Package ➔ Lightning Instant Sync) */}
          <div className="flex flex-col items-center text-center">
            <div className="h-20 sm:h-24 flex items-center justify-center mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#F59E0B] flex items-center justify-center text-sm shadow-xs">
                  📦
                </div>
                <svg className="w-7 h-4 text-[#141413]" viewBox="0 0 28 16" fill="none" aria-hidden="true">
                  <path d="M 2 8 L 22 8 M 16 2 L 24 8 L 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="w-8 h-8 rounded-full border-2 border-[#141413] bg-emerald-100 flex items-center justify-center text-xs shadow-xs">
                  ⚡
                </div>
              </div>
            </div>
            <h3 className="font-serif text-2xl sm:text-[26px] font-normal text-[#141413] mb-2.5">
              E-commerce
            </h3>
            <p className="font-body text-xs sm:text-[13px] text-[#555047] leading-relaxed max-w-xs">
              We help online shops answer order questions and follow up with buyers fast.
            </p>
          </div>

          {/* 05: Real Estate (Home ➔ Calendar Visit) */}
          <div className="flex flex-col items-center text-center">
            <div className="h-20 sm:h-24 flex items-center justify-center mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#F59E0B] flex items-center justify-center text-sm shadow-xs">
                  🏠
                </div>
                <svg className="w-7 h-4 text-[#141413]" viewBox="0 0 28 16" fill="none" aria-hidden="true">
                  <path d="M 2 8 L 22 8 M 16 2 L 24 8 L 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="w-8 h-8 rounded-full border-2 border-[#141413] bg-purple-100 flex items-center justify-center text-xs shadow-xs">
                  📅
                </div>
              </div>
            </div>
            <h3 className="font-serif text-2xl sm:text-[26px] font-normal text-[#141413] mb-2.5">
              Real estate
            </h3>
            <p className="font-body text-xs sm:text-[13px] text-[#555047] leading-relaxed max-w-xs">
              We help real estate teams answer property questions, book site visits, and alert agents right away.
            </p>
          </div>

          {/* 06: Education & Coaching (Graduation ➔ Checkmark) */}
          <div className="flex flex-col items-center text-center">
            <div className="h-20 sm:h-24 flex items-center justify-center mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#F59E0B] flex items-center justify-center text-sm shadow-xs">
                  🎓
                </div>
                <svg className="w-7 h-4 text-[#141413]" viewBox="0 0 28 16" fill="none" aria-hidden="true">
                  <path d="M 2 8 L 22 8 M 16 2 L 24 8 L 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="w-8 h-8 rounded-full border-2 border-[#141413] bg-amber-100 flex items-center justify-center text-xs font-bold shadow-xs">
                  ✓
                </div>
              </div>
            </div>
            <h3 className="font-serif text-2xl sm:text-[26px] font-normal text-[#141413] mb-2.5">
              Education &amp; coaching
            </h3>
            <p className="font-body text-xs sm:text-[13px] text-[#555047] leading-relaxed max-w-xs">
              We help coaching classes answer student questions, book demo sessions, and stay in touch.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
