"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

const cards = [
  {
    id: 1,
    image: "/stacked-cards/tbw-hero-photo-3-metrics.png",
    title: "Executive Overview & Real-Time WhatsApp CRM Metrics",
    tab: "1. Operations & Metrics",
    badge: "01 // OPERATIONS & METRICS",
    cardTitle: "Executive Operations",
    cardDesc: "Every lead, reply, and conversion — tracked in real time on WhatsApp CRM.",
  },
  {
    id: 2,
    image: "/stacked-cards/tbw-hero-photo-1-departments.png",
    title: "Cross-Department Automation & Workflows",
    tab: "2. Team Sync",
    badge: "02 // TEAM SYNC",
    cardTitle: "Cross-Team Sync",
    cardDesc: "See what your team builds and runs — as it happens across departments.",
  },
  {
    id: 3,
    image: "/stacked-cards/tbw-hero-photo-2-order-automation.png",
    title: "Automated Order Processing & Workflow Builder",
    tab: "3. Order Automation",
    badge: "03 // ORDER AUTOMATION",
    cardTitle: "Visual Automation Builder",
    cardDesc: "Build, test, debug and run automations in one visual environment.",
  },
];

const N = cards.length;

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  // Touch swipe support (phone / tablet)
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;

    // Swipe left or swipe up -> Next card
    if (diffY > 35 || diffX > 35) {
      setActiveStep((prev) => Math.min(N - 1, prev + 1));
    }
    // Swipe right or swipe down -> Previous card
    else if (diffY < -35 || diffX < -35) {
      setActiveStep((prev) => Math.max(0, prev - 1));
    }
  };

  // Mouse wheel over cards (optional desktop trackpad gesture)
  const wheelLock = useRef(false);
  const handleWheel = (e: React.WheelEvent) => {
    if (wheelLock.current) return;

    if (e.deltaY > 30) {
      if (activeStep < N - 1) {
        e.preventDefault();
        wheelLock.current = true;
        setActiveStep((prev) => Math.min(N - 1, prev + 1));
        setTimeout(() => {
          wheelLock.current = false;
        }, 500);
      }
    } else if (e.deltaY < -30) {
      if (activeStep > 0) {
        e.preventDefault();
        wheelLock.current = true;
        setActiveStep((prev) => Math.max(0, prev - 1));
        setTimeout(() => {
          wheelLock.current = false;
        }, 500);
      }
    }
  };

  const selectStep = useCallback((stepIdx: number) => {
    setActiveStep(stepIdx);
  }, []);

  // Background color transitions to Dark Chocolate (#220B05) on Card 3
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (activeStep === 2) {
      section.style.backgroundColor = "#220B05";
      section.style.borderBottomColor = "#220B05";
    } else {
      section.style.backgroundColor = "#FAF7E8";
      section.style.borderBottomColor = "#E8E2D5";
    }
  }, [activeStep]);

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      className="relative w-full border-t border-[#E8E2D5] bg-[#FAF7E8] text-[#141413] selection:bg-[#EAE4D7] transition-colors duration-500"
    >
      {/* ─── Section Header ─── */}
      <div className="text-center max-w-3xl mx-auto pt-6 sm:pt-10 lg:pt-14 pb-2 sm:pb-4 px-4">
        <div className="font-headline text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#7A756D] mb-1.5 sm:mb-2">
          HOW WE WORK
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-normal leading-[1.14] tracking-tight text-[#141413]">
          Designed for how your <span className="text-[#E4572E]">business</span>{" "}
          <span className="italic">actually runs.</span>
        </h2>
        <p className="mt-1.5 sm:mt-2 font-body text-xs sm:text-base text-[#555047] max-w-xl mx-auto leading-relaxed">
          Watch how our automated workflows connect WhatsApp, spreadsheets, and CRM into one seamless system.
        </p>

        {/* Step Indicator Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 mt-2.5 sm:mt-4">
          {cards.map((c, idx) => (
            <button
              key={c.id}
              type="button"
              onClick={() => selectStep(idx)}
              className={`px-3 sm:px-4 py-1.5 rounded-full font-headline text-[10px] sm:text-xs font-semibold transition-all duration-300 shadow-xs cursor-pointer ${
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

      {/* ──────────────────────────────────────────────────────────
          CARDS STAGE — ZERO DEAD SPACE!
          03 // SECTORS WE SUPPORT sits directly beneath the cards!
         ────────────────────────────────────────────────────────── */}
      <div className="relative w-full pb-4 sm:pb-6">
        <div className="w-full flex flex-col items-center justify-start">
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
            className="relative w-full max-w-[940px] sm:max-w-[1020px] md:max-w-[1100px] lg:max-w-[1180px] xl:max-w-[1240px] px-3 sm:px-5 pointer-events-auto touch-pan-y"
          >
            {/* Same landscape aspect ratio (2400/1343) across all devices */}
            <div className="relative w-full aspect-[2400/1343]">
              {cards.map((card, idx) => {
                let transform = "";
                let opacity = 1;
                let zIndex = (N - idx) * 10;

                if (idx < activeStep) {
                  // Previous card has slid up off-screen
                  transform = "translate3d(0, -115%, 0) scale(1)";
                  opacity = 0;
                } else if (idx === activeStep) {
                  // Current front card
                  transform = "translate3d(0, 0px, 0) scale(1)";
                  opacity = 1;
                  zIndex = 30;
                } else if (idx === activeStep + 1) {
                  // Next card peeking below
                  transform = "translate3d(0, 16px, 0) scale(0.97)";
                  opacity = 1;
                  zIndex = 20;
                } else {
                  // Second card peeking below
                  transform = "translate3d(0, 32px, 0) scale(0.94)";
                  opacity = 1;
                  zIndex = 10;
                }

                return (
                  <div
                    key={card.id}
                    onClick={() => {
                      // Clicking an active front card advances to next
                      if (idx === activeStep && activeStep < N - 1) {
                        setActiveStep((prev) => prev + 1);
                      }
                    }}
                    className="absolute inset-0 w-full h-full cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      transform,
                      opacity,
                      zIndex,
                      transformOrigin: "center bottom",
                      willChange: "transform, opacity",
                    }}
                  >
                    <div className="relative w-full h-full rounded-[16px] sm:rounded-[24px] md:rounded-[32px] overflow-hidden border border-[#DCD5C3] bg-[#FAF7E8] shadow-[0_20px_60px_-12px_rgba(20,20,19,0.22),0_6px_20px_rgba(0,0,0,0.06)]">
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

                      {/* Gradient overlay with title + description INSIDE card (Make.com style) */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-3.5 sm:px-8 pb-3 sm:pb-6 pt-8 sm:pt-24 pointer-events-none">
                        <div className="font-headline text-[8px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#F59E0B] mb-0.5 sm:mb-1">
                          {card.badge}
                        </div>
                        <h3 className="font-serif text-sm sm:text-2xl md:text-3xl font-normal text-white leading-tight mb-0.5 sm:mb-1.5">
                          {card.cardTitle}
                        </h3>
                        <p className="font-body text-[10px] sm:text-sm text-white/85 leading-relaxed max-w-lg hidden xs:block sm:block">
                          {card.cardDesc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
