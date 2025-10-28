'use client';

import { useState } from 'react';
import { GridTileImage } from 'components/grid/tile';
import Image from 'next/image';

export function GalleryCustom({ images }: { images: { src: string; altText: string }[] }) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Thumbnails - Verticales en Desktop, Horizontales en Mobile */}
      {images.length > 1 && (
        <div className="order-2 lg:order-1 flex lg:flex-col gap-2 overflow-auto lg:max-h-[600px] lg:w-24">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative flex-shrink-0 h-20 w-20 lg:h-24 lg:w-24 overflow-hidden border-2 transition-all duration-200 ${
                selectedImage === index
                  ? 'border-[#620c0b] opacity-100'
                  : 'border-gray-200 opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={image.src}
                alt={image.altText}
                fill
                sizes="(min-width: 1024px) 96px, 80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Imagen Principal */}
      <div className="order-1 lg:order-2 flex-1">
        <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
          {images[selectedImage] && (
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].altText}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
              priority={selectedImage === 0}
            />
          )}

          {/* Indicador de zoom (opcional) */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full text-xs text-gray-600">
            {selectedImage + 1} / {images.length}
          </div>
        </div>
      </div>
    </div>
  );
}
