import { ImageResponse } from "next/og";

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
        <div
          style={{
            width: "10px",
            height: "10px",
            backgroundColor: "#F7F4EE",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
