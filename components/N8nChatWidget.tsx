"use client";

import { useEffect, useState } from "react";

export default function N8nChatWidget() {
      console.log("🚀 Renderizando el componente N8nChatWidget");

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    console.log("🟢 N8nChatWidget montado");
  }, []);

  useEffect(() => {
    console.log(`📦 Chatbot visible: ${visible}`);
  }, [visible]);

  const toggleChat = () => {
    console.log("🖱️ Clic en botón flotante");
    setVisible((v) => !v);
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={toggleChat}
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          backgroundColor: "#000",
          color: "#34efc2",
          border: "none",
          borderRadius: "30px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <span style={{ fontSize: "24px" }}>💬</span>
        <span>Asistente Virtual</span>
      </button>

      {/* Iframe del chatbot */}
      {visible && (
        <iframe
          src="https://n8n.neuralflow.space/webhook/3b4b4795-e0ee-4755-9d16-3db27739e5f1/chat"
          onLoad={() => console.log("✅ Iframe del chatbot cargado")}
          onError={() => console.error("❌ Error al cargar el iframe del chatbot")}
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "350px",
            height: "500px",
            border: "none",
            borderRadius: "16px",
            overflow: "hidden",
            zIndex: 9998,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          }}
        />
      )}
    </>
  );
}
