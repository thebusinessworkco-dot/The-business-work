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
        "inline-flex items-center justify-center gap-2.5 rounded-lg border border-[#141413] bg-[#EBDDFE] px-6 sm:px-7 py-3.5 font-headline text-xs font-semibold uppercase tracking-wider text-[#141413] shadow-sm transition-all hover:bg-[#E2CEFF] active:scale-[0.98]"
      }
    >
      <span className="grid grid-cols-2 gap-0.5 w-3 h-3">
        <span className="bg-[#141413] rounded-[0.5px]"></span>
        <span className="bg-[#141413] rounded-[0.5px]"></span>
        <span className="bg-[#141413] rounded-[0.5px]"></span>
        <span className="bg-[#141413] rounded-[0.5px]"></span>
      </span>
      <span>{label}</span>
      <ArrowRight size={15} />
    </button>
  );
}
