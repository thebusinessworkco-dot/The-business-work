export default function SectionHeading({
  eyebrow, title, aside, id,
}: { eyebrow: string; title: string; aside?: React.ReactNode; id?: string }) {
  return (
    <div className="flex flex-col justify-between gap-6 border-b border-border-sand pb-14 md:flex-row md:items-end">
      <div className="max-w-2xl">
        <div className="mb-3 font-headline text-xs font-semibold uppercase tracking-[0.22em] text-accent-ochre">{eyebrow}</div>
        <h2 id={id} className="font-headline text-3xl font-medium tracking-tight text-ink sm:text-4xl">{title}</h2>
      </div>
      {aside ? <div className="max-w-sm font-body text-sm leading-relaxed text-ink-muted sm:text-base">{aside}</div> : null}
    </div>
  );
}
