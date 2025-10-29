'use client'
import { Instagram, Heart } from 'lucide-react';

const posts = [
  { id: 1, src: '/cinturon-destacado-1.webp', alt: 'Instagram post 1', likes: '2.3k' },
  { id: 2, src: '/saco-destacado-1.webp', alt: 'Instagram post 2', likes: '1.8k' },
  { id: 3, src: '/tarjetero-destacado-1.webp', alt: 'Instagram post 3', likes: '3.1k' },
  { id: 4, src: '/gorras.webp', alt: 'Instagram post 4', likes: '2.7k' },
  { id: 5, src: '/cinturones.webp', alt: 'Instagram post 5', likes: '1.5k' },
  { id: 6, src: '/sacos.webp', alt: 'Instagram post 6', likes: '2.9k' },
];

export default function InstagramFeed() {
  return (
    <div className="py-16 sm:py-24 bg-[#1a1a1a] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-belleza text-2xl sm:text-3xl lg:text-5xl font-light tracking-wide mb-6 leading-tight text-white">
            Síguenos en Instagram
          </h2>
          <a 
            href="https://instagram.com/juanbecerra_shop" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-moderat text-base sm:text-lg text-white/80 hover:text-white transition-colors duration-300"
          >
            <Instagram className="h-6 w-6" />
            @juanbecerra_shop
          </a>
        </div>
        
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {posts.map((post) => (
            <div key={post.id} className="group relative block overflow-hidden">
              <a href="https://instagram.com/juanbecerra_shop" target="_blank" rel="noopener noreferrer">
                <div className="relative aspect-square w-full bg-gray-800">
                  <img
                    src={post.src}
                    alt={post.alt}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay con efecto hover */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                    {/* Icono de Instagram */}
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Instagram className="h-10 w-10 text-white" />
                    </div>
                    
                    {/* Likes */}
                    <div className="flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                      <span className="font-moderat text-white font-semibold">{post.likes}</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
        
        {/* CTA Button con estándar */}
        <div className="text-center mt-12">
          <a
            href="https://instagram.com/juanbecerra_shop"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-moderat text-white text-sm sm:text-base tracking-[0.15em] uppercase font-light border border-white/50 px-8 py-3 hover:bg-white hover:text-black transition-all duration-300"
          >
            <Instagram className="h-5 w-5" />
            Ver más en Instagram
          </a>
        </div>
      </div>
    </div>
  );
}