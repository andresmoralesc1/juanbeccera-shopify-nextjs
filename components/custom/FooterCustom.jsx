import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <img 
              src="/toro-juan-becerra.png" 
              alt="Juan Becerra" 
              className="h-42 w-auto mb-4 filter brightness-0 invert"
            />
            <p className="text-gray-400 mb-6 leading-relaxed">
              Elegancia sin límites desde 2017. Moda premium que define tu estilo 
              con calidad y sofisticación en cada pieza de nuestra colección exclusiva.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/juanbecerra.shop" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/juanbecerra_shop" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/juanbecerra_co" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://youtube.com/@juanbecerra" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg mb-6">Categorías</h4>
            <ul className="space-y-3">
              <li><a href="/search" className="text-gray-400 hover:text-white transition-colors duration-200">Nueva Colección</a></li>
              <li><a href="/search/hombre" className="text-gray-400 hover:text-white transition-colors duration-200">Hombre</a></li>
              <li><a href="/search/mujer" className="text-gray-400 hover:text-white transition-colors duration-200">Mujer</a></li>
              <li><a href="/search/accesorios" className="text-gray-400 hover:text-white transition-colors duration-200">Accesorios</a></li>
              <li><a href="/search/sale" className="text-gray-400 hover:text-white transition-colors duration-200">Sale</a></li>
              <li><a href="/search" className="text-gray-400 hover:text-white transition-colors duration-200">Todas las Colecciones</a></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h4 className="text-lg mb-6">Ayuda</h4>
            <ul className="space-y-3">
              <li><a href="/search" className="text-gray-400 hover:text-white transition-colors duration-200">Centro de Ayuda</a></li>
              <li><a href="/search" className="text-gray-400 hover:text-white transition-colors duration-200">Guía de Tallas</a></li>
              <li><a href="/search" className="text-gray-400 hover:text-white transition-colors duration-200">Envíos y Devoluciones</a></li>
              <li><a href="/search" className="text-gray-400 hover:text-white transition-colors duration-200">Métodos de Pago</a></li>
              <li><a href="/search" className="text-gray-400 hover:text-white transition-colors duration-200">Rastrear Pedido</a></li>
              <li><a href="mailto:hola@juanbecerra.co" className="text-gray-400 hover:text-white transition-colors duration-200">Contacto</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg mb-6">Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-400">
                  Calle 85 #11-15<br />
                  Bogotá, Colombia
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <p className="text-gray-400">+57 (1) 234-5678</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <p className="text-gray-400">hola@juanbecerra.co</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Juan Becerra. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <a href="/search" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Política de Privacidad
              </a>
              <a href="/search" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Términos y Condiciones
              </a>
              <a href="/search" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Cookies
              </a>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <p className="text-gray-400 text-sm">Métodos de pago:</p>
            <div className="flex space-x-2">
              <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-700 rounded text-xs flex items-center justify-center text-white">
                💳
              </div>
              <div className="w-8 h-5 bg-gradient-to-r from-red-600 to-red-700 rounded text-xs flex items-center justify-center text-white">
                💳
              </div>
              <div className="w-8 h-5 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded text-xs flex items-center justify-center text-white">
                💳
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}