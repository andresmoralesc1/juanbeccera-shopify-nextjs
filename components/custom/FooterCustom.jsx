import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";

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
              Todos nuestros productos son diseñados y creados 100% en Colombia.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/juanbecerrabelts/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/juanbecerra.co/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/juanbecerrabelts/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Menú Inferior */}
          <div>
            <h4 className="text-lg mb-6">Menú inferior</h4>
            <ul className="space-y-3">
              <li><a href="/search" className="text-gray-400 hover:text-white transition-colors duration-200">Búsqueda</a></li>
              <li><a href="/terminos-del-servicio" className="text-gray-400 hover:text-white transition-colors duration-200">Términos del servicio</a></li>
              <li><a href="/search" className="text-gray-400 hover:text-white transition-colors duration-200">Catálogo</a></li>
              <li><a href="/politica-reembolso" className="text-gray-400 hover:text-white transition-colors duration-200">Política de reembolso</a></li>
            </ul>
          </div>

          {/* Nuestras Políticas */}
          <div>
            <h4 className="text-lg mb-6">Nuestras Políticas</h4>
            <ul className="space-y-3">
              <li><a href="/politica-proteccion-datos" className="text-gray-400 hover:text-white transition-colors duration-200">Política de protección de datos</a></li>
              <li><a href="/politica-reembolso" className="text-gray-400 hover:text-white transition-colors duration-200">Política de Reembolso</a></li>
              <li><a href="/politica-envios" className="text-gray-400 hover:text-white transition-colors duration-200">Política de Envíos</a></li>
              <li><a href="/terminos-y-condiciones" className="text-gray-400 hover:text-white transition-colors duration-200">Términos y Condiciones</a></li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h4 className="text-lg mb-6">Conoce sobre Noticias y descuentos</h4>
            <p className="text-gray-400 mb-4">
              Suscríbete y obtén noticias y regalos en todos nuestros productos.
            </p>
            <div className="mb-6">
              <input
                type="email"
                placeholder="Su e-mail"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <a href="tel:+573172727916" className="text-gray-400 hover:text-white transition-colors duration-200">
                  +57 317 272 7916
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <a href="mailto:Juanbecerracolombia@gmail.com" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Juanbecerracolombia@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Juan Becerra. Tecnología de Shopify.
            </p>
            <div className="flex space-x-6">
              <span className="text-gray-400 text-sm">
                País/región: Colombia (COP $)
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}