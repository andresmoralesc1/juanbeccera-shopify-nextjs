'use client';

import { useEffect, useRef } from 'react';

export function CalendlyWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    // Ocultar scrollbar de Calendly
    const style = document.createElement('style');
    style.innerHTML = `
      .calendly-inline-widget::-webkit-scrollbar {
        display: none !important;
      }
      .calendly-inline-widget {
        -ms-overflow-style: none !important;
        scrollbar-width: none !important;
      }
      .calendly-inline-widget iframe {
        overflow: hidden !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Cleanup script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={containerRef}
        className="calendly-inline-widget"
        data-url="https://calendly.com/contacto-juanbecerra"
        style={{
          minWidth: '320px',
          height: '700px',
          width: '100%',
        }}
      />
    </div>
  );
}
