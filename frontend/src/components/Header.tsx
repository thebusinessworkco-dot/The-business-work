"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Instagram, Sparkles } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import { useContactModal } from "./ContactModal";

const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#how-we-work", label: "How We Work" },
  { href: "/#industries", label: "Industries" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { openModal } = useContactModal();
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mobileNavRef.current;
    if (!el) return;

    if (!open) {
      if (typeof document !== "undefined" && el.contains(document.activeElement)) {
        toggleBtnRef.current?.focus({ preventScroll: true });
      }
      el.setAttribute("inert", "");
      if ("inert" in el) {
        (el as HTMLElement).inert = true;
      }
    } else {
      el.removeAttribute("inert");
      if ("inert" in el) {
        (el as HTMLElement).inert = false;
      }
    }
  }, [open]);

  useEffect(() => {
    let ticking = false;

    const checkHeaderTheme = () => {
      const industriesEl = document.getElementById("industries");
      const howWeWorkEl = document.getElementById("how-we-work");
      let overDark = false;

      if (industriesEl) {
        const rect = industriesEl.getBoundingClientRect();
        // The floating header pill sits around top 8px to 75px
        if (rect.top <= 100 && rect.bottom >= 55) {
          overDark = true;
        }
      }

      if (!overDark && howWeWorkEl) {
        const rect = howWeWorkEl.getBoundingClientRect();
        // If bottom of how-we-work is in the lower half (during dark theme handoff)
        if (rect.bottom <= window.innerHeight * 0.65 && rect.bottom >= 0) {
          overDark = true;
        }
      }

      setIsDark(overDark);
      ticking = false;
    };

    const handleScroll = () => {
      if (open) {
        setOpen(false);
      }
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(checkHeaderTheme);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    checkHeaderTheme();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleBtnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 p-2 sm:p-4 pointer-events-none flex justify-center">
      <div
        className={`w-full max-w-5xl pointer-events-auto rounded-[22px] sm:rounded-full border px-3 sm:px-7 h-12 sm:h-14 flex items-center justify-between transition-all duration-500 ease-out ${
          isDark
            ? "border-[#4A2014] bg-[#220B05]/95 text-white shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-md"
            : "border-[#DDD6C5] bg-white/95 text-[#141413] shadow-[0_2px_14px_rgba(0,0,0,0.04)] backdrop-blur-md"
        }`}
      >
        {/* Left: Brand Logo */}
        <Link
          href="/"
          aria-label="The Business Work, home"
          className="shrink-0 flex items-center group py-1 relative"
        >
          {/* Black Logo (Default Light Theme) */}
          <Image
            src="/tbw-logo-horizontal-black.svg"
            alt="The Business Work"
            width={1053}
            height={116}
            priority
            className={`h-[20px] xs:h-[22px] sm:h-[26px] w-auto object-contain transition-opacity duration-300 group-hover:opacity-80 ${
              isDark ? "opacity-0 absolute pointer-events-none" : "opacity-100"
            }`}
          />
          {/* Official White Logo with Orange Circle (Dark / Deep Orange Theme) */}
          <Image
            src="/tbw-logo-horizontal-white.svg"
            alt="The Business Work"
            width={1053}
            height={116}
            priority
            className={`h-[20px] xs:h-[22px] sm:h-[26px] w-auto object-contain transition-opacity duration-300 group-hover:opacity-80 ${
              isDark ? "opacity-100" : "opacity-0 absolute pointer-events-none"
            }`}
          />
        </Link>

        {/* Center Navigation Links */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-7 lg:gap-9">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`font-headline text-[13.5px] font-medium transition-colors duration-300 ${
                isDark
                  ? "text-[#D5CEBB] hover:text-white"
                  : "text-[#4A4742] hover:text-[#141413]"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Right CTA Button & Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => openModal(undefined, "header")}
            aria-label="Discuss Your Project"
            className={`inline-flex h-8 sm:h-10 items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border px-2.5 sm:px-5 font-headline text-[11px] sm:text-[13px] font-bold transition-all active:scale-[0.98] shadow-xs whitespace-nowrap ${
              isDark
                ? "border-[#F59E0B] bg-[#F59E0B] text-[#141413] hover:bg-[#D97706]"
                : "border-[#141413] bg-[#EBDDFE] text-[#141413] hover:bg-[#E2CEFF]"
            }`}
          >
            <span className="grid grid-cols-2 gap-0.5 w-2.5 sm:w-3 h-2.5 sm:h-3" aria-hidden="true">
              <span className={`rounded-[0.5px] ${isDark ? "bg-[#141413]" : "bg-[#141413]"}`}></span>
              <span className={`rounded-[0.5px] ${isDark ? "bg-[#141413]" : "bg-[#141413]"}`}></span>
              <span className={`rounded-[0.5px] ${isDark ? "bg-[#141413]" : "bg-[#141413]"}`}></span>
              <span className={`rounded-[0.5px] ${isDark ? "bg-[#141413]" : "bg-[#141413]"}`}></span>
            </span>
            <span>
              <span className="inline sm:hidden">Discuss</span>
              <span className="hidden sm:inline">Discuss Your Project</span>
            </span>
          </button>

          {/* Mobile hamburger menu button */}
          <button
            type="button"
            ref={toggleBtnRef}
            className={`inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-transparent md:hidden shrink-0 active:scale-95 transition-colors duration-300 ${
              isDark ? "text-white" : "text-[#141413]"
            }`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <div className="flex h-3 w-3.5 sm:w-4 flex-col justify-between" aria-hidden="true">
              <span
                className={`h-[1.5px] w-3.5 sm:w-4 rounded-full transition-all duration-300 ease-in-out ${
                  isDark ? "bg-white" : "bg-[#141413]"
                } ${open ? "translate-y-[5px] rotate-45" : ""}`}
              />
              <span
                className={`h-[1.5px] w-3.5 sm:w-4 rounded-full transition-all duration-300 ease-in-out ${
                  isDark ? "bg-white" : "bg-[#141413]"
                } ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`h-[1.5px] w-3.5 sm:w-4 rounded-full transition-all duration-300 ease-in-out ${
                  isDark ? "bg-white" : "bg-[#141413]"
                } ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Collapsible Mobile Navigation Drawer */}
      <div
        id="mobile-nav"
        ref={mobileNavRef}
        aria-hidden={!open}
        className={`fixed top-14 inset-x-2.5 sm:inset-x-4 max-w-4xl mx-auto pointer-events-auto rounded-2xl border border-[#D6D0C4] bg-[#FAF7E8] shadow-xl overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out md:hidden ${
          open ? "grid grid-rows-[1fr] opacity-100" : "grid grid-rows-[0fr] opacity-0 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden">
          <nav aria-label="Mobile" className="px-5 py-4 text-[#181716]">
            <ul className="flex flex-col">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 font-headline text-base font-semibold border-b border-[#E8E2D5] last:border-0 hover:text-[#6D32A8] transition-colors"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
