"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, MessageCircle, Instagram } from "lucide-react";
import Logo from "./Logo";
import { site, whatsappLink } from "@/lib/site";
import { useContactModal } from "./ContactModal";

const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#how-we-work", label: "How We Work" },
  { href: "/#industries", label: "Industries" },
  { href: "/#demos", label: "Demos" },
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

      // If mobile navbar is open and user scrolls, close it smoothly
      if (open && scrollDiff > 5) {
        setOpen(false);
      }

      // Always show near top
      if (currentScrollY <= 30) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        // Scrolling down -> hide
        setVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up -> reveal
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
      className={`fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#141413]/95 backdrop-blur-md transition-transform duration-300 ease-in-out text-white shadow-md ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between gap-2 sm:gap-4 md:gap-8 px-4 sm:px-6 lg:px-12">
        <Link href="/" aria-label="The Business Work, home" className="shrink-0 flex items-center">
          <Logo fill="#F7F4EE" className="!text-white" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="py-1 font-headline text-xs uppercase tracking-wider text-white/70 transition-colors hover:text-white">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="relative z-20 flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="hidden sm:inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all hover:bg-white/20 active:scale-[0.98]"
            title="Chat on WhatsApp"
          >
            <MessageCircle size={16} aria-hidden="true" />
          </a>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow on Instagram"
            className="hidden sm:inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all hover:bg-white/20 active:scale-[0.98]"
            title="Follow on Instagram"
          >
            <Instagram size={16} aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => openModal(undefined, "header")}
            aria-label="Let's Talk"
            className="inline-flex min-h-[38px] sm:min-h-[42px] items-center justify-center rounded-full bg-accent-ochre px-4 sm:px-5 py-1.5 sm:py-2 font-headline text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-accent-ochre-dark active:scale-[0.98] shadow-sm whitespace-nowrap"
          >
            Let&apos;s Talk
          </button>
          <button
            type="button"
            ref={toggleBtnRef}
            className="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all hover:bg-white/20 md:hidden shrink-0 active:scale-95 shadow-sm"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <div className="relative flex h-3.5 w-4 flex-col justify-between items-end" aria-hidden="true">
              <span
                className={`h-[1.5px] rounded-full bg-current transition-all duration-300 ease-in-out ${
                  open ? "w-4 translate-y-[6px] rotate-45" : "w-4"
                }`}
              />
              <span
                className={`h-[1.5px] rounded-full bg-current transition-all duration-300 ease-in-out ${
                  open ? "opacity-0" : "w-2.5"
                }`}
              />
              <span
                className={`h-[1.5px] rounded-full bg-current transition-all duration-300 ease-in-out ${
                  open ? "w-4 -translate-y-[6px] -rotate-45" : "w-4"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Collapsible Mobile Navigation Drawer with smooth animation */}
      <div
        id="mobile-nav"
        ref={mobileNavRef}
        aria-hidden={!open}
        inert={!open ? true : undefined}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out md:hidden ${
          open ? "grid-rows-[1fr] opacity-100 border-t border-white/10" : "grid-rows-[0fr] opacity-0 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden">
          <nav aria-label="Mobile" className="bg-[#141413] px-4 py-4 sm:px-6 shadow-2xl text-white">
            <ul className="flex flex-col">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/10 py-3 font-headline text-xs uppercase tracking-wider text-white/80 transition-colors hover:text-accent-ochre"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-4 space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openModal();
                }}
                className="w-full rounded bg-accent-ochre py-3 font-headline text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-accent-ochre-dark active:scale-[0.99] shadow-sm"
              >
                Let&apos;s Talk
              </button>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded border border-white/15 bg-white/5 py-2.5 font-headline text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-white/15"
                >
                  <MessageCircle size={15} aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded border border-white/15 bg-white/5 py-2.5 font-headline text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-white/15"
                >
                  <Instagram size={15} aria-hidden="true" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
