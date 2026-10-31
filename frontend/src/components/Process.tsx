"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

const cards = [
  {
    id: 1,
    image: "/stacked-cards/tbw-hero-photo-3-metrics.png",
    title: "Executive Overview & Real-Time WhatsApp CRM Metrics",
    tab: "1. Operations & Metrics",
    shortDesc: "Live WhatsApp CRM & Lead Tracking",
  },
  {
    id: 2,
    image: "/stacked-cards/tbw-hero-photo-1-departments.png",
    title: "Cross-Department Automation & Workflows",
    tab: "2. Team Sync",
    shortDesc: "Instant Sync Across Teams",
  },
  {
    id: 3,
    image: "/stacked-cards/tbw-hero-photo-2-order-automation.png",
    title: "Automated Order Processing & Workflow Builder",
    tab: "3. Order Automation",
    shortDesc: "3-Day Order Flow Cut to 5 Mins",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  const scrollToStep = useCallback((stepIdx: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const pinTop = window.innerWidth < 640 ? 76 : 88;
    const totalScrollable = rect.height - window.innerHeight;
    if (totalScrollable <= 0) return;

    let targetP = 0.05;
    if (stepIdx === 1) targetP = 0.54;
    if (stepIdx === 2) targetP = 0.98;

    const targetScrollY = window.scrollY + rect.top - pinTop + targetP * totalScrollable;
    window.scrollTo({ top: targetScrollY, behavior: "smooth" });
  }, []);

  useEffect(() => {
    let ticking = false;

    const updateCards = () => {
      const container = containerRef.current;
      const section = sectionRef.current;
      if (!container) {
        ticking = false;
        return;
      }

      const rect = container.getBoundingClientRect();
      const pinTop = window.innerWidth < 640 ? 76 : 88;
      const totalScrollable = rect.height - window.innerHeight;

      if (totalScrollable <= 0) {
        ticking = false;
        return;
      }

      // Progress p ranges from 0 (container top reaches pinTop) to 1 (container bottom reaches viewport bottom)
      const scrolled = pinTop - rect.top;
      const p = Math.max(0, Math.min(1, scrolled / totalScrollable));

      // Active tab tracking
      if (p < 0.48) {
        setActiveStep(0);
      } else if (p < 0.88) {
        setActiveStep(1);
      } else {
        setActiveStep(2);
      }

      // Timing phases (Tight & continuous, zero dead space):
      // Card 0: pinned [0.00, 0.12], slides UP [0.12, 0.48]
      // Card 1: active [0.48, 0.60], slides UP [0.60, 0.96]
      // Card 2: active [0.96, 1.00], then unpins with section into #industries
      // Theme morph to #220B05: [0.70, 0.96]

      // ─── Card 0 ───
      let c0Y = 0;
      let c0Opacity = 1;
      if (p >= 0.12) {
        const t0 = Math.max(0, Math.min(1, (p - 0.12) / 0.36));
        c0Y = -t0 * 115; // in %
        c0Opacity = t0 > 0.85 ? Math.max(0, 1 - (t0 - 0.85) / 0.15) : 1;
      }

      // ─── Card 1 ───
      let c1Scale = 0.96;
      let c1Y = 16; // in px
      let c1Brightness = 0.92;
      let c1Opacity = 1;

      if (p < 0.12) {
        c1Scale = 0.96;
        c1Y = 16;
        c1Brightness = 0.92;
      } else if (p < 0.48) {
        const t0 = (p - 0.12) / 0.36;
        c1Scale = 0.96 + t0 * 0.04;
        c1Y = (1 - t0) * 16;
        c1Brightness = 0.92 + t0 * 0.08;
      } else if (p < 0.60) {
        c1Scale = 1.0;
        c1Y = 0;
        c1Brightness = 1.0;
      } else {
        const t1 = Math.max(0, Math.min(1, (p - 0.60) / 0.36));
        c1Scale = 1.0;
        c1Y = -t1 * 115; // in %
        c1Brightness = 1.0;
        c1Opacity = t1 > 0.85 ? Math.max(0, 1 - (t1 - 0.85) / 0.15) : 1;
      }

      // ─── Card 2 ───
      let c2Scale = 0.92;
      let c2Y = 32; // in px
      let c2Brightness = 0.85;

      if (p < 0.12) {
        c2Scale = 0.92;
        c2Y = 32;
        c2Brightness = 0.85;
      } else if (p < 0.48) {
        const t0 = (p - 0.12) / 0.36;
        c2Scale = 0.92 + t0 * 0.04;
        c2Y = 32 - t0 * 16;
        c2Brightness = 0.85 + t0 * 0.07;
      } else if (p < 0.60) {
        c2Scale = 0.96;
        c2Y = 16;
        c2Brightness = 0.92;
      } else if (p < 0.96) {
        const t1 = (p - 0.60) / 0.36;
        c2Scale = 0.96 + t1 * 0.04;
        c2Y = (1 - t1) * 16;
        c2Brightness = 0.92 + t1 * 0.08;
      } else {
        c2Scale = 1.0;
        c2Y = 0;
        c2Brightness = 1.0;
      }

      // ─── Seamless Background Color Morphing for Process Section ───
      // Light: #FAF7E8 (250, 247, 232) -> Dark Chocolate: #220B05 (34, 11, 5)
      if (section) {
        if (p >= 0.70) {
          const darkProgress = Math.min(1, (p - 0.70) / 0.26);
          const bgR = Math.round(250 + (34 - 250) * darkProgress);
          const bgG = Math.round(247 + (11 - 247) * darkProgress);
          const bgB = Math.round(232 + (5 - 232) * darkProgress);
          section.style.backgroundColor = `rgb(${bgR}, ${bgG}, ${bgB})`;
          section.style.borderBottomColor = `rgb(${Math.round(232 + (74 - 232) * darkProgress)}, ${Math.round(226 + (32 - 226) * darkProgress)}, ${Math.round(213 + (20 - 213) * darkProgress)})`;
        } else {
          section.style.backgroundColor = "#FAF7E8";
          section.style.borderBottomColor = "#E8E2D5";
        }
      }

      // Apply transforms directly
      const el0 = cardElementsRef.current[0];
      if (el0) {
        el0.style.transform = `translate3d(0, ${c0Y.toFixed(2)}%, 0) scale(1)`;
        el0.style.opacity = c0Opacity.toFixed(3);
        el0.style.filter = "brightness(1)";
        el0.style.zIndex = "30";
      }

      const el1 = cardElementsRef.current[1];
      if (el1) {
        const yUnit = p >= 0.60 ? "%" : "px";
        el1.style.transform = `translate3d(0, ${c1Y.toFixed(2)}${yUnit}, 0) scale(${c1Scale.toFixed(4)})`;
        el1.style.opacity = c1Opacity.toFixed(3);
        el1.style.filter = `brightness(${c1Brightness.toFixed(3)})`;
        el1.style.zIndex = "20";
      }

      const el2 = cardElementsRef.current[2];
      if (el2) {
        el2.style.transform = `translate3d(0, ${c2Y.toFixed(2)}px, 0) scale(${c2Scale.toFixed(4)})`;
        el2.style.opacity = "1";
        el2.style.filter = `brightness(${c2Brightness.toFixed(3)})`;
        el2.style.zIndex = "10";
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateCards);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateCards();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      className="relative w-full border-t border-[#E8E2D5] bg-[#FAF7E8] text-[#141413] selection:bg-[#EAE4D7] transition-colors duration-150"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto pt-10 sm:pt-18 lg:pt-20 pb-3 sm:pb-5 px-4">
        <div className="font-headline text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#7A756D] mb-2">
          HOW WE WORK
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-normal leading-[1.14] tracking-tight text-[#141413]">
          Designed for how your <span className="text-[#E4572E]">business</span> <span className="italic">actually runs.</span>
        </h2>
        <p className="mt-2.5 font-body text-xs sm:text-base text-[#555047] max-w-xl mx-auto leading-relaxed">
          Watch how our automated workflows connect WhatsApp, spreadsheets, and CRM into one seamless system.
        </p>

        {/* Desktop 3 Step Indicator Tabs */}
        <div className="hidden sm:flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6">
          {cards.map((c, idx) => (
            <button
              key={c.id}
              type="button"
              onClick={() => scrollToStep(idx)}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full font-headline text-[11px] sm:text-xs font-semibold transition-all duration-300 shadow-xs cursor-pointer ${
                activeStep === idx
                  ? "bg-[#141413] text-white shadow-md scale-105"
                  : "bg-white/80 text-[#555047] hover:bg-white hover:text-[#141413] border border-[#DDD6C5]"
              }`}
            >
              {c.tab}
            </button>
          ))}
        </div>
      </div>

      {/* Multi-screen Scroll Track: 150vh on mobile, 210vh on desktop for tight, zero-dead-space pacing */}
      <div
        ref={containerRef}
        className="relative w-full h-[150vh] sm:h-[210vh]"
      >
        {/* Sticky Window pinned right below the Header */}
        <div className="sticky top-[76px] sm:top-[88px] w-full flex flex-col items-center justify-start overflow-hidden pt-1 sm:pt-2 pb-2 sm:pb-4 pointer-events-none">
          {/* Mobile Sticky Step Tabs (Stay pinned with the card so user always has context) */}
          <div className="sm:hidden flex items-center justify-center gap-1.5 mb-2 px-2 pointer-events-auto">
            {cards.map((c, idx) => (
              <button
                key={c.id}
                type="button"
                onClick={() => scrollToStep(idx)}
                className={`px-2.5 py-1 rounded-full font-headline text-[10px] font-semibold transition-all duration-300 shadow-xs cursor-pointer ${
                  activeStep === idx
                    ? "bg-[#141413] text-white shadow-sm scale-105"
                    : "bg-white/85 text-[#555047] border border-[#DDD6C5]"
                }`}
              >
                {c.tab}
              </button>
            ))}
          </div>

          {/* Card Stage */}
          <div className="relative w-full max-w-[940px] sm:max-w-[1020px] md:max-w-[1100px] lg:max-w-[1180px] xl:max-w-[1240px] px-2.5 sm:px-5">
            <div className="relative w-full aspect-[2400/1343]">
              {cards.map((card, idx) => (
                <div
                  key={card.id}
                  ref={(el) => {
                    cardElementsRef.current[idx] = el;
                  }}
                  className="absolute inset-0 w-full h-full pointer-events-auto transition-[box-shadow] duration-200"
                  style={{
                    transformOrigin: "center top",
                    willChange: "transform, opacity, filter",
                    zIndex: (3 - idx) * 10,
                    transform:
                      idx === 0
                        ? "translate3d(0, 0%, 0) scale(1)"
                        : idx === 1
                        ? "translate3d(0, 16px, 0) scale(0.96)"
                        : "translate3d(0, 32px, 0) scale(0.92)",
                    filter:
                      idx === 0
                        ? "brightness(1)"
                        : idx === 1
                        ? "brightness(0.92)"
                        : "brightness(0.85)",
                  }}
                >
                  <div className="relative w-full h-full rounded-[20px] sm:rounded-[28px] md:rounded-[34px] overflow-hidden border border-[#DCD5C3] bg-[#FAF7E8] shadow-[0_24px_70px_-14px_rgba(20,20,19,0.22),0_8px_24px_rgba(0,0,0,0.06)]">
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={2400}
                      height={1343}
                      priority={idx === 0}
                      loading={idx === 0 ? "eager" : "lazy"}
                      draggable={false}
                      sizes="(max-width: 1024px) 95vw, 1240px"
                      className="w-full h-full object-cover select-none pointer-events-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Active Step Info Pill (Dynamically highlights active card summary) */}
          <div className="sm:hidden mt-2.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#DDD6C5] shadow-xs flex items-center gap-2 pointer-events-auto max-w-[92vw]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E4572E] animate-pulse shrink-0" />
            <span className="font-headline text-[10px] font-bold text-[#141413] shrink-0">
              {cards[activeStep].tab}:
            </span>
            <span className="font-body text-[10px] text-[#555047] truncate">
              {cards[activeStep].shortDesc}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
