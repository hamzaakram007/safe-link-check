import { ImageResponse } from "next/og";

export const alt = "Safe Link Check — fake download & scam URL checker";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background:
            "linear-gradient(165deg, #041018 0%, #0a2230 45%, #07141c 100%)",
          color: "#e8f4f2",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#8aa8a6",
          }}
        >
          Educational heuristics · not antivirus
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
            }}
          >
            Safe <span style={{ color: "#3dffe8", marginLeft: 16 }}>Link</span>
            <span style={{ marginLeft: 16 }}>Check</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "#8aa8a6",
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            Paste a URL. Spot fake PC downloads, phishing unlock pages, and
            launch-week scam patterns.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#1ab8a8",
          }}
        >
          <span>Buy only from official stores</span>
          <span style={{ color: "#8aa8a6" }}>safe-link-check-jade.vercel.app</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
