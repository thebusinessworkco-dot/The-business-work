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

const STAGGER_PX = 22; // offset between stacked cards (peeking at bottom)

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardStageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  // Smooth scroll to a specific card tab
  const scrollToStep = useCallback((stepIdx: number) => {
    const container = containerRef.current;
    const cardStage = cardStageRef.current;
    if (!container || !cardStage) return;

    const pinTop = window.innerWidth < 640 ? 76 : 88;
    const cardH = cardStage.offsetHeight;
    const pinnedDistance = container.offsetHeight - cardH;
    if (pinnedDistance <= 0) return;

    const targetP = stepIdx === 0 ? 0.05 : stepIdx === 1 ? 0.50 : 0.98;
    const containerTop = container.getBoundingClientRect().top + window.scrollY;
    const targetScrollY = containerTop - pinTop + targetP * pinnedDistance;

    window.scrollTo({ top: targetScrollY, behavior: "smooth" });
  }, []);

  useEffect(() => {
    let ticking = false;

    // Dynamically size container = cardHeight + scrollDistance
    // Tight scroll distance so the next section (#industries) sits directly below with zero dead space
    const syncContainerHeight = () => {
      const container = containerRef.current;
      const cardStage = cardStageRef.current;
      if (!container || !cardStage) return;

      const cardH = cardStage.offsetHeight;
      const isMobile = window.innerWidth < 640;
      // Snappy scroll distance: brings next section UP directly below the card
      const scrollDistance = isMobile
        ? Math.round(window.innerHeight * 0.32)
        : Math.round(window.innerHeight * 0.55);

      container.style.height = `${cardH + scrollDistance}px`;
    };

    const animate = () => {
      const container = containerRef.current;
      const cardStage = cardStageRef.current;
      const section = sectionRef.current;
      if (!container || !cardStage || !section) {
        ticking = false;
        return;
      }

      const isMobile = window.innerWidth < 640;
      const pinTop = isMobile ? 76 : 88;
      const rect = container.getBoundingClientRect();
      const cardH = cardStage.offsetHeight;
      const pinnedDistance = rect.height - cardH;

      if (pinnedDistance <= 0) {
        ticking = false;
        return;
      }

      // p goes from 0.0 (top reached pinTop) to 1.0 (bottom reached pinTop + cardH)
      const scrolled = pinTop - rect.top;
      const p = Math.max(0, Math.min(1, scrolled / pinnedDistance));

      // ─── Active Tab Update ───
      if (p < 0.45) {
        setActiveStep(0);
      } else if (p < 0.85) {
        setActiveStep(1);
      } else {
        setActiveStep(2);
      }

      // ─── Card 0: Front -> Slides UP ───
      let c0Y = 0;
      let c0Opacity = 1;
      if (p > 0.05) {
        const t0 = Math.min(1, (p - 0.05) / 0.40);
        c0Y = -t0 * 115;
        c0Opacity = t0 > 0.80 ? Math.max(0, 1 - (t0 - 0.80) / 0.20) : 1;
      }

      // ─── Card 1: Middle -> Front -> Slides UP ───
      let c1Scale = 0.96;
      let c1Y = STAGGER_PX;
      let c1Brightness = 0.93;
      let c1Opacity = 1;

      if (p <= 0.05) {
        c1Scale = 0.96;
        c1Y = STAGGER_PX;
        c1Brightness = 0.93;
      } else if (p < 0.45) {
        const t0 = (p - 0.05) / 0.40;
        c1Scale = 0.96 + t0 * 0.04;
        c1Y = (1 - t0) * STAGGER_PX;
        c1Brightness = 0.93 + t0 * 0.07;
      } else if (p < 0.55) {
        c1Scale = 1.0;
        c1Y = 0;
        c1Brightness = 1.0;
      } else {
        const t1 = Math.min(1, (p - 0.55) / 0.40);
        c1Scale = 1.0;
        c1Y = -t1 * 115;
        c1Brightness = 1.0;
        c1Opacity = t1 > 0.80 ? Math.max(0, 1 - (t1 - 0.80) / 0.20) : 1;
      }

      // ─── Card 2: Back -> Middle -> Front ───
      let c2Scale = 0.92;
      let c2Y = STAGGER_PX * 2;
      let c2Brightness = 0.86;

      if (p <= 0.05) {
        c2Scale = 0.92;
        c2Y = STAGGER_PX * 2;
        c2Brightness = 0.86;
      } else if (p < 0.45) {
        const t0 = (p - 0.05) / 0.40;
        c2Scale = 0.92 + t0 * 0.04;
        c2Y = STAGGER_PX * 2 - t0 * STAGGER_PX;
        c2Brightness = 0.86 + t0 * 0.07;
      } else if (p < 0.55) {
        c2Scale = 0.96;
        c2Y = STAGGER_PX;
        c2Brightness = 0.93;
      } else if (p < 0.95) {
        const t1 = (p - 0.55) / 0.40;
        c2Scale = 0.96 + t1 * 0.04;
        c2Y = (1 - t1) * STAGGER_PX;
        c2Brightness = 0.93 + t1 * 0.07;
      } else {
        c2Scale = 1.0;
        c2Y = 0;
        c2Brightness = 1.0;
      }

      // ─── Background Color Morph (Cream #FAF7E8 -> Dark Chocolate #220B05) ───
      if (p >= 0.55) {
        const dp = Math.min(1, (p - 0.55) / 0.45);
        const r = Math.round(250 + (34 - 250) * dp);
        const g = Math.round(247 + (11 - 247) * dp);
        const b = Math.round(232 + (5 - 232) * dp);
        section.style.backgroundColor = `rgb(${r},${g},${b})`;
        const br = Math.round(232 + (74 - 232) * dp);
        const bg = Math.round(226 + (32 - 226) * dp);
        const bb = Math.round(213 + (20 - 213) * dp);
        section.style.borderBottomColor = `rgb(${br},${bg},${bb})`;
      } else {
        section.style.backgroundColor = "#FAF7E8";
        section.style.borderBottomColor = "#E8E2D5";
      }

      // ─── Apply Transforms to Cards ───
      const el0 = cardRefs.current[0];
      if (el0) {
        el0.style.transform = `translate3d(0, ${c0Y.toFixed(1)}%, 0) scale(1)`;
        el0.style.opacity = c0Opacity.toFixed(3);
        el0.style.filter = "brightness(1)";
        el0.style.zIndex = "30";
      }

      const el1 = cardRefs.current[1];
      if (el1) {
        const unit = p >= 0.55 ? "%" : "px";
        el1.style.transform = `translate3d(0, ${c1Y.toFixed(1)}${unit}, 0) scale(${c1Scale.toFixed(4)})`;
        el1.style.opacity = c1Opacity.toFixed(3);
        el1.style.filter = `brightness(${c1Brightness.toFixed(3)})`;
        el1.style.zIndex = "20";
      }

      const el2 = cardRefs.current[2];
      if (el2) {
        el2.style.transform = `translate3d(0, ${c2Y.toFixed(1)}px, 0) scale(${c2Scale.toFixed(4)})`;
        el2.style.opacity = "1";
        el2.style.filter = `brightness(${c2Brightness.toFixed(3)})`;
        el2.style.zIndex = "10";
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(animate);
      }
    };

    const onResize = () => {
      syncContainerHeight();
      onScroll();
    };

    syncContainerHeight();
    animate();

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
          SCROLL CONTAINER:
          Height is cardHeight + scrollDistance (no dead space below!)
         ────────────────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative w-full"
      >
        {/* Sticky Window: pins right below the header */}
        <div
          ref={cardStageRef}
          className="sticky top-[76px] sm:top-[88px] w-full flex flex-col items-center justify-start pb-2 sm:pb-4"
        >
          {/* Card Stage with stacked cards */}
          <div className="relative w-full max-w-[940px] sm:max-w-[1020px] md:max-w-[1100px] lg:max-w-[1180px] xl:max-w-[1240px] px-3 sm:px-5">
            {/* Aspect Ratio:
                Mobile:  4:5 (portrait card like Make.com mobile)
                Desktop: 2400/1343 (landscape card like Make.com desktop) */}
            <div className="relative w-full aspect-[4/5] sm:aspect-[2400/1343]">
              {cards.map((card, idx) => (
                <div
                  key={card.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  className="absolute inset-0 w-full h-full"
                  style={{
                    transformOrigin: "center top",
                    willChange: "transform, opacity, filter",
                    zIndex: (3 - idx) * 10,
                    transform:
                      idx === 0
                        ? "translate3d(0, 0%, 0) scale(1)"
                        : idx === 1
                        ? `translate3d(0, ${STAGGER_PX}px, 0) scale(0.97)`
                        : `translate3d(0, ${STAGGER_PX * 2}px, 0) scale(0.94)`,
                    filter:
                      idx === 0
                        ? "brightness(1)"
                        : idx === 1
                        ? "brightness(0.93)"
                        : "brightness(0.86)",
                  }}
                >
                  <div className="relative w-full h-full rounded-[22px] sm:rounded-[28px] md:rounded-[34px] overflow-hidden border border-[#DCD5C3] bg-[#FAF7E8] shadow-[0_24px_70px_-14px_rgba(20,20,19,0.22),0_8px_24px_rgba(0,0,0,0.06)]">
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
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-4 sm:px-8 pb-4 sm:pb-7 pt-16 sm:pt-28 pointer-events-none">
                      <div className="font-headline text-[9px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#F59E0B] mb-1">
                        {card.badge}
                      </div>
                      <h3 className="font-serif text-lg sm:text-2xl md:text-3xl font-normal text-white leading-tight mb-1 sm:mb-2">
                        {card.cardTitle}
                      </h3>
                      <p className="font-body text-[11px] sm:text-sm text-white/85 leading-relaxed max-w-lg">
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
