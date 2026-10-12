"use client";

import { useEffect, useRef, useState } from "react";
import { X, Send, RotateCw } from "lucide-react";
import { useContactModal } from "@/components/ContactModal";
import { isPlaceholder, whatsappLink } from "@/lib/site";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const MAX_USER_MESSAGES = 15;
const MAX_INPUT_CHARS = 500;

const SUGGESTION_CHIPS = [
  "What do you offer?",
  "How does a project work?",
  "Can you automate WhatsApp?",
  "I need a custom solution",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userMsgCount, setUserMsgCount] = useState(0);

  const { openModal, isOpen: isModalOpen } = useContactModal();

  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const isWhatsAppReady = !isPlaceholder("whatsapp");

  // Focus management on open/close
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Escape key closes panel and returns focus
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        launcherRef.current?.focus();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isSending, isOpen]);

  // Close panel and return focus
  function handleClose() {
    setIsOpen(false);
    launcherRef.current?.focus();
  }

  // Toggle open
  function handleToggle() {
    if (isOpen) {
      handleClose();
    } else {
      setIsOpen(true);
    }
  }

  // Send message
  async function sendMessage(textToSend?: string) {
    const text = (textToSend ?? inputValue).trim();
    if (!text || isSending || userMsgCount >= MAX_USER_MESSAGES) return;

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInputValue("");
    setErrorMessage("");
    setIsSending(true);
    setUserMsgCount((prev) => prev + 1);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.slice(-8), // Send at most the last 8 messages
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        reply?: string;
        error?: string;
      };

      if (!res.ok || !data.reply) {
        throw new Error(
          data.error ||
            "We couldn't generate a reply right now. Please try again or send an enquiry."
        );
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply! }]);
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or send an enquiry."
      );
    } finally {
      setIsSending(false);
    }
  }

  // Retry last user message
  function handleRetry() {
    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
    if (lastUserMessage) {
      // Remove error state and resend
      setErrorMessage("");
      sendMessage(lastUserMessage.content);
    }
  }

  // Handle textarea keyboard events
  function handleInputKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  // Hide launcher if contact modal is open to avoid overlapping
  if (isModalOpen) {
    return null;
  }

  return (
    <>
      {/* 1. Launcher button */}
      <button
        ref={launcherRef}
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls="chat-panel"
        aria-label={
          isOpen
            ? "Close chat with The Business Work assistant"
            : "Open chat with The Business Work assistant"
        }
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-[60] flex h-14 min-w-[56px] items-center justify-center gap-2.5 rounded-lg bg-ink px-4 text-background shadow-lg transition-colors hover:bg-accent-ochre focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink motion-reduce:transition-none"
      >
        {/* Brand Mark (Cream square with inner ink square) */}
        <span
          className="flex h-5 w-5 items-center justify-center bg-background"
          aria-hidden="true"
        >
          <span className="h-1.5 w-1.5 bg-ink" />
        </span>

        {/* Status dot */}
        <span
          className="h-2 w-2 rounded-full bg-accent-ochre"
          aria-hidden="true"
        />

        {/* Text label on md+ */}
        <span className="hidden font-headline text-xs font-semibold uppercase tracking-wider text-background md:inline">
          {isOpen ? "Close" : "Ask us"}
        </span>
      </button>

      {/* 2. Chat Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          id="chat-panel"
          role="dialog"
          aria-label="The Business Work Assistant"
          className="fixed inset-x-0 bottom-0 z-[60] flex max-h-[85dvh] flex-col rounded-t-xl border border-border-sand bg-surface-card shadow-2xl sm:inset-auto sm:bottom-[max(5rem,calc(env(safe-area-inset-bottom)+5rem))] sm:right-[max(1rem,env(safe-area-inset-right))] sm:h-[560px] sm:max-h-[560px] sm:w-[380px] sm:rounded-lg motion-reduce:transition-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border-sand px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span
                className="flex h-5 w-5 items-center justify-center bg-ink"
                aria-hidden="true"
              >
                <span className="h-1.5 w-1.5 bg-background" />
              </span>
              <div>
                <h2 className="font-headline text-xs font-semibold uppercase tracking-wider text-ink">
                  The Business Work Assistant
                </h2>
                <span className="inline-block rounded bg-surface-muted px-1.5 py-0.5 font-mono text-[10px] uppercase text-ink-muted">
                  AI assistant
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close chat"
              className="flex h-11 w-11 items-center justify-center rounded text-ink-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
            >
              <X size={20} />
            </button>
          </div>

          {/* Message List */}
          <div
            role="log"
            aria-live="polite"
            className="flex-1 space-y-3.5 overflow-y-auto p-4 font-body text-sm"
          >
            {/* First open: AI Disclosure */}
            <div className="rounded border border-border-sand bg-background p-3 text-xs leading-relaxed text-ink-muted">
              I&apos;m an AI assistant. I answer from this website&apos;s information.
              Please don&apos;t share sensitive or health details. Messages are sent
              to an AI provider to generate replies.{" "}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline underline-offset-2 hover:text-accent-ochre"
              >
                Privacy Policy
              </a>
              .
            </div>

            {/* Initial suggestion chips if no messages yet */}
            {messages.length === 0 && (
              <div className="space-y-2 pt-2">
                <p className="font-headline text-xs uppercase tracking-wider text-ink-muted">
                  Suggested questions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTION_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => sendMessage(chip)}
                      disabled={isSending}
                      className="rounded border border-border-sand bg-background px-3 py-1.5 text-left font-body text-xs text-ink transition-colors hover:border-ink hover:bg-surface-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink disabled:opacity-50"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Conversation Messages */}
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-lg p-3 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-ink text-background"
                      : "border border-border-sand bg-background text-ink"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isSending && (
              <div className="flex justify-start">
                <div
                  aria-label="Thinking…"
                  className="flex items-center gap-1.5 rounded-lg border border-border-sand bg-background p-3 text-xs text-ink-muted"
                >
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink [animation-delay:200ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink [animation-delay:400ms]" />
                  <span className="ml-1 font-headline text-xs uppercase tracking-wider">
                    Thinking…
                  </span>
                </div>
              </div>
            )}

            {/* Error state */}
            {errorMessage && (
              <div
                role="alert"
                className="space-y-2.5 rounded border border-red-200 bg-red-50 p-3 text-xs text-red-800"
              >
                <p>{errorMessage}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="inline-flex items-center gap-1 rounded bg-red-800 px-2.5 py-1 text-xs font-semibold text-white hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-800"
                  >
                    <RotateCw size={12} /> Retry
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      openModal();
                    }}
                    className="underline hover:text-ink"
                  >
                    Send an enquiry instead
                  </button>
                </div>
              </div>
            )}

            {/* Session limit notice */}
            {userMsgCount >= MAX_USER_MESSAGES && (
              <div className="space-y-2 rounded border border-border-sand bg-surface-muted p-3 text-xs text-ink">
                <p>
                  You have reached the maximum of {MAX_USER_MESSAGES} messages for
                  this chat session.
                </p>
                <p>
                  To discuss your project in detail, please send an enquiry:
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    openModal();
                  }}
                  className="rounded bg-ink px-3 py-1.5 font-headline text-xs font-semibold uppercase tracking-wider text-background hover:bg-accent-ochre focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
                >
                  Send an Enquiry
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border-sand p-3">
            {userMsgCount < MAX_USER_MESSAGES ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="space-y-2"
              >
                <div className="relative">
                  <textarea
                    ref={inputRef}
                    rows={2}
                    maxLength={MAX_INPUT_CHARS}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    placeholder="Ask about our services, process, or work…"
                    aria-label="Message"
                    disabled={isSending}
                    className="w-full resize-none rounded border border-border-sand bg-background p-2.5 pr-12 font-body text-xs text-ink transition-colors placeholder:text-ink-muted focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isSending}
                    aria-label="Send message"
                    className="absolute bottom-2.5 right-2.5 flex h-9 w-9 items-center justify-center rounded bg-ink text-background transition-colors hover:bg-accent-ochre focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink disabled:opacity-40"
                  >
                    <Send size={15} />
                  </button>
                </div>

                {inputValue.length >= 400 && (
                  <p className="text-right font-mono text-[10px] text-ink-muted">
                    {MAX_INPUT_CHARS - inputValue.length} characters left
                  </p>
                )}
              </form>
            ) : null}

            {/* Persistent Footer Actions */}
            <div className="mt-2.5 flex items-center justify-between border-t border-border-sand pt-2.5 text-xs">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  openModal();
                }}
                className="font-headline text-[11px] font-semibold uppercase tracking-wider text-ink underline underline-offset-2 hover:text-accent-ochre focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
              >
                Send an enquiry
              </button>

              {isWhatsAppReady && (
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-headline text-[11px] font-semibold uppercase tracking-wider text-ink underline underline-offset-2 hover:text-accent-ochre focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
                >
                  Chat on WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
