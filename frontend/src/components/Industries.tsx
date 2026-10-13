import { industries } from "@/content/industries";
import SectionHeading from "./SectionHeading";

export default function Industries() {
  return (
    <section id="industries" aria-labelledby="industries-title" className="w-full border-y border-border-sand bg-section-clay py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeading
          eyebrow="03 / INDUSTRIES"
          title="Where automation fits."
          id="industries-title"
          aside="Typical use cases by industry. These describe what we can build, not completed client projects."
        />
        <ul className="grid grid-cols-1 gap-px bg-border-sand pt-0 md:grid-cols-2 lg:grid-cols-3 [&>li]:bg-surface-card">
          {industries.map((i) => (
            <li key={i.name} className="space-y-3 p-7">
              <h3 className="font-headline text-lg font-medium text-ink">{i.name}</h3>
              <p className="font-body text-sm leading-relaxed text-ink-muted">{i.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
