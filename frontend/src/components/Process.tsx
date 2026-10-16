"use client";

import { useState } from "react";
import { ShieldCheck, ChevronDown, ChevronUp } from "lucide-react";
import { processSteps } from "@/content/process";

export default function Process() {
  // Default to step 1 (Plan) or 0 (Learn) open
  const [openStep, setOpenStep] = useState<number | null>(1);

  return (
    <section
      id="how-we-work"
      aria-labelledby="process-title"
      className="relative w-full border-y border-[#E8E2D5] bg-[#FAF7E8] py-20 sm:py-28 overflow-hidden"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 z-10">
        
        {/* Eyebrow and Headline: Dark, bold, larger */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <div className="inline-block font-headline text-xs sm:text-[13px] font-bold uppercase tracking-[0.24em] text-[#141413] mb-3">
            02 // HOW WE WORK
          </div>
          <h2
            id="process-title"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#141413] leading-[1.1]"
          >
            Simple steps, <span className="italic font-normal">clear execution.</span>
          </h2>
        </div>

        {/* Steps Container: Centered, clean, steps open right inside in short */}
        <div className="max-w-3xl mx-auto rounded-[28px] sm:rounded-[36px] bg-[#07382B] p-5 sm:p-8 text-white shadow-lg border border-[#0A4838]">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/10">
            <div>
              <span className="font-serif text-2xl sm:text-3xl font-normal text-white">
                Steps
              </span>
              <p className="font-body text-xs text-white/60 mt-0.5">
                Click any step to view short details
              </p>
            </div>
            <span className="text-[11px] font-mono font-semibold text-emerald-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              01 to 06
            </span>
          </div>

          {/* Interactive Steps List: Each step expands right inside itself */}
          <div className="space-y-2.5">
            {processSteps.map((step, idx) => {
              const isOpen = openStep === idx;
              return (
                <div
                  key={step.phase}
                  className={`rounded-2xl transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-[#0D4B3C] border border-white/25 shadow-sm"
                      : "bg-white/5 border border-white/10 hover:bg-white/[0.08]"
                  }`}
                >
                  {/* Step Header Button */}
                  <button
                    type="button"
                    onClick={() => setOpenStep(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                    aria-expanded={isOpen}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-bold ${
                            isOpen ? "text-emerald-300" : "text-white/60"
                          }`}
                        >
                          STEP 0{idx + 1}
                        </span>
                        <span className="text-white/30">•</span>
                        <span className="font-headline text-base sm:text-[17px] font-semibold text-white">
                          {step.phase}
                        </span>
                        {isOpen && (
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
                        )}
                      </div>
                      <p className="font-body text-xs sm:text-[13px] text-white/80 line-clamp-1">
                        {step.title}
                      </p>
                    </div>

                    {/* Toggle Chevron */}
                    <div className="shrink-0 h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 transition-transform">
                      {isOpen ? (
                        <ChevronUp size={16} className="text-emerald-300" />
                      ) : (
                        <ChevronDown size={16} className="text-white/60" />
                      )}
                    </div>
                  </button>

                  {/* Step Content: Opens right inside in short */}
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-white/10 space-y-3 animate-fadeIn">
                      <p className="font-body text-xs sm:text-[13.5px] text-white/90 leading-relaxed">
                        {step.body}
                      </p>

                      <div className="inline-flex items-center gap-2 rounded-lg bg-black/30 px-3 py-1.5 border border-white/15">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        <span className="font-headline text-xs font-semibold text-emerald-300">
                          Deliverable: <span className="text-white font-normal">{step.output}</span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer Guarantee */}
          <div className="pt-5 mt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-headline text-white/70">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
              <span>Scope &amp; cost agreed in writing upfront</span>
            </div>
            <span className="font-mono text-[11px] text-emerald-300/80">Zero surprise fees • 100% ownership</span>
          </div>

        </div>

      </div>
    </section>
  );
}

