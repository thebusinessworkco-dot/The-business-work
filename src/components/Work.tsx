"use client";

import { useState } from "react";
import { demos, type Demo } from "@/content/work";
import SectionHeading from "./SectionHeading";

function DemoCard({ demo }: { demo: Demo }) {
  const [tab, setTab] = useState<"flow" | "scope">("flow");
  const tabs: ("flow" | "scope")[] = ["flow", "scope"];

  const handleKeyDown = (e: React.KeyboardEvent, currentTab: "flow" | "scope") => {
    let newTab: "flow" | "scope" | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      newTab = currentTab === "flow" ? "scope" : "flow";
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      newTab = currentTab === "scope" ? "flow" : "scope";
    } else if (e.key === "Home") {
      e.preventDefault();
      newTab = "flow";
    } else if (e.key === "End") {
      e.preventDefault();
      newTab = "scope";
    }

    if (newTab) {
      setTab(newTab);
      const btn = document.getElementById(`tab-${demo.id}-${newTab}`);
      btn?.focus();
    }
  };

  const tabBtn = (active: boolean) =>
    `inline-flex min-h-[44px] items-center px-4 py-2 text-xs font-headline uppercase tracking-wider border rounded transition-colors ${
      active
        ? "border-ink bg-ink text-background"
        : "border-border-taupe bg-background text-ink hover:border-ink hover:bg-[#F2ECE0]"
    }`;

  return (
    <article className="rounded-lg border border-border-sand bg-surface-card p-6 shadow-sm lg:p-10" aria-labelledby={`${demo.id}-title`}>
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <div className="flex flex-wrap items-center gap-3 font-headline text-xs uppercase tracking-wider text-ink-muted">
            <span>{demo.code}</span><span>·</span>
            <span className="font-semibold text-accent-ochre">{demo.category}</span>
          </div>
          <h3 id={`${demo.id}-title`} className="font-headline text-2xl font-normal text-ink lg:text-3xl">{demo.title}</h3>
          <p className="font-body text-sm leading-relaxed text-ink-muted sm:text-base">{demo.body}</p>
          <div className="inline-flex items-center gap-2 rounded border border-border-sand bg-background px-3 py-1.5 font-headline text-xs uppercase tracking-wider text-ink">
            <span className="h-2 w-2 rounded-full bg-accent-ochre" />{demo.status}
          </div>
          <div role="tablist" aria-label={`${demo.title} details`} className="flex gap-2 pt-2">
            <button
              id={`tab-${demo.id}-flow`}
              role="tab"
              type="button"
              tabIndex={tab === "flow" ? 0 : -1}
              aria-selected={tab === "flow"}
              aria-controls={`panel-${demo.id}-flow`}
              className={tabBtn(tab === "flow")}
              onClick={() => setTab("flow")}
              onKeyDown={(e) => handleKeyDown(e, "flow")}
            >
              Flow
            </button>
            <button
              id={`tab-${demo.id}-scope`}
              role="tab"
              type="button"
              tabIndex={tab === "scope" ? 0 : -1}
              aria-selected={tab === "scope"}
              aria-controls={`panel-${demo.id}-scope`}
              className={tabBtn(tab === "scope")}
              onClick={() => setTab("scope")}
              onKeyDown={(e) => handleKeyDown(e, "scope")}
            >
              Scope &amp; status
            </button>
          </div>
        </div>

        <div className="flex min-h-[320px] flex-col justify-between rounded border border-border-sand bg-background p-6 lg:col-span-7">
          {tab === "flow" ? (
            <div
              id={`panel-${demo.id}-flow`}
              role="tabpanel"
              tabIndex={0}
              aria-labelledby={`tab-${demo.id}-flow`}
              className="space-y-4 focus:outline-none"
            >
              <div className="border-b border-border-sand pb-3 font-headline text-xs uppercase text-ink-muted">{demo.flowTitle}</div>
              <ol className="space-y-3 pt-2 font-mono text-xs text-ink sm:text-sm">
                {demo.flow.map((f, i) => (
                  <li key={f.text} className="flex items-center justify-between gap-4 rounded border border-border-sand bg-surface-card p-3">
                    <span className="text-ink-muted">{i + 1}. {f.text}</span>
                    <span className="shrink-0 font-bold text-ink">{f.tag}</span>
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <div
              id={`panel-${demo.id}-scope`}
              role="tabpanel"
              tabIndex={0}
              aria-labelledby={`tab-${demo.id}-scope`}
              className="space-y-4 focus:outline-none"
            >
              <div className="border-b border-border-sand pb-3 font-headline text-xs uppercase text-ink-muted">What this is, honestly</div>
              <dl className="space-y-3 pt-2">
                {demo.scope.map((s) => (
                  <div key={s.label} className="rounded border border-border-sand bg-surface-card p-4">
                    <dt className="mb-1 font-headline text-xs uppercase text-ink-muted">{s.label}</dt>
                    <dd className="font-body text-sm text-ink">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          <div className="mt-6 border-t border-border-sand pt-4 font-headline text-xs text-ink-muted">{demo.note}</div>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <section id="demos" aria-labelledby="demos-title" className="mx-auto w-full max-w-7xl px-6 py-24 md:py-32 lg:px-12">
      <SectionHeading
        eyebrow="04 / DEMOS"
        title="What we're building and testing."
        id="demos-title"
        aside="Each project is labelled with its real status. No client deployments are claimed here yet."
      />
      <div className="space-y-12 pt-14">
        {demos.map((d) => <DemoCard key={d.id} demo={d} />)}
      </div>
    </section>
  );
}
