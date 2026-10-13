import { ImageResponse } from "next/og";
import { MARK_PATHS } from "@/components/Logo";

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
          width="136"
          height="136"
          viewBox="12 14 290 290"
          fill="#F7F4EE"
          style={{ display: "flex" }}
        >
          {MARK_PATHS.map((p, i) => (
            <path key={i} d={p.d} transform={p.transform} />
          ))}
        </svg>
      </div>
    ),
    { ...size }
  );
}
