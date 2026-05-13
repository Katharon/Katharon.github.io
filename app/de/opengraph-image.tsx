import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt =
  "Lukas Stumpfel Portfolio-Vorschau für C#/.NET, Linux, Kubernetes und verteilte Systeme.";

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
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 18% 18%, rgba(56, 189, 248, 0.22), transparent 320px), radial-gradient(circle at 88% 10%, rgba(37, 99, 235, 0.16), transparent 300px)",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          color: "#7dd3fc",
          fontSize: 28,
          fontWeight: 700,
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
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
        <div style={{ color: "#cbd5e1", fontSize: 22, fontWeight: 500 }}>katharon.github.io</div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "26px",
          position: "relative",
        }}
      >
        <div
          style={{
            maxWidth: 930,
            fontSize: 76,
            lineHeight: 1.02,
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
          Informatikstudent mit Fokus auf verteilte Systeme, Backend-Architektur und
          Plattform-Engineering.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "16px",
          color: "#bae6fd",
          fontSize: 24,
          position: "relative",
        }}
      >
        <span>.NET</span>
        <span>Linux</span>
        <span>Kubernetes</span>
        <span>Verteilte Systeme</span>
      </div>
    </div>,
    size,
  );
}
