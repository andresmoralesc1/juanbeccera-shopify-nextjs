'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type HeroSectionByJBProps = {
  backgroundImage?: string;
  centerImage?: string;
};

export default function HeroSectionByJB({
  backgroundImage = '/running.jpg',
  centerImage = '/by-jb-caption.png'
}: HeroSectionByJBProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-[90vh] sm:h-screen flex items-center justify-center overflow-hidden w-full">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0">
        <div
          className="relative w-full h-full"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <Image
            src={backgroundImage}
            alt="By Juan Becerra - Hero Background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
        </div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Center Image */}
      <div
        className="relative z-10 flex items-center justify-center w-full h-full px-4"
        style={{
          opacity: Math.max(0, 1 - scrollY / 400),
          transform: `translateY(${scrollY * 0.2}px)`
        }}
      >
        <div className="relative max-w-4xl w-full flex items-center justify-center">
          <Image
            src={centerImage}
            alt="By Juan Becerra"
            width={600}
            height={400}
            className="w-auto h-auto object-contain max-w-full"
            priority
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <p className="text-white text-xs tracking-[0.2em] uppercase font-light opacity-70">
          Scroll
        </p>
        <div className="w-px h-12 bg-white/40">
          <div className="w-px h-6 bg-white animate-scroll"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }

        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
