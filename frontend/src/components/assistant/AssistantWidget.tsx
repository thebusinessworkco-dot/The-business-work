"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { X } from "lucide-react";
import { useContactModal } from "@/components/ContactModal";
import { isPlaceholder, whatsappLink } from "@/lib/site";
import { matchQuery, FALLBACK_ANSWER, DEFAULT_SUGGESTIONS } from "@/lib/assistant/match";
import Logo, { MARK_PATHS } from "@/components/Logo";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  chips?: string[];
  isFallback?: boolean;
}

const INITIAL_CHIPS = [
  "Our services",
  "How a project works",
  "Industries",
  "Demos",
  "Pricing",
  "Contact us",
];

export default function AssistantWidget() {
  const { openModal, isOpen: isContactModalOpen } = useContactModal();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [fallbackCount, setFallbackCount] = useState(0);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      sender: "bot",
      text: "I answer common questions from this website's information. I'm an automated assistant, not a person.",
      chips: INITIAL_CHIPS,
    },
  ]);

  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const hasWhatsApp = !isPlaceholder("whatsapp");

  // Scroll messages to bottom smoothly
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen, scrollToBottom]);

  // Handle focus transition on open / close
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    } else {
      launcherRef.current?.focus();
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleStartOver = () => {
    setFallbackCount(0);
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: "bot",
        text: "I answer common questions from this website's information. I'm an automated assistant, not a person.",
        chips: INITIAL_CHIPS,
      },
    ]);
    setInput("");
  };

  const processQuery = (rawQuery: string) => {
    const query = rawQuery.trim();
    if (!query) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Check reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = prefersReducedMotion ? 0 : 200;

    setIsTyping(true);

    setTimeout(() => {
      // Special menu chip handling
      if (query.toLowerCase() === "our services") {
        setFallbackCount(0);
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: "We provide 4 core services tailored to your workflows. Select one to learn more:",
            chips: [
              "AI Agents & Chatbots",
              "CRM & Sales Automation",
              "Business Workflow Automation",
              "WhatsApp & Social Automation",
            ],
          },
        ]);
        setIsTyping(false);
        return;
      }

      if (query.toLowerCase() === "industries") {
        setFallbackCount(0);
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: "We automate operations across 6 key industries. Select an industry to see details:",
            chips: [
              "Healthcare & clinics",
              "Local businesses",
              "Sales teams & agencies",
              "E-commerce",
              "Real estate",
              "Education & coaching",
            ],
          },
        ]);
        setIsTyping(false);
        return;
      }

      const match = matchQuery(query);

      if (match.matched && match.entry) {
        setFallbackCount(0);
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: match.answer,
            chips: match.followUps,
            isFallback: false,
          },
        ]);
      } else {
        const nextFallbackCount = fallbackCount + 1;
        setFallbackCount(nextFallbackCount);

        let fallbackText = FALLBACK_ANSWER;
        if (nextFallbackCount > 1) {
          fallbackText =
            "I still don't have that information. Please send an enquiry through our form below, and our team will get back to you with exact details.";
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: fallbackText,
            chips: match.suggestions || DEFAULT_SUGGESTIONS,
            isFallback: true,
          },
        ]);
      }

      setIsTyping(false);
    }, delay);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    processQuery(input);
  };

  const handleChipClick = (chipText: string) => {
    processQuery(chipText);
  };

  // If ContactModal is open, hide the assistant widget so it never clashes
  if (isContactModalOpen) {
    return null;
  }

  return (
    <aside
      aria-label="Website assistant"
      className="fixed z-40"
      style={{
        bottom: "max(1rem, env(safe-area-inset-bottom, 1rem))",
        right: "max(1rem, env(safe-area-inset-right, 1rem))",
      }}
    >
      {/* Panel */}
      {isOpen && (
        <section
          id="assistant-panel"
          ref={panelRef}
          role="dialog"
          aria-label="The Business Work Assistant"
          className="mb-3 flex w-[calc(100vw-2rem)] flex-col rounded-lg border border-border-sand bg-surface-card shadow-2xl sm:w-[380px] max-h-[85dvh] sm:max-h-[560px] h-[520px]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border-sand px-4 py-3 bg-surface-card rounded-t-lg">
            <div className="flex items-center gap-2.5">
              <span
                className="flex h-5 w-5 items-center justify-center rounded bg-ink p-0.5 text-background"
                aria-hidden="true"
              >
                <Logo variant="mark" className="h-full w-full" fill="#F7F4EE" />
              </span>
              <div>
                <h2 className="font-headline text-xs font-semibold tracking-wide text-ink">
                  The Business Work Assistant
                </h2>
                <div className="flex items-center gap-1.5">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-accent-ochre"
                    aria-hidden="true"
                  />
                  <span className="font-headline text-[10px] uppercase tracking-wider text-ink-muted">
                    Automated assistant
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleStartOver}
                className="flex min-h-[44px] items-center px-2 font-headline text-xs text-ink-muted transition-colors hover:text-ink focus:outline-none focus:ring-2 focus:ring-ink rounded"
              >
                Start over
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close assistant"
                className="flex h-11 w-11 items-center justify-center rounded text-ink transition-colors hover:text-accent-ochre focus:outline-none focus:ring-2 focus:ring-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages list */}
          <div
            role="log"
            aria-live="polite"
            aria-atomic="false"
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface-card"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-ink text-background font-body"
                      : "bg-background border border-border-sand text-ink font-body"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>

                {/* Follow-up / suggestion chips */}
                {msg.sender === "bot" && msg.chips && msg.chips.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[95%]">
                    {msg.chips.map((chip, idx) => (
                      <button
                        key={`${msg.id}-chip-${idx}`}
                        type="button"
                        onClick={() => handleChipClick(chip)}
                        className="flex min-h-[44px] items-center rounded border border-border-sand bg-surface-muted px-3 py-2 font-headline text-xs text-ink transition-colors hover:border-ink hover:bg-border-sand focus:outline-none focus:ring-2 focus:ring-ink"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start">
                <div className="rounded-lg border border-border-sand bg-background px-3 py-2 text-xs text-ink-muted font-body animate-pulse">
                  Looking up answer...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Persistent Action Footer */}
          <div className="border-t border-border-sand bg-surface px-4 py-2.5 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                openModal(undefined, "assistant");
              }}
              className="flex-1 min-h-[44px] flex items-center justify-center rounded bg-ink px-3 py-2 font-headline text-xs font-semibold uppercase tracking-wider text-background transition-colors hover:bg-accent-ochre focus:outline-none focus:ring-2 focus:ring-ink"
            >
              Send an enquiry
            </button>
            {hasWhatsApp && (
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] flex items-center justify-center rounded border border-border-sand bg-surface-card px-3 py-2 font-headline text-xs font-medium text-ink transition-colors hover:border-ink focus:outline-none focus:ring-2 focus:ring-ink"
              >
                Chat on WhatsApp
              </a>
            )}
          </div>

          {/* Text Input Form */}
          <form
            onSubmit={handleSend}
            className="border-t border-border-sand p-3 bg-surface-card rounded-b-lg flex gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              maxLength={200}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about our services, process, pricing..."
              className="flex-1 rounded border border-border-sand bg-background px-3 py-2.5 font-body text-sm text-ink placeholder:text-ink-muted focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="min-h-[44px] px-4 flex items-center justify-center rounded bg-ink font-headline text-xs font-semibold uppercase tracking-wider text-background transition-colors hover:bg-accent-ochre disabled:opacity-40 disabled:hover:bg-ink focus:outline-none focus:ring-2 focus:ring-ink"
            >
              Send
            </button>
          </form>
        </section>
      )}

      {/* Launcher Button */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="assistant-panel"
        aria-label={isOpen ? "Close website assistant" : "Open website assistant"}
        className="group flex min-h-[48px] min-w-[48px] sm:min-h-[52px] sm:min-w-[52px] items-center justify-center gap-2 rounded-lg bg-ink p-2.5 sm:px-4 sm:py-3 shadow-xl ring-1 ring-section-cream/35 transition-all hover:bg-accent-ochre focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2"
      >
        <span className="relative flex items-center justify-center">
          <svg
            width="22"
            height="22"
            viewBox="12 14 290 290"
            fill="#F7F4EE"
            aria-hidden="true"
            className="select-none"
          >
            {MARK_PATHS.map((p, i) => (
              <path key={i} d={p.d} transform={p.transform} />
            ))}
          </svg>
        </span>
        <span className="hidden font-headline text-xs font-semibold uppercase tracking-wider text-background md:inline">
          {isOpen ? "Close" : "Ask us"}
        </span>
      </button>
    </aside>
  );
}
