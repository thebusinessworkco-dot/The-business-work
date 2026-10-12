"use client";

import { ArrowRight } from "lucide-react";
import { useContactModal } from "./ContactModal";

export default function DiscussProjectButton({
  serviceTitle,
  className,
  label = "Discuss Your Project",
  cta = "service-page",
}: {
  serviceTitle?: string;
  className?: string;
  label?: string;
  cta?: string;
}) {
  const { openModal } = useContactModal();

  return (
    <button
      type="button"
      onClick={() => openModal(serviceTitle, cta)}
      className={
        className ||
        "inline-flex items-center justify-center gap-2.5 bg-ink px-7 py-3.5 font-headline text-xs font-semibold uppercase tracking-wider text-background transition-colors hover:bg-accent-ochre"
      }
    >
      <span>{label}</span>
      <ArrowRight size={16} />
    </button>
  );
}
