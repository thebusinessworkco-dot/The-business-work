"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { CheckCircle2, ArrowRight, ArrowLeft, X } from "lucide-react";
import type { Capability } from "@/content/services";

interface ServiceCapabilitiesProps {
  capabilities: Capability[];
  serviceTitle: string;
}

export default function ServiceCapabilities({
  capabilities,
  serviceTitle,
}: ServiceCapabilitiesProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const activeCapability = activeIndex !== null ? capabilities[activeIndex] : null;

  const openDetail = (index: number) => {
    setActiveIndex(index);
  };

  const closeDetail = useCallback(() => {
    const prevIndex = activeIndex;
    setActiveIndex(null);
    if (prevIndex !== null && triggerRefs.current[prevIndex]) {
      triggerRefs.current[prevIndex]?.focus();
    }
  }, [activeIndex]);

  const handlePrev = useCallback(() => {
    setActiveIndex((curr) => {
      if (curr === null) return 0;
      return curr === 0 ? capabilities.length - 1 : curr - 1;
    });
  }, [capabilities.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((curr) => {
      if (curr === null) return 0;
      return curr === capabilities.length - 1 ? 0 : curr + 1;
    });
  }, [capabilities.length]);

  // Focus trap, Escape key, and keyboard navigation
  useEffect(() => {
    if (activeIndex === null) return;

    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeDetail();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, closeDetail, handlePrev, handleNext]);

  return (
    <>
      {/* Search Engine Optimized text: Present in server-rendered HTML */}
      <div className="sr-only" aria-hidden="true">
        {capabilities.map((c) => (
          <article key={c.name}>
            <h3>{c.name}</h3>
            <p>{c.details.what}</p>
            <p>{c.details.problem}</p>
            <ol>
              {c.details.steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
            <p>{c.details.example}</p>
            <p>{c.details.benefit}</p>
            <p>{c.details.tools}</p>
          </article>
        ))}
      </div>

      {/* Interactive 6-Box Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((c, index) => (
          <button
            key={c.name}
            ref={(el) => {
              triggerRefs.current[index] = el;
            }}
            type="button"
            onClick={() => openDetail(index)}
            className="group flex h-full w-full flex-col justify-between rounded-2xl border border-[#E8E2D5] bg-white p-6 sm:p-7 text-left shadow-xs transition-all hover:border-[#141413] hover:shadow-md focus-visible:outline-2 focus-visible:outline-[#141413] cursor-pointer"
            aria-haspopup="dialog"
            aria-expanded={activeIndex === index}
            aria-label={`View explanation for ${c.name}`}
          >
            <div>
              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={19}
                  className="mt-0.5 shrink-0 text-[#10B981]"
                  aria-hidden="true"
                />
                <span className="font-body text-[15px] sm:text-base font-semibold text-[#141413] leading-snug">
                  {c.name}
                </span>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-1.5 font-headline text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#6D32A8] group-hover:text-[#141413] transition-colors">
              <span>Click to read details</span>
              <ArrowRight
                size={13}
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </div>
          </button>
        ))}
      </div>

      {/* Accessible Detail Dialog with Focus Trap & Previous/Next Navigation */}
      {activeCapability && (
        <div
          role="presentation"
          onClick={closeDetail}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#141413]/60 backdrop-blur-sm"
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="capability-dialog-heading"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#DDD6C5] bg-[#FAF7E8] p-6 sm:p-9 shadow-2xl"
          >
            {/* Top Close Button */}
            <button
              ref={closeBtnRef}
              type="button"
              onClick={closeDetail}
              aria-label="Close capability details"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 rounded-full p-2 text-[#7A756D] hover:text-[#141413] hover:bg-white transition-colors focus-visible:outline-2 focus-visible:outline-[#141413] cursor-pointer"
            >
              <X size={20} aria-hidden="true" />
            </button>

            {/* Header */}
            <div className="pr-12">
              <div className="flex items-center gap-2 font-headline text-[11px] font-bold uppercase tracking-[0.2em] text-[#7A756D]">
                <span>{serviceTitle}</span>
                <span className="text-[#DDD6C5]">·</span>
                <span>
                  Part {activeIndex !== null ? activeIndex + 1 : 1} of 6
                </span>
              </div>
              <h3
                id="capability-dialog-heading"
                className="mt-1 font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#141413]"
              >
                {activeCapability.name}
              </h3>
            </div>

            {/* Capability Detail Fields */}
            <div className="mt-6 space-y-5">
              {/* 1. What */}
              <div className="space-y-1">
                <div className="font-headline text-[11px] font-bold uppercase tracking-wider text-[#7A756D]">
                  What it is
                </div>
                <p className="font-body text-sm sm:text-[15px] leading-relaxed text-[#141413]">
                  {activeCapability.details.what}
                </p>
              </div>

              {/* 2. Problem */}
              <div className="space-y-1">
                <div className="font-headline text-[11px] font-bold uppercase tracking-wider text-[#7A756D]">
                  Problem it solves
                </div>
                <p className="font-body text-sm sm:text-[15px] leading-relaxed text-[#141413]">
                  {activeCapability.details.problem}
                </p>
              </div>

              {/* 3. Steps */}
              <div className="space-y-2">
                <div className="font-headline text-[11px] font-bold uppercase tracking-wider text-[#7A756D]">
                  How it works in 3 simple steps
                </div>
                <ol className="space-y-2 pt-1">
                  {activeCapability.details.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EBDDFE] font-headline text-[11px] font-bold text-[#6D32A8]">
                        {idx + 1}
                      </span>
                      <span className="font-body text-sm leading-relaxed text-[#141413]">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* 4. Example */}
              <div className="space-y-1">
                <div className="font-headline text-[11px] font-bold uppercase tracking-wider text-[#7A756D]">
                  Real example
                </div>
                <div className="rounded-2xl border border-[#DDD6C5] bg-white p-4 font-body text-sm leading-relaxed text-[#141413] shadow-xs">
                  <span className="font-semibold text-[#141413]">Example: </span>
                  {activeCapability.details.example}
                </div>
              </div>

              {/* 5. Benefit */}
              <div className="space-y-1">
                <div className="font-headline text-[11px] font-bold uppercase tracking-wider text-[#7A756D]">
                  How it helps your business
                </div>
                <p className="font-body text-sm sm:text-[15px] leading-relaxed text-[#141413]">
                  {activeCapability.details.benefit}
                </p>
              </div>

              {/* 6. Tools */}
              <div className="space-y-1 border-t border-[#E8E2D5] pt-4">
                <div className="font-headline text-[11px] font-bold uppercase tracking-wider text-[#7A756D]">
                  Tools and setup
                </div>
                <p className="font-body text-xs sm:text-sm leading-relaxed text-[#5A554E]">
                  {activeCapability.details.tools}
                </p>
              </div>
            </div>

            {/* Navigation & Close Footer */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#E8E2D5] pt-5">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous capability"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#DDD6C5] bg-white px-3.5 py-2 font-headline text-xs font-semibold uppercase tracking-wider text-[#141413] transition-all hover:bg-[#EDE7DA] focus-visible:outline-2 focus-visible:outline-[#141413] cursor-pointer"
                >
                  <ArrowLeft size={13} aria-hidden="true" />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next capability"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#DDD6C5] bg-white px-3.5 py-2 font-headline text-xs font-semibold uppercase tracking-wider text-[#141413] transition-all hover:bg-[#EDE7DA] focus-visible:outline-2 focus-visible:outline-[#141413] cursor-pointer"
                >
                  <span>Next</span>
                  <ArrowRight size={13} aria-hidden="true" />
                </button>
              </div>

              <button
                type="button"
                onClick={closeDetail}
                className="rounded-xl border border-[#DDD6C5] bg-white px-5 py-2 font-headline text-xs font-semibold uppercase tracking-wider text-[#141413] transition-all hover:bg-[#EDE7DA] focus-visible:outline-2 focus-visible:outline-[#141413] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
