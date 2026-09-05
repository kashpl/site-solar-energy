import { ImageResponse } from "next/og";

export const alt = "Solar Energy — Energia solar com engenharia e previsibilidade";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background: "#001a4d",
          color: "#ffffff",
          padding: "72px 80px",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 76,
              height: 76,
              borderRadius: 20,
              background: "#00d084",
              color: "#001a4d",
              fontSize: 42,
              fontWeight: 900
            }}
          >
            S
          </div>
          <div style={{ display: "flex", fontSize: 38, fontWeight: 900 }}>
            SOLAR&nbsp;<span style={{ color: "#00d084" }}>ENERGY</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              maxWidth: 980,
              fontSize: 68,
              lineHeight: 1.02,
              letterSpacing: "-3px",
              fontWeight: 900
            }}
          >
            Energia solar para reduzir custos com previsibilidade.
          </div>
          <div style={{ marginTop: 28, fontSize: 25, color: "#e8ecf1" }}>
            Residências · Empresas · Usinas solares
          </div>
        </div>
      </div>
    ),
    size
  );
}
