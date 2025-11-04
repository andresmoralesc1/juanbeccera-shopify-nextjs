'use client';

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FeaturedProducts({ products, title = "Productos Destacados" }) {
  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  if (!products || products.length === 0) {
    return null;
  }

  // Detectar posición del scroll para actualizar indicadores
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.offsetWidth;
    const index = Math.round(scrollLeft / cardWidth);

    setActiveIndex(index);
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < container.scrollWidth - container.offsetWidth - 10);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Navegar a un producto específico
  const scrollToCard = (index) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = container.offsetWidth;
    container.scrollTo({
      left: cardWidth * index,
      behavior: 'smooth'
    });
  };

  // Navegar con botones
  const scrollPrev = () => {
    const newIndex = Math.max(0, activeIndex - 1);
    scrollToCard(newIndex);
  };

  const scrollNext = () => {
    const newIndex = Math.min(products.length - 1, activeIndex + 1);
    scrollToCard(newIndex);
  };

  return (
    <div className="bg-[#364e41] py-12 sm:py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">

          {/* Slider - Izquierda */}
          <div className="lg:col-span-9 order-2 lg:order-1">
            <div className="relative">

              {/* Scroll Container */}
              <div
                ref={scrollContainerRef}
                className="scroll-container flex gap-3 sm:gap-4 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory hide-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {products.map((product, index) => (
                  <div
                    key={product.slug}
                    className="snap-start shrink-0 w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
                  >
                    <a
                      href={`/product/${product.slug}`}
                      className="group relative block active:scale-[0.98] transition-transform duration-150"
                    >
                      <div className="relative h-[320px] sm:h-[400px] lg:h-[500px] w-full overflow-hidden bg-gray-200 rounded-sm">
                        <img
                          src={product.imageSrc}
                          alt={product.name}
                          className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 group-active:from-black/95 transition-all duration-300"></div>

                        {/* Contenido de texto */}
                        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10">
                          <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-wider transform group-hover:scale-105 transition-transform duration-300">
                            {product.name}
                          </h3>
                          <p className="text-white text-xl sm:text-2xl font-bold mt-2">
                            {product.price}
                          </p>
                          {/* CTA visible siempre en mobile, hover en desktop */}
                          <p className="text-white text-sm sm:text-base mt-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                            Ver Detalles →
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>

              {/* Botones de navegación - Solo desktop */}
              {canScrollLeft && (
                <button
                  onClick={scrollPrev}
                  className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 z-30 hover:scale-110 min-w-[44px] min-h-[44px] items-center justify-center"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-900" />
                </button>
              )}

              {canScrollRight && (
                <button
                  onClick={scrollNext}
                  className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 z-30 hover:scale-110 min-w-[44px] min-h-[44px] items-center justify-center"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="h-6 w-6 text-gray-900" />
                </button>
              )}

              {/* Dots de navegación */}
              <div className="flex justify-center gap-3 mt-6">
                {products.map((product, index) => (
                  <button
                    key={product.slug}
                    onClick={() => scrollToCard(index)}
                    className={`transition-all duration-300 h-0.5 rounded-full ${
                      index === activeIndex
                        ? 'w-12 bg-white'
                        : 'w-8 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Ir a ${product.name}`}
                    style={{ minHeight: '44px', display: 'flex', alignItems: 'center' }}
                  />
                ))}
              </div>

              {/* Indicador de swipe solo en mobile */}
              <div className="block sm:hidden text-center mt-4 text-white/60 text-xs animate-pulse">
                ← Desliza para ver más →
              </div>
            </div>
          </div>

          {/* Caption - Derecha */}
          <div className="lg:col-span-3 space-y-6 order-1 lg:order-2">
            <h2 className="font-belleza text-2xl sm:text-3xl lg:text-5xl font-light tracking-wide mb-4 sm:mb-6 lg:mb-8 leading-tight text-white text-center lg:text-left">
              {title}
            </h2>
            <p className="font-moderat text-base md:text-lg leading-relaxed text-white/90 text-center lg:text-left">
              Descubre nuestros artículos más populares y exclusivos. Cada pieza ha sido cuidadosamente seleccionada para ofrecerte la mejor calidad y estilo.
            </p>
            <div className="flex justify-center lg:justify-start">
              <a
                href="/search"
                className="inline-flex items-center gap-3 font-moderat bg-[#620c0b] text-white text-sm sm:text-base tracking-[0.15em] uppercase font-medium px-8 py-3 hover:bg-[#4a0908] transition-all duration-300"
              >
                Ver Todos
              </a>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -webkit-overflow-scrolling: touch;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* Soporte para prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .scroll-container {
            scroll-behavior: auto !important;
          }

          * {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }

        /* Optimización táctil para mobile */
        @media (max-width: 640px) {
          .scroll-container {
            scroll-padding: 0;
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
    </div>
  );
}
