import Link from "next/link";
import Logo from "./Logo";
import { site } from "@/lib/site";
import { services } from "@/content/services";

export default function Footer() {
  return (
    <footer className="w-full border-t border-section-cream/20 bg-section-ink text-section-cream">
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-16 lg:px-12">
        <div className="grid grid-cols-1 gap-12 border-b border-section-cream/20 pb-16 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo small fill="#F7F4EE" className="!text-section-cream" />
            <p className="max-w-sm font-body text-sm leading-relaxed text-on-ink-muted">
              AI automation and connected digital systems, built around how your business actually works.
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
            <div className="font-headline text-xs uppercase tracking-wider text-section-cream">Contact</div>
            <div className="space-y-2 font-body text-sm text-on-ink-muted">
              <div>{site.phone}</div>
              <div>{site.location}</div>
            </div>
            <div className="flex flex-col space-y-2.5 pt-2">
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
