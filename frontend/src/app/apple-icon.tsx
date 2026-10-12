import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#181716",
        }}
      >
        <svg
          width="130"
          height="130"
          viewBox="0 0 48 48"
          fill="none"
          style={{ display: "flex" }}
        >
          <g transform="translate(4, 4)">
            {/* Letter T */}
            <path d="M 2 6 H 20" stroke="#F7F4EE" strokeWidth="3.8" strokeLinecap="round" />
            <path d="M 11 6 V 18" stroke="#F7F4EE" strokeWidth="3.8" strokeLinecap="round" />

            {/* Letter W */}
            <path d="M 2 21 L 6.5 34 L 11 25 L 15.5 34 L 20 21" stroke="#F7F4EE" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />

            {/* Letter B */}
            <path d="M 25 6 V 34" stroke="#F7F4EE" strokeWidth="3.8" strokeLinecap="round" />
            <path d="M 25 6 H 34 C 37.5 6 40 8.5 40 12 C 40 15.5 37.5 18 34 18 H 25" stroke="#F7F4EE" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 25 18 H 35 C 39 18 41.5 20.8 41.5 25 C 41.5 29.2 39 34 35 34 H 25" stroke="#F7F4EE" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Accent Ochre Node */}
            <circle cx="25" cy="6" r="3.5" fill="#A3512B" />
          </g>
        </svg>
      </div>
    ),
    { ...size }
  );
}
