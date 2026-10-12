"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { services } from "@/content/services";
import { whatsappLink } from "@/lib/site";

type Ctx = { openModal: (service?: string) => void; isOpen: boolean };
const ModalContext = createContext<Ctx>({ openModal: () => {}, isOpen: false });
export const useContactModal = () => useContext(ModalContext);

type Status = "idle" | "sending" | "success" | "error";

const inputCls =
  "w-full rounded border border-border-sand bg-background px-3 py-2.5 font-body text-sm text-ink transition-colors focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink";
const labelCls = "mb-1.5 block font-headline text-xs uppercase tracking-wider text-ink-muted";

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState("Not sure yet / custom solution");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);
  const [startedAt, setStartedAt] = useState<number>(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openModal = useCallback((s?: string) => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    if (s) setService(s);
    setStatus("idle");
    setError("");
    setConsent(false);
    setStartedAt(Date.now());
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    firstFieldRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([type="hidden"]), select, textarea'
        );
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload: Record<string, unknown> = Object.fromEntries(fd.entries());
    payload.startedAt = startedAt;
    payload.consent = consent;

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again or use WhatsApp.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <ModalContext.Provider value={{ openModal, isOpen: open }}>
      {children}
      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm"
          onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-title"
            className="max-h-[92vh] w-full max-w-lg space-y-5 overflow-y-auto rounded-lg border border-ink bg-surface-card p-6 shadow-2xl md:p-8"
          >
            <div className="flex items-center justify-between border-b border-border-sand pb-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-accent-ochre" />
                <h2 id="enquiry-title" className="font-headline text-xs font-semibold uppercase tracking-wider text-ink">Discuss Your Project</h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close dialog"
                className="-mr-2 flex h-11 w-11 items-center justify-center rounded text-ink-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
              >
                <X size={20} />
              </button>
            </div>

            {status === "success" ? (
              <div role="status" aria-live="polite" className="space-y-4 py-4 text-center">
                <p className="font-headline text-sm uppercase tracking-wider text-ink">Thanks. Your enquiry has been sent.</p>
                <p className="font-body text-sm text-ink-muted">We&apos;ll review it and get back to you.</p>
                <button type="button" onClick={close} className="bg-ink px-6 py-3 font-headline text-xs font-semibold uppercase tracking-wider text-background hover:bg-accent-ochre">Close</button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4" noValidate={false}>
                <p className="font-body text-sm text-ink-muted">Share a few details and a short description of the problem. We&apos;ll reply with next steps.</p>

                {/* Honeypot: real users never see or fill this */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="hp-website">Website</label>
                  <input id="hp-website" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                <div>
                  <label className={labelCls} htmlFor="c-name">Name</label>
                  <input ref={firstFieldRef} id="c-name" name="name" required maxLength={100} autoComplete="name" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls} htmlFor="c-business">Business name</label>
                  <input id="c-business" name="business" maxLength={120} autoComplete="organization" className={inputCls} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCls} htmlFor="c-email">Email</label>
                    <input id="c-email" name="email" type="email" maxLength={160} autoComplete="email" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="c-phone">Phone / WhatsApp</label>
                    <input id="c-phone" name="phone" type="tel" maxLength={25} autoComplete="tel" className={inputCls} />
                  </div>
                </div>
                <p className="-mt-2 font-body text-xs text-ink-faint">Provide at least an email or a phone number.</p>
                <div>
                  <label className={labelCls} htmlFor="c-service">Service of interest</label>
                  <select id="c-service" name="service" value={service} onChange={(e) => setService(e.target.value)} className={inputCls}>
                    {services.map((s) => <option key={s.id}>{s.title}</option>)}
                    <option>Not sure yet / custom solution</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls} htmlFor="c-problem">What would you like to improve?</label>
                  <textarea id="c-problem" name="problem" rows={3} maxLength={1500} className={inputCls} placeholder="e.g. We reply to appointment requests on WhatsApp by hand." />
                </div>

                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    id="c-consent"
                    name="consent"
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-border-sand bg-background text-ink accent-ink focus:outline-none focus:ring-1 focus:ring-ink"
                  />
                  <label htmlFor="c-consent" className="font-body text-xs leading-relaxed text-ink-muted">
                    I agree to be contacted about my enquiry. See the{" "}
                    <a
                      href="/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink underline decoration-border-taupe underline-offset-2 hover:text-accent-ochre"
                    >
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>

                {status === "error" && <p role="alert" className="font-body text-sm text-red-700">{error}</p>}

                <button type="submit" disabled={status === "sending"} className="w-full rounded bg-ink py-3.5 font-headline text-xs font-semibold uppercase tracking-wider text-background transition-colors hover:bg-accent-ochre disabled:opacity-60">
                  {status === "sending" ? "Sending…" : "Send Enquiry"}
                </button>
                <p className="text-center font-body text-xs text-ink-muted">
                  Prefer chat? <a className="underline underline-offset-4 hover:text-accent-ochre" href={whatsappLink()} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a>
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}
