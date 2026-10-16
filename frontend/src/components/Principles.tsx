"use client";

import { Cpu, ShieldCheck, Receipt, ArrowRight } from "lucide-react";
import { useContactModal } from "./ContactModal";

export default function Principles() {
  const { openModal } = useContactModal();

  const principles = [
    {
      num: "01 // RIGHT TOOL",
      icon: Cpu,
      title: "We use AI only when it helps.",
      description:
        "We use AI when it truly helps. For simple tasks, plain rules are faster and cheaper.",
    },
    {
      num: "02 // A PERSON STEPS IN",
      icon: ShieldCheck,
      title: "A person can step in.",
      description:
        "Hard questions pass to a person. We add a clear way for a person to step in.",
    },
    {
      num: "03 // CLEAR COSTS",
      icon: Receipt,
      title: "You know costs before we start.",
      description:
        "You see setup costs, running fees, and limits in writing before we begin.",
    },
  ];

  return (
    <section id="why-us" aria-labelledby="why-title" className="w-full bg-[#FAF7E8] py-6 sm:py-8 md:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Compact Warm Sand Container */}
        <div className="rounded-[24px] sm:rounded-[32px] bg-[#DDD8CC] border border-[#DDD6C5]/80 p-5 sm:p-7 md:p-8 shadow-xs">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 sm:pb-6 border-b border-[#CCC6B8]/70">
            <div>
              <div className="font-headline text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#7A756D]">
                05 // CORE PRINCIPLES
              </div>
              <h2
                id="why-title"
                className="font-serif text-2xl sm:text-3xl md:text-[34px] font-normal leading-tight tracking-tight text-[#141413] mt-1"
              >
                How we work <span className="italic font-normal">with our clients.</span>
              </h2>
            </div>

            <button
              type="button"
              onClick={() => openModal(undefined, "principles")}
              className="inline-flex items-center gap-2 rounded-full border border-[#141413] bg-[#FAF7E8] px-4 sm:px-5 py-2 font-headline text-xs sm:text-sm font-bold text-[#141413] hover:bg-white transition-all shadow-xs shrink-0 self-start sm:self-auto cursor-pointer group"
            >
              <span>Discuss your project</span>
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* 3 Compact Principle Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 mt-5 sm:mt-6">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.num}
                  className="rounded-[18px] sm:rounded-[20px] bg-[#FAF7E8] border border-[#E6E0D2] p-4 sm:p-5 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-[#141413]/30 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="font-headline text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-[#7A756D]">
                        {item.num}
                      </span>
                      <Icon size={16} className="text-[#141413]/70" />
                    </div>
                    <h3 className="font-headline text-sm sm:text-[15px] font-bold text-[#141413] leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <p className="font-body text-xs sm:text-[13px] text-[#5A554E] leading-relaxed mt-2.5">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
