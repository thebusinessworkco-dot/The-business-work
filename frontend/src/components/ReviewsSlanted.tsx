"use client";

import { useState, useRef } from "react";

interface Review {
  id: string;
  name: string;
  initials: string;
  role: string;
  company: string;
  quote: string;
  cardBg: string;
  textColor: string;
  subColor: string;
  avatarBg: string;
  metric1: { val: string; label: string };
}

const reviews: Review[] = [
  {
    id: "review-1",
    name: "DR. ARVIND SHARMA",
    initials: "AS",
    role: "Founder",
    company: "City Care Clinic",
    quote:
      "“I feel like we finally have no unread WhatsApp messages. Patients book visits in 20 seconds, and our front desk is calm and organized all day.”",
    cardBg: "bg-[#EADDFE]",
    textColor: "text-[#241038]",
    subColor: "text-[#583F72]",
    avatarBg: "bg-[#D5C4FA] text-[#341656]",
    metric1: { val: "20s", label: "Booking speed" },
  },
  {
    id: "review-2",
    name: "ALEX V. MEHRA",
    initials: "AM",
    role: "Head of Operations",
    company: "Artisan Living & Retail",
    quote:
      "“The Business Work is the top favorite tool for our business. It saves our team 4 hours every single day from manual Excel data entry.”",
    cardBg: "bg-[#FCE6CF]",
    textColor: "text-[#2B1705]",
    subColor: "text-[#633A14]",
    avatarBg: "bg-[#F5CEAC] text-[#4A2505]",
    metric1: { val: "4 hrs", label: "Saved daily" },
  },
  {
    id: "review-3",
    name: "ROHAN VERMA",
    initials: "RV",
    role: "Director",
    company: "Apex Logistics & Fleet",
    quote:
      "“Because we reply instantly and send pricing right away, we closed 3 times more deals in our first month.”",
    cardBg: "bg-[#D5F5E3]",
    textColor: "text-[#063828]",
    subColor: "text-[#185842]",
    avatarBg: "bg-[#B5E9CC] text-[#043323]",
    metric1: { val: "3x", label: "Deals closed" },
  },
  {
    id: "review-4",
    name: "SLASH B2B TEAM",
    initials: "SB",
    role: "Operations Lead",
    company: "B2B Trading Network",
    quote:
      "“If you're tired of typing replies to hundreds of WhatsApp chats, saving phone numbers by hand, and chasing people down — this tool is a life saver.”",
    cardBg: "bg-[#FAF7E8]",
    textColor: "text-[#141413]",
    subColor: "text-[#646059]",
    avatarBg: "bg-[#E8E2D5] text-[#242220]",
    metric1: { val: "500+", label: "Daily enquiries" },
  },
  {
    id: "review-5",
    name: "POOJA KAPOOR",
    initials: "PK",
    role: "Managing Director",
    company: "ScaleCraft Digital Agency",
    quote:
      "“Fast, clean, and reliable. Customer queries get answered instantly, leads sync straight to our CRM, and our team can step in anytime.”",
    cardBg: "bg-[#E2E8F0]",
    textColor: "text-[#0F172A]",
    subColor: "text-[#334155]",
    avatarBg: "bg-[#CBD5E1] text-[#1E293B]",
    metric1: { val: "24/7", label: "Live auto-reply" },
  },
  {
    id: "review-6",
    name: "VIKRAM JOSHI",
    initials: "VJ",
    role: "Co-founder",
    company: "Nova Exports Hub",
    quote:
      "“Our export catalog quotes used to take 2 hours. Now our WhatsApp bot parses product requests and sends quotes in 30 seconds.”",
    cardBg: "bg-[#FEE2E2]",
    textColor: "text-[#450A0A]",
    subColor: "text-[#7F1D1D]",
    avatarBg: "bg-[#FECACA] text-[#7F1D1D]",
    metric1: { val: "90%", label: "Quote turnaround" },
  },
];

export default function ReviewsSlanted() {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Duplicate for seamless 100% infinite marquee loop
  const loopReviews = [...reviews, ...reviews];

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <section
      className="relative w-full bg-[#0D0D0C] rounded-t-[32px] sm:rounded-t-[44px] pt-12 sm:pt-16 md:pt-18 pb-6 sm:pb-8 md:pb-9 overflow-hidden"
      aria-label="Client Reviews and Testimonials"
    >
      {/* Subtle Ambient Light */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/3 h-96 w-96 rounded-full bg-purple-600/20 blur-[130px]" />
        <div className="absolute bottom-1/4 right-1/3 h-96 w-96 rounded-full bg-emerald-500/15 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <p className="font-headline text-xs font-bold uppercase tracking-[0.24em] text-[#EBDDFE] mb-2.5">
            EARLY ACCESS, REAL RESULTS
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.1]">
            From the first <span className="italic font-normal">businesses to use it.</span>
          </h2>
        </div>
      </div>

      {/* ═══ Continuous Infinite Marquee Track (Right to Left) - Full Width ═══ */}
      <div className="relative w-full overflow-hidden z-10">
        {/* Soft, minimal edge fade to prevent harsh cutoff without darkening cards */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-4 sm:w-8 bg-gradient-to-r from-[#0D0D0C]/40 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-4 sm:w-8 bg-gradient-to-l from-[#0D0D0C]/40 to-transparent z-20" />

        {/* Marquee Track: Moving Right to Left */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 pb-2 pt-1 select-none w-max"
          style={{
            animation: "marqueeRightToLeft 42s linear infinite",
            animationPlayState: isPaused ? "paused" : "running",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
            {loopReviews.map((rev, idx) => (
              <div
                key={`${rev.id}-${idx}`}
                onClick={togglePause}
                title={isPaused ? "Click to resume scrolling" : "Click to pause"}
                className={`w-[290px] sm:w-[350px] shrink-0 rounded-[26px] sm:rounded-[32px] ${rev.cardBg} ${rev.textColor} p-5 sm:p-7 shadow-xl border border-white/20 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-headline font-bold text-xs sm:text-sm tracking-wide uppercase">
                      {rev.name}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold text-emerald-800 bg-white/70 px-2.5 py-0.5 rounded-full border border-black/5">
                      ★ 5.0
                    </span>
                  </div>
                  <p className={`font-body text-[11px] sm:text-xs ${rev.subColor} mt-0.5`}>
                    {rev.role} • {rev.company}
                  </p>

                  <blockquote className="font-serif text-[15px] sm:text-[17px] font-normal leading-snug tracking-tight text-[#141413] mt-3.5 sm:mt-5">
                    {rev.quote}
                  </blockquote>
                </div>

                {/* Bottom Bar: Clean Initials Avatar & Real Business Metric */}
                <div className="pt-4 mt-4 border-t border-black/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`h-8 w-8 sm:h-9 sm:w-9 rounded-full ${rev.avatarBg} font-headline font-bold text-xs flex items-center justify-center shadow-xs`}>
                      {rev.initials}
                    </div>
                    <div>
                      <span className="font-headline font-bold text-xs sm:text-sm block text-[#141413] leading-none">
                        {rev.metric1.val}
                      </span>
                      <span className={`text-[9px] sm:text-[10px] uppercase font-mono tracking-wider ${rev.subColor}`}>
                        {rev.metric1.label}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] sm:text-[11px] font-mono font-medium text-[#141413]/70 bg-white/60 px-2 py-0.5 rounded-md border border-black/5">
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee Keyframe Styles for smooth Right-to-Left Infinite Scroll */}
      <style jsx>{`
        @keyframes marqueeRightToLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
      `}</style>
    </section>
  );
}
