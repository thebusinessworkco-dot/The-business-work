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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

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
  }, []);

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
      className={`fixed inset-x-0 top-0 z-50 border-b border-border-sand/70 bg-background/80 backdrop-blur-md transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between gap-2 sm:gap-4 md:gap-8 px-4 sm:px-6 lg:px-12">
        <Link href="/" aria-label="The Business Work, home" className="shrink-0 flex items-center">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="py-1 font-headline text-xs uppercase tracking-wider text-ink-muted transition-colors hover:text-ink">
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
            className="hidden sm:inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-border-taupe bg-surface-card text-ink transition-all hover:border-ink hover:bg-[#F2ECE0] active:scale-[0.98]"
            title="Chat on WhatsApp"
          >
            <MessageCircle size={16} aria-hidden="true" />
          </a>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow on Instagram"
            className="hidden sm:inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-border-taupe bg-surface-card text-ink transition-all hover:border-ink hover:bg-[#F2ECE0] active:scale-[0.98]"
            title="Follow on Instagram"
          >
            <Instagram size={16} aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => openModal(undefined, "header")}
            aria-label="Discuss Your Project"
            className="inline-flex min-h-[38px] sm:min-h-[44px] items-center justify-center rounded-full border border-border-taupe bg-surface-card px-3 sm:px-5 py-1.5 sm:py-2.5 font-headline text-[10px] sm:text-xs font-medium uppercase tracking-wider text-ink transition-all hover:border-ink hover:bg-[#F2ECE0] whitespace-nowrap active:scale-[0.98]"
          >
            <span className="hidden sm:inline">Discuss Your Project</span>
            <span className="sm:hidden">Discuss</span>
          </button>
          <button
            type="button"
            ref={toggleBtnRef}
            className="inline-flex h-11 w-11 items-center justify-center rounded border border-border-taupe bg-surface-card text-ink transition-colors hover:border-ink md:hidden shrink-0 active:scale-[0.98]"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border-sand bg-background px-4 py-4 sm:px-6 md:hidden">
          <ul className="flex flex-col">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} onClick={() => setOpen(false)} className="block border-b border-border-sand/70 py-3 font-headline text-xs uppercase tracking-wider text-ink">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="pt-4 space-y-2.5">
            <button
              type="button"
              onClick={() => { setOpen(false); openModal(); }}
              className="w-full bg-ink py-3 font-headline text-xs font-semibold uppercase tracking-wider text-background transition-colors hover:bg-accent-ochre active:scale-[0.99]"
            >
              Discuss Your Project
            </button>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded border border-border-taupe bg-surface-card py-2.5 font-headline text-xs font-medium uppercase tracking-wider text-ink transition-colors hover:border-ink hover:bg-[#F2ECE0]"
              >
                <MessageCircle size={15} aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded border border-border-taupe bg-surface-card py-2.5 font-headline text-xs font-medium uppercase tracking-wider text-ink transition-colors hover:border-ink hover:bg-[#F2ECE0]"
              >
                <Instagram size={15} aria-hidden="true" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
