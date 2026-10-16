import React from "react";

export default function SectionHeading({
  eyebrow,
  title,
  aside,
  id,
  dark = false,
  borderClassName,
}: {
  eyebrow: string;
  title: string | React.ReactNode;
  aside?: React.ReactNode;
  id?: string;
  dark?: boolean;
  borderClassName?: string;
}) {
  const border = borderClassName ?? (dark ? "border-white/15" : "border-[#E8E2D5]");
  return (
    <div className={`flex flex-col justify-between gap-6 border-b pb-8 md:pb-10 md:flex-row md:items-end ${border}`}>
      <div className="max-w-3xl">
        <div
          className={`mb-3 font-headline text-xs sm:text-[13px] font-bold uppercase tracking-[0.24em] ${
            dark ? "text-[#EBDDFE]" : "text-[#141413]"
          }`}
        >
          {eyebrow}
        </div>
        <h2
          id={id}
          className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-medium tracking-tight leading-[1.1] ${
            dark ? "text-white" : "text-[#141413]"
          }`}
        >
          {title}
        </h2>
      </div>
      {aside ? (
        <div
          className={`max-w-sm font-body text-sm sm:text-[15px] leading-relaxed font-medium ${
            dark ? "text-white/85" : "text-[#2B2824]"
          }`}
        >
          {aside}
        </div>
      ) : null}
    </div>
  );
}
