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
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-xs transition-opacity sm:hidden"
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
          className="relative z-40 mb-3 flex w-[calc(100vw-2rem)] flex-col rounded-[24px] sm:rounded-[28px] border border-[#DDD6C5] bg-[#FAF7E8] text-[#141413] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.18)] sm:w-[395px] max-h-[85dvh] sm:max-h-[580px] h-[535px] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E8E2D5] px-4 py-3 bg-[#FAF7E8]">
            <div className="flex items-center gap-2.5">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EBDDFE] text-[#141413] border border-[#141413]/15 shadow-xs"
                aria-hidden="true"
              >
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <h2 className="font-headline text-xs font-bold tracking-tight text-[#141413]">
                  The Business Work Assistant
                </h2>
                <div className="flex items-center gap-1.5">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"
                    aria-hidden="true"
                  />
                  <span className="font-headline text-[10px] uppercase tracking-wider text-[#7A756D] font-semibold">
                    Automated assistant
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleStartOver}
                className="flex items-center gap-1 px-2.5 py-1.5 font-headline text-xs font-semibold text-[#7A756D] transition-colors hover:text-[#141413] hover:bg-[#EDE8DC] rounded-md focus:outline-none"
                title="Restart conversation"
              >
                <RotateCcw className="h-3 w-3" aria-hidden="true" />
                <span>Reset</span>
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close assistant"
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#7A756D] transition-colors hover:text-[#141413] hover:bg-[#EDE8DC] focus:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick Connect & Action Toolbar */}
          <div className="flex items-center justify-between gap-2 border-b border-[#E8E2D5] bg-[#F5F1E4] px-3.5 py-2.5">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                openModal(undefined, "assistant");
              }}
              className="inline-flex min-h-[32px] items-center gap-1.5 rounded-lg border border-[#141413] bg-[#EBDDFE] px-3 py-1 font-headline text-xs font-bold uppercase tracking-wider text-[#141413] transition-all hover:bg-[#E2CEFF] focus:outline-none active:scale-95 shadow-xs"
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
                  className="inline-flex min-h-[32px] items-center gap-1.5 rounded-lg border border-[#25D366]/40 bg-[#E7F8EE] px-2.5 py-1 font-headline text-xs font-bold text-[#128C7E] transition-colors hover:bg-[#D5F2E0] focus:outline-none"
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
                className="inline-flex min-h-[32px] items-center gap-1.5 rounded-lg border border-[#E1306C]/30 bg-[#FDF0F5] px-2.5 py-1 font-headline text-xs font-bold text-[#C13584] transition-colors hover:bg-[#FCE1EC] focus:outline-none"
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
            className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAF7E8]"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#141413] text-white shadow-sm font-body"
                      : "bg-white border border-[#E8E2D5] text-[#141413] shadow-[0_2px_8px_rgba(0,0,0,0.03)] font-body font-medium"
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
                        className="flex min-h-[34px] items-center rounded-full border border-[#DDD6C5] bg-[#EDE8DC] px-3.5 py-1.5 font-headline text-xs font-semibold text-[#141413] transition-all hover:bg-[#141413] hover:text-white hover:border-[#141413] focus:outline-none active:scale-95 shadow-xs cursor-pointer"
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
                <div className="rounded-xl border border-[#E8E2D5] bg-white px-3.5 py-2 text-xs text-[#7A756D] font-body animate-pulse">
                  Looking up answer...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Text Input Form */}
          <form
            onSubmit={handleSend}
            className="border-t border-[#E8E2D5] p-3 bg-[#F5F1E4] flex gap-2 items-center"
          >
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                maxLength={200}
                onChange={(e) => setInput(e.target.value)}
                aria-label="Type here"
                className="w-full rounded-xl border border-[#D5CEBF] bg-white px-3.5 py-2.5 font-body text-sm text-[#141413] placeholder-transparent focus:border-[#141413] focus:outline-none focus:ring-1 focus:ring-[#141413]"
              />
              {!input && (
                <div
                  onClick={() => inputRef.current?.focus()}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center text-sm font-body text-[#8D887C] select-none"
                >
                  <span>Type here</span>
                  <span className="ml-1 inline-block h-4 w-[2px] bg-[#141413] animate-cursor" aria-hidden="true" />
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
              className="min-h-[42px] px-5 flex items-center justify-center rounded-xl bg-[#141413] font-headline text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-black disabled:opacity-35 disabled:hover:bg-[#141413] focus:outline-none shadow-sm active:scale-95 cursor-pointer"
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
          className="group relative mb-2.5 flex cursor-pointer items-center gap-2 rounded-full border border-[#DDD6C5] bg-[#FAF7E8] px-3.5 py-1.5 shadow-md transition-all duration-300 hover:scale-105 hover:border-[#141413]/30 hover:shadow-lg focus:outline-none select-none"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-headline text-xs font-semibold text-[#141413]">
            How may I help you?
          </span>
          {/* Speech bubble pointer arrow */}
          <div
            className="absolute -bottom-1 right-5 h-2 w-2 rotate-45 border-b border-r border-[#DDD6C5] bg-[#FAF7E8]"
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
        className="group flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-[#141413] bg-[#141413] text-[#FAF7E8] shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
      >
        {isOpen ? (
          <X className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-200" aria-hidden="true" />
        ) : (
          <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-[#FAF7E8] transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
        )}
      </button>
    </aside>
  );
}
