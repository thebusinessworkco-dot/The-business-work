"use client";

import { useState, useEffect, useRef } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  Code2,
  Activity,
  Rocket,
  Headphones,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { processSteps } from "@/content/process";

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Pinned scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      
      // If we are within the scrollable pinned track
      if (rect.top <= 0 && -rect.top <= totalScrollable) {
        const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 0.999);
        const stepIndex = Math.floor(progress * processSteps.length);
        setActiveStep(stepIndex);
      } else if (rect.top > 0) {
        setActiveStep(0);
      } else if (-rect.top > totalScrollable) {
        setActiveStep(processSteps.length - 1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToStep = (index: number) => {
    setActiveStep(index);
    if (!sectionRef.current) return;
    const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
    const totalScrollable = sectionRef.current.offsetHeight - window.innerHeight;
    const targetScroll = sectionTop + (index / processSteps.length) * totalScrollable + 40;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const currentStep = processSteps[activeStep] || processSteps[0];

  // Visual cards data corresponding to the 6 steps
  const visualCards = [
    {
      badge: "01 / WORKFLOW AUDIT",
      title: "Analyzing Manual Tasks",
      icon: Activity,
      accent: "text-amber-400",
      bgGlow: "from-amber-500/10 to-transparent",
      items: [
        { label: "Copying numbers to Excel", val: "4.2 hrs / day lost", warn: true },
        { label: "Repetitive WhatsApp replies", val: "120+ chats daily", warn: true },
        { label: "Automation potential", val: "85% manual time saved", check: true },
      ],
      tag: "Audit summary ready",
    },
    {
      badge: "02 / SCOPE & BLUEPRINT",
      title: "Agreed Action Plan",
      icon: FileText,
      accent: "text-emerald-400",
      bgGlow: "from-emerald-500/10 to-transparent",
      items: [
        { label: "Deliverable", val: "WhatsApp AI Bot + Google Sheets CRM", check: true },
        { label: "Timeline", val: "7 working days to launch", check: true },
        { label: "Cost", val: "Fixed upfront • ₹0 surprise fees", check: true },
      ],
      tag: "Written plan and cost",
    },
    {
      badge: "03 / LIVE BUILD",
      title: "Custom AI & Tool Integration",
      icon: Code2,
      accent: "text-sky-400",
      bgGlow: "from-sky-500/10 to-transparent",
      items: [
        { label: "WhatsApp Webhook", val: "Connected & Verified", check: true },
        { label: "Lead Pipeline", val: "Syncing instantly to CRM", check: true },
        { label: "Response Latency", val: "< 1.5 seconds", check: true },
      ],
      tag: "Working demo ready",
    },
    {
      badge: "04 / REAL-WORLD TEST",
      title: "Edge Cases & Fail-Safes",
      icon: CheckCircle2,
      accent: "text-emerald-400",
      bgGlow: "from-emerald-500/10 to-transparent",
      items: [
        { label: "Pricing & Booking Tests", val: "Passed (100%)", check: true },
        { label: "Off-Hours Response", val: "Passed (100%)", check: true },
        { label: "Human Takeover Trigger", val: "Passed (100%)", check: true },
      ],
      tag: "Tested tool verified",
    },
    {
      badge: "05 / GO LIVE",
      title: "Production Deployment",
      icon: Rocket,
      accent: "text-purple-400",
      bgGlow: "from-purple-500/10 to-transparent",
      items: [
        { label: "System Status", val: "🟢 LIVE in Production", check: true },
        { label: "Team Training", val: "Video walkthrough provided", check: true },
        { label: "Ownership", val: "100% yours, zero lock-in", check: true },
      ],
      tag: "Guides & handover complete",
    },
    {
      badge: "06 / ONGOING SUPPORT",
      title: "Optional Care & Upgrades",
      icon: Headphones,
      accent: "text-teal-400",
      bgGlow: "from-teal-500/10 to-transparent",
      items: [
        { label: "Uptime Health", val: "99.98% monitored", check: true },
        { label: "Support Channel", val: "Direct WhatsApp / Slack group", check: true },
        { label: "Future Changes", val: "Available upon written request", check: true },
      ],
      tag: "Ongoing help (optional)",
    },
  ];

  const currentVisual = visualCards[activeStep] || visualCards[0];
  const IconComponent = currentVisual.icon;

  return (
    <section
      id="how-we-work"
      aria-labelledby="process-title"
      ref={sectionRef}
      className="relative w-full border-y border-[#E8E2D5] bg-[#FAF7E8] text-[#141413] lg:min-h-[320vh]"
    >
      {/* Background Subtle Swirl Accent (Wispr Flow style) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
        <svg
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1200px] h-[900px] stroke-[#E6DEC9] fill-none"
          viewBox="0 0 1200 900"
        >
          <path
            d="M -100 200 C 400 50 800 350 1300 200 C 800 650 400 450 -100 800"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        </svg>
      </div>

      {/* Pinned Sticky Viewport Container */}
      <div className="relative lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] w-full flex flex-col justify-center py-12 sm:py-16 lg:py-0 overflow-hidden z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 w-full">
          
          {/* Header Eyebrow & Title */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-block font-headline text-[11px] sm:text-xs font-bold uppercase tracking-[0.24em] text-[#7A756D] mb-2.5">
              02 // HOW WE WORK
            </div>
            <h2
              id="process-title"
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#141413] leading-[1.12]"
            >
              Simple steps, <span className="italic font-normal">clear execution.</span>
            </h2>
          </div>

          {/* Mobile / Tablet Horizontal Scrollable Step Chips */}
          <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
            {processSteps.map((step, idx) => (
              <button
                key={step.phase}
                onClick={() => setActiveStep(idx)}
                className={`shrink-0 px-4 py-2 rounded-full font-headline text-xs font-semibold transition-all ${
                  activeStep === idx
                    ? "bg-[#141413] text-white shadow-sm"
                    : "bg-[#EFE9DB] text-[#55524E] hover:bg-[#E5DDCB]"
                }`}
              >
                0{idx + 1}. {step.phase}
              </button>
            ))}
          </div>

          {/* Main 3-Column Wispr Flow Style Pinned Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* 1. Left Column: Vertical Step Tabs with Vertical Indicator (Wispr style) */}
            <div className="hidden lg:flex lg:col-span-3 flex-col gap-6 pl-4 border-l-2 border-[#E5DDCB]">
              {processSteps.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={step.phase}
                    onClick={() => scrollToStep(idx)}
                    className="relative flex items-center gap-3 text-left group cursor-pointer transition-all select-none -ml-[18px]"
                  >
                    {/* Vertical Active Pill Marker */}
                    <span
                      className={`h-7 w-1 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-[#E05A47] scale-y-100 shadow-[0_0_8px_rgba(224,90,71,0.5)]"
                          : "bg-transparent scale-y-50 group-hover:bg-[#141413]/20"
                      }`}
                    />
                    <div className="flex flex-col">
                      <span
                        className={`font-serif text-xl lg:text-2xl transition-all duration-200 ${
                          isActive
                            ? "text-[#141413] font-semibold translate-x-1"
                            : "text-[#8A8A86] hover:text-[#141413]"
                        }`}
                      >
                        {step.phase}
                      </span>
                      {isActive && (
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#E05A47] font-semibold mt-0.5">
                          Step 0{idx + 1}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 2. Center Column: Large Rounded Visual Mockup Card (Wispr style) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[32px] sm:rounded-[38px] bg-[#0E1513] text-white p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl border border-white/10 transition-all duration-300">
                
                {/* Background Ambient Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${currentVisual.bgGlow} pointer-events-none transition-all duration-500`}
                />

                {/* Top Bar inside Visual Card */}
                <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-xl bg-white/10 flex items-center justify-center text-white">
                      <IconComponent size={16} className={currentVisual.accent} />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 block">
                        {currentVisual.badge}
                      </span>
                      <span className="font-headline text-xs font-semibold text-white">
                        {currentVisual.title}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    Active
                  </span>
                </div>

                {/* Middle Content List inside Visual Card */}
                <div className="relative z-10 space-y-3 my-auto py-4">
                  {currentVisual.items.map((item, i) => (
                    <div
                      key={i}
                      className="rounded-2xl bg-white/5 border border-white/10 p-3.5 flex items-center justify-between gap-3 shadow-xs hover:bg-white/[0.08] transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {item.warn ? (
                          <span className="text-amber-400 text-xs shrink-0">⚠️</span>
                        ) : (
                          <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                        )}
                        <span className="font-body text-xs sm:text-[13px] text-white/90 truncate">
                          {item.label}
                        </span>
                      </div>
                      <span
                        className={`font-mono text-[11px] font-semibold shrink-0 ${
                          item.warn ? "text-amber-300" : "text-emerald-300"
                        }`}
                      >
                        {item.val}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom Footer inside Visual Card */}
                <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-white/60 font-body text-[11.5px]">
                    <Sparkles size={13} className="text-amber-400" />
                    <span>Deliverable verified</span>
                  </div>
                  <span className="font-mono text-[11px] text-white/80 bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                    {currentStep.output}
                  </span>
                </div>

              </div>
            </div>

            {/* 3. Right Column: Step Title, Description & Deliverable Badge (Wispr style) */}
            <div className="lg:col-span-4 flex flex-col justify-center gap-4 text-left">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#E05A47]">
                <span>STEP 0{activeStep + 1}</span>
                <span className="text-[#141413]/30">/</span>
                <span>06</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#141413] font-medium leading-[1.18] tracking-tight">
                {currentStep.title}
              </h3>

              <p className="font-body text-base sm:text-[17px] text-[#55524E] leading-relaxed">
                {currentStep.body}
              </p>

              {/* Deliverable Badge */}
              <div className="mt-2 inline-flex items-center gap-2.5 rounded-xl bg-[#EFE9DB] border border-[#DDD5C5] px-4 py-2.5 self-start shadow-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="font-headline text-xs font-bold text-[#141413]">
                  Deliverable:{" "}
                  <span className="font-normal text-[#55524E]">{currentStep.output}</span>
                </span>
              </div>

              {/* Progress Indicator Dots */}
              <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-[#E8E2D5]">
                {processSteps.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => scrollToStep(dotIdx)}
                    aria-label={`Go to step ${dotIdx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeStep === dotIdx
                        ? "w-8 bg-[#141413]"
                        : "w-2 bg-[#141413]/20 hover:bg-[#141413]/40"
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Trust Guarantee Banner */}
          <div className="mt-10 sm:mt-12 pt-5 border-t border-[#E8E2D5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-headline text-[#7A756D]">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-700 shrink-0" />
              <span>Scope &amp; cost agreed in writing upfront</span>
            </div>
            <span className="font-mono text-[11px] text-[#55524E]">
              Zero surprise fees • 100% code ownership
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
