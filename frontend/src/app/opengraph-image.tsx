import { ImageResponse } from "next/og";
import { SLAB_ONE_LINE_PATHS } from "./slab_one_line_black";
import { getOgFonts } from "./og_fonts";

export const runtime = "edge";
export const alt = "The Business Work - We Make Business Simpler";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const fonts = getOgFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#FAF7E8",
          padding: "72px 88px 70px 88px",
          boxSizing: "border-box",
        }}
      >
        {/* Brand: Bold 'The Business Work' wordmark on one line inside restrained lavender pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#EBDDFE",
            border: "1.5px solid rgba(20, 20, 19, 0.18)",
            borderRadius: "9999px",
            padding: "11px 32px",
            boxShadow: "0 2px 10px rgba(20, 20, 19, 0.04)",
          }}
        >
          <svg
            width="310"
            height="33"
            viewBox="0 0 2618 280"
            style={{ display: "flex" }}
          >
            {SLAB_ONE_LINE_PATHS.map((p, idx) => (
              <path
                key={idx}
                d={p.d}
                transform={p.transform}
                fill="#141413"
                fillRule={p.fillRule as "evenodd" | "nonzero"}
              />
            ))}
          </svg>
        </div>

        {/* Center: Dominant Hero Headlines and Supporting Line */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "1020px",
          }}
        >
          {/* Main Headline: Serif, bold/medium */}
          <div
            style={{
              fontFamily: "Newsreader, serif",
              fontSize: "72px",
              fontWeight: 500,
              fontStyle: "normal",
              color: "#141413",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              textAlign: "center",
              display: "flex",
            }}
          >
            We make business simpler,
          </div>

          {/* Second Headline: Italic Serif */}
          <div
            style={{
              fontFamily: "Newsreader, serif",
              fontSize: "72px",
              fontWeight: 400,
              fontStyle: "italic",
              color: "#141413",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              marginTop: "4px",
              textAlign: "center",
              display: "flex",
            }}
          >
            just automate.
          </div>

          {/* Short Supporting Line: Sans-serif */}
          <div
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "25px",
              fontWeight: 500,
              color: "#3F3C37",
              lineHeight: 1.45,
              marginTop: "28px",
              maxWidth: "880px",
              textAlign: "center",
              display: "flex",
            }}
          >
            WhatsApp replies, lead management and daily work—automated.
          </div>
        </div>

        {/* Small Footer: thebusinesswork.com */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "9px",
          }}
        >
          <div
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "999px",
              backgroundColor: "#8F67D8",
            }}
          />
          <div
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              color: "#5B564E",
              textTransform: "lowercase",
            }}
          >
            thebusinesswork.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    }
  );
}
