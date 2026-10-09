import { ImageResponse } from "next/og";
import { graduationConfig as config } from "./graduation.config";

export const alt = "Graduation 2026 — Thân Quốc Thịnh. The Final Commit.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#fcfbf8", color: "#2d2c29", padding: 34 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", border: "1px solid #c5a66d" }}>
        <div style={{ fontSize: 18, letterSpacing: 7, color: "#886329", marginBottom: 36 }}>{`GRADUATION · ${config.student.year}`}</div>
        <div style={{ fontSize: 34, letterSpacing: 3, color: "#886329", marginBottom: 24 }}>THE FINAL COMMIT</div>
        <div style={{ width: 64, height: 1, background: "#c5a66d", marginBottom: 32 }} />
        <div style={{ fontSize: 58, letterSpacing: 3, marginBottom: 22 }}>{config.student.name.toLocaleUpperCase("vi")}</div>
        <div style={{ fontSize: 20, color: "#886329", marginBottom: 10 }}>{config.student.major}</div>
        <div style={{ fontSize: 18, color: "#706c64" }}>{config.student.university}</div>
        <div style={{ fontSize: 15, color: "#706c64", marginTop: 40 }}>A small milestone, a meaningful day.</div>
      </div>
    </div>, size,
  );
}
