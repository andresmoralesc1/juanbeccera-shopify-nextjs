'use client';
import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from 'next/image';

interface Empresa {
  id: number;
  logo: string;
  nombre: string;
  trabajos: string[];
}

interface ClientEmpresasCarruselProps {
  empresas: Empresa[];
}

export function ClientEmpresasCarrusel({ empresas }: ClientEmpresasCarruselProps) {
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState<Empresa>(() => empresas[0] ?? {
    id: 0,
    logo: '',
    nombre: '',
    trabajos: []
  });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Calcular cuántas cards se ven a la vez según el viewport
  const getVisibleCards = () => {
    if (typeof window === 'undefined') return 3;
    const width = window.innerWidth;
    if (width < 640) return 1;
    if (width < 1024) return 2;
    return 3;
  };

  const [visibleCards, setVisibleCards] = useState(getVisibleCards());

  useEffect(() => {
    const updateVisibleCards = () => {
      setVisibleCards(getVisibleCards());
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  // Calcular cuántos dots (páginas) necesitamos
  const trabajosActuales = empresaSeleccionada?.trabajos || [];
  const totalPages = Math.ceil(trabajosActuales.length / visibleCards);
  const activePage = Math.floor(activeIndex / visibleCards);

  // Reset scroll cuando cambia la empresa
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      setActiveIndex(0);
    }
  }, [empresaSeleccionada]);

  // Detectar posición del scroll
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const cards = Array.from(container.children) as HTMLElement[];

    if (cards.length === 0) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(cardCenter - containerCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    const normalizedIndex = closestIndex % trabajosActuales.length;
    setActiveIndex(normalizedIndex);

    if (closestIndex >= trabajosActuales.length && !container.dataset.isLooping) {
      container.dataset.isLooping = 'true';
      setTimeout(() => {
        const targetCard = cards[normalizedIndex];
        if (targetCard) {
          const scrollAmount = targetCard.getBoundingClientRect().left - containerRect.left + container.scrollLeft;
          container.style.scrollBehavior = 'auto';
          container.scrollLeft = scrollAmount;
          container.style.scrollBehavior = 'smooth';
        }
        delete container.dataset.isLooping;
      }, 100);
    }
  }, [trabajosActuales.length]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  // Navegar a una card específica
  const scrollToCard = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = Array.from(container.children) as HTMLElement[];

    if (cards[index]) {
      const card = cards[index];
      const containerRect = container.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();

      const scrollAmount = cardRect.left - containerRect.left + container.scrollLeft;

      container.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Navegar a una página específica
  const scrollToPage = (pageIndex: number) => {
    const cardIndex = pageIndex * visibleCards;
    scrollToCard(Math.min(cardIndex, trabajosActuales.length - 1));
  };

  // Navegación infinita
  const scrollPrev = () => {
    let newIndex = activeIndex - 1;
    if (newIndex < 0) {
      newIndex = trabajosActuales.length - 1;
    }
    scrollToCard(newIndex);
  };

  const scrollNext = () => {
    let newIndex = activeIndex + 1;
    if (newIndex >= trabajosActuales.length) {
      newIndex = 0;
    }
    scrollToCard(newIndex);
  };

  return (
    <div className="bg-[#f8f7f4] py-8 sm:py-10 lg:py-12 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 sm:gap-8 lg:gap-12 items-center">

          {/* Logos de Empresas - Izquierda */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="font-belleza text-2xl sm:text-3xl lg:text-4xl font-light tracking-wide mb-6 lg:mb-8 leading-tight text-gray-900 text-center lg:text-left">
              Nuestros Clientes
            </h2>

            <div className="grid grid-cols-2 gap-4 justify-center lg:justify-start">
              {empresas.map((empresa) => (
                <button
                  key={empresa.id}
                  onClick={() => setEmpresaSeleccionada(empresa)}
                  className={`
                    group relative w-full aspect-square max-w-[120px] mx-auto lg:mx-0
                    flex items-center justify-center p-4 rounded-lg
                    transition-all duration-300
                    ${empresaSeleccionada.id === empresa.id
                      ? 'bg-white ring-2 ring-gray-900 shadow-lg'
                      : 'bg-white/50 hover:bg-white ring-2 ring-transparent hover:ring-gray-900/30'
                    }
                  `}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={empresa.logo}
                      alt={`Logo ${empresa.nombre}`}
                      width={120}
                      height={120}
                      className="max-h-16 w-auto object-contain"
                    />
                  </div>

                </button>
              ))}
            </div>
          </div>

          {/* Carrusel de Trabajos - Derecha */}
          <div className="lg:col-span-8 lg:pt-5">
            <div className="relative">
              {trabajosActuales.length > 0 ? (
                <>
                  {/* Scroll Container */}
                  <div
                    ref={scrollContainerRef}
                    className="scroll-container flex gap-3 sm:gap-4 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory hide-scrollbar"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {/* Renderizar las cards dos veces para efecto infinito */}
                    {[...trabajosActuales, ...trabajosActuales].map((trabajo, index) => {
                      return (
                        <div
                          key={`${empresaSeleccionada.id}-${index}`}
                          className="snap-start shrink-0 w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
                        >
                          <div className="group relative block aspect-[3/4] w-full overflow-hidden bg-gray-200 rounded-sm">
                            <Image
                              src={trabajo}
                              alt={`Prenda para ${empresaSeleccionada.nombre}`}
                              fill
                              className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-300"></div>

                            {/* Contenido de texto */}
                            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                              <p className="text-white/70 text-xs tracking-wider uppercase mb-1">
                                Prenda para
                              </p>
                              <h4 className="text-xl sm:text-2xl font-semibold text-white tracking-wider transform group-hover:scale-105 transition-transform duration-300">
                                {empresaSeleccionada.nombre}
                              </h4>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Botones de navegación */}
                  <button
                    onClick={scrollPrev}
                    className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 z-30 hover:scale-110 min-w-[44px] min-h-[44px] items-center justify-center"
                    aria-label="Anterior"
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-900" />
                  </button>

                  <button
                    onClick={scrollNext}
                    className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 z-30 hover:scale-110 min-w-[44px] min-h-[44px] items-center justify-center"
                    aria-label="Siguiente"
                  >
                    <ChevronRight className="h-6 w-6 text-gray-900" />
                  </button>

                  {/* Dots de navegación */}
                  <div className="flex justify-center items-center gap-1 mt-8">
                    {Array.from({ length: totalPages }).map((_, pageIndex) => {
                      const isActive = activePage === pageIndex;
                      return (
                        <button
                          key={pageIndex}
                          onClick={() => scrollToPage(pageIndex)}
                          style={{
                            padding: 0,
                            border: 'none',
                            background: 'transparent',
                            cursor: 'pointer',
                            fontSize: 0,
                            lineHeight: 0,
                          }}
                          aria-label={`Ir a página ${pageIndex + 1}`}
                        >
                          <div
                            style={{
                              width: isActive ? '40px' : '20px',
                              height: '2px',
                              backgroundColor: isActive ? '#131859' : 'rgba(19,24,89,0.3)',
                              transition: 'all 0.3s ease',
                            }}
                          />
                        </button>
                      );
                    })}
                  </div>

                  {/* Indicador de swipe solo en mobile */}
                  <div className="block sm:hidden text-center mt-4 text-gray-500/60 text-xs animate-pulse">
                    ← Desliza para ver más →
                  </div>
                </>
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-500/60 text-lg">
                    No hay trabajos disponibles para {empresaSeleccionada.nombre}
                  </p>
                  <p className="text-gray-400/60 text-sm mt-2">
                    Próximamente...
                  </p>
                </div>
              )}
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

        @media (prefers-reduced-motion: reduce) {
          .scroll-container {
            scroll-behavior: auto !important;
          }

          * {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }

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
