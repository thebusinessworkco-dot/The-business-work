import Link from "next/link";
import { MessageCircle, Instagram } from "lucide-react";
import Logo from "./Logo";
import { site, whatsappLink } from "@/lib/site";
import { services } from "@/content/services";

export default function Footer() {
  return (
    <footer className="w-full border-t border-section-cream/20 bg-section-ink text-section-cream">
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-16 lg:px-12">
        <div className="grid grid-cols-1 gap-12 border-b border-section-cream/20 pb-16 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo small fill="#F7F4EE" className="!text-section-cream" />
            <p className="max-w-sm font-body text-sm leading-relaxed text-on-ink-muted">
              Simple tools for your business, built around how your daily work runs.
            </p>
            <a
              className="inline-block font-headline text-xs uppercase tracking-wider text-section-cream underline decoration-section-cream/60 underline-offset-4 hover:text-ochre-on-dark"
              href={`mailto:${site.email}`}
            >
              {site.email}
            </a>
          </div>

          <div className="space-y-4">
            <div className="font-headline text-xs uppercase tracking-wider text-section-cream">Explore</div>
            <nav aria-label="Footer Navigation" className="flex flex-col space-y-2.5">
              {[
                ["/#services", "Services"],
                ["/#how-we-work", "How We Work"],
                ["/#industries", "Industries"],
                ["/#demos", "Demos"],
                ["/#contact", "Contact"],
              ].map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className="font-body text-sm text-on-ink-muted underline decoration-section-cream/30 underline-offset-4 transition-colors hover:text-section-cream hover:decoration-section-cream"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <div className="font-headline text-xs uppercase tracking-wider text-section-cream">Services</div>
            <nav aria-label="Footer Services" className="flex flex-col space-y-2.5">
              {services.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.id}`}
                  className="font-body text-sm text-on-ink-muted underline decoration-section-cream/30 underline-offset-4 transition-colors hover:text-section-cream hover:decoration-section-cream"
                >
                  {s.title}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <div className="font-headline text-xs uppercase tracking-wider text-section-cream">Contact &amp; Connect</div>
            <div className="space-y-2 font-body text-sm text-on-ink-muted">
              <div>
                <a href={site.phoneHref} className="transition-colors hover:text-section-cream">
                  {site.phone}
                </a>
              </div>
              <div>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-section-cream">
                  {site.email}
                </a>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="inline-flex items-center gap-1.5 rounded border border-section-cream/30 bg-section-cream/10 px-3 py-1.5 font-headline text-xs uppercase tracking-wider text-section-cream transition-colors hover:border-section-cream hover:bg-section-cream hover:text-ink"
              >
                <MessageCircle size={14} aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="inline-flex items-center gap-1.5 rounded border border-section-cream/30 bg-section-cream/10 px-3 py-1.5 font-headline text-xs uppercase tracking-wider text-section-cream transition-colors hover:border-section-cream hover:bg-section-cream hover:text-ink"
              >
                <Instagram size={14} aria-hidden="true" />
                <span>Instagram</span>
              </a>
            </div>
            <div className="flex flex-col space-y-2 pt-2">
              <Link
                href="/privacy"
                className="font-body text-sm text-on-ink-muted underline decoration-section-cream/30 underline-offset-4 transition-colors hover:text-section-cream hover:decoration-section-cream"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="font-body text-sm text-on-ink-muted underline decoration-section-cream/30 underline-offset-4 transition-colors hover:text-section-cream hover:decoration-section-cream"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 font-headline text-xs uppercase tracking-wider text-on-ink-muted">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
