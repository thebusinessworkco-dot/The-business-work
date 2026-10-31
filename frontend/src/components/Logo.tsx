import Image from "next/image";
import { site } from "@/lib/site";

export interface LogoProps {
  small?: boolean;
  variant?: "full" | "mark" | "text";
  className?: string;
  fill?: string;
}

export default function Logo({
  small = false,
  variant = "full",
  className = "",
  fill = "currentColor",
}: LogoProps) {
  if (variant === "mark") {
    return (
      <span className={`inline-flex shrink-0 items-center ${className}`} role="img" aria-label={site.name}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-3 8 220 104"
          className={`h-auto select-none ${small ? "w-6 h-6" : "w-8 h-8"}`}
          style={{ width: small ? "24px" : "32px", height: "auto", display: "block" }}
          aria-hidden="true"
        >
          <g fill="none" stroke={fill === "currentColor" ? "#000000" : fill} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
            <path d="M30 22 V84 Q30 98 44 98" />
            <path d="M16 46 H46" />
            <path d="M70 20 V98" />
            <path d="M138 50 L152 98 L168 62 L184 98 L198 50" />
          </g>
          <circle cx="94" cy="74" r="24" fill="none" stroke="#E4572E" strokeWidth="10" />
        </svg>
      </span>
    );
  }

  // Uses tbw-logo-horizontal-black.svg for official brand identity
  return (
    <span
      className={`inline-flex shrink-0 items-center transition-opacity hover:opacity-90 ${className}`}
      role="img"
      aria-label={site.name}
    >
      <Image
        src="/tbw-logo-horizontal-black.svg"
        alt={site.name}
        width={1053}
        height={116}
        priority
        className={`h-auto select-none ${
          small
            ? "h-[22px] sm:h-[24px] w-auto object-contain"
            : "h-[26px] sm:h-[30px] w-auto object-contain"
        }`}
        style={{
          width: "auto",
          display: "block",
        }}
      />
    </span>
  );
}

export function LogoMark({ className = "w-8 h-8", fill = "currentColor" }: { className?: string; fill?: string }) {
  return <Logo variant="mark" className={className} fill={fill} />;
}

export function LogoText({ className = "w-36 h-auto", fill = "currentColor" }: { className?: string; fill?: string }) {
  return <Logo variant="text" className={className} fill={fill} />;
}
