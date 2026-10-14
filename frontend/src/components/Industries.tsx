import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { industries } from "@/content/industries";
import SectionHeading from "./SectionHeading";

export default function Industries() {
  return (
    <section id="industries" aria-labelledby="industries-title" className="w-full border-y border-border-sand bg-section-clay py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeading
          eyebrow="03 / INDUSTRIES"
          title="Who we help"
          id="industries-title"
          aside="These show where our tools fit. They describe what we can build for you."
        />
        <ul className="grid grid-cols-1 gap-px bg-border-sand pt-0 md:grid-cols-2 lg:grid-cols-3 [&>li]:bg-surface-card">
          {industries.map((i) => (
            <li key={i.name} className="flex flex-col justify-between space-y-3 p-7">
              <div className="space-y-3">
                <h3 className="font-headline text-lg font-medium text-ink">{i.name}</h3>
                <p className="font-body text-sm leading-relaxed text-ink-muted">{i.body}</p>
              </div>
              {i.href && (
                <div className="pt-2">
                  <Link
                    href={i.href}
                    className="inline-flex items-center gap-1.5 font-headline text-xs uppercase tracking-wider text-accent-ochre-dark transition-colors hover:text-ink"
                  >
                    <span>{i.linkText ?? "Read more"}</span>
                    <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
