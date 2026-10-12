import { site } from "@/lib/site";

export default function Logo({ small = false }: { small?: boolean }) {
  return (
    <span className="inline-flex items-center" role="img" aria-label={site.name}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 350 48"
        className={`h-auto ${small ? "w-[130px] sm:w-[170px]" : "w-[140px] xs:w-[160px] sm:w-[185px] md:w-[204px]"} select-none`}
        fill="none"
        aria-hidden="true"
      >
        {/* TBW Monogram Mark */}
        <g id="tbw-monogram" transform="translate(4, 4)">
          {/* Letter T */}
          <path d="M 2 6 H 20" stroke="#181716" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 11 6 V 18" stroke="#181716" strokeWidth="3.5" strokeLinecap="round" />

          {/* Letter W */}
          <path d="M 2 21 L 6.5 34 L 11 25 L 15.5 34 L 20 21" stroke="#181716" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* Letter B */}
          <path d="M 25 6 V 34" stroke="#181716" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 25 6 H 34 C 37.5 6 40 8.5 40 12 C 40 15.5 37.5 18 34 18 H 25" stroke="#181716" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 25 18 H 35 C 39 18 41.5 20.8 41.5 25 C 41.5 29.2 39 34 35 34 H 25" stroke="#181716" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />

          {/* Accent Ochre: Precision Automation Node */}
          <circle cx="25" cy="6" r="3" fill="#A3512B" />
        </g>

        {/* Space Grotesk Wordmark */}
        <text
          x="60"
          y="27"
          dominantBaseline="central"
          className="fill-ink font-headline text-[18px] font-bold tracking-[0.18em]"
        >
          {site.name.toUpperCase()}
        </text>
      </svg>
    </span>
  );
}
