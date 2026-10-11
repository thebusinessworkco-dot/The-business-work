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
        <div
          style={{
            width: "56px",
            height: "56px",
            backgroundColor: "#F7F4EE",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
