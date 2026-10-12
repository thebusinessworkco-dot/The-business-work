"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
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
  const { openModal } = useContactModal();
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border-sand bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between gap-2 sm:gap-4 md:gap-8 px-4 sm:px-6 lg:px-12">
        <Link href="/" aria-label="The Business Work, home" className="shrink-0"><Logo /></Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="py-1 font-headline text-xs uppercase tracking-wider text-ink-muted transition-colors hover:text-ink">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => openModal(undefined, "header")}
            aria-label="Discuss Your Project"
            className="inline-flex items-center justify-center rounded-full border border-border-taupe bg-surface-card px-3 sm:px-5 py-1.5 sm:py-2.5 font-headline text-[10px] sm:text-xs font-medium uppercase tracking-wider text-ink transition-all hover:border-ink hover:bg-[#F2ECE0] whitespace-nowrap"
          >
            <span className="hidden sm:inline">Discuss Your Project</span>
            <span className="sm:hidden">Discuss</span>
          </button>
          <button
            ref={toggleBtnRef}
            className="inline-flex h-11 w-11 items-center justify-center rounded border border-border-taupe bg-surface-card text-ink transition-colors hover:border-ink md:hidden shrink-0"
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
          <div className="pt-4">
            <button
              onClick={() => { setOpen(false); openModal(); }}
              className="w-full bg-ink py-3 font-headline text-xs font-semibold uppercase tracking-wider text-background transition-colors hover:bg-accent-ochre"
            >
              Discuss Your Project
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
