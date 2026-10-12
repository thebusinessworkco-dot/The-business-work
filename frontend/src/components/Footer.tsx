import Link from "next/link";
import Logo from "./Logo";
import { site, isPlaceholder } from "@/lib/site";
import { services } from "@/content/services";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border-sand bg-background">
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-16 lg:px-12">
        <div className="grid grid-cols-1 gap-12 border-b border-border-sand pb-16 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo small />
            <p className="max-w-sm font-body text-sm leading-relaxed text-ink-muted">
              AI automation and connected digital systems, built around how your business actually works.
            </p>
            {!isPlaceholder("email") && (
              <a
                className="inline-block font-headline text-xs uppercase tracking-wider text-ink underline decoration-border-taupe underline-offset-4 hover:text-accent-ochre"
                href={`mailto:${site.email}`}
              >
                {site.email}
              </a>
            )}
          </div>

          <div className="space-y-4">
            <div className="font-headline text-xs uppercase tracking-wider text-ink-muted">Explore</div>
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
                  className="font-body text-sm text-ink-muted transition-colors hover:text-ink"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <div className="font-headline text-xs uppercase tracking-wider text-ink-muted">Services</div>
            <nav aria-label="Footer Services" className="flex flex-col space-y-2.5">
              {services.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.id}`}
                  className="font-body text-sm text-ink-muted transition-colors hover:text-ink"
                >
                  {s.title}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <div className="font-headline text-xs uppercase tracking-wider text-ink-muted">Contact</div>
            <div className="space-y-2 font-body text-sm text-ink-muted">
              {!isPlaceholder("phone") && <div>{site.phone}</div>}
              {!isPlaceholder("location") && <div>{site.location}</div>}
              {isPlaceholder("phone") && isPlaceholder("location") && (
                <div>Inquiries via contact form</div>
              )}
            </div>
            <div className="flex flex-col space-y-2.5 pt-2">
              <Link
                href="/privacy"
                className="font-body text-sm text-ink-muted transition-colors hover:text-ink"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="font-body text-sm text-ink-muted transition-colors hover:text-ink"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 font-headline text-xs uppercase tracking-wider text-ink-muted">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
