'use client'
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from 'next/link';

interface Collection {
  title: string;
  handle: string;
  path: string;
  image?: {
    url: string;
    altText?: string;
  };
}

interface CategorySectionMinimalProps {
  collections: Collection[];
  title?: string;
}

export default function CategorySectionMinimal({ collections, title = "Explora nuestras categorías" }: CategorySectionMinimalProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Mapeo de imágenes estáticas por categoría
  const getCategoryImage = (handle: string): string => {
    const handleLower = handle.toLowerCase();
    if (handleLower.includes('cinturon')) return '/cinturones.webp';
    if (handleLower.includes('gorra')) return '/gorras.webp';
    if (handleLower.includes('tarjetero') || handleLower.includes('billetera')) return '/tarjeteros.webp';
    if (handleLower.includes('saco')) return '/sacos.webp';
    if (handleLower.includes('maleta')) return '/sacos.webp';
    if (handleLower.includes('media')) return '/tarjeteros.webp';
    if (handleLower.includes('camiseta')) return '/sacos.webp';
    if (handleLower.includes('combo')) return '/cinturones.webp';
    return '/sacos.webp';
  };

  // Filtrar colecciones válidas
  const validCollections = collections
    .filter(c =>
      c.handle !== '' &&
      !c.handle.toLowerCase().includes('hidden') &&
      c.title.toLowerCase() !== 'all'
    )
    .map(c => ({
      ...c,
      imageSrc: c.image?.url || getCategoryImage(c.handle)
    }));

  if (validCollections.length === 0) {
    return null;
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 300;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="bg-white py-4 sm:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Navegación */}
        <div className="flex items-center justify-end mb-4">
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 border border-gray-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 border border-gray-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {validCollections.map((category) => (
            <Link
              key={category.handle}
              href={category.path}
              className="group snap-start shrink-0 w-[140px] sm:w-[160px] lg:w-[180px]"
            >
              {/* Imagen cuadrada */}
              <div className="relative aspect-square w-full overflow-hidden bg-gray-200 mb-3">
                <img
                  src={category.imageSrc}
                  alt={category.title}
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>

              {/* Título */}
              <h3 className="font-moderat text-sm text-center text-gray-900 group-hover:text-[#620c0b] transition-colors duration-300">
                {category.title}
              </h3>
            </Link>
          ))}
        </div>

        {/* Ver todas */}
        <div className="text-center mt-6">
          <Link
            href="/search"
            className="inline-block font-moderat text-sm text-gray-600 hover:text-gray-900 border-b border-gray-400 hover:border-gray-900 pb-0.5 transition-all duration-300"
          >
            Ver todas las categorías
          </Link>
        </div>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
