'use client';

import { useState } from 'react';
import Image from 'next/image';

export function GalleryCustom({ images }: { images: { src: string; altText: string }[] }) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Imagen Principal - Estilo Versace minimalista */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
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
      </div>

      {/* Thumbnails Horizontales - Debajo de la imagen principal (estilo Versace) */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative flex-shrink-0 h-24 w-24 overflow-hidden border transition-all duration-200 ${
                selectedImage === index
                  ? 'border-[#620c0b] border-2 opacity-100'
                  : 'border-gray-300 opacity-70 hover:opacity-100 hover:border-gray-400'
              }`}
            >
              <Image
                src={image.src}
                alt={image.altText}
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
