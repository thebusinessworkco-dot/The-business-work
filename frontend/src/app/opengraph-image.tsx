import { ImageResponse } from "next/og";
import { SLAB_SERIF_WHITE_PATH, SLAB_SERIF_WHITE_TRANSFORM } from "./slab_white_path";

export const runtime = "edge";
export const alt = "The Business Work - AI & Business Automation";
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
          padding: "48px 56px",
          backgroundColor: "#0A0C0C",
          fontFamily: "system-ui, -apple-system, sans-serif",
          boxSizing: "border-box",
        }}
      >
        {/* Inner Card Container with subtle border & obsidian gradient */}
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "40px 48px",
            backgroundColor: "#101413",
            borderRadius: "24px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxSizing: "border-box",
          }}
        >
          {/* Top Row: Brand & Live URL Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {/* Left: Official Slab Serif White Logo + Name */}
            <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "14px",
                  backgroundColor: "#19201E",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="42"
                  height="42"
                  viewBox="0 0 1254 1254"
                  style={{ display: "flex" }}
                >
                  <g transform={SLAB_SERIF_WHITE_TRANSFORM}>
                    <path
                      fill="#FFFFFF"
                      fillRule="evenodd"
                      d={SLAB_SERIF_WHITE_PATH}
                    />
                  </g>
                </svg>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontSize: "26px",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "#FAF7E8",
                  }}
                >
                  The Business Work
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#A9A49B",
                  }}
                >
                  AI & Business Automation
                </span>
              </div>
            </div>

            {/* Right: URL Pill with Active Automation Status */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 18px",
                borderRadius: "999px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "999px",
                  backgroundColor: "#25D366",
                }}
              />
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  color: "#FAF7E8",
                }}
              >
                thebusinesswork.com
              </span>
            </div>
          </div>

          {/* Center Content: Main Headline & Core Description */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", margin: "16px 0" }}>
            <div
              style={{
                fontSize: "58px",
                fontWeight: 700,
                letterSpacing: "-0.035em",
                lineHeight: 1.08,
                color: "#FFFFFF",
              }}
            >
              The Business Work
            </div>

            <div
              style={{
                fontSize: "30px",
                fontWeight: 600,
                letterSpacing: "-0.015em",
                color: "#EBDDFE",
              }}
            >
              AI & Business Automation
            </div>

            <div
              style={{
                fontSize: "21px",
                lineHeight: 1.45,
                color: "#B5AFA6",
                maxWidth: "960px",
              }}
            >
              Simplify customer enquiries, follow-ups and daily work with AI agents,
              WhatsApp automation and connected business systems.
            </div>
          </div>

          {/* Bottom Row: Feature Capabilities & Trust Badges */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              paddingTop: "24px",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "7px 16px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#FAF7E8",
                }}
              >
                ⚡ AI Agents & Chatbots
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "7px 16px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#FAF7E8",
                }}
              >
                💬 WhatsApp Workflows
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "7px 16px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#FAF7E8",
                }}
              >
                🔄 CRM & Integrations
              </div>
            </div>

            <span
              style={{
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                color: "#E3A27E",
                textTransform: "uppercase",
              }}
            >
              Built for Modern Businesses
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
