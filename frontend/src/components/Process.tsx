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

/* ─────────────────────────────────────────────────────────────────────────────
   MAKE.COM EXACT SCROLL-DRIVEN STACKED CARDS MATHEMATICAL MODEL (DESKTOP)
   ───────────────────────────────────────────────────────────────────────────── */
const N = cards.length;
const STEP_PX = 16;
const STEP_GROWTH = 20;
const SCALE_BASE = 0.03;
const SCALE_GROWTH = 0.02;
const SCALE_BOOST = 0.035;
const EXIT_TRANSLATE = 1120;
const ENTER_PHASE = 0.08;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => t * t * (3 - 2 * t);
const enterEase = (p: number) => (p < ENTER_PHASE ? smooth(p / ENTER_PHASE) : 1);

function localP(i: number, g: number) {
  const segs = N - 1;
  if (segs <= 0) return 0;
  const n = clamp01((g - ENTER_PHASE) / (1 - ENTER_PHASE));
  const seg = Math.min(segs - 1, Math.floor(n * segs));
  const t = clamp01(n * segs - seg);
  return i - seg - smooth(t);
}

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  // Touch swipe support on mobile (no empty runway needed)
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 35) {
        // Swiped left -> next card
        setActiveStep((prev) => Math.min(N - 1, prev + 1));
      } else if (diffX < -35) {
        // Swiped right -> prev card
        setActiveStep((prev) => Math.max(0, prev - 1));
      }
    } else {
      if (diffY > 40) {
        // Swiped up on card -> next card
        setActiveStep((prev) => Math.min(N - 1, prev + 1));
      } else if (diffY < -40) {
        // Swiped down on card -> prev card
        setActiveStep((prev) => Math.max(0, prev - 1));
      }
    }
  };

  const scrollToStep = useCallback((stepIdx: number) => {
    setActiveStep(stepIdx);

    if (window.innerWidth >= 640) {
      const wrapper = wrapperRef.current;
      const sticky = stickyRef.current;
      if (!wrapper || !sticky) return;

      const pinTop = 88;
      const range = Math.max(1, wrapper.offsetHeight - sticky.offsetHeight);
      const targetG = stepIdx === 0 ? 0.02 : stepIdx === 1 ? 0.52 : 0.98;
      const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
      const targetY = wrapperTop - pinTop + targetG * range;

      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  }, []);

  // Update mobile card transforms when activeStep changes
  useEffect(() => {
    if (window.innerWidth >= 640) return;

    cardRefs.current.forEach((el, idx) => {
      if (!el) return;
      el.style.transition = "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease";

      if (idx < activeStep) {
        // Card already exited
        el.style.transform = "translate3d(0, -115%, 0) scale(1)";
        el.style.opacity = "0";
        el.style.zIndex = "10";
      } else if (idx === activeStep) {
        // Front active card
        el.style.transform = "translate3d(0, 0px, 0) scale(1)";
        el.style.opacity = "1";
        el.style.zIndex = "30";
      } else {
        // Cards behind
        const diff = idx - activeStep;
        el.style.transform = `translate3d(0, ${diff * 16}px, 0) scale(${(1 - diff * 0.03).toFixed(3)})`;
        el.style.opacity = "1";
        el.style.zIndex = `${(N - idx) * 10}`;
      }
    });

    const section = sectionRef.current;
    if (section) {
      if (activeStep === 2) {
        section.style.backgroundColor = "#220B05";
        document.documentElement.style.setProperty("--theme-progress", "1.0");
        document.documentElement.style.setProperty("--theme-bg", "#220B05");
      } else if (activeStep === 1) {
        section.style.backgroundColor = "rgb(142, 60, 32)";
        document.documentElement.style.setProperty("--theme-progress", "0.5");
        document.documentElement.style.setProperty("--theme-bg", "rgb(142, 60, 32)");
      } else {
        section.style.backgroundColor = "#FAF7E8";
        document.documentElement.style.setProperty("--theme-progress", "0.0");
        document.documentElement.style.setProperty("--theme-bg", "#FAF7E8");
      }
    }
  }, [activeStep]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;
    const section = sectionRef.current;
    if (!wrapper || !sticky || !section) return;

    // Set static z-indices once
    cardRefs.current.forEach((el, i) => {
      if (el) el.style.zIndex = `${(N - i) * 10}`;
    });

    const updateHeight = () => {
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        // ON MOBILE: Zero space! Container height matches cards exactly so #industries sits directly beneath
        wrapper.style.height = "auto";
      } else {
        // ON DESKTOP: Make.com scroll-driven runway
        const scrollDist = Math.round(window.innerHeight * 0.95);
        wrapper.style.height = `${sticky.offsetHeight + scrollDist}px`;
      }
    };

    let ticking = false;

    const update = () => {
      if (window.innerWidth < 640) return; // Mobile handled via activeStep / swipe

      const pinTop = 88;
      const rect = wrapper.getBoundingClientRect();
      const range = Math.max(1, wrapper.offsetHeight - sticky.offsetHeight);
      const g = clamp01((pinTop - rect.top) / range);
      const ease = enterEase(g);

      // Active tab tracking
      if (g < 0.45) {
        setActiveStep(0);
      } else if (g < 0.85) {
        setActiveStep(1);
      } else {
        setActiveStep(2);
      }

      // Apply Make.com card transforms
      for (let i = 0; i < N; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        el.style.transition = ""; // no CSS transition on scroll update

        const lp = localP(i, g);
        const gap = STEP_PX + STEP_GROWTH * ease;
        const outEase = smooth(clamp01(-lp));
        const y = Math.max(0, lp) * gap - outEase * EXIT_TRANSLATE;
        const scaleLp = Math.max(-0.6, lp);
        const scaleRate = SCALE_BASE + SCALE_GROWTH * ease;
        const scale = 1 + ease * SCALE_BOOST - scaleLp * scaleRate;
        const opacity = 1 - clamp01((smooth(clamp01(-lp)) - 0.85) / 0.15);

        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
        el.style.opacity = opacity.toFixed(3);
      }

      // Background Color Morph on Desktop
      let pTheme = 0;
      if (g > 0.18) {
        pTheme = Math.min(1, (g - 0.18) / 0.67);
      }

      const r = Math.round(250 + (34 - 250) * pTheme);
      const gr = Math.round(247 + (11 - 247) * pTheme);
      const b = Math.round(232 + (5 - 232) * pTheme);
      const currentBg = `rgb(${r},${gr},${b})`;

      section.style.backgroundColor = currentBg;

      if (typeof document !== "undefined") {
        document.documentElement.style.setProperty("--theme-progress", pTheme.toFixed(3));
        document.documentElement.style.setProperty("--theme-bg", currentBg);
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    const onResize = () => {
      updateHeight();
      update();
    };

    updateHeight();
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      className="relative w-full border-t border-[#E8E2D5] bg-[#FAF7E8] text-[#141413] selection:bg-[#EAE4D7] transition-colors duration-150"
    >
      {/* ─── Section Header ─── */}
      <div className="text-center max-w-3xl mx-auto pt-6 sm:pt-12 lg:pt-16 pb-3 sm:pb-5 px-4">
        <div className="font-headline text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#7A756D] mb-1.5 sm:mb-2">
          HOW WE WORK
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-normal leading-[1.14] tracking-tight text-[#141413]">
          Designed for how your <span className="text-[#E4572E]">business</span>{" "}
          <span className="italic">actually runs.</span>
        </h2>
        <p className="mt-2 font-body text-xs sm:text-base text-[#555047] max-w-xl mx-auto leading-relaxed">
          Watch how our automated workflows connect WhatsApp, spreadsheets, and CRM into one seamless system.
        </p>

        {/* Step Indicator Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 mt-3 sm:mt-5">
          {cards.map((c, idx) => (
            <button
              key={c.id}
              type="button"
              onClick={() => scrollToStep(idx)}
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
          CARDS CONTAINER:
          Directly connects to next section with zero dead space!
         ────────────────────────────────────────────────────────── */}
      <div
        ref={wrapperRef}
        className="relative w-full pb-0"
      >
        {/* Card Stage Window */}
        <div
          ref={stickyRef}
          className="relative sm:sticky sm:top-[88px] w-full flex flex-col items-center justify-start pb-0 sm:pb-4 pointer-events-none"
        >
          {/* Card Stack:
              SAME LANDSCAPE ASPECT RATIO (2400/1343) ON BOTH PHONE & LAPTOP */}
          <div className="relative w-full max-w-[940px] sm:max-w-[1020px] md:max-w-[1100px] lg:max-w-[1180px] xl:max-w-[1240px] px-3 sm:px-5 pointer-events-auto">
            <div
              className="relative w-full aspect-[2400/1343] touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {cards.map((card, idx) => (
                <div
                  key={card.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  onClick={() => {
                    if (window.innerWidth < 640 && idx === activeStep && activeStep < N - 1) {
                      setActiveStep((prev) => prev + 1);
                    }
                  }}
                  className="absolute inset-0 w-full h-full cursor-pointer sm:cursor-default"
                  style={{
                    transformOrigin: "center bottom",
                    willChange: "transform, opacity",
                    zIndex: (N - idx) * 10,
                  }}
                >
                  <div className="relative w-full h-full rounded-[18px] sm:rounded-[26px] md:rounded-[32px] overflow-hidden border border-[#DCD5C3] bg-[#FAF7E8] shadow-[0_20px_60px_-12px_rgba(20,20,19,0.22),0_6px_20px_rgba(0,0,0,0.06)]">
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
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-3.5 sm:px-8 pb-3 sm:pb-7 pt-10 sm:pt-28 pointer-events-none">
                      <div className="font-headline text-[8px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#F59E0B] mb-0.5 sm:mb-1">
                        {card.badge}
                      </div>
                      <h3 className="font-serif text-sm sm:text-2xl md:text-3xl font-normal text-white leading-tight mb-0.5 sm:mb-2">
                        {card.cardTitle}
                      </h3>
                      <p className="font-body text-[10px] sm:text-sm text-white/85 leading-relaxed max-w-lg hidden xs:block sm:block">
                        {card.cardDesc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
