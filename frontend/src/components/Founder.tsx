"use client";

import { site, whatsappLink } from "@/lib/site";
import { MessageCircle, Mail } from "lucide-react";

export default function Founder() {
  return (
    <section
      id="founder"
      aria-labelledby="founder-title"
      className="w-full border-t border-[#E8E2D5] bg-[#FAF7E8] py-10 sm:py-16 md:py-20"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-10 lg:gap-14">
          
          {/* Halftone / Stippled Monogram "A" */}
          <div className="w-16 sm:w-28 md:w-36 shrink-0 flex items-center justify-center pt-0.5 select-none">
            <svg
              viewBox="0 0 160 180"
              className="w-full h-auto drop-shadow-xs"
              aria-hidden="true"
            >
              <defs>
                {/* Halftone Dot Matrix Pattern */}
                <pattern id="halftone-dots" width="4.5" height="4.5" patternUnits="userSpaceOnUse">
                  <circle cx="2.25" cy="2.25" r="1.6" fill="#141413" />
                </pattern>
                
                {/* Mask of the Serif Letter "A" */}
                <mask id="letter-a-mask">
                  <text
                    x="50%"
                    y="84%"
                    textAnchor="middle"
                    fontFamily="Georgia, 'Times New Roman', serif"
                    fontSize="165"
                    fontWeight="bold"
                    fill="white"
                  >
                    A
                  </text>
                </mask>

                {/* Subtle depth gradient overlay */}
                <linearGradient id="halftone-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#141413" stopOpacity="0.45" />
                  <stop offset="60%" stopColor="#141413" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#141413" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Halftone Pattern Stippled A */}
              <rect
                width="100%"
                height="100%"
                fill="url(#halftone-dots)"
                mask="url(#letter-a-mask)"
              />

              {/* Serif Letter Outline/Tone Blend */}
              <text
                x="50%"
                y="84%"
                textAnchor="middle"
                fontFamily="Georgia, 'Times New Roman', serif"
                fontSize="165"
                fontWeight="bold"
                fill="url(#halftone-grad)"
              >
                A
              </text>
            </svg>
          </div>

          {/* Right: Quote and Founder Details */}
          <div className="flex-1 max-w-2xl text-left">
            <blockquote className="font-serif text-lg sm:text-2xl md:text-[28px] lg:text-[30px] font-normal italic text-[#141413] leading-snug sm:leading-[1.25] tracking-tight">
              &ldquo;We don&apos;t sell fixed packages. We look at the work that wastes your time every day, and build simple tools that do it automatically for your team.&rdquo;
            </blockquote>

            <div className="mt-3.5 sm:mt-6">
              <h2
                id="founder-title"
                className="font-headline text-xs sm:text-sm md:text-base font-bold text-[#141413]"
              >
                {site.founder}
              </h2>
              <p className="font-body text-[11px] sm:text-xs text-[#7A756D] mt-0.5">
                Founder &bull; The Business Work
              </p>

              {/* Contact actions */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3 mt-3 border-t border-[#E8E2D5]/70">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-headline text-xs font-semibold text-[#141413] transition-colors hover:text-[#25D366]"
                >
                  <MessageCircle size={14} className="text-[#25D366]" />
                  <span>Chat on WhatsApp</span>
                </a>
                <span className="text-[#D6D0C4]">•</span>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-1.5 font-headline text-xs font-semibold text-[#141413] transition-colors hover:text-[#6D32A8]"
                >
                  <Mail size={13} className="text-[#6D32A8]" />
                  <span>{site.email}</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
