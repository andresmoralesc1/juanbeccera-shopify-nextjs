'use client'
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Cinturones",
    href: "/collections/cinturones",
    imageSrc: "/cinturones.webp",
  },
  {
    id: 2,
    name: "Gorras",
    href: "/collections/gorras",
    imageSrc: "/gorras.webp",
  },
  {
    id: 3,
    name: "Tarjeteros",
    href: "/collections/tarjeteros",
    imageSrc: "/tarjeteros.webp",
  },
  {
    id: 4,
    name: "Sacos",
    href: "/collections/sacos",
    imageSrc: "/sacos.webp",
  },
];

export default function CategorySection() {
  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.offsetWidth;
    const index = Math.round(scrollLeft / cardWidth);

    setActiveIndex(index);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToCard = (index) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = container.children;
    if (cards[index]) {
      const cardLeft = cards[index].offsetLeft;
      container.scrollTo({
        left: cardLeft,
        behavior: 'smooth'
      });
    }
  };

  const scrollPrev = () => {
    let newIndex = activeIndex - 1;
    if (newIndex < 0) {
      newIndex = categories.length - 1;
    }
    scrollToCard(newIndex);
  };

  const scrollNext = () => {
    let newIndex = activeIndex + 1;
    if (newIndex >= categories.length) {
      newIndex = 0;
    }
    scrollToCard(newIndex);
  };

  return (
    <div className="bg-pink-500 py-12 sm:py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">

          <div className="lg:col-span-3 space-y-6">
            <h2 className="font-belleza text-2xl sm:text-3xl lg:text-5xl font-light tracking-wide mb-4 sm:mb-6 lg:mb-8 leading-tight text-white text-center lg:text-left">
              Explora más
            </h2>
            <img
              src="/toro-juan-becerra.png"
              alt="Logo Toro Juan Becerra"
              className="h-40 w-auto mb-4 filter brightness-0 invert mx-auto lg:mx-0"
              loading="lazy"
            />
          </div>

          <div className="lg:col-span-9">
            <div className="relative">

              <div
                ref={scrollContainerRef}
                className="flex gap-3 sm:gap-4 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="snap-start shrink-0 w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
                  >
                    <a
                      href={category.href}
                      className="group relative block active:scale-[0.98] transition-transform duration-150"
                    >
                      <div className="relative h-[320px] sm:h-[400px] lg:h-[500px] w-full overflow-hidden bg-gray-200 rounded-sm">
                        <img
                          src={category.imageSrc}
                          alt={`Categoría ${category.name}`}
                          className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 group-active:from-black/75 transition-all duration-300"></div>

                        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10">
                          <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-wider transform group-hover:scale-105 transition-transform duration-300">
                            {category.name}
                          </h3>
                          <p className="text-white text-sm sm:text-base mt-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                            Explorar →
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>

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

              {/* DEBUG INFO */}
              <div className="bg-red-500 text-white p-4 rounded text-center mt-6">
                <p className="text-lg font-bold">DEBUG MODE</p>
                <p>Active Index: {activeIndex}</p>
                <p>Total Categories: {categories.length}</p>
              </div>

              <div className="flex justify-center items-center gap-6 mt-8 bg-yellow-400 p-4">
                {categories.map((category, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <div key={category.id} className="flex flex-col items-center gap-2">
                      <button
                        onClick={() => {
                          console.log('Clicked dot', index);
                          scrollToCard(index);
                        }}
                        className="flex items-center justify-center"
                        style={{ 
                          minHeight: '44px', 
                          minWidth: '60px', 
                          padding: '10px',
                          border: isActive ? '3px solid red' : '3px solid blue',
                          background: isActive ? 'green' : 'gray', 
                          cursor: 'pointer'
                        }}
                      >
                        <div 
                          style={{
                            width: isActive ? '40px' : '20px',
                            height: isActive ? '10px' : '4px',
                            backgroundColor: isActive ? '#ff0000' : '#000000'
                          }}
                        />
                      </button>
                      <span className="text-xs text-black font-bold">
                        {index} - {isActive ? 'ACTIVO' : 'inactivo'}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="block sm:hidden text-center mt-4 text-white/60 text-xs animate-pulse">
                ← Desliza para ver más →
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}