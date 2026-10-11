import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="mx-auto flex min-h-[70vh] w-full max-w-4xl flex-col items-center justify-center px-6 py-32 text-center">
        <div className="mb-4 font-headline text-xs font-semibold uppercase tracking-[0.2em] text-accent-ochre">
          404 Error // Not Found
        </div>
        <h1 className="font-headline text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-4 max-w-md font-body text-base leading-relaxed text-ink-muted">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded bg-ink px-6 py-3 font-headline text-xs font-semibold uppercase tracking-wider text-background transition-colors hover:bg-accent-ochre"
          >
            Return to Home
          </Link>
          <Link
            href="/#services"
            className="inline-flex items-center justify-center rounded border border-border-taupe bg-surface-card px-6 py-3 font-headline text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:border-ink hover:bg-[#EFEAE0]"
          >
            Explore Services
          </Link>
        </div>

        <div className="mt-16 w-full border-t border-border-sand pt-12 text-left">
          <div className="mb-6 font-headline text-xs uppercase tracking-wider text-ink-muted">
            Or browse our services directly:
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {services.map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.id}`}
                className="rounded border border-border-sand bg-surface-card p-4 transition-colors hover:border-ink"
              >
                <div className="font-headline text-sm font-medium text-ink">
                  {s.title}
                </div>
                <div className="mt-1 font-body text-xs text-ink-muted">
                  {s.tag}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
