"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
];

export default function ReviewsSlanted() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative w-full bg-[#0D0D0C] rounded-t-[32px] sm:rounded-t-[44px] py-12 sm:py-16 md:py-20 overflow-hidden"
      aria-label="Client Reviews and Testimonials"
    >
      {/* Subtle Ambient Light */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/3 h-96 w-96 rounded-full bg-purple-600/20 blur-[130px]" />
        <div className="absolute bottom-1/4 right-1/3 h-96 w-96 rounded-full bg-emerald-500/15 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 z-10">
        
        {/* Section Header: Compact margin, zero unwanted empty space */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <p className="font-headline text-xs font-bold uppercase tracking-[0.24em] text-[#EBDDFE] mb-2.5">
            EARLY ACCESS, REAL RESULTS
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.1]">
            From the first <span className="italic font-normal">businesses to use it.</span>
          </h2>
        </div>

        {/* Horizontal Carousel Track */}
        <div className="relative w-full">
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className={`w-[290px] sm:w-[350px] shrink-0 snap-center rounded-[26px] sm:rounded-[32px] ${rev.cardBg} ${rev.textColor} p-5 sm:p-7 shadow-xl border border-white/20 flex flex-col justify-between transition-transform duration-200 hover:scale-[1.01]`}
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

          {/* Navigation Controls: Clean subtle buttons */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={scrollLeft}
              aria-label="Previous review"
              className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/10 transition-colors active:scale-95"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="flex items-center gap-1.5 px-2">
              {reviews.map((r) => (
                <span
                  key={r.id}
                  className="h-1.5 w-1.5 rounded-full bg-white/30"
                />
              ))}
            </div>
            <button
              type="button"
              onClick={scrollRight}
              aria-label="Next review"
              className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/10 transition-colors active:scale-95"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
