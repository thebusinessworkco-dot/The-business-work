"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Monitor,
  Smartphone,
  ExternalLink,
  RotateCw,
  MessageCircle,
} from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { useContactModal } from "@/components/ContactModal";

interface CafeDemoViewerProps {
  demoUrl: string;
}

export default function CafeDemoViewer({ demoUrl }: CafeDemoViewerProps) {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { openModal } = useContactModal();

  const handleRefresh = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#141413] text-[#FAF7E8]">
      {/* Top Embedded Control Bar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#2B2927] bg-[#1A1918] px-3 sm:px-6 z-20">
        {/* Left: Back Link & Breadcrumb */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/demo"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#3A3835] bg-[#22201E] px-2.5 py-1.5 text-xs font-semibold text-[#D6D0C4] transition-colors hover:border-[#DDD6C5] hover:text-white"
            aria-label="Back to all software demos"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            <span className="hidden xs:inline">All Demos</span>
          </Link>

          <div className="hidden md:flex items-center gap-2 text-xs text-[#8C867A]">
            <span>/</span>
            <span className="font-medium text-[#FAF7E8]">
              Café & Restaurant OS
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-950/80 border border-emerald-600/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live System
            </span>
          </div>
        </div>

        {/* Center: Device Mode Switcher */}
        <div className="flex items-center gap-1 rounded-xl border border-[#2B2927] bg-[#121211] p-1">
          <button
            type="button"
            onClick={() => setDevice("desktop")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 sm:px-3 py-1 text-xs font-semibold transition-all ${
              device === "desktop"
                ? "bg-[#FAF7E8] text-[#141413] shadow-xs"
                : "text-[#8C867A] hover:text-white"
            }`}
            aria-label="Switch to Desktop View"
          >
            <Monitor size={14} aria-hidden="true" />
            <span className="hidden sm:inline">Desktop</span>
          </button>

          <button
            type="button"
            onClick={() => setDevice("mobile")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 sm:px-3 py-1 text-xs font-semibold transition-all ${
              device === "mobile"
                ? "bg-[#FAF7E8] text-[#141413] shadow-xs"
                : "text-[#8C867A] hover:text-white"
            }`}
            aria-label="Switch to Mobile QR Ordering View"
          >
            <Smartphone size={14} aria-hidden="true" />
            <span className="hidden sm:inline">Mobile QR</span>
          </button>

          <button
            type="button"
            onClick={handleRefresh}
            title="Reload Demo"
            aria-label="Reload demo"
            className="hidden xs:inline-flex p-1.5 text-[#8C867A] hover:text-white transition-colors rounded-lg"
          >
            <RotateCw size={13} aria-hidden="true" />
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <a
            href={whatsappLink(
              "Hi! I am testing the Café & Restaurant Management System demo on The Business Work website and would like to discuss building a similar system for my business."
            )}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discuss on WhatsApp"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#25D366] bg-[#25D366] px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-[#1EBE5D] active:scale-95 shadow-xs whitespace-nowrap"
          >
            <MessageCircle size={13} aria-hidden="true" />
            <span>WhatsApp Us</span>
          </a>

          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open demo in new tab"
            aria-label="Open cafe demo in full-screen new tab"
            className="hidden sm:inline-flex p-1.5 text-[#8C867A] hover:text-white transition-colors rounded-lg"
          >
            <ExternalLink size={15} aria-hidden="true" />
          </a>
        </div>
      </header>

      {/* Main Interactive Stage */}
      <main className="relative flex-1 overflow-hidden bg-[#0A0A09]">
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#141413]/90 backdrop-blur-xs text-[#FAF7E8]">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
            <p className="mt-3 font-headline text-xs font-semibold text-[#8C867A]">
              Loading interactive Café OS…
            </p>
          </div>
        )}

        {device === "desktop" ? (
          /* Desktop Full-Bleed View */
          <div className="h-full w-full">
            <iframe
              key={`desktop-${iframeKey}`}
              src={demoUrl}
              title="Café & Restaurant Management System Interactive Demo"
              className="h-full w-full border-0 bg-white"
              onLoad={() => setIsLoading(false)}
              allow="clipboard-write"
            />
          </div>
        ) : (
          /* Mobile Simulated Device Frame */
          <div className="flex h-full w-full items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <div className="relative flex h-[780px] max-h-[calc(100vh-80px)] w-[380px] max-w-full flex-col overflow-hidden rounded-[44px] border-[10px] border-[#2B2927] bg-[#141413] shadow-[0_25px_70px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
              {/* Simulated Phone Speaker / Dynamic Island */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-20 h-4 w-28 rounded-full bg-[#2B2927]" />

              {/* Mobile Screen Content */}
              <iframe
                key={`mobile-${iframeKey}`}
                src={demoUrl}
                title="Café & Restaurant QR Table Ordering Mobile View"
                className="h-full w-full border-0 bg-white pt-2"
                onLoad={() => setIsLoading(false)}
                allow="clipboard-write"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
