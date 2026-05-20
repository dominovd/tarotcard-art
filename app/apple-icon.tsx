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
          background: "linear-gradient(135deg, #0a0820 0%, #14112e 50%, #1c1840 100%)",
          color: "#d4af37",
          fontSize: 130,
          fontFamily: "serif",
          fontWeight: 500,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 16,
            border: "2px solid #d4af37",
            borderRadius: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✦
        </div>
      </div>
    ),
    { ...size }
  );
}
