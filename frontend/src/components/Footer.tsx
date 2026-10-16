import Link from "next/link";
import { MessageCircle, Instagram } from "lucide-react";
import Logo from "./Logo";
import { site, whatsappLink } from "@/lib/site";
import { serviceList } from "@/content/service-list";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#E8E2D5] bg-[#FAF7E8] text-[#141413]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-8 sm:pb-12 pt-8 sm:pt-14 lg:px-12">
        <div className="grid grid-cols-1 gap-7 sm:gap-10 border-b border-[#E8E2D5] pb-8 sm:pb-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3 sm:space-y-4">
            <Logo small fill="#141413" className="!text-[#141413]" />
            <p className="max-w-sm font-body text-sm leading-relaxed text-[#555047]">
              Simple tools for your business, built around how your daily work runs.
            </p>
            <a
              className="inline-block font-headline text-xs uppercase tracking-wider text-[#141413] underline decoration-[#141413]/30 underline-offset-4 hover:text-[#6D32A8]"
              href={`mailto:${site.email}`}
            >
              {site.email}
            </a>
          </div>

          <div className="space-y-4">
            <div className="font-headline text-xs font-semibold uppercase tracking-wider text-[#141413]">Explore</div>
            <nav aria-label="Footer Navigation" className="flex flex-col space-y-2.5">
              {[
                ["/#services", "Services"],
                ["/#how-we-work", "How We Work"],
                ["/#industries", "Industries"],
                ["/#contact", "Contact"],
              ].map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className="font-body text-sm text-[#555047] transition-colors hover:text-[#141413]"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <div className="font-headline text-xs font-semibold uppercase tracking-wider text-[#141413]">Services</div>
            <nav aria-label="Footer Services" className="flex flex-col space-y-2.5">
              {serviceList.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.slug}`}
                  className="font-body text-sm text-[#555047] transition-colors hover:text-[#141413]"
                >
                  {s.title}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <div className="font-headline text-xs font-semibold uppercase tracking-wider text-[#141413]">Contact &amp; Connect</div>
            <div className="space-y-2 font-body text-sm text-[#555047]">
              <div>
                <a href={site.phoneHref} className="transition-colors hover:text-[#141413]">
                  {site.phone}
                </a>
              </div>
              <div>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-[#141413]">
                  {site.email}
                </a>
              </div>
              <div>{site.location}</div>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCD6C7] bg-white px-3 py-1.5 font-headline text-xs uppercase tracking-wider text-[#141413] shadow-xs transition-colors hover:bg-[#FAF7E8]"
              >
                <MessageCircle size={14} className="text-[#25D366]" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCD6C7] bg-white px-3 py-1.5 font-headline text-xs uppercase tracking-wider text-[#141413] shadow-xs transition-colors hover:bg-[#FAF7E8]"
              >
                <Instagram size={14} className="text-[#E1306C]" aria-hidden="true" />
                <span>Instagram</span>
              </a>
            </div>
            <div className="flex flex-col space-y-2 pt-2">
              <Link
                href="/privacy"
                className="font-body text-sm text-[#555047] transition-colors hover:text-[#141413]"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="font-body text-sm text-[#555047] transition-colors hover:text-[#141413]"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 font-headline text-xs uppercase tracking-wider text-[#7A756D]">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
