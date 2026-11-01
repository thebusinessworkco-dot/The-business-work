"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Industries() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let ticking = false;
    let lastBg = "";

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Only interpolate when exiting towards Principles at the bottom
      if (rect.bottom < vh * 0.50) {
        const p = Math.max(0, Math.min(1, rect.bottom / (vh * 0.50)));
        const r = Math.round(250 + (34 - 250) * p);
        const g = Math.round(247 + (11 - 247) * p);
        const b = Math.round(232 + (5 - 232) * p);
        const bg = `rgb(${r},${g},${b})`;
        if (bg !== lastBg) {
          lastBg = bg;
          el.style.backgroundColor = bg;
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Premium Dark Chocolate theme (#220B05)
  const currentText = "#FFFFFF";
  const currentBadge = "#F59E0B";
  const cardBg = "rgba(45, 16, 7, 0.60)";
  const cardBorder = "rgba(74, 32, 20, 0.80)";
  const isDarkTone = true;

  return (
    <section
      ref={sectionRef}
      id="industries"
      aria-labelledby="industries-title"
      className="relative w-full border-0 border-transparent bg-[#220B05] text-white pt-8 sm:pt-16 pb-16 sm:pb-24 overflow-hidden"
    >
      {/* Subtle Ambient Warm Light */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{ opacity: 1 }}
      >
        <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-[#EA580C]/15 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-[#F59E0B]/12 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 z-10">
        {/* Centered Editorial Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
          <div
            className="inline-block font-headline text-[10px] sm:text-xs font-semibold uppercase tracking-[0.24em] mb-4"
            style={{ color: currentBadge }}
          >
            03 // SECTORS WE SUPPORT
          </div>
          <h2
            id="industries-title"
            className="font-serif text-3xl sm:text-4xl md:text-[46px] lg:text-[50px] font-normal tracking-tight leading-[1.12]"
            style={{ color: currentText }}
          >
            Fits into your workflow. <br className="hidden sm:inline" />
            <span className="italic font-normal">Doesn&apos;t change it.</span>
          </h2>
        </div>

        {/* 3-Column Dynamic Theme Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 max-w-6xl mx-auto">
          {/* 01: Healthcare & Clinics */}
          <div
            className="flex flex-col items-center text-center rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 border transition-all duration-300 shadow-xs group"
            style={{
              backgroundColor: cardBg,
              borderColor: cardBorder,
            }}
          >
            <div className="h-20 sm:h-24 flex items-center justify-center mb-3">
              <div className="relative flex items-center justify-center w-16 h-16">
                <svg
                  className="w-16 h-16 transition-colors duration-300"
                  style={{ color: currentText }}
                  viewBox="0 0 64 64"
                  fill="none"
                  aria-hidden="true"
                >
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
            <h3
              className="font-serif text-2xl sm:text-[26px] font-normal mb-2.5"
              style={{ color: currentText }}
            >
              Healthcare &amp; clinics
            </h3>
            <p
              className="font-body text-xs sm:text-[13px] leading-relaxed max-w-xs transition-colors duration-300"
              style={{ color: isDarkTone ? "#D5CEBB" : "#555047" }}
            >
              We help clinics handle booking questions, send reminders, and alert staff. AI never gives medical advice.
            </p>
            <Link
              href="/solutions/whatsapp-appointment-booking-clinics"
              className="mt-4 inline-flex items-center gap-1 font-headline text-xs font-semibold transition-colors duration-300"
              style={{ color: isDarkTone ? "#F59E0B" : "#141413" }}
            >
              <span>See clinic booking solution</span>
              <span aria-hidden="true" className="font-bold">›</span>
            </Link>
          </div>

          {/* 02: Local Businesses */}
          <div
            className="flex flex-col items-center text-center rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 border transition-all duration-300 shadow-xs group"
            style={{
              backgroundColor: cardBg,
              borderColor: cardBorder,
            }}
          >
            <div className="h-20 sm:h-24 flex items-center justify-center mb-3">
              <div className="relative flex flex-col items-center justify-center">
                <svg
                  className="w-24 h-6 mb-1 transition-colors duration-300"
                  style={{ color: currentText }}
                  viewBox="0 0 96 24"
                  fill="none"
                  aria-hidden="true"
                >
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
            <h3
              className="font-serif text-2xl sm:text-[26px] font-normal mb-2.5"
              style={{ color: currentText }}
            >
              Local <span className="text-[#E4572E]">businesses</span>
            </h3>
            <p
              className="font-body text-xs sm:text-[13px] leading-relaxed max-w-xs transition-colors duration-300"
              style={{ color: isDarkTone ? "#D5CEBB" : "#555047" }}
            >
              We help salons, shops and local stores answer messages, book visits, and follow up automatically.
            </p>
          </div>

          {/* 03: Sales Teams & Agencies */}
          <div
            className="flex flex-col items-center text-center rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 border transition-all duration-300 shadow-xs group"
            style={{
              backgroundColor: cardBg,
              borderColor: cardBorder,
            }}
          >
            <div className="h-20 sm:h-24 flex items-center justify-center mb-3">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-[#F59E0B] px-2.5 py-1.5 flex items-center gap-0.5 shadow-xs">
                  <span className="w-[1.5px] h-3 bg-[#141413] rounded-full" />
                  <span className="w-[1.5px] h-4 bg-[#141413] rounded-full" />
                  <span className="w-[1.5px] h-2 bg-[#141413] rounded-full" />
                  <span className="w-[1.5px] h-3.5 bg-[#141413] rounded-full" />
                </div>
                <span
                  className="font-bold text-sm transition-colors duration-300"
                  style={{ color: currentText }}
                >
                  →
                </span>
                <div
                  className="rounded-full border-2 p-1.5 flex items-center justify-center relative shadow-xs transition-colors duration-300"
                  style={{
                    borderColor: isDarkTone ? "#FAF7E8" : "#141413",
                    backgroundColor: isDarkTone ? "#220B05" : "#FAF7E8",
                  }}
                >
                  <span className="text-sm">🔍</span>
                  <span className="absolute -top-1 -right-1 text-[10px] text-[#F59E0B]">✨</span>
                </div>
              </div>
            </div>
            <h3
              className="font-serif text-2xl sm:text-[26px] font-normal mb-2.5"
              style={{ color: currentText }}
            >
              Sales teams &amp; agencies
            </h3>
            <p
              className="font-body text-xs sm:text-[13px] leading-relaxed max-w-xs transition-colors duration-300"
              style={{ color: isDarkTone ? "#D5CEBB" : "#555047" }}
            >
              We help sales teams see who is ready to buy, save customer details, and send quick follow-ups.
            </p>
          </div>

          {/* 04: E-commerce */}
          <div
            className="flex flex-col items-center text-center rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 border transition-all duration-300 shadow-xs group"
            style={{
              backgroundColor: cardBg,
              borderColor: cardBorder,
            }}
          >
            <div className="h-20 sm:h-24 flex items-center justify-center mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#F59E0B] flex items-center justify-center text-sm shadow-xs">
                  📦
                </div>
                <svg
                  className="w-7 h-4 transition-colors duration-300"
                  style={{ color: currentText }}
                  viewBox="0 0 28 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M 2 8 L 22 8 M 16 2 L 24 8 L 16 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs shadow-xs transition-colors duration-300 ${isDarkTone
                      ? "border-[#FAF7E8] bg-emerald-950/80 text-emerald-300"
                      : "border-[#141413] bg-emerald-100"
                    }`}
                >
                  ⚡
                </div>
              </div>
            </div>
            <h3
              className="font-serif text-2xl sm:text-[26px] font-normal mb-2.5"
              style={{ color: currentText }}
            >
              E-commerce
            </h3>
            <p
              className="font-body text-xs sm:text-[13px] leading-relaxed max-w-xs transition-colors duration-300"
              style={{ color: isDarkTone ? "#D5CEBB" : "#555047" }}
            >
              We help online shops answer order questions and follow up with buyers fast.
            </p>
          </div>

          {/* 05: Real Estate */}
          <div
            className="flex flex-col items-center text-center rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 border transition-all duration-300 shadow-xs group"
            style={{
              backgroundColor: cardBg,
              borderColor: cardBorder,
            }}
          >
            <div className="h-20 sm:h-24 flex items-center justify-center mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#F59E0B] flex items-center justify-center text-sm shadow-xs">
                  🏠
                </div>
                <svg
                  className="w-7 h-4 transition-colors duration-300"
                  style={{ color: currentText }}
                  viewBox="0 0 28 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M 2 8 L 22 8 M 16 2 L 24 8 L 16 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs shadow-xs transition-colors duration-300 ${isDarkTone
                      ? "border-[#FAF7E8] bg-purple-950/80 text-purple-300"
                      : "border-[#141413] bg-purple-100"
                    }`}
                >
                  📅
                </div>
              </div>
            </div>
            <h3
              className="font-serif text-2xl sm:text-[26px] font-normal mb-2.5"
              style={{ color: currentText }}
            >
              Real estate
            </h3>
            <p
              className="font-body text-xs sm:text-[13px] leading-relaxed max-w-xs transition-colors duration-300"
              style={{ color: isDarkTone ? "#D5CEBB" : "#555047" }}
            >
              We help real estate teams answer property questions, book site visits, and alert agents right away.
            </p>
          </div>

          {/* 06: Education & Coaching */}
          <div
            className="flex flex-col items-center text-center rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 border transition-all duration-300 shadow-xs group"
            style={{
              backgroundColor: cardBg,
              borderColor: cardBorder,
            }}
          >
            <div className="h-20 sm:h-24 flex items-center justify-center mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#F59E0B] flex items-center justify-center text-sm shadow-xs">
                  🎓
                </div>
                <svg
                  className="w-7 h-4 transition-colors duration-300"
                  style={{ color: currentText }}
                  viewBox="0 0 28 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M 2 8 L 22 8 M 16 2 L 24 8 L 16 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold shadow-xs transition-colors duration-300 ${isDarkTone
                      ? "border-[#FAF7E8] bg-amber-950/80 text-amber-300"
                      : "border-[#141413] bg-amber-100"
                    }`}
                >
                  ✓
                </div>
              </div>
            </div>
            <h3
              className="font-serif text-2xl sm:text-[26px] font-normal mb-2.5"
              style={{ color: currentText }}
            >
              Education &amp; coaching
            </h3>
            <p
              className="font-body text-xs sm:text-[13px] leading-relaxed max-w-xs transition-colors duration-300"
              style={{ color: isDarkTone ? "#D5CEBB" : "#555047" }}
            >
              We help coaching classes answer student questions, book demo sessions, and stay in touch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
