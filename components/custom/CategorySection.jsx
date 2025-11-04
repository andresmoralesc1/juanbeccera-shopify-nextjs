'use client'
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

// Componente de flecha personalizada
const CustomArrow = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className={`hidden sm:block absolute ${direction === 'left' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 lg:p-4 rounded-full shadow-lg transition-all duration-300 z-30 hover:scale-110 min-w-[44px] min-h-[44px] flex items-center justify-center`}
    aria-label={direction === 'left' ? 'Anterior' : 'Siguiente'}
  >
    {direction === 'left' ? (
      <ChevronLeft className="h-6 w-6 lg:h-7 lg:w-7 text-gray-900" />
    ) : (
      <ChevronRight className="h-6 w-6 lg:h-7 lg:w-7 text-gray-900" />
    )}
  </button>
);

export default function CategorySection() {
  const sliderRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detectar mobile y prefers-reduced-motion
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Verificar si el usuario prefiere movimiento reducido
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', checkMobile);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // No triplicar categorías en mobile, usar las originales
  const displayCategories = isMobile ? categories : [...categories, ...categories, ...categories];

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: !isMobile && !prefersReducedMotion, // Deshabilitar autoplay en mobile y si prefiere movimiento reducido
    autoplaySpeed: 5000, // Aumentado de 2000 a 5000ms
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
          centerMode: false,
          centerPadding: '0px',
          autoplay: false,
          variableWidth: false,
          adaptiveHeight: true,
        }
      }
    ],
    dotsClass: "slick-dots custom-dots-minimal",
  };

  return (
    <div className="bg-[#364e41] py-12 sm:py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">

          {/* Caption - Izquierda */}
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

          {/* Slider - Derecha */}
          <div className="lg:col-span-9">
            <div className="relative overflow-hidden">
              {/* React Slick Slider */}
              <Slider ref={sliderRef} {...settings}>
                {displayCategories.map((category, index) => (
                  <div key={`${category.id}-${index}`} className="px-0 sm:px-3">
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

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 group-active:from-black/75 transition-all duration-300"></div>

                        {/* Contenido de texto */}
                        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10">
                          <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-wider transform group-hover:scale-105 transition-transform duration-300">
                            {category.name}
                          </h3>
                          {/* CTA visible siempre en mobile, hover en desktop */}
                          <p className="text-white text-sm sm:text-base mt-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                            Explorar →
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </Slider>

              {/* Botones de navegación personalizados - Ocultos en mobile */}
              <CustomArrow direction="left" onClick={() => sliderRef.current?.slickPrev()} />
              <CustomArrow direction="right" onClick={() => sliderRef.current?.slickNext()} />
            </div>

            {/* Indicador de swipe solo en mobile */}
            {isMobile && (
              <div className="text-center mt-4 text-white/60 text-xs animate-pulse sm:hidden">
                ← Desliza para ver más →
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-dots-minimal {
          display: flex !important;
          justify-content: center;
          gap: 0.75rem;
          margin-top: 1.5rem;
          list-style: none;
          padding: 0;
        }

        .custom-dots-minimal li {
          margin: 0;
        }

        .custom-dots-minimal li button {
          width: 32px;
          height: 2px;
          padding: 0;
          background-color: rgba(255, 255, 255, 0.4);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0;
          line-height: 0;
          min-height: 44px; /* Área de toque accesible */
          display: flex;
          align-items: center;
        }

        .custom-dots-minimal li button:hover {
          background-color: rgba(255, 255, 255, 0.7);
        }

        .custom-dots-minimal li.slick-active button {
          width: 48px;
          background-color: rgba(255, 255, 255, 1);
        }

        .custom-dots-minimal li button:before {
          display: none;
        }

        /* Soporte para prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .custom-dots-minimal li button,
          .slick-slide img,
          .slick-slide h3,
          .slick-slide p {
            transition-duration: 0.01ms !important;
          }
        }

        /* Forzar 1 card en mobile */
        @media (max-width: 640px) {
          .slick-slide img {
            will-change: auto;
          }

          .slick-slider .slick-track {
            margin-left: 0;
            margin-right: 0;
          }

          .slick-slide {
            width: 100% !important;
          }

          .slick-slide > div {
            width: 100% !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
