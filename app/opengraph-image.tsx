import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#020617",
        color: "#f8fafc",
        padding: "72px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          color: "#7dd3fc",
          fontSize: 28,
          fontWeight: 700,
        }}
      >
        <div
          style={{
            width: 58,
            height: 58,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(125, 211, 252, 0.45)",
            borderRadius: 14,
            background: "rgba(14, 165, 233, 0.12)",
          }}
        >
          LS
        </div>
        Lukas Stumpfel
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
        <div
          style={{
            maxWidth: 930,
            fontSize: 76,
            lineHeight: 1.02,
            letterSpacing: "-1px",
            fontWeight: 800,
          }}
        >
          C#/.NET, Linux & Kubernetes
        </div>
        <div
          style={{
            maxWidth: 880,
            color: "#cbd5e1",
            fontSize: 34,
            lineHeight: 1.35,
          }}
        >
          Computer science student focused on distributed systems, backend architecture and platform
          engineering.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "16px",
          color: "#bae6fd",
          fontSize: 24,
        }}
      >
        <span>.NET</span>
        <span>Linux</span>
        <span>Kubernetes</span>
        <span>Distributed Systems</span>
      </div>
    </div>,
    size,
  );
}
