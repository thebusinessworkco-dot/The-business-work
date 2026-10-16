"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { X, MessageCircle } from "lucide-react";
import { serviceList } from "@/content/service-list";
import { whatsappLink, isPlaceholder } from "@/lib/site";

type Ctx = {
  openModal: (service?: string, cta?: string) => void;
  isOpen: boolean;
};
const ModalContext = createContext<Ctx>({ openModal: () => {}, isOpen: false });
export const useContactModal = () => useContext(ModalContext);

type Status = "idle" | "sending" | "success" | "error";

const inputCls =
  "w-full rounded-xl border border-[#DDD6C5] bg-white px-3.5 py-2.5 font-body text-sm text-[#141413] transition-colors focus:border-[#141413] focus:outline-none focus:ring-1 focus:ring-[#141413] placeholder:text-[#8C867A]";
const labelCls = "mb-1.5 block font-headline text-[11px] font-bold uppercase tracking-wider text-[#141413]";

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState("Not sure yet / custom solution");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);
  const [startedAt, setStartedAt] = useState<number>(0);
  const [openCta, setOpenCta] = useState<string>("direct");
  const [openPage, setOpenPage] = useState<string>("/");
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [utm, setUtm] = useState<{
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  }>({});

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const turnstileWidgetId = useRef<string | null>(null);

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  // Capture landing UTM tags in React state only (no localStorage, no cookies)
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const params = new URLSearchParams(window.location.search);
        const s = params.get("utm_source");
        const m = params.get("utm_medium");
        const c = params.get("utm_campaign");
        const newUtm: Record<string, string> = {};
        if (s) newUtm.utm_source = s.replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, 80);
        if (m) newUtm.utm_medium = m.replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, 80);
        if (c) newUtm.utm_campaign = c.replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, 80);
        if (Object.keys(newUtm).length > 0) {
          setUtm(newUtm);
        }
      } catch {}
    }
  }, []);

  const openModal = useCallback((s?: string, c?: string) => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    if (s) setService(s);
    setOpenCta(c || "direct");
    if (typeof window !== "undefined") {
      setOpenPage(window.location.pathname);
    }
    setStatus("idle");
    setError("");
    setConsent(false);
    setStartedAt(Date.now());
    setTurnstileToken("");
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Turnstile script & widget lifecycle (only loaded if configured and modal is open)
  useEffect(() => {
    if (!open || !turnstileSiteKey) return;

    const scriptId = "cf-turnstile-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    function renderWidget() {
      const win = window as unknown as {
        turnstile?: {
          render: (
            container: HTMLElement,
            options: Record<string, unknown>
          ) => string;
          remove: (id: string) => void;
        };
      };
      if (win.turnstile) {
        const container = document.getElementById("cf-turnstile-container");
        if (container) {
          container.innerHTML = "";
          try {
            turnstileWidgetId.current = win.turnstile.render(container, {
              sitekey: turnstileSiteKey,
              callback: (token: string) => {
                setTurnstileToken(token);
              },
              "error-callback": () => {
                setTurnstileToken("");
              },
              "expired-callback": () => {
                setTurnstileToken("");
              },
            });
          } catch {}
        }
      }
    }

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        renderWidget();
      };
      document.body.appendChild(script);
    } else {
      renderWidget();
    }

    return () => {
      const win = window as unknown as {
        turnstile?: { remove: (id: string) => void };
      };
      if (turnstileWidgetId.current && win.turnstile) {
        try {
          win.turnstile.remove(turnstileWidgetId.current);
        } catch {}
        turnstileWidgetId.current = null;
      }
    };
  }, [open, turnstileSiteKey]);

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
        const first = f[0],
          last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
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

    const emailVal = ((fd.get("email") as string) || "").trim();
    const phoneVal = ((fd.get("phone") as string) || "").trim();

    if (!emailVal && !phoneVal) {
      setError("Please provide an email or phone number.");
      setStatus("error");
      return;
    }

    if (emailVal) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailVal)) {
        setError("Please enter a valid email address.");
        setStatus("error");
        return;
      }
    }

    if (phoneVal) {
      const digitsOnly = phoneVal
        .replace(/^\+/, "")
        .replace(/[\s\-\(\)\[\]\.]/g, "");
      if (!/^\d{7,15}$/.test(digitsOnly)) {
        setError("Please enter a valid phone number (7 to 15 digits).");
        setStatus("error");
        return;
      }
    }

    if (!consent) {
      setError("Please agree to be contacted to submit your enquiry.");
      setStatus("error");
      return;
    }

    if (turnstileSiteKey && !turnstileToken) {
      setError("Please complete the security check to continue.");
      setStatus("error");
      return;
    }

    const payload: Record<string, unknown> = Object.fromEntries(fd.entries());
    payload.startedAt = startedAt;
    payload.consent = consent;
    payload.page =
      openPage || (typeof window !== "undefined" ? window.location.pathname : "/");
    payload.cta = openCta;
    if (utm.utm_source) payload.utm_source = utm.utm_source;
    if (utm.utm_medium) payload.utm_medium = utm.utm_medium;
    if (utm.utm_campaign) payload.utm_campaign = utm.utm_campaign;
    if (turnstileToken) payload.turnstileToken = turnstileToken;

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(
          data.error || "Something went wrong. Please try again."
        );
      setStatus("success");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <ModalContext.Provider value={{ openModal, isOpen: open }}>
      {children}
      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-title"
            className="max-h-[92vh] w-full max-w-lg space-y-5 overflow-y-auto rounded-[28px] sm:rounded-[36px] border border-[#DDD6C5] bg-[#FAF7E8] p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.2)]"
          >
            {/* Header: Warm, editorial, matching page */}
            <div className="flex items-start justify-between border-b border-[#E8E2D5] pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span
                    id="enquiry-title"
                    className="font-headline text-[11px] font-bold uppercase tracking-[0.2em] text-[#141413]"
                  >
                    Discuss Your Project
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-[26px] font-medium text-[#141413] tracking-tight leading-tight">
                  Tell us what takes too much of your time.
                </h3>
                <p className="font-body text-xs sm:text-[13px] text-[#555047] mt-1">
                  We will study your workflow and suggest a simple fix.
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close dialog"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EDE7D8] text-[#141413] transition-colors hover:bg-[#E2DDD0] active:scale-95"
              >
                <X size={18} />
              </button>
            </div>

            {status === "success" ? (
              <div
                role="status"
                aria-live="polite"
                className="space-y-4 py-8 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <span className="text-xl font-bold">✓</span>
                </div>
                <h4 className="font-serif text-2xl font-medium text-[#141413]">
                  Thank you. We got your message.
                </h4>
                <p className="font-body text-sm text-[#555047] max-w-sm mx-auto">
                  We will review your workflow details and reply within a few hours.
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-xl bg-[#141413] px-7 py-3 font-headline text-xs font-semibold uppercase tracking-wider text-white hover:bg-black transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4" noValidate={false}>
                {/* Honeypot: real users never see or fill this */}
                <div
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                >
                  <label htmlFor="c-website">Website</label>
                  <input
                    id="c-website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label className={labelCls} htmlFor="c-name">
                    Your name <span className="text-emerald-700">*</span>
                  </label>
                  <input
                    ref={firstFieldRef}
                    id="c-name"
                    name="name"
                    required
                    maxLength={100}
                    autoComplete="name"
                    placeholder="e.g. Rahul Sharma"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls} htmlFor="c-business">
                    Business name
                  </label>
                  <input
                    id="c-business"
                    name="business"
                    maxLength={120}
                    autoComplete="organization"
                    placeholder="e.g. Apex Clinic / Sharma Retail"
                    className={inputCls}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCls} htmlFor="c-email">
                      Email
                    </label>
                    <input
                      id="c-email"
                      name="email"
                      type="email"
                      maxLength={160}
                      autoComplete="email"
                      placeholder="name@business.com"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="c-phone">
                      Phone or WhatsApp
                    </label>
                    <input
                      id="c-phone"
                      name="phone"
                      type="tel"
                      maxLength={25}
                      autoComplete="tel"
                      placeholder="+91 98765 43210"
                      className={inputCls}
                    />
                  </div>
                </div>
                <p className="-mt-2 font-body text-[11px] text-[#7A756D]">
                  Provide at least an email or a phone number.
                </p>
                <div>
                  <label className={labelCls} htmlFor="c-service">
                    Service of interest
                  </label>
                  <select
                    id="c-service"
                    name="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className={inputCls}
                  >
                    {serviceList.map((s) => (
                      <option key={s.id}>{s.title}</option>
                    ))}
                    <option>Not sure yet / custom solution</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls} htmlFor="c-problem">
                    What do you need help with?
                  </label>
                  <textarea
                    id="c-problem"
                    name="problem"
                    rows={3}
                    maxLength={1500}
                    className={inputCls}
                    placeholder="e.g. We reply to appointment requests on WhatsApp by hand and want to auto-save to Google Sheets."
                  />
                </div>

                {turnstileSiteKey && (
                  <div
                    id="cf-turnstile-container"
                    className="min-h-[65px] pt-1"
                  />
                )}

                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    id="c-consent"
                    name="consent"
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-[#DDD6C5] bg-white accent-[#141413] focus:outline-none focus:ring-1 focus:ring-[#141413]"
                  />
                  <label
                    htmlFor="c-consent"
                    className="font-body text-xs leading-relaxed text-[#555047]"
                  >
                    I agree to be contacted about my enquiry. See the{" "}
                    <a
                      href="/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#141413] underline decoration-[#DDD6C5] underline-offset-2 hover:text-black font-semibold"
                    >
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>

                {status === "error" && (
                  <p role="alert" className="font-body text-sm text-red-700 bg-red-50 p-2.5 rounded-lg border border-red-200">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-[#141413] bg-[#EBDDFE] py-3.5 font-headline text-sm font-bold text-[#141413] transition-all hover:bg-[#E2CEFF] active:scale-[0.98] shadow-xs disabled:opacity-60"
                >
                  <span className="grid grid-cols-2 gap-0.5 w-3 h-3" aria-hidden="true">
                    <span className="bg-[#141413] rounded-[0.5px]"></span>
                    <span className="bg-[#141413] rounded-[0.5px]"></span>
                    <span className="bg-[#141413] rounded-[0.5px]"></span>
                    <span className="bg-[#141413] rounded-[0.5px]"></span>
                  </span>
                  <span>{status === "sending" ? "Sending…" : "Send Enquiry"}</span>
                </button>

                {!isPlaceholder("whatsapp") && (
                  <div className="pt-1">
                    <a
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-[#DDD6C5] bg-white py-2.5 px-4 font-headline text-xs font-semibold text-[#141413] transition-colors hover:bg-[#F5F2EA]"
                      href={whatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#25D366] text-white">
                        <MessageCircle size={12} />
                      </span>
                      <span>Prefer chat? Message us on WhatsApp</span>
                    </a>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}
