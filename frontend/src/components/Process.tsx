import { processSteps } from "@/content/process";
import SectionHeading from "./SectionHeading";

export default function Process() {
  return (
    <section id="how-we-work" aria-labelledby="process-title" className="w-full bg-section-pine py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeading
          dark
          eyebrow="02 / HOW WE WORK"
          title="How a project works"
          id="process-title"
          aside="We agree on the timeline and costs in writing before we start."
        />
        <ol className="grid grid-cols-1 border-b border-section-cream/25 md:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((s, i) => (
            <li key={s.phase} className="flex flex-col justify-between border-section-cream/25 py-8 sm:py-10 md:border-r md:px-8 md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0 [&:not(:last-child)]:border-b lg:[&:nth-child(n+4)]:border-b-0 lg:[&:nth-child(-n+3)]:border-b">
              <div>
                <div className="mb-8 font-headline text-xs font-semibold uppercase tracking-wider text-ochre-on-dark">
                  STEP {String(i + 1).padStart(2, "0")} {"//"} {s.phase}
                </div>
                <h3 className="mb-3 font-headline text-xl font-medium text-section-cream">{s.title}</h3>
                <p className="mb-6 font-body text-sm leading-relaxed text-on-pine-muted">{s.body}</p>
              </div>
              <div className="space-y-2 border-t border-section-cream/20 pt-6">
                <div className="font-headline text-[10px] uppercase tracking-wider text-on-pine-muted">What you get</div>
                <div className="flex items-center gap-2 font-headline text-xs font-medium text-section-cream">
                  <span className="h-1.5 w-1.5 bg-section-cream" />{s.output}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
