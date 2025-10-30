'use client';

import { useState } from 'react';
import Image from 'next/image';

export function GalleryCustom({ images }: { images: { src: string; altText: string }[] }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (!images || images.length === 0) {
    return null;
  }

  // Tomar las primeras 4 imágenes para el grid
  const gridImages = images.slice(0, 4);
  const hasMoreImages = images.length > 4;

  return (
    <div className="flex flex-col gap-4">
      {/* Grid de 4 Imágenes - 2x2 */}
      <div className="grid grid-cols-2 gap-2 md:gap-3 lg:gap-4">
        {gridImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(selectedImage === index ? null : index)}
            className="group relative aspect-[3/4] overflow-hidden bg-gray-50 hover:opacity-95 transition-opacity"
          >
            <Image
              src={image.src}
              alt={image.altText}
              fill
              sizes="(min-width: 1024px) 30vw, 50vw"
              className="object-cover object-center"
              priority={index < 2}
            />
            {/* Indicador si hay más imágenes (en la última imagen del grid) */}
            {index === 3 && hasMoreImages && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-moderat text-sm uppercase tracking-wider">
                  +{images.length - 4} más
                </span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Thumbnails para el resto de imágenes (si hay más de 4) */}
      {hasMoreImages && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.slice(4).map((image, index) => {
            const actualIndex = index + 4;
            return (
              <button
                key={actualIndex}
                onClick={() => setSelectedImage(actualIndex)}
                className="relative flex-shrink-0 h-20 w-20 overflow-hidden border border-gray-300 hover:border-gray-400 transition-all duration-200"
              >
                <Image
                  src={image.src}
                  alt={image.altText}
                  fill
                  sizes="80px"
                  className="object-cover object-center"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Modal de imagen ampliada (opcional - se activa al hacer clic) */}
      {selectedImage !== null && images[selectedImage] && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full">
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].altText}
              fill
              sizes="90vw"
              className="object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
              aria-label="Cerrar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Navegación entre imágenes */}
            {selectedImage > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(selectedImage - 1);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
                aria-label="Anterior"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            {selectedImage < images.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(selectedImage + 1);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
                aria-label="Siguiente"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
