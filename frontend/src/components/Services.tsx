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
      id: "crm-sales-automation",
      index: "02",
      title: "CRM & Sales Automation",
      tag: "Pipeline & follow-ups",
      summary: "We help you track leads, manage sales, and send follow-ups automatically.",
      solves: "Stops manual lead tracking and forgotten follow-ups.",
      capabilities: [{ name: "Automated Follow-ups" }, { name: "Lead Status Tracking" }],
      depends: "Your current CRM or spreadsheet",
    },
    {
      id: "business-workflow-automation",
      index: "03",
      title: "Business Workflow Automation",
      tag: "Connected systems",
      summary: "We connect your business apps. Software does repeat tasks so your team saves time.",
      solves: "Typing data twice between apps, messy form entries, and time lost on repeat reports.",
      capabilities: [{ name: "Cross-App Sync" }, { name: "Automated Reports" }],
      depends: "Your existing tools and login access",
    },
    {
      id: "whatsapp-social-automation",
      index: "04",
      title: "WhatsApp & Social Automation",
      tag: "Messaging channels",
      summary: "We help you reply to enquiries and collect leads on WhatsApp and social chat.",
      solves: "Slow replies to customer messages during busy hours.",
      capabilities: [{ name: "WhatsApp Business API" }, { name: "Lead Intake Forms" }],
      depends: "Your WhatsApp Business account",
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
                className="self-start inline-flex items-center gap-1 font-headline text-xs sm:text-[13px] font-semibold text-[#141413] transition-colors hover:text-[#6D32A8]"
              >
                <span>Explore service</span>
                <span aria-hidden="true" className="font-bold">›</span>
              </Link>
            </div>
          </div>

          {/* Service 02: CRM & Sales Automation (Peach Card with Sheets ➔ CRM Sync Widget) */}
          <div className="rounded-[28px] bg-[#EDE7DA] border border-[#DDD6C5]/80 p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-[#CDC5B3] hover:shadow-[0_6px_20px_rgba(0,0,0,0.04)]">
            {/* Peach Thumbnail with Connected Apps Icon */}
            <div className="w-[124px] h-[124px] rounded-[22px] bg-[#FCE6CF] border border-[#F0CCA8] flex items-center justify-center shrink-0 shadow-inner">
              <div className="rounded-xl bg-white/95 p-2.5 shadow-sm border border-[#E8C5A0] flex flex-col items-center gap-1.5 w-20">
                <span className="text-[10px] font-mono font-bold text-[#2B1705]">Sheets ➔ CRM</span>
                <div className="flex items-center gap-1 text-[8px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                  <span>Synced</span>
                  <span>✓</span>
                </div>
              </div>
            </div>

            {/* Text & Action */}
            <div className="flex-1 flex flex-col justify-between min-w-0">
              <div>
                <h3 className="font-headline text-lg sm:text-[19px] font-bold text-[#141413] tracking-tight leading-snug">
                  CRM &amp; Sales Automation
                </h3>
                <p className="font-body text-xs sm:text-[13px] text-[#555047] leading-relaxed mt-1.5 mb-3.5">
                  We help you track leads, manage sales pipelines, and send follow-ups automatically so you never miss a buyer.
                </p>
              </div>
              <Link
                href="/services/crm-sales-automation"
                className="self-start inline-flex items-center gap-1 font-headline text-xs sm:text-[13px] font-semibold text-[#141413] transition-colors hover:text-[#6D32A8]"
              >
                <span>Explore service</span>
                <span aria-hidden="true" className="font-bold">›</span>
              </Link>
            </div>
          </div>

          {/* Service 03: Business Workflow Automation (Forest Green Card with Connected Systems) */}
          <div className="rounded-[28px] bg-[#EDE7DA] border border-[#DDD6C5]/80 p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-[#CDC5B3] hover:shadow-[0_6px_20px_rgba(0,0,0,0.04)]">
            {/* Forest Green Thumbnail with Connected Systems Nodes */}
            <div className="w-[124px] h-[124px] rounded-[22px] bg-[#07382B] border border-[#0A4838] flex items-center justify-center shrink-0 shadow-inner relative overflow-hidden">
              <div className="w-[72px] rounded-lg bg-[#FAF8F2] shadow-md p-2 flex flex-col gap-1 border border-[#E0DBCB]">
                <div className="flex items-center justify-between border-b border-[#E8E2D5] pb-1">
                  <span className="text-[7.5px] font-headline font-bold text-[#07382B]">Webhook Sync</span>
                  <span className="text-[7px]">🔄</span>
                </div>
                <div className="text-[6.5px] font-mono text-[#555047] leading-tight space-y-0.5">
                  <div>Form ➔ Sheets</div>
                  <div>Sheets ➔ WhatsApp</div>
                </div>
                <div className="h-[2px] w-full bg-emerald-600 rounded-full mt-0.5" />
              </div>
            </div>

            {/* Text & Action */}
            <div className="flex-1 flex flex-col justify-between min-w-0">
              <div>
                <h3 className="font-headline text-lg sm:text-[19px] font-bold text-[#141413] tracking-tight leading-snug">
                  Business Workflow Automation
                </h3>
                <p className="font-body text-xs sm:text-[13px] text-[#555047] leading-relaxed mt-1.5 mb-3.5">
                  We connect your business apps. Software does repeat tasks so your team saves hours every week.
                </p>
              </div>
              <Link
                href="/services/business-workflow-automation"
                className="self-start inline-flex items-center gap-1 font-headline text-xs sm:text-[13px] font-semibold text-[#141413] transition-colors hover:text-[#6D32A8]"
              >
                <span>Explore service</span>
                <span aria-hidden="true" className="font-bold">›</span>
              </Link>
            </div>
          </div>

          {/* Service 04: WhatsApp & Social Automation (Mint Emerald Card with WhatsApp Badge) */}
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
              Tell us what slows your team down. We will look at your daily work and build a simple tool that fits your business.
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

