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
          animation: 'pulse 2s infinite cubic-bezier(0.4, 0, 0.6, 1)',
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
        aria-expanded={visible}
        aria-controls="n8n-chat-iframe"
      >
        <span style={{ fontSize: "24px" }}>💬</span>
        <span>Asistente Virtual</span>
      </button>

      {/* Iframe del chatbot */}
      {visible && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            right: 'auto', // Aseguramos que no se alinee a la derecha
            left: '20px', // Forzamos la alineación a la izquierda
            width: '350px',
            height: '500px',
            zIndex: 9998,
            animation: 'slideInWithBounce 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards'
          }}
        >
          <iframe
            id="n8n-chat-iframe"
            src="https://n8n.neuralflow.space/webhook/3b4b4795-e0ee-4755-9d16-3db27739e5f1/chat"
            onLoad={() => console.log("✅ Iframe del chatbot cargado")}
            onError={() => console.error("❌ Error al cargar el iframe del chatbot")}
            style={{
              height: '100%',
              width: '100%',
              border: 'none',
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
            }}
          />
        </div>
      )}
    </>
  );
}
