import { ImageResponse } from "next/og";
import { graduationConfig as config } from "./graduation.config";

export const alt = "Graduation 2026 — Thân Quốc Thịnh. The Final Commit.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#080e1c", color: "#f2eee5", padding: 34 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", border: "1px solid #5c5548" }}>
        <div style={{ fontSize: 18, letterSpacing: 7, color: "#c8b99a", marginBottom: 48 }}>{`GRADUATION · ${config.student.year}`}</div>
        <div style={{ fontSize: 66, letterSpacing: 3, marginBottom: 22 }}>THE FINAL COMMIT</div>
        <div style={{ width: 64, height: 1, background: "#c8b99a", marginBottom: 32 }} />
        <div style={{ fontSize: 32, letterSpacing: 4, marginBottom: 16 }}>{config.student.name.toLocaleUpperCase("vi")}</div>
        <div style={{ fontSize: 20, color: "#c8b99a", marginBottom: 10 }}>{config.student.major}</div>
        <div style={{ fontSize: 18, color: "#adb2bd" }}>{config.student.university}</div>
        <div style={{ fontSize: 15, color: "#adb2bd", marginTop: 48 }}>A small milestone, a meaningful day.</div>
      </div>
    </div>, size,
  );
}
