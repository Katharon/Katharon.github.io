import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt =
  "Lukas Stumpfel portfolio preview for C#/.NET, Linux, Kubernetes and distributed systems.";

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
        background: "#070b0e",
        color: "#f2f5f7",
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
            "radial-gradient(circle at 18% 18%, rgba(255, 172, 96, 0.12), transparent 320px), radial-gradient(circle at 88% 10%, rgba(144, 160, 172, 0.08), transparent 300px)",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          color: "#ffac60",
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
              border: "1px solid rgba(255, 172, 96, 0.45)",
              borderRadius: 14,
              background: "rgba(255, 172, 96, 0.08)",
            }}
          >
            LS
          </div>
          Lukas Stumpfel
        </div>
        <div style={{ color: "#c1c9d0", fontSize: 22, fontWeight: 500 }}>katharon.github.io</div>
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
            color: "#c1c9d0",
            fontSize: 34,
            lineHeight: 1.35,
          }}
        >
          Computer science graduate focused on distributed systems, backend architecture and
          platform engineering.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "16px",
          color: "#ffc58e",
          fontSize: 24,
          position: "relative",
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
