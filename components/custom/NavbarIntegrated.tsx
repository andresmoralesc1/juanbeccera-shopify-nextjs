'use client'
import Link from 'next/link';
import { Search, User, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import CartModal from 'components/cart/modal';
import { Suspense } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// IMPORTANTE: Verificar que estas colecciones existan en Shopify con estos handles exactos
// Ajustar los handles según las colecciones reales en tu tienda Shopify
const navLinks = [
  { href: "/search", text: "Nueva Colección", highlight: false },
  { href: "/search/hombre", text: "Hombre", highlight: false },
  { href: "/search/accesorios", text: "Accesorios", highlight: false },
  { href: "/search/sale", text: "Sale", highlight: true },
];

export default function NavbarIntegrated({ variant = 'transparent' }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  // Si estamos en páginas de búsqueda/catálogo o producto, forzar variant solid
  const isSearchOrProductPage = pathname?.startsWith('/search') || pathname?.startsWith('/product');
  const isSolidVariant = variant === 'solid' || isSearchOrProductPage;

  const [isScrolled, setIsScrolled] = useState(isSolidVariant);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Si la variante es sólida, no necesitamos el listener de scroll.
    if (isSolidVariant) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSolidVariant]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // Cerrar búsqueda cuando cambia la ruta
  useEffect(() => {
    setIsSearchOpen(false);
    setSearchQuery('');
  }, [pathname]);

  // Cerrar búsqueda al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    }

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <>
      <header
        className={`fixed top-[38px] -mt-px left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || isSolidVariant
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 py-3 flex items-center justify-between">

            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.slice(0, 2).map((link) => (
                <Link key={link.text} href={link.href} className={`font-belleza text-lg tracking-wider transition-colors duration-300 relative group ${isScrolled || isSolidVariant ? 'text-black hover:text-[#620c0b]' : 'text-white hover:text-gray-200'}`}>
                  {link.text}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isScrolled || isSolidVariant ? 'bg-[#620c0b]' : 'bg-white'}`}></span>
                </Link>
              ))}
            </nav>

            {/* Logo - Center */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link href="/">
                <img
                  src="/logo-juan-becerra.png"
                  alt="Juan Becerra"
                  className={`h-30 lg:h-40 w-auto transition-all duration-500 ${
                    isScrolled || isSolidVariant ? 'brightness-100' : 'brightness-0 invert'
                  }`}
                />
              </Link>
            </div>

            {/* Right Navigation & Actions */}
            <div className="flex items-center space-x-8">
              <nav className="hidden lg:flex items-center space-x-8">
                {navLinks.slice(2).map((link) => (
                  <Link key={link.text} href={link.href} className={`font-belleza text-lg tracking-wider transition-colors duration-300 relative group ${isScrolled || isSolidVariant ? 'text-black hover:text-[#620c0b]' : 'text-white hover:text-gray-200'} ${link.highlight ? 'font-semibold' : 'font-medium'}`}>
                    {link.text}
                    <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 group-hover:w-full ${link.highlight ? 'w-full' : 'w-0'} ${isScrolled || isSolidVariant ? 'bg-[#620c0b]' : 'bg-white'}`}></span>
                  </Link>
                ))}
              </nav>

              <div className="flex items-center space-x-3">
                {/* Search Dropdown - Desktop y Mobile */}
                <div className="relative" ref={searchRef}>
                  <button
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className={`p-2 transition-colors ${isScrolled || isSolidVariant ? 'hover:bg-gray-100' : 'hover:bg-white/20'}`}
                    aria-label="Abrir búsqueda"
                  >
                    <Search className={`h-5 w-5 ${isScrolled || isSolidVariant ? 'text-black' : 'text-white'}`} />
                  </button>

                  {/* Dropdown minimalista */}
                  {isSearchOpen && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white shadow-2xl border border-gray-200 rounded-lg overflow-hidden z-[100]">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (searchQuery.trim()) {
                            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }
                        }}
                        className="p-4"
                      >
                        <div className="relative">
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Buscar productos..."
                            className="w-full border-b border-gray-300 focus:border-[#620c0b] outline-none pb-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors"
                            autoFocus
                          />
                          <Search className="absolute right-0 bottom-2 h-4 w-4 text-gray-400 pointer-events-none" />
                        </div>
                        <p className="mt-2 text-xs text-gray-500">
                          Presiona Enter para buscar
                        </p>
                      </form>
                    </div>
                  )}
                </div>

                <button className={`p-2 transition-colors ${isScrolled || isSolidVariant ? 'hover:bg-gray-100' : 'hover:bg-white/20'}`}>
                  <User className={`h-5 w-5 ${isScrolled || isSolidVariant ? 'text-black' : 'text-white'}`} />
                </button>
                {/* Integrar carrito de Shopify */}
                <div className={`${isScrolled || isSolidVariant ? '[&_svg]:text-black' : '[&_svg]:text-white [&_svg]:hover:text-gray-200'}`}>
                  <Suspense fallback={null}>
                    <CartModal />
                  </Suspense>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`lg:hidden p-2 transition-colors ${isScrolled || isSolidVariant ? 'hover:bg-gray-100' : 'hover:bg-white/20'}`}
            >
              <Menu className={`h-6 w-6 ${isScrolled || isSolidVariant ? 'text-black' : 'text-white'}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[70] transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <img
            src="/logo-juan-becerra.png"
            alt="Juan Becerra"
            className="h-16 w-auto"
          />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 hover:bg-gray-100 transition-colors"
          >
            <X className="h-6 w-6 text-gray-900" />
          </button>
        </div>

        <nav className="flex flex-col p-6 space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.text}
              href={link.href}
              className={`font-belleza text-xl tracking-wider hover:text-[#620c0b] transition-colors ${link.highlight ? 'font-semibold text-[#620c0b]' : 'font-medium text-gray-900'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.text}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t space-y-4">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsSearchOpen(true);
            }}
            className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 transition-colors"
          >
            <Search className="h-5 w-5 text-gray-900" />
            <span className="text-gray-900">Buscar</span>
          </button>
          <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 transition-colors">
            <User className="h-5 w-5 text-gray-900" />
            <span className="text-gray-900">Mi Cuenta</span>
          </button>
        </div>
      </div>

    </>
  );
}
