import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#020617",
        color: "#7dd3fc",
        fontFamily: "Arial, sans-serif",
        fontSize: 28,
        fontWeight: 800,
      }}
    >
      LS
    </div>,
    size,
  );
}
