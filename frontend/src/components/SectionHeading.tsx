export default function SectionHeading({
  eyebrow, title, aside, id, dark = false,
}: { eyebrow: string; title: string; aside?: React.ReactNode; id?: string; dark?: boolean }) {
  return (
    <div className={`flex flex-col justify-between gap-6 border-b pb-10 md:pb-12 md:flex-row md:items-end ${dark ? "border-section-cream/25" : "border-border-sand"}`}>
      <div className="max-w-2xl">
        <div className={`mb-3 font-headline text-xs font-semibold uppercase tracking-[0.22em] ${dark ? "text-ochre-on-dark" : "text-accent-ochre-dark"}`}>{eyebrow}</div>
        <h2 id={id} className={`font-headline text-3xl font-medium tracking-tight sm:text-4xl ${dark ? "text-section-cream" : "text-ink"}`}>{title}</h2>
      </div>
      {aside ? <div className={`max-w-sm font-body text-sm leading-relaxed sm:text-base ${dark ? "text-on-pine-muted" : "text-ink-muted"}`}>{aside}</div> : null}
    </div>
  );
}
