import { processSteps } from "@/content/process";
import SectionHeading from "./SectionHeading";

export default function Process() {
  return (
    <section id="how-we-work" aria-labelledby="process-title" className="mx-auto w-full max-w-7xl px-6 py-24 md:py-32 lg:px-12">
      <SectionHeading
        eyebrow="02 / HOW WE WORK"
        title="From first conversation to live system."
        id="process-title"
        aside="Timelines and costs depend on scope. We agree both in writing before work starts."
      />
      <ol className="grid grid-cols-1 border-b border-border-sand md:grid-cols-2 lg:grid-cols-3">
        {processSteps.map((s, i) => (
          <li key={s.phase} className="flex flex-col justify-between border-border-sand py-10 md:border-r md:px-8 md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0 [&:not(:last-child)]:border-b lg:[&:nth-child(n+4)]:border-b-0 lg:[&:nth-child(-n+3)]:border-b">
            <div>
              <div className="mb-8 font-headline text-xs font-semibold uppercase tracking-wider text-accent-ochre">
                STEP {String(i + 1).padStart(2, "0")} {"//"} {s.phase}
              </div>
              <h3 className="mb-3 font-headline text-xl font-medium text-ink">{s.title}</h3>
              <p className="mb-6 font-body text-sm leading-relaxed text-ink-muted">{s.body}</p>
            </div>
            <div className="space-y-2 border-t border-border-sand/70 pt-6">
              <div className="font-headline text-[10px] uppercase tracking-wider text-ink-faint">Output</div>
              <div className="flex items-center gap-2 font-headline text-xs font-medium text-ink">
                <span className="h-1.5 w-1.5 bg-ink" />{s.output}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
