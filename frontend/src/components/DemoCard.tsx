"use client";

import Image from "next/image";
import { ExternalLink, Check, MessageCircle } from "lucide-react";
import { type DemoItem, getDemoLink } from "@/content/demos";
import { whatsappLink } from "@/lib/site";
import { useContactModal } from "./ContactModal";

function getDemoWhatsAppMessage(demo: DemoItem): string {
  switch (demo.slug) {
    case "cafe":
      return "Hi! I checked out the Café & Restaurant Management System demo on The Business Work website and would like to discuss building a similar system for my cafe / restaurant.";
    case "salon":
      return "Hi! I checked out the Salon & Luxury Spa Booking Engine demo on The Business Work website and would like to discuss building a similar system for my salon / spa.";
    case "real-estate":
      return "Hi! I checked out the Real Estate Inbound Lead & Site Visit CRM demo on The Business Work website and would like to discuss building a similar system for our real estate business.";
    case "clinic":
      return "Hi! I checked out the Clinic & Healthcare Patient Flow Automation demo on The Business Work website and would like to discuss building a similar system for our clinic.";
    default:
      return `Hi! I checked out the "${demo.title}" demo on The Business Work website and would like to discuss building a similar system for my business.`;
  }
}

interface DemoCardProps {
  demo: DemoItem;
}

export default function DemoCard({ demo }: DemoCardProps) {
  const { openModal } = useContactModal();
  const link = getDemoLink(demo);

  return (
    <article
      id={demo.id}
      aria-labelledby={`${demo.id}-title`}
      className="group relative rounded-[24px] sm:rounded-[32px] border border-[#E5DFD1] bg-white p-5 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-[#CDC5B3] hover:shadow-[0_12px_40px_rgba(0,0,0,0.07)]"
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
        {/* Left: Software Preview Mockup */}
        <div className="lg:col-span-6 xl:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-[#E8E2D5] bg-[#FAF8F5] shadow-xs transition-transform duration-500 group-hover:scale-[1.008]">
            {/* Browser / Application Top Bar */}
            <div className="flex items-center justify-between border-b border-[#E8E2D5] bg-[#F2EDE2]/70 px-4 py-2.5">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-[#E4572E]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]/70" />
              </div>
              <div className="flex items-center gap-1.5 rounded-md border border-[#E0D9CA] bg-white/80 px-3 py-1 font-mono text-[11px] text-[#7A756D]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" aria-hidden="true" />
                <span>thebusinesswork.com/demo/{demo.slug}</span>
              </div>
              <div className="text-[11px] font-headline font-bold uppercase tracking-wider text-[#7A756D]">
                Interactive
              </div>
            </div>

            {/* Clickable Image Anchor linking directly to demo */}
            <a
              href={link.href}
              target={link.isExternal ? "_blank" : undefined}
              rel={link.isExternal ? "noopener noreferrer" : undefined}
              aria-label={`Open ${demo.title} interactive live demo`}
              className="relative block aspect-[16/10] w-full overflow-hidden bg-[#FAF7E8] focus:outline-hidden focus:ring-2 focus:ring-[#141413]"
            >
              <Image
                src={demo.image}
                alt={demo.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 58vw, 680px"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                priority
              />
              <div className="absolute inset-0 bg-[#141413]/0 transition-colors duration-300 group-hover:bg-[#141413]/5" />
            </a>
          </div>
        </div>

        {/* Right: Software Details & Actions */}
        <div className="flex flex-col space-y-5 lg:col-span-6 xl:col-span-5">
          {/* Top Metadata: Status Badge & Category */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/80 bg-emerald-50 px-3 py-1 font-headline text-[11px] font-bold uppercase tracking-widest text-emerald-800">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
              </span>
              <span>{demo.status}</span>
            </div>

            <span className="font-headline text-xs font-semibold uppercase tracking-wider text-[#7A756D]">
              {demo.category}
            </span>
          </div>

          {/* Title */}
          <h2
            id={`${demo.id}-title`}
            className="font-serif text-2xl font-normal leading-[1.18] tracking-tight text-[#141413] sm:text-3xl lg:text-[34px]"
          >
            {demo.title}
          </h2>

          {/* Description */}
          <p className="font-body text-sm leading-relaxed text-[#555047] sm:text-[15px]">
            {demo.description}
          </p>

          {/* Capabilities List */}
          <div className="space-y-2.5 pt-1">
            <div className="font-headline text-[11px] font-bold uppercase tracking-[0.2em] text-[#7A756D]">
              Key Capabilities
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {demo.capabilities.map((capability) => (
                <div
                  key={capability}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#EDE7DA] bg-[#FAF8F5] px-3 py-2 font-headline text-xs font-semibold text-[#141413]"
                >
                  <Check size={14} className="shrink-0 text-[#E4572E]" aria-hidden="true" />
                  <span className="truncate">{capability}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2">
            <a
              href={link.href}
              target={link.isExternal ? "_blank" : undefined}
              rel={link.isExternal ? "noopener noreferrer" : undefined}
              className="group/btn inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#141413] bg-[#141413] px-5 py-3 sm:py-3.5 font-headline text-xs sm:text-[13px] font-bold tracking-wide text-[#FAF7E8] shadow-sm transition-all hover:bg-[#2B2927] hover:shadow-md active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <span className="whitespace-nowrap">Explore Live Demo</span>
              <ExternalLink
                size={14}
                className="transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 shrink-0"
                aria-hidden="true"
              />
            </a>

            <a
              href={whatsappLink(getDemoWhatsAppMessage(demo))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Chat on WhatsApp about ${demo.title}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#141413] bg-[#EBDDFE] px-5 py-3 sm:py-3.5 font-headline text-xs sm:text-[13px] font-bold tracking-wide text-[#141413] shadow-xs transition-all hover:bg-[#E2CEFF] active:scale-[0.98] cursor-pointer whitespace-nowrap shrink-0"
            >
              <MessageCircle
                size={16}
                className="text-[#25D366] fill-[#25D366]/20 shrink-0"
                aria-hidden="true"
              />
              <span className="whitespace-nowrap">Discuss on WhatsApp</span>
            </a>
          </div>

          <p className="pt-1 font-body text-[11px] text-[#7A756D]">
            Instant interactive demo · No registration or software install required
          </p>
        </div>
      </div>
    </article>
  );
}

