"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

export default function Industries() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Synchronize seamlessly with the stacked cards theme progress:
      // When entering/visible below cards, match theme progress exactly
      // When exiting to the bottom towards Principles, interpolate back to light
      let p = 1.0;
      if (rect.bottom < vh * 0.50) {
        // Exiting to the bottom (towards Principles / Core Principles section)
        p = Math.max(0, Math.min(1, rect.bottom / (vh * 0.50)));
      } else if (rect.top > 0 && typeof document !== "undefined") {
        const themeVar = document.documentElement.style.getPropertyValue("--theme-progress");
        p = themeVar !== "" ? parseFloat(themeVar) : 0.0;
      } else {
        // In view: 100% rich Dark Chocolate (#220B05)
        p = 1.0;
      }

      setProgress(p);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Real-time interpolated theme values:
  // Light: #FAF7E8 (250, 247, 232) -> Dark Chocolate: #220B05 (34, 11, 5)
  const bgR = Math.round(250 + (34 - 250) * progress);
  const bgG = Math.round(247 + (11 - 247) * progress);
  const bgB = Math.round(232 + (5 - 232) * progress);
  const currentBg = `rgb(${bgR}, ${bgG}, ${bgB})`;

  const textR = Math.round(20 + (255 - 20) * progress);
  const textG = Math.round(20 + (255 - 20) * progress);
  const textB = Math.round(19 + (255 - 19) * progress);
  const currentText = `rgb(${textR}, ${textG}, ${textB})`;

  const borderR = Math.round(232 + (74 - 232) * progress);
  const borderG = Math.round(226 + (32 - 226) * progress);
  const borderB = Math.round(213 + (20 - 213) * progress);
  const currentBorder = `rgb(${borderR}, ${borderG}, ${borderB})`;

  // Subtitle badge color: #7A756D (122, 117, 109) -> #F59E0B (245, 158, 11)
  const badgeR = Math.round(122 + (245 - 122) * progress);
  const badgeG = Math.round(117 + (158 - 117) * progress);
  const badgeB = Math.round(109 + (11 - 109) * progress);
  const currentBadge = `rgb(${badgeR}, ${badgeG}, ${badgeB})`;

  // Card background: white/40 (light) -> #2D1007/55 (dark)
  const cardBg =
    progress > 0.05
      ? `rgba(45, 16, 7, ${(0.15 + progress * 0.45).toFixed(2)})`
      : "rgba(255, 255, 255, 0.4)";
  const cardBorder =
    progress > 0.05
      ? `rgba(74, 32, 20, ${(0.2 + progress * 0.6).toFixed(2)})`
      : "rgba(232, 226, 213, 0.7)";

  const isDarkTone = progress >= 0.45;

  return (
    <section
      ref={sectionRef}
      id="industries"
      aria-labelledby="industries-title"
      className="relative w-full -mt-px border-0 border-transparent pt-0 sm:pt-4 pb-16 sm:pb-24 overflow-hidden"
      style={{
        backgroundColor: currentBg,
        color: currentText,
      }}
    >
      {/* Subtle Ambient Warm Light (Expands as dark mode deepens) */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{ opacity: progress.toFixed(2) }}
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
