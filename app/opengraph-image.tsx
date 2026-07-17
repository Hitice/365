import { ImageResponse } from "next/og";

export const alt =
  "Catech 360 | Produtos, Serviços e Máquinas CNC em Uberlândia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              width: "88px",
              height: "88px",
              borderRadius: "9999px",
              border: "10px solid #f2680f",
              borderTopColor: "#d0d5dd",
              display: "flex",
            }}
          />
          <div style={{ display: "flex", fontSize: 84, fontWeight: 800 }}>
            <span style={{ color: "#101828" }}>Catech</span>
            <span style={{ color: "#f2680f", marginLeft: 20 }}>360</span>
          </div>
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 40,
            color: "#344054",
            display: "flex",
          }}
        >
          Produtos · Serviços · Máquinas CNC
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 30,
            color: "#667085",
            display: "flex",
          }}
        >
          Soluções integradas para a indústria · Uberlândia MG
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "20px",
            background: "#f2680f",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
