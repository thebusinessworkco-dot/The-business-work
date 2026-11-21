"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { useContactModal } from "./ContactModal";

export interface HomeServiceItem {
  id: string;
  index: string;
  title: string;
  tag: string;
  summary: string;
  solves: string;
  capabilities: { name: string }[];
  depends: string;
}

export default function Services({ items = [] }: { items?: HomeServiceItem[] }) {
  const { openModal } = useContactModal();

  const rememberScroll = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("tbw_return_section", "services");
    }
  };

  const servicesData = items.length > 0 ? items : [
    {
      id: "ai-agents-chatbots",
      index: "01",
      title: "AI Agents & Chatbots",
      tag: "Customer-facing AI",
      summary: "We build AI tools that answer customer questions. They collect leads, help with sales, and handle repeat tasks.",
      solves: "Stops lost leads when your staff are busy or offline.",
      capabilities: [{ name: "24/7 Question Answering" }, { name: "Lead Qualification" }],
      depends: "Your approved business guides & FAQs",
    },
    {
      id: "whatsapp-social-automation",
      index: "02",
      title: "WhatsApp & Social Automation",
      tag: "Messaging channels",
      summary: "We help you reply to enquiries and collect leads on WhatsApp and social chat.",
      solves: "Slow replies to customer messages during busy hours.",
      capabilities: [{ name: "WhatsApp Business API" }, { name: "Lead Intake Forms" }],
      depends: "Your WhatsApp Business account",
    },
    {
      id: "crm-workflow-automation",
      index: "03",
      title: "CRM & Workflow Automation",
      tag: "Connected systems & pipelines",
      summary: "We connect your business apps and CRM. Software tracks leads, triggers follow-ups, and handles repeat tasks so your team saves time.",
      solves: "Scattered lead records, typing data twice, and forgotten follow-ups.",
      capabilities: [{ name: "CRM Pipeline Sync" }, { name: "Cross-App Workflows" }],
      depends: "Your current CRM or spreadsheet",
    },
    {
      id: "restaurant-cafe-table-ordering",
      index: "04",
      title: "Restaurant & Cafe Table Ordering",
      tag: "Restaurants & Cafes",
      summary: "We build QR and NFC table ordering, smart booking, and automated review systems for cafes and restaurants.",
      solves: "Slow table ordering, lost reservations during rush hours, and missed Google reviews.",
      capabilities: [{ name: "QR & NFC Table Ordering" }, { name: "5-Star Review Automation" }],
      depends: "Your menu and floor table layout",
    },
  ];

  return (
    <section id="services" aria-labelledby="services-title" className="relative w-full border-y border-[#E8E2D5] bg-[#FAF7E8] py-20 sm:py-28 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 z-10">
        
        {/* Header with user's exact SERVICES eyebrow and headline */}
        <div className="max-w-6xl mx-auto mb-8 sm:mb-10">
          <div className="font-headline text-xs sm:text-[13px] font-bold uppercase tracking-[0.28em] text-[#141413] mb-3">
            01 // SERVICES
          </div>
          <h2
            id="services-title"
            className="font-serif text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-medium tracking-tight text-[#141413] leading-[1.12]"
          >
            Built around <span className="italic font-normal">how you work,</span>{" "}
            <span className="block sm:inline">not rigid packages.</span>
          </h2>
        </div>

        {/* 4 User Services Grid with Visually Rich Card Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-6xl mx-auto">
          
          {/* Service 01: AI Agents & Chatbots (Lilac Card with Capsule Widget) */}
          <div className="rounded-[28px] bg-[#EDE7DA] border border-[#DDD6C5]/80 p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-[#CDC5B3] hover:shadow-[0_6px_20px_rgba(0,0,0,0.04)]">
            {/* Lilac Thumbnail with Interactive AI Capsule */}
            <div className="w-[124px] h-[124px] rounded-[22px] bg-[#EBDDFE] border border-[#D8C4FA] flex items-center justify-center shrink-0 shadow-inner">
              <div className="inline-flex items-center gap-2.5 rounded-full bg-[#141413] px-3.5 py-1.5 shadow-md">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20 text-white text-[9px] font-mono">
                  ✕
                </span>
                <div className="flex items-center gap-[2.5px] h-3.5">
                  <span className="w-[1.5px] h-2 bg-white rounded-full" />
                  <span className="w-[1.5px] h-3.5 bg-white rounded-full" />
                  <span className="w-[1.5px] h-2 bg-white rounded-full" />
                  <span className="w-[1.5px] h-3 bg-white rounded-full" />
                  <span className="w-[1.5px] h-1.5 bg-white rounded-full" />
                </div>
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 text-[#141413] text-[9px] font-bold">
                  ✓
                </span>
              </div>
            </div>

            {/* Text & Action */}
            <div className="flex-1 flex flex-col justify-between min-w-0">
              <div>
                <h3 className="font-headline text-lg sm:text-[19px] font-bold text-[#141413] tracking-tight leading-snug">
                  AI Agents &amp; Chatbots
                </h3>
                <p className="font-body text-xs sm:text-[13px] text-[#555047] leading-relaxed mt-1.5 mb-3.5">
                  We build AI tools that answer customer questions. They collect leads, help with sales, and handle repeat tasks.
                </p>
              </div>
              <Link
                href="/services/ai-agents-chatbots"
                onClick={rememberScroll}
                className="self-start inline-flex items-center gap-1 font-headline text-xs sm:text-[13px] font-semibold text-[#141413] transition-colors hover:text-[#6D32A8]"
              >
                <span>Explore service</span>
                <span aria-hidden="true" className="font-bold">›</span>
              </Link>
            </div>
          </div>

          {/* Service 02: WhatsApp & Social Automation (Mint Emerald Card with WhatsApp Badge) */}
          <div className="rounded-[28px] bg-[#EDE7DA] border border-[#DDD6C5]/80 p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-[#CDC5B3] hover:shadow-[0_6px_20px_rgba(0,0,0,0.04)]">
            {/* Mint Emerald Thumbnail with WhatsApp Bubble */}
            <div className="w-[124px] h-[124px] rounded-[22px] bg-[#D5F5E3] border border-[#B8E8CD] flex items-center justify-center shrink-0 shadow-inner">
              <div className="rounded-xl bg-white/95 p-2.5 shadow-sm border border-[#A5DEBC] flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366] text-white">
                  <MessageCircle size={13} />
                </span>
                <span className="text-[10px] font-headline font-bold text-[#063828]">Auto-Reply</span>
              </div>
            </div>

            {/* Text & Action */}
            <div className="flex-1 flex flex-col justify-between min-w-0">
              <div>
                <h3 className="font-headline text-lg sm:text-[19px] font-bold text-[#141413] tracking-tight leading-snug">
                  WhatsApp &amp; Social Automation
                </h3>
                <p className="font-body text-xs sm:text-[13px] text-[#555047] leading-relaxed mt-1.5 mb-3.5">
                  We help you reply to enquiries and collect leads on WhatsApp and social chat 24/7 without delays.
                </p>
              </div>
              <Link
                href="/services/whatsapp-social-automation"
                onClick={rememberScroll}
                className="self-start inline-flex items-center gap-1 font-headline text-xs sm:text-[13px] font-semibold text-[#141413] transition-colors hover:text-[#6D32A8]"
              >
                <span>Explore service</span>
                <span aria-hidden="true" className="font-bold">›</span>
              </Link>
            </div>
          </div>

          {/* Service 03: CRM & Workflow Automation (Forest Green Card with Connected Systems) */}
          <div className="rounded-[28px] bg-[#EDE7DA] border border-[#DDD6C5]/80 p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-[#CDC5B3] hover:shadow-[0_6px_20px_rgba(0,0,0,0.04)]">
            {/* Forest Green Thumbnail with Connected Systems Nodes */}
            <div className="w-[124px] h-[124px] rounded-[22px] bg-[#07382B] border border-[#0A4838] flex items-center justify-center shrink-0 shadow-inner relative overflow-hidden">
              <div className="w-[78px] rounded-lg bg-[#FAF8F2] shadow-md p-2 flex flex-col gap-1 border border-[#E0DBCB]">
                <div className="flex items-center justify-between border-b border-[#E8E2D5] pb-1">
                  <span className="text-[7.5px] font-headline font-bold text-[#07382B]">CRM &amp; Sync</span>
                  <span className="text-[7px]">🔄</span>
                </div>
                <div className="text-[6.5px] font-mono text-[#555047] leading-tight space-y-0.5">
                  <div>Lead ➔ CRM</div>
                  <div>Auto Follow-up</div>
                </div>
                <div className="flex items-center gap-1 text-[7px] font-mono text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded mt-0.5">
                  <span>Synced</span>
                  <span>✓</span>
                </div>
              </div>
            </div>

            {/* Text & Action */}
            <div className="flex-1 flex flex-col justify-between min-w-0">
              <div>
                <h3 className="font-headline text-lg sm:text-[19px] font-bold text-[#141413] tracking-tight leading-snug">
                  CRM &amp; Workflow Automation
                </h3>
                <p className="font-body text-xs sm:text-[13px] text-[#555047] leading-relaxed mt-1.5 mb-3.5">
                  We connect your CRM and business apps. Software tracks leads, triggers follow-ups, and handles repeat tasks.
                </p>
              </div>
              <Link
                href="/services/crm-workflow-automation"
                onClick={rememberScroll}
                className="self-start inline-flex items-center gap-1 font-headline text-xs sm:text-[13px] font-semibold text-[#141413] transition-colors hover:text-[#6D32A8]"
              >
                <span>Explore service</span>
                <span aria-hidden="true" className="font-bold">›</span>
              </Link>
            </div>
          </div>

          {/* Service 04: Restaurant & Cafe Automation (Peach Card with Table Order & Review Widget) */}
          <div className="rounded-[28px] bg-[#EDE7DA] border border-[#DDD6C5]/80 p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-[#CDC5B3] hover:shadow-[0_6px_20px_rgba(0,0,0,0.04)]">
            {/* Peach Thumbnail with QR / Table Tag Icon */}
            <div className="w-[124px] h-[124px] rounded-[22px] bg-[#FCE6CF] border border-[#F0CCA8] flex items-center justify-center shrink-0 shadow-inner">
              <div className="rounded-xl bg-white/95 p-2 shadow-sm border border-[#E8C5A0] flex flex-col items-center gap-1 w-[84px]">
                <div className="flex items-center justify-between w-full px-0.5">
                  <span className="text-[8.5px] font-mono font-bold text-[#2B1705]">Table 04</span>
                  <span className="text-[8px]">📱</span>
                </div>
                <span className="text-[7.5px] font-headline font-semibold text-[#555047]">QR &amp; NFC Order</span>
                <div className="flex items-center gap-0.5 text-[7px] font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200/60 px-1 py-0.5 rounded">
                  <span>5★ Review</span>
                  <span>✓</span>
                </div>
              </div>
            </div>

            {/* Text & Action */}
            <div className="flex-1 flex flex-col justify-between min-w-0">
              <div>
                <h3 className="font-headline text-lg sm:text-[19px] font-bold text-[#141413] tracking-tight leading-snug">
                  Restaurant &amp; Cafe Table Ordering
                </h3>
                <p className="font-body text-xs sm:text-[13px] text-[#555047] leading-relaxed mt-1.5 mb-3.5">
                  QR and NFC table ordering, table reservations, and automated 5-star Google review collection for cafes and restaurants.
                </p>
              </div>
              <Link
                href="/services/restaurant-cafe-table-ordering"
                onClick={rememberScroll}
                className="self-start inline-flex items-center gap-1 font-headline text-xs sm:text-[13px] font-semibold text-[#141413] transition-colors hover:text-[#6D32A8]"
              >
                <span>Explore service</span>
                <span aria-hidden="true" className="font-bold">›</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Custom Requirements Box */}
        <div className="mt-12 sm:mt-16 rounded-3xl border border-[#E8E2D5] bg-white p-8 sm:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <div className="font-headline text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6D32A8] mb-2">
              Custom Requirements
            </div>
            <h4 className="font-serif text-2xl sm:text-3xl font-normal text-[#141413] mb-2">
              Not sure what you need?
            </h4>
            <p className="font-body text-sm sm:text-base leading-relaxed text-[#555047]">
              Tell us what slows your team down. We will look at your daily work and build a simple tool that fits your <span className="text-[#E4572E]">business</span>.
            </p>
          </div>
          <button
            onClick={() => openModal(undefined, "services")}
            className="shrink-0 inline-flex items-center gap-2.5 rounded-lg border border-[#141413] bg-[#EBDDFE] px-7 py-3.5 font-headline text-xs font-semibold uppercase tracking-wider text-[#141413] shadow-sm transition-all hover:bg-[#E2CEFF] active:scale-[0.98]"
          >
            <span className="grid grid-cols-2 gap-0.5 w-3 h-3">
              <span className="bg-[#141413] rounded-[0.5px]"></span>
              <span className="bg-[#141413] rounded-[0.5px]"></span>
              <span className="bg-[#141413] rounded-[0.5px]"></span>
              <span className="bg-[#141413] rounded-[0.5px]"></span>
            </span>
            <span>Discuss Your Project</span>
          </button>
        </div>
      </div>
    </section>
  );
}
