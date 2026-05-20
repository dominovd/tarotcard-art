import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "tarotcard.art — Free tarot card generator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0820 0%, #14112e 50%, #1c1840 100%)",
          fontFamily: "serif",
          color: "#e8e4f5",
        }}
      >
        <div
          style={{
            color: "#d4af37",
            fontSize: 28,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          ✦ tarotcard.art ✦
        </div>
        <div
          style={{
            fontSize: 96,
            color: "#e8e4f5",
            textAlign: "center",
            lineHeight: 1.1,
            maxWidth: 1000,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Draw your</span>
          <span style={{ color: "#d4af37", fontStyle: "italic" }}>card of the day</span>
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 24,
            color: "#9a93b8",
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Free tarot card generator — full 78-card Rider-Waite deck
        </div>
      </div>
    ),
    { ...size }
  );
}
