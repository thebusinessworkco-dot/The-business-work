import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = "The Business Work — AI Automation & Digital Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#F7F4EE",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <svg
              width="44"
              height="44"
              viewBox="0 0 48 48"
              fill="none"
              style={{ display: "flex" }}
            >
              <g transform="translate(4, 4)">
                {/* Letter T */}
                <path d="M 2 6 H 20" stroke="#181716" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 11 6 V 18" stroke="#181716" strokeWidth="3.5" strokeLinecap="round" />

                {/* Letter W */}
                <path d="M 2 21 L 6.5 34 L 11 25 L 15.5 34 L 20 21" stroke="#181716" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                {/* Letter B */}
                <path d="M 25 6 V 34" stroke="#181716" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 25 6 H 34 C 37.5 6 40 8.5 40 12 C 40 15.5 37.5 18 34 18 H 25" stroke="#181716" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 25 18 H 35 C 39 18 41.5 20.8 41.5 25 C 41.5 29.2 39 34 35 34 H 25" stroke="#181716" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />

                {/* Accent Ochre Node */}
                <circle cx="25" cy="6" r="3" fill="#A3512B" />
              </g>
            </svg>
            <span
              style={{
                fontSize: "24px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#181716",
              }}
            >
              {site.name}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 18px",
              border: "1px solid #D6D0C4",
              borderRadius: "999px",
              backgroundColor: "#EFEBE1",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "999px",
                backgroundColor: "#A3512B",
              }}
            />
            <span
              style={{
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#646059",
              }}
            >
              India
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: "68px",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#181716",
            }}
          >
            {site.tagline}
          </div>
          <div
            style={{
              fontSize: "26px",
              lineHeight: 1.4,
              color: "#646059",
              maxWidth: "920px",
            }}
          >
            AI Agents · WhatsApp Automation · CRM Systems · Connected Workflows
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #E4DFD5",
            paddingTop: "32px",
          }}
        >
          <span
            style={{
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#646059",
            }}
          >
            Custom Systems · Plain Practical Indian-English
          </span>
          <span
            style={{
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#A3512B",
            }}
          >
            Human In The Loop
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
