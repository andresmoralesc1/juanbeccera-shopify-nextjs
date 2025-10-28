'use client'
export default function HeroSection() {
  return (
    <section className="relative h-[90vh] sm:h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/banner-home-juan-becerra.jpg"
          alt="Banner Juan Becerra"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="font-belleza text-4xl sm:text-5xl lg:text-7xl font-light tracking-wide mb-6 sm:mb-8 leading-tight">
          Nueva Colección
        </h1>
        
        <p className="font-light text-base sm:text-lg lg:text-xl mb-10 sm:mb-12 max-w-2xl mx-auto opacity-90 leading-relaxed">
          Descubre las últimas tendencias en moda premium. 
          Elegancia y sofisticación en cada pieza.
        </p>
        
        {/* Botones estilo editorial */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          {/* Botón primario - Underline style */}
          <a 
            href="#seasonal" 
            className="group inline-flex items-center gap-3 text-white text-sm sm:text-base tracking-[0.2em] uppercase font-medium border-b-2 border-white pb-2 hover:border-white/60 transition-all duration-300"
          >
            Explorar Colección
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          
          {/* Botón secundario - Minimal outline */}
          <a 
            href="#seasonal" 
            className="inline-flex items-center gap-3 text-white text-sm sm:text-base tracking-[0.15em] uppercase font-light border border-white/50 px-8 py-3 hover:bg-white hover:text-black transition-all duration-300"
          >
            Ver Lookbook
          </a>
        </div>
      </div>

      {/* Scroll indicator - más elegante */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
        <p className="text-white text-xs tracking-[0.2em] uppercase font-light opacity-70">Scroll</p>
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