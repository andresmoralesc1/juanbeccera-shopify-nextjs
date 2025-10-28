'use client';

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Componente de flecha personalizada
const CustomArrow = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className={`absolute ${direction === 'left' ? 'left-2 sm:left-4' : 'right-2 sm:right-4'} top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 sm:p-3 lg:p-4 rounded-full shadow-lg transition-all duration-300 z-30 hover:scale-110`}
    aria-label={direction === 'left' ? 'Anterior' : 'Siguiente'}
  >
    {direction === 'left' ? (
      <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-gray-900" />
    ) : (
      <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-gray-900" />
    )}
  </button>
);

export default function FeaturedProducts({ products, title = "Productos Destacados" }) {
  const sliderRef = useRef(null);

  if (!products || products.length === 0) {
    return null;
  }

  // Duplicar productos para efecto infinito
  const extendedProducts = [...products, ...products];

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
    dotsClass: "slick-dots custom-dots-products",
  };

  return (
    <div className="bg-[#364e41] py-16 sm:py-24">
      <div className="mx-auto max-w-[95%] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Slider - Izquierda */}
          <div className="lg:col-span-9 order-2 lg:order-1">
            <div className="relative">
              {/* React Slick Slider */}
              <Slider ref={sliderRef} {...settings}>
                {extendedProducts.map((product, index) => (
                  <div key={`${product.slug}-${index}`} className="px-3">
                    <a href={`/product/${product.slug}`} className="group relative block">
                      <div className="relative h-[400px] sm:h-[450px] lg:h-[500px] w-full overflow-hidden bg-gray-200">
                        {/* Marco minimalista */}
                        <div className="absolute top-6 left-6 right-6 bottom-6 border border-white/30 z-20 transition-all duration-500 group-hover:border-white/60 pointer-events-none"></div>

                        <img
                          src={product.imageSrc}
                          alt={product.name}
                          className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                        />

                        {/* Overlay con sombra más pronunciada abajo */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-300"></div>

                        {/* Contenido de texto */}
                        <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10">
                          <h3 className="text-1xl sm:text-2xl font-semibold text-white tracking-wider transform group-hover:scale-105 transition-transform duration-300">
                            {product.name}
                          </h3>
                          <p className="text-white text-xl sm:text-2xl font-bold mt-2">
                            {product.price}
                          </p>
                          <p className="text-white text-sm sm:text-base mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Ver Detalles →
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </Slider>

              {/* Botones de navegación personalizados */}
              <CustomArrow direction="left" onClick={() => sliderRef.current?.slickPrev()} />
              <CustomArrow direction="right" onClick={() => sliderRef.current?.slickNext()} />
            </div>
          </div>

          {/* Caption - Derecha */}
          <div className="lg:col-span-3 space-y-6 order-1 lg:order-2">
            <h2 className="font-belleza text-2xl sm:text-3xl lg:text-5xl font-light tracking-wide mb-6 sm:mb-8 leading-tight text-white text-center lg:text-left">
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

      <style jsx global>{`
        .custom-dots-products {
          display: flex !important;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 2rem;
          list-style: none;
          padding: 0;
        }

        .custom-dots-products li {
          margin: 0;
        }

        .custom-dots-products li button {
          width: 8px;
          height: 8px;
          padding: 0;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.3);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0;
          line-height: 0;
        }

        .custom-dots-products li button:hover {
          background-color: rgba(255, 255, 255, 0.5);
          transform: scale(1.2);
        }

        .custom-dots-products li.slick-active button {
          width: 24px;
          border-radius: 4px;
          background-color: rgba(255, 255, 255, 0.9);
        }

        .custom-dots-products li button:before {
          display: none;
        }
      `}</style>
    </div>
  );
}