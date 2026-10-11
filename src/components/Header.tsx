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
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-8 px-6 lg:px-12">
        <Link href="/" aria-label="The Business Work, home"><Logo /></Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="py-1 font-headline text-xs uppercase tracking-wider text-ink-muted transition-colors hover:text-ink">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openModal()}
            className="inline-flex items-center justify-center rounded-full border border-border-taupe bg-surface-card px-5 py-2.5 font-headline text-xs font-medium uppercase tracking-wider text-ink transition-all hover:border-ink hover:bg-[#F2ECE0]"
          >
            Discuss Your Project
          </button>
          <button
            ref={toggleBtnRef}
            className="inline-flex h-11 w-11 items-center justify-center border border-border-taupe bg-surface-card md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border-sand bg-background px-6 py-4 md:hidden">
          <ul className="flex flex-col">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} onClick={() => setOpen(false)} className="block border-b border-border-sand/70 py-3 font-headline text-xs uppercase tracking-wider text-ink">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
