import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { MARK_PATHS } from "@/components/Logo";

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
              viewBox="12 14 290 290"
              fill="#181716"
              style={{ display: "flex" }}
            >
              {MARK_PATHS.map((p, i) => (
                <path key={i} d={p.d} transform={p.transform} />
              ))}
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
