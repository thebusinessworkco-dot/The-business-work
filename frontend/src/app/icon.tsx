import { ImageResponse } from "next/og";
import { MARK_PATHS } from "@/components/Logo";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          width="24"
          height="24"
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
