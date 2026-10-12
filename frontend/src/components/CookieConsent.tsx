"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";

const STORAGE_KEY = "tbw_cookie_consent";

export default function CookieConsent() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const [consent, setConsent] = useState<"pending" | "accepted" | "rejected" | null>(null);

  useEffect(() => {
    // If GA is not configured, do not touch storage or render anything
    if (!gaId) return;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "accepted" || saved === "rejected") {
        setConsent(saved);
      } else {
        setConsent("pending");
      }
    } catch {
      setConsent("pending");
    }
  }, [gaId]);

  // If GA is unset or user already dismissed/consented, manage script injection
  if (!gaId) return null;

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {}
    setConsent("accepted");
  };

  const handleReject = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "rejected");
    } catch {}
    setConsent("rejected");
  };

  return (
    <>
      {consent === "pending" && (
        <aside
          role="dialog"
          aria-label="Cookie consent"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 sm:max-w-md rounded-lg border border-ink bg-surface-card p-5 shadow-2xl transition-all"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-accent-ochre" aria-hidden="true" />
              <h2 className="font-headline text-xs font-semibold uppercase tracking-wider text-ink">
                Cookie & Analytics Consent
              </h2>
            </div>
            <p className="font-body text-xs leading-relaxed text-ink-muted">
              We use optional Google Analytics to understand aggregated site visits. No tracking cookies are set unless you accept. Read our{" "}
              <Link
                href="/privacy"
                className="text-ink underline decoration-border-taupe underline-offset-2 hover:text-accent-ochre"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleAccept}
                className="flex-1 rounded bg-ink px-4 py-2.5 font-headline text-xs font-semibold uppercase tracking-wider text-background transition-colors hover:bg-accent-ochre focus:outline-none focus:ring-2 focus:ring-ink"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={handleReject}
                className="flex-1 rounded border border-border-taupe bg-surface-card px-4 py-2.5 font-headline text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:border-ink hover:bg-[#EAE4D7] focus:outline-none focus:ring-2 focus:ring-ink"
              >
                Reject
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Load GA4 script ONLY after explicit user consent */}
      {consent === "accepted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics-consented" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}
    </>
  );
}
