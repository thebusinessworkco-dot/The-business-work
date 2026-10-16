"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

/* ════════════════════════════════════════════════
   7 High-Fidelity WebP Cards (Alternating P-L-P-L-P-L-P)
   From: /process-cards/ (Q88 WebP)
   ════════════════════════════════════════════════ */
const visualCards = [
  {
    id: 1,
    image: "/process-cards/01-whatsapp-booking-doctor.webp",
    aspect: "portrait",
    title: "Doctor & Clinic WhatsApp Booking",
    glow: "rgba(46, 227, 142, 0.4)",
  },
  {
    id: 2,
    image: "/process-cards/02-ai-sales-agent.webp",
    aspect: "landscape",
    title: "AI Sales & Lead Qualification Agent",
    glow: "rgba(234, 88, 59, 0.4)",
  },
  {
    id: 3,
    image: "/process-cards/04-business-automation.webp",
    aspect: "portrait",
    title: "End-to-End Business Workflows",
    glow: "rgba(56, 189, 248, 0.4)",
  },
  {
    id: 4,
    image: "/process-cards/03-crm-and-sales.webp",
    aspect: "landscape",
    title: "Automated CRM & Deals Pipeline",
    glow: "rgba(245, 158, 11, 0.4)",
  },
  {
    id: 5,
    image: "/process-cards/06-social-automation.webp",
    aspect: "portrait",
    title: "Instagram, WhatsApp & Social Channels",
    glow: "rgba(236, 72, 153, 0.4)",
  },
  {
    id: 6,
    image: "/process-cards/08-ai-customer-support-agent.webp",
    aspect: "landscape",
    title: "Custom AI Trained on Business Data",
    glow: "rgba(99, 102, 241, 0.4)",
  },
  {
    id: 7,
    image: "/process-cards/07-automated-follow-ups.webp",
    aspect: "portrait",
    title: "Automated Retargeting & Reminders",
    glow: "rgba(16, 185, 129, 0.4)",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animProgress, setAnimProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const animProgressRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  const totalSteps = visualCards.length;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* ─── Track scroll position and set target step progress (0 to totalSteps - 1) ─── */
  useEffect(() => {
    let rAFId = 0;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rAFId = requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const totalScrollable = rect.height - window.innerHeight;
            if (totalScrollable > 0) {
              const scrolled = -rect.top;
              const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
              targetProgressRef.current = progress * (totalSteps - 1);
            }
          }
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rAFId) cancelAnimationFrame(rAFId);
    };
  }, [totalSteps]);

  /* ─── Damped Lerp Animation Loop: User kitna bhi tez scroll kare, aram se glide karega ─── */
  useEffect(() => {
    let animId: number;

    const tick = () => {
      const target = targetProgressRef.current;
      const current = animProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.0005) {
        // Controlled speed clamp: Prevents fast scroll skipping!
        // Moves at a steady, majestic, luxurious pace no matter how violently the user scrolls
        const maxDeltaPerFrame = isMobile ? 0.038 : 0.032;
        const delta = Math.sign(diff) * Math.min(Math.abs(diff * 0.085), maxDeltaPerFrame);
        const nextVal = current + delta;
        animProgressRef.current = nextVal;
        setAnimProgress(nextVal);
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isMobile]);

  return (
    <section
      id="how-we-work"
      aria-label="How We Work"
      ref={sectionRef}
      className="relative w-full border-y border-[#1E2321] bg-[#0C0E0D] text-white selection:bg-[#E05A47]/30"
      style={{ minHeight: isMobile ? `${totalSteps * 65}vh` : `${totalSteps * 80}vh` }}
    >
      {/* Subtle ambient background glow & diagonal runway line */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-35">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] rounded-full blur-[140px]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(37,211,102,0.1) 0%, rgba(234,88,59,0.08) 50%, transparent 80%)",
          }}
        />
        {/* Subtle diagonal trajectory line */}
        <svg className="absolute inset-0 w-full h-full stroke-white/[0.04] fill-none" preserveAspectRatio="none">
          <line x1="10%" y1="90%" x2="90%" y2="10%" strokeWidth="1.5" strokeDasharray="6 6" />
        </svg>
      </div>

      {/* ═══════ STICKY PINNED VIEWPORT (100% Focused on Cards, Wispr Flow Exact) ═══════ */}
      <div
        className="sticky top-0 w-full h-[100dvh] sm:h-screen flex items-center justify-center z-10 overflow-hidden bg-[#0C0E0D]"
        style={{
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          transform: "translate3d(0, 0, 0)",
          willChange: "transform",
        }}
      >
        {/* ─── 3D Card Stage with Diagonal Runway ─── */}
        <div
          className="relative w-full h-full flex items-center justify-center overflow-visible px-4"
          style={{ perspective: "1500px", perspectiveOrigin: "50% 50%" }}
        >
          {visualCards.map((card, idx) => {
            const cardStyle = getCardDynamicStyle(idx, animProgress, isMobile);

            return (
              <div
                key={card.id}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div
                  className="pointer-events-auto relative select-none"
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    willChange: "transform, opacity",
                    ...cardStyle,
                  }}
                >
                  <div
                    className="relative rounded-[24px] sm:rounded-[34px] overflow-hidden transition-all duration-300"
                    style={{
                      boxShadow: `
                        0 28px 70px -15px rgba(0, 0, 0, 0.88),
                        0 12px 28px -8px rgba(0, 0, 0, 0.65),
                        0 0 60px -12px ${card.glow}
                      `,
                    }}
                  >
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={card.aspect === "landscape" ? 1592 : 1200}
                      height={card.aspect === "landscape" ? 990 : 1313}
                      priority={idx === 0}
                      loading={idx === 0 ? "eager" : "lazy"}
                      draggable={false}
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 660px, 660px"
                      className={`block object-contain rounded-[24px] sm:rounded-[34px] w-auto h-auto ${
                        card.aspect === "landscape"
                          ? "w-[min(560px,92vw)] sm:w-[580px] md:w-[660px] max-h-[58vh] sm:max-h-[64vh]"
                          : "w-[min(420px,82vw)] sm:w-[440px] md:w-[480px] max-h-[66vh] sm:max-h-[72vh]"
                      }`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   Continuous 3D Diagonal Runway Tilt Calculator:
   - Aate time (incoming from bottom-left): Aage ka tilt (rotateX +20deg, leaning forward towards user)
   - Screen centre mein: 100% straight and flat (rotateX 0deg, rotateY 0deg, scale 1)
   - Jaate time (departing to top-right): Piche ka tilt (rotateX -20deg, leaning backward into distance)
   ════════════════════════════════════════════════ */
function getCardDynamicStyle(idx: number, animProgress: number, isMobile: boolean): React.CSSProperties {
  const offset = idx - animProgress;

  // ─── 1. ACTIVE CARD IN SCREEN CENTER: Straight, flat, crisp, 100% sharp ───
  if (Math.abs(offset) < 0.005) {
    return {
      transform: "translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)",
      opacity: 1,
      zIndex: 35,
      filter: "brightness(1)",
      pointerEvents: "auto",
    };
  }

  // ─── 2. INCOMING CARDS (offset > 0): Arriving from BOTTOM-LEFT ───
  // Aate time: Aage ka tilt (top edge leans forward towards viewer!)
  if (offset > 0) {
    const clamped = Math.min(offset, 1.35);
    const xDist = isMobile ? 260 : 600;
    const yDist = isMobile ? 180 : 180;

    const x = -clamped * xDist;
    const y = clamped * yDist;
    const z = -clamped * 140;

    // Aage ka tilt: rotateX +20deg tilted forward, rotateY -14deg, rotateZ -6deg
    const rx = clamped * 20;
    const ry = -clamped * 14;
    const rz = -clamped * 6;
    const scale = 1 - clamped * 0.22;

    let opacity = 0;
    if (isMobile) {
      // Mobile: smoothly fades in as it approaches center
      opacity = Math.max(0, 1 - clamped * 1.5);
    } else {
      // Desktop: visible waiting in the bottom-left with generous Wispr Flow gap
      if (clamped <= 1.05) {
        opacity = Math.max(0, 0.95 - (clamped - 0.7) * 1.6);
      } else {
        opacity = 0;
      }
    }

    const zIndex = Math.round(30 - clamped * 10);

    return {
      transform: `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateX(${rx.toFixed(1)}deg) rotateY(${ry.toFixed(1)}deg) rotateZ(${rz.toFixed(1)}deg) scale(${scale.toFixed(3)})`,
      opacity: Number(opacity.toFixed(2)),
      zIndex,
      filter: `brightness(${(1 - clamped * 0.25).toFixed(2)})`,
      pointerEvents: "none",
    };
  }

  // ─── 3. DEPARTING CARDS (offset < 0): Exiting to TOP-RIGHT ───
  // Jaate time: Piche ka tilt (top edge leans backward into distance!)
  const absOffset = Math.min(-offset, 1.35);
  const xDist = isMobile ? 260 : 600;
  const yDist = isMobile ? 180 : 180;

  const x = absOffset * xDist;
  const y = -absOffset * yDist;
  const z = -absOffset * 140;

  // Piche ka tilt: rotateX -20deg tilted backward into distance, rotateY +14deg, rotateZ +6deg
  const rx = -absOffset * 20;
  const ry = absOffset * 14;
  const rz = absOffset * 6;
  const scale = 1 - absOffset * 0.22;

  let opacity = 0;
  if (isMobile) {
    opacity = Math.max(0, 1 - absOffset * 1.5);
  } else {
    if (absOffset <= 1.05) {
      opacity = Math.max(0, 0.92 - (absOffset - 0.7) * 1.6);
    } else {
      opacity = 0;
    }
  }

  const zIndex = Math.round(30 - absOffset * 10);

  return {
    transform: `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateX(${rx.toFixed(1)}deg) rotateY(${ry.toFixed(1)}deg) rotateZ(${rz.toFixed(1)}deg) scale(${scale.toFixed(3)})`,
    opacity: Number(opacity.toFixed(2)),
    zIndex,
    filter: `brightness(${(1 - absOffset * 0.25).toFixed(2)})`,
    pointerEvents: "none",
  };
}
