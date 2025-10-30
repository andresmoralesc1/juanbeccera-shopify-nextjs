'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageZoomModal } from '@/components/ui/image-zoom-modal';

export function GalleryCustom({ images }: { images: { src: string; altText: string }[] }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            onClick={() => {
              setSelectedImage(index);
              setIsModalOpen(true);
            }}
            className="group relative aspect-[3/4] overflow-hidden bg-gray-50 hover:opacity-95 transition-opacity cursor-zoom-in"
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
                onClick={() => {
                  setSelectedImage(actualIndex);
                  setIsModalOpen(true);
                }}
                className="relative flex-shrink-0 h-20 w-20 overflow-hidden border border-gray-300 hover:border-gray-400 transition-all duration-200 cursor-zoom-in"
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

      {/* Image Zoom Modal Premium */}
      <ImageZoomModal
        images={images}
        currentIndex={selectedImage ?? 0}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
