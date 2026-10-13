import { principles } from "@/content/principles";
import SectionHeading from "./SectionHeading";

export default function Principles() {
  return (
    <section id="why-us" aria-labelledby="why-title" className="w-full border-t border-border-sand bg-section-cream py-8 sm:py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeading
          eyebrow="05 / WHY THE BUSINESS WORK"
          title="How we work with you"
          id="why-title"
          aside="We build small tools that work well. We do not promise sales or growth."
        />
        <div className="grid grid-cols-1 gap-6 pt-6 sm:pt-8 md:grid-cols-3">
          {principles.map((p) => (
            <div key={p.label} className="space-y-4 rounded-lg border border-border-sand bg-surface-card p-7">
              <div className="font-headline text-xs font-semibold uppercase tracking-wider text-accent-ochre">{p.label}</div>
              <h3 className="font-headline text-lg font-medium text-ink">{p.title}</h3>
              <p className="font-body text-sm leading-relaxed text-ink-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
