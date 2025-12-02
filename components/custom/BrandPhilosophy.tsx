'use client'

import Image from 'next/image';
import { FadeIn } from '@/components/ui/fade-in';

export default function BrandPhilosophy() {
  return (
    <div>

      {/* Split Editorial Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Imagen Izquierda */}
        <div className="relative h-[500px] lg:h-[700px]">
          <Image
            src="/banner-manifiesto.png"
            alt="Manifiesto Juan Becerra"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Contenido Derecha */}
        <div className="bg-[#f8f7f4] flex items-center justify-center p-8 sm:p-12 lg:p-16 xl:p-24">
          <FadeIn delay={0.2} direction="left">
            <div className="max-w-lg space-y-6">
              <p className="text-[#620c0b] text-xs tracking-[0.3em] uppercase font-medium mb-6">
                Nuestro Manifiesto
              </p>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-light">
                Nos inspiramos en la elegancia de siempre,<br />
                pero la adaptamos a la vida de hoy.
              </p>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-light">
                Creemos en un estilo que nunca pasa de moda,<br />
                que evoluciona contigo y te hace auténtico en cada movimiento.
              </p>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-light">
                La elegancia no es apariencia, no debe ser distante, es cercanía, es naturalidad, es la forma en que eliges contarte al mundo.
              </p>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-light">
                Cada prenda es un relato de tu esencia,<br />
                un reflejo de quién eres y de quién decides ser.
              </p>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-light">
                Más que moda, es herencia viva.<br />
                Una elegancia atemporal que se reinventa desde el orgullo colombiano.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Quote Section - Full Width */}
      <div className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-8 sm:px-12 text-center">
          <FadeIn delay={0.3} direction="none">
            <div className="space-y-8">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-[#620c0b]/20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
              <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 leading-relaxed italic">
                Hecho para siempre, pensado para hoy
              </blockquote>
              <p className="text-gray-500 text-sm tracking-[0.2em] uppercase font-medium">
                — Juan Becerra
              </p>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Bottom Editorial Image */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Contenido Izquierda */}
        <div className="bg-[#364e41] text-white flex items-center justify-center p-8 sm:p-12 lg:p-16 xl:p-24 order-2 lg:order-1">
          <FadeIn delay={0.2} direction="right">
            <div className="max-w-lg space-y-6">
              <p className="text-white/70 text-xs tracking-[0.3em] uppercase font-medium">
                Calidad Premium
              </p>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light leading-tight">
                Materiales excepcionales
              </h3>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed font-light">
                Trabajamos únicamente con los mejores materiales: cuero genuino, textiles premium y herrajes de alta calidad que garantizan durabilidad y estilo atemporal.
              </p>
              <div className="pt-4">
                <a href="/search" className="font-moderat inline-block text-white text-sm tracking-[0.2em] uppercase font-medium border-b-2 border-white/50 hover:border-white transition-colors pb-1">
                  Explorar Colección
                </a>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Imagen Derecha */}
        <div className="relative h-[500px] lg:h-[700px] order-1 lg:order-2">
          <Image
            src="/billeteras-materiales.png"
            alt="Materiales excepcionales - Billeteras"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}