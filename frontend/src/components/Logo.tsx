import { site } from "@/lib/site";

export default function Logo({ small = false }: { small?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span className={`${small ? "h-4 w-4" : "h-5 w-5"} flex items-center justify-center bg-ink`} aria-hidden>
        <span className={`${small ? "h-1 w-1" : "h-1.5 w-1.5"} bg-background`} />
      </span>
      <span className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-ink">{site.name}</span>
    </span>
  );
}
