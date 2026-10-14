"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { X, Sparkles, Mail, MessageCircle, Instagram, RotateCcw } from "lucide-react";
import { useContactModal } from "@/components/ContactModal";
import { site, isPlaceholder, whatsappLink } from "@/lib/site";
import { matchQuery, FALLBACK_ANSWER, DEFAULT_SUGGESTIONS } from "@/lib/assistant/match";

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
      text: "I answer common questions from this website. I am an automated assistant, not a person.",
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

  // Handle focus transition on open / close (skip mobile auto-focus to prevent virtual keyboard popup)
  useEffect(() => {
    if (isOpen) {
      const isMobile =
        typeof window !== "undefined" &&
        (window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);
      if (!isMobile) {
        inputRef.current?.focus();
      }
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
        text: "I answer common questions from this website. I am an automated assistant, not a person.",
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
            text: "We offer 4 simple services. Pick one to read more:",
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
            text: "We build tools for 6 industries. Pick one to see details:",
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
            "I still do not have that info. Please send an enquiry, and we will reply.";
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
    const query = input.trim();
    if (!query) return;
    processQuery(query);

    // Keep mobile & desktop virtual keyboard open continuously after sending
    if (inputRef.current) {
      inputRef.current.focus();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 30);
    }
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
      className="fixed z-40 flex flex-col items-end"
      style={{
        bottom: "max(1rem, env(safe-area-inset-bottom, 1rem))",
        right: "max(1rem, env(safe-area-inset-right, 1rem))",
      }}
    >
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-ink/60 backdrop-blur-sm transition-opacity sm:hidden"
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      {isOpen && (
        <section
          id="assistant-panel"
          ref={panelRef}
          role="dialog"
          aria-label="The Business Work Assistant"
          className="relative z-40 mb-3 flex w-[calc(100vw-2rem)] flex-col rounded-2xl border border-white/15 bg-[#141413] text-[#F7F4EE] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] sm:w-[390px] max-h-[85dvh] sm:max-h-[580px] h-[530px] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-[#1C1B19]">
            <div className="flex items-center gap-2.5">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-ochre/20 text-ochre-on-dark ring-1 ring-accent-ochre/40"
                aria-hidden="true"
              >
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <h2 className="font-headline text-xs font-semibold tracking-wide text-white">
                  The Business Work Assistant
                </h2>
                <div className="flex items-center gap-1.5">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-accent-ochre animate-pulse"
                    aria-hidden="true"
                  />
                  <span className="font-headline text-[10px] uppercase tracking-wider text-white/60">
                    Automated assistant
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleStartOver}
                className="flex items-center gap-1 px-2.5 py-1.5 font-headline text-xs text-white/70 transition-colors hover:text-white hover:bg-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30"
                title="Restart conversation"
              >
                <RotateCcw className="h-3 w-3" aria-hidden="true" />
                <span>Reset</span>
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close assistant"
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white/30"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick Connect & Action Toolbar */}
          <div className="flex items-center justify-between gap-2 border-b border-white/10 bg-[#181716] px-3.5 py-2">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                openModal(undefined, "assistant");
              }}
              className="inline-flex min-h-[32px] items-center gap-1.5 rounded-md bg-accent-ochre px-3 py-1 font-headline text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-accent-ochre-dark focus:outline-none focus:ring-2 focus:ring-accent-ochre active:scale-95 shadow-sm"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Send an enquiry</span>
            </button>

            <div className="flex items-center gap-1.5">
              {hasWhatsApp && (
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[32px] items-center gap-1.5 rounded-md border border-[#25D366]/40 bg-[#25D366]/10 px-2.5 py-1 font-headline text-xs font-medium text-[#25D366] transition-colors hover:bg-[#25D366]/20 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                  title="Chat on WhatsApp"
                  aria-label="Chat on WhatsApp"
                >
                  <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="hidden xs:inline">WhatsApp</span>
                </a>
              )}
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[32px] items-center gap-1.5 rounded-md border border-[#E1306C]/40 bg-[#E1306C]/10 px-2.5 py-1 font-headline text-xs font-medium text-[#E1306C] transition-colors hover:bg-[#E1306C]/20 focus:outline-none focus:ring-2 focus:ring-[#E1306C]"
                title="Follow on Instagram"
                aria-label="Follow on Instagram"
              >
                <Instagram className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden xs:inline">Instagram</span>
              </a>
            </div>
          </div>

          {/* Messages list */}
          <div
            role="log"
            aria-live="polite"
            aria-atomic="false"
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#141413]"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-xl p-3 text-sm leading-relaxed shadow-sm ${
                    msg.sender === "user"
                      ? "bg-accent-ochre text-white font-body"
                      : "bg-[#22211E] border border-white/10 text-[#F5F2EB] font-body"
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
                        className="flex min-h-[36px] items-center rounded-full border border-white/15 bg-[#1F1E1B] px-3.5 py-1.5 font-headline text-xs text-[#E8DDC8] transition-all hover:border-accent-ochre/60 hover:bg-[#2B2925] hover:text-white focus:outline-none focus:ring-2 focus:ring-accent-ochre active:scale-95"
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
                <div className="rounded-lg border border-white/10 bg-[#22211E] px-3 py-2 text-xs text-white/60 font-body animate-pulse">
                  Looking up answer...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Text Input Form */}
          <form
            onSubmit={handleSend}
            className="border-t border-white/10 p-3 bg-[#1C1B19] flex gap-2"
          >
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                maxLength={200}
                onChange={(e) => setInput(e.target.value)}
                aria-label="Type here"
                className="w-full rounded-lg border border-white/15 bg-[#252421] px-3.5 py-2.5 font-body text-sm text-white focus:border-accent-ochre focus:outline-none focus:ring-1 focus:ring-accent-ochre"
              />
              {!input && (
                <div
                  onClick={() => inputRef.current?.focus()}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center text-sm font-body text-white/45 select-none"
                >
                  <span>Type here</span>
                  <span className="ml-1 inline-block h-4 w-[2px] bg-accent-ochre animate-cursor" aria-hidden="true" />
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={!input.trim()}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                inputRef.current?.focus();
              }}
              className="min-h-[44px] px-4 flex items-center justify-center rounded-lg bg-accent-ochre font-headline text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-accent-ochre-dark disabled:opacity-30 disabled:hover:bg-accent-ochre focus:outline-none focus:ring-2 focus:ring-accent-ochre shadow-sm active:scale-95"
            >
              Send
            </button>
          </form>
        </section>
      )}

      {/* "How may I help you?" speech bubble prompt */}
      {!isOpen && (
        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsOpen(true);
            }
          }}
          aria-label="Open assistant: How may I help you?"
          className="group relative mb-2.5 flex cursor-pointer items-center gap-2 rounded-full border border-border-taupe/80 bg-surface-card px-3.5 py-1.5 shadow-md transition-all duration-300 hover:scale-105 hover:border-accent-ochre/40 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ink select-none"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-ochre opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-ochre" />
          </span>
          <span className="font-headline text-xs font-medium text-ink">
            How may I help you?
          </span>
          {/* Speech bubble pointer arrow */}
          <div
            className="absolute -bottom-1 right-5 h-2 w-2 rotate-45 border-b border-r border-border-taupe/80 bg-surface-card"
            aria-hidden="true"
          />
        </div>
      )}

      {/* Launcher Button */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="assistant-panel"
        aria-label={isOpen ? "Close website assistant" : "Open website assistant"}
        className="group flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-ink text-background shadow-xl ring-2 ring-section-cream transition-all duration-300 hover:scale-105 hover:bg-accent-ochre active:scale-95 focus:outline-none focus:ring-2 focus:ring-section-cream focus:ring-offset-2 focus:ring-offset-ink"
      >
        {isOpen ? (
          <X className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-200" aria-hidden="true" />
        ) : (
          <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-section-cream transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
        )}
      </button>
    </aside>
  );
}
