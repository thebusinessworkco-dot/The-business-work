"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
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
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
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
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = Math.abs(currentScrollY - lastScrollY.current);

      if (open && scrollDiff > 5) {
        setOpen(false);
      }

      if (currentScrollY <= 30) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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

  const isVisible = visible || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 p-2 sm:p-4 pointer-events-none transition-transform duration-300 ease-in-out flex justify-center ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full max-w-5xl pointer-events-auto rounded-[22px] sm:rounded-full border border-[#DDD6C5] bg-white/95 backdrop-blur-md px-3 sm:px-7 h-12 sm:h-14 flex items-center justify-between shadow-[0_2px_14px_rgba(0,0,0,0.04)]">
        
        {/* Left: Brand Logo (Always visible and never truncated) */}
        <Link href="/" aria-label="The Business Work, home" className="shrink-0 flex items-center gap-2 sm:gap-2.5 group">
          <span className="flex items-end gap-0.5 h-3.5 sm:h-4 px-0.5" aria-hidden="true">
            <span className="w-[2px] sm:w-[2.5px] h-2 sm:h-2.5 bg-[#141413] rounded-full" />
            <span className="w-[2px] sm:w-[2.5px] h-3.5 sm:h-4.5 bg-[#141413] rounded-full" />
            <span className="w-[2px] sm:w-[2.5px] h-1.5 sm:h-2 bg-[#141413] rounded-full" />
            <span className="w-[2px] sm:w-[2.5px] h-2.5 sm:h-3.5 bg-[#141413] rounded-full" />
          </span>
          <span className="font-headline font-bold text-[13px] sm:text-[15px] tracking-tight text-[#141413] whitespace-nowrap">
            The Business Work
          </span>
        </Link>

        {/* Center Navigation Links: Clean, spacious, only what's useful */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-7 lg:gap-9">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="font-headline text-[13.5px] font-medium text-[#4A4742] transition-colors hover:text-[#141413]"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Right CTA Button & Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">

          {/* Wispr Flow Lavender CTA Button: Compact on mobile to fit perfectly without overlap */}
          <button
            type="button"
            onClick={() => openModal(undefined, "header")}
            aria-label="Discuss Your Project"
            className="inline-flex h-8 sm:h-10 items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border border-[#141413] bg-[#EBDDFE] px-2.5 sm:px-5 font-headline text-[11px] sm:text-[13px] font-bold text-[#141413] transition-all hover:bg-[#E2CEFF] active:scale-[0.98] shadow-xs whitespace-nowrap"
          >
            <span className="grid grid-cols-2 gap-0.5 w-2.5 sm:w-3 h-2.5 sm:h-3" aria-hidden="true">
              <span className="bg-[#141413] rounded-[0.5px]"></span>
              <span className="bg-[#141413] rounded-[0.5px]"></span>
              <span className="bg-[#141413] rounded-[0.5px]"></span>
              <span className="bg-[#141413] rounded-[0.5px]"></span>
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
            className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-transparent md:hidden shrink-0 active:scale-95 text-[#141413]"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <div className="flex h-3 w-3.5 sm:w-4 flex-col justify-between" aria-hidden="true">
              <span
                className={`h-[1.5px] w-3.5 sm:w-4 rounded-full bg-[#141413] transition-all duration-300 ease-in-out ${
                  open ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[1.5px] w-3.5 sm:w-4 rounded-full bg-[#141413] transition-all duration-300 ease-in-out ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-[1.5px] w-3.5 sm:w-4 rounded-full bg-[#141413] transition-all duration-300 ease-in-out ${
                  open ? "-translate-y-[5px] -rotate-45" : ""
                }`}
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
        inert={!open ? true : undefined}
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
                    className="block border-b border-[#E8E2D5] py-2.5 font-body text-xs text-[#4A4742] transition-colors hover:text-[#181716]"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-3 flex items-center gap-2">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-[#D6D0C4] bg-white py-2 font-headline text-xs font-medium text-[#181716]"
              >
                <MessageCircle size={14} className="text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-[#D6D0C4] bg-white py-2 font-headline text-xs font-medium text-[#181716]"
              >
                <Instagram size={14} className="text-[#E1306C]" />
                <span>Instagram</span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
