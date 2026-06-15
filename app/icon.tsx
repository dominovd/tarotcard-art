import { ImageResponse } from "next/og";

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
          background: "linear-gradient(135deg, #0a0820 0%, #1c1840 100%)",
          color: "#d4af37",
          fontSize: 26,
          fontFamily: "serif",
          fontWeight: 500,
        }}
      >
        T
      </div>
    ),
    { ...size }
  );
}
