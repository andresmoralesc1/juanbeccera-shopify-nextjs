// /components/AnnouncementBar.tsx
import React from 'react';
import { ArrowRight } from 'lucide-react';

const AnnouncementBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-[#620c0b] text-white text-sm font-light h-[38px] w-full overflow-hidden">
      <div className="h-full flex justify-center items-center text-center px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span role="img" aria-label="party popper" className="text-base">🎉</span>
          <span className="hidden sm:inline">
            ¡Oferta por tiempo limitado! Obtén hasta 20% de descuento.
          </span>
          <span className="inline sm:hidden">
            ¡Ofertas especiales!
          </span>
          <a href="/search/sale" className="font-semibold underline hover:text-white/80 transition-colors duration-300 inline-flex items-center gap-1 whitespace-nowrap">
            Ver detalles
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
