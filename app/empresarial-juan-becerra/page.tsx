import { Metadata } from 'next';
import Image from 'next/image';
import { FadeIn } from '@/components/ui/fade-in';
import FooterCustom from '@/components/custom/FooterCustom';
import { ClientEmpresasCarrusel } from '@/components/custom/ClientEmpresasCarrusel';
import { FormularioContactoB2B } from '@/components/custom/FormularioContactoB2B';
import { CalendlyWidget } from '@/components/custom/CalendlyWidget';

export const metadata: Metadata = {
  title: 'Prendas Personalizadas para Empresas | Juan Becerra',
  description: 'Desde 30 unidades, transforma la identidad de tu empresa con prendas de alta calidad 100% Colombianas. 8 años de experiencia en marroquinería y textiles.',
  openGraph: {
    title: 'Prendas Personalizadas para Empresas | Juan Becerra',
    description: 'Prendas corporativas premium con personalización DTF, Serigrafía, Bordado y Vinilo textil.',
    url: '/empresarial-juan-becerra',
  },
};

const productos = [
  {
    categoria: 'CAMISETAS',
    titulo: 'Camisetas y Polos',
    descripcion: 'Básicas, polo y deportivas en 100% poliéster transpirable. Ideales para uniformes empresariales y eventos corporativos con un estilo pulido.',
    minimo: '50 unidades',
    imagen: '/LandingB2B4.png',
    colores: 6,
  },
  {
    categoria: 'SACOS',
    titulo: 'Sacos Unisex',
    descripcion: 'Quarter, Cremallera y Crewneck con estructura ligera y detalles refinados. Perfectos para look profesional o casual con elegancia moderna.',
    minimo: '30 unidades',
    imagen: '/LandingB2B3.png',
    colores: 6,
  },
  {
    categoria: 'HOODIES',
    titulo: 'Hoodies con Capucha',
    descripcion: 'Combinan suavidad, abrigo y diseño versátil. Disponibles en amplia gama de colores, ideales para personalizar con tu marca.',
    minimo: '30 unidades',
    imagen: '/LandingB2B1.png',
    colores: 8,
  },
  {
    categoria: 'CHAQUETAS',
    titulo: 'Chalecos y Chaquetas Puffer',
    descripcion: 'Nylon enguatado con forro térmico o liso. Perfectas para climas fríos con estilo sofisticado y manteniendo la calidez.',
    minimo: '30 unidades',
    imagen: '/servicios/p6_68.png',
    colores: 5,
  },
  {
    categoria: 'CAMISAS',
    titulo: 'Camisas Formales',
    descripcion: 'Diseñadas para quienes valoran presencia y estilo sin sacrificar comodidad. Confeccionadas en materiales de alta calidad.',
    minimo: '30 unidades',
    imagen: '/servicios/p9_110.png',
    colores: 5,
  },
  {
    categoria: 'CAPS',
    titulo: 'Gorras y Viseras',
    descripcion: 'Drill suave con hebilla metálica y fabricación 100% nacional. Cada una pensada para acompañarte a donde quieras llevarla.',
    minimo: '50 unidades',
    imagen: '/gorras.webp',
    colores: 5,
  },
];

const empresasTrabajos = [
  {
    id: 1,
    logo: '/brands/jimador-logo.webp',
    nombre: 'Jimador',
    trabajos: [
      '/brands/jimador-jacket.png',
      '/brands/jimador-shirt.png',
    ]
  },
  {
    id: 2,
    logo: '/brands/mc-logo.png',
    nombre: 'MC',
    trabajos: [
      '/brands/mc-jacket.png',
      '/brands/mc-shirt.png',
      '/brands/mc-sweter.png',
    ]
  },
  {
    id: 3,
    logo: '/brands/uniandes-logo.jpg',
    nombre: 'Uniandes',
    trabajos: [
      '/brands/uniandes-jacket.png',
      '/brands/uniandes-jacket-2.png',
      '/brands/uniandes-jacket-3.png',
      '/brands/uniandes-polo.png',
      '/brands/uniandes-sweter.png',
      '/brands/uniandes-sweter-2.png',
    ]
  },
  {
    id: 4,
    logo: '/brands/unisabana-logo.webp',
    nombre: 'Unisabana',
    trabajos: [
      '/brands/unisabana-cap.png',
      '/brands/unisabana-sweter.png',
    ]
  },
  {
    id: 5,
    logo: '/brands/arma-tu-vaca logo.svg',
    nombre: 'Arma Tu Vaca',
    trabajos: [
      '/brands/vaca-cap.png',
      '/brands/vaca-jacket.png',
    ]
  },
  {
    id: 6,
    logo: '/brands/Compensar logo.png',
    nombre: 'Compensar',
    trabajos: [
      '/brands/compensar-jacket.png',
      '/brands/compensar-jacket-2.png',
    ]
  },
  {
    id: 7,
    logo: '/brands/indeleble logo.png',
    nombre: 'Indeleble',
    trabajos: [
      '/brands/indeleble-jacket.png',
    ]
  },
  {
    id: 8,
    logo: '/brands/Optive-fusion-logo.svg',
    nombre: 'Optive Fusion',
    trabajos: [
      '/brands/Optivefusion-jacket.jpg',
    ]
  },
];

const beneficios = [
  {
    titulo: 'Producción 100% Colombiana',
    descripcion: 'Apostamos por la industria nacional con estándares internacionales de calidad',
  },
  {
    titulo: '8 Años de Experiencia',
    descripcion: 'Consolidados como aliado confiable para empresas de todos los tamaños',
  },
  {
    titulo: 'Amplia Gama de Colores',
    descripcion: 'Más de 20 colores disponibles en stock para pedidos urgentes',
  },
  {
    titulo: 'Tallas Unisex Completas',
    descripcion: 'XXS a 3XL con tablas de medidas detalladas para equipos diversos',
  },
  {
    titulo: 'Mínimos Accesibles',
    descripcion: 'Desde 30 unidades por referencia, ideal para PyMEs y empresas grandes',
  },
  {
    titulo: 'Entregas Optimizadas',
    descripcion: 'Tiempos de producción competitivos con acompañamiento personalizado',
  },
];

export default function PrendasEmpresasPage() {
  return (
    <main>
      {/* HERO PRINCIPAL - Split Editorial */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        {/* Imagen */}
        <div className="relative h-[50vh] lg:h-[600px] order-2 lg:order-1">
          <Image
            src="/Foto Inicio.jpg"
            alt="Prendas personalizadas Juan Becerra"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Contenido */}
        <div className="bg-[#f8f7f4] flex items-center justify-center p-8 sm:p-12 lg:p-16 xl:p-24 order-1 lg:order-2">
          <FadeIn delay={0.2} direction="right">
            <div className="max-w-xl space-y-6">
              <p className="text-[#620c0b] text-xs tracking-[0.3em] uppercase font-medium">
                Para Empresas
              </p>

              <h1 className="font-belleza text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide text-gray-900 leading-tight">
                Prendas Personalizadas 
              </h1>

              <p className="font-moderat text-base text-gray-700 leading-relaxed font-light">
                Desde 30 unidades, transforma la identidad de tu empresa con prendas de alta calidad.
              </p>

              <p className="font-moderat text-sm text-gray-600">
                8 años de experiencia.
              </p>

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href="#contacto"
                  className="group inline-flex items-center gap-3 bg-[#620c0b] text-white text-sm tracking-[0.15em] uppercase font-semibold px-6 py-3 hover:bg-[#4a0908] transition-all duration-300"
                >
                  Solicitar Cotización
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>

                <a
                  href="#calendly"
                  className="group inline-flex items-center gap-3 text-gray-900 text-sm tracking-[0.2em] uppercase font-light border-b-2 border-gray-900/30 pb-2 hover:border-gray-900 transition-all duration-300"
                >
                  Agendar llamada
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* EMPRESAS Y TRABAJOS - Componente Integrado */}
      <ClientEmpresasCarrusel empresas={empresasTrabajos} />

      {/* PROPUESTA DE VALOR - Full Width Quote */}
      <section className="bg-[#620c0b] py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-12 text-center">
          <FadeIn delay={0.3} direction="none">
            <div className="space-y-6">
              <svg className="w-12 h-12 mx-auto text-white/20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
              <blockquote className="font-belleza text-2xl sm:text-3xl lg:text-4xl font-light text-white leading-relaxed">
                Diseñamos prendas que generan pertenencia
              </blockquote>
              <p className="font-moderat text-white/70 text-xs tracking-[0.2em] uppercase">
                Desde 2017 • 8 Años de Experiencia
              </p>
            </div>
          </FadeIn>
        </div>
      </section>


      {/* PRODUCTOS - Grid Editorial */}
      <section id="productos" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#620c0b] text-xs tracking-[0.3em] uppercase font-medium mb-3">
              Catálogo Corporativo
            </p>
            <h2 className="font-belleza text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide text-gray-900 mb-4">
              Elige tu Prenda
            </h2>
            <p className="font-moderat text-lg text-gray-600 max-w-2xl mx-auto">
              Mínimos accesibles desde 30 unidades
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productos.map((producto, index) => (
              <div key={index} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-4">
                  <Image
                    src={producto.imagen}
                    alt={producto.titulo}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-[#620c0b] text-xs tracking-[0.2em] uppercase font-medium">
                    {producto.categoria}
                  </p>
                  <h3 className="font-belleza text-xl font-light text-gray-900">
                    {producto.titulo}
                  </h3>
                  <p className="font-moderat text-gray-600 text-sm leading-relaxed">
                    {producto.descripcion}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-moderat text-xs text-[#620c0b] bg-[#f8f7f4] px-3 py-2">
                      Desde {producto.minimo}
                    </span>
                    <span className="font-moderat text-xs text-gray-500">
                      {producto.colores}+ colores
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Nota sobre cinturones */}
          <div className="mt-12 bg-[#364e41] rounded-none p-6 text-center">
            <p className="font-moderat text-white text-sm leading-relaxed">
              <strong className="font-medium">Cinturones elásticos:</strong> Mínimo 100 unidades. Hebilla exclusiva Juan Becerra perfecta para looks casuales y elegantes.
            </p>
          </div>
        </div>
      </section>

      {/* POR QUÉ ELEGIRNOS - Split Editorial */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        {/* Contenido */}
        <div className="bg-white flex items-center justify-center p-8 sm:p-12 lg:p-16 xl:p-24 order-2 lg:order-1">
          <div className="max-w-lg space-y-5">
            <p className="text-[#620c0b] text-xs tracking-[0.3em] uppercase font-medium">
              Nuestra Diferencia
            </p>

            <h2 className="font-belleza text-2xl sm:text-3xl lg:text-4xl font-light tracking-wide text-gray-900 leading-tight">
              Por qué elegir Juan Becerra
            </h2>

            <div className="space-y-4 pt-2">
              {beneficios.map((beneficio, index) => (
                <div key={index}>
                  <h3 className="font-moderat text-sm font-semibold text-gray-900 mb-1">
                    {beneficio.titulo}
                  </h3>
                  <p className="font-moderat text-gray-600 text-xs leading-relaxed">
                    {beneficio.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Imagen */}
        <div className="relative h-[50vh] lg:h-[600px] order-1 lg:order-2">
          <Image
            src="/servicios/p25_242.png"
            alt="Productos personalizados Juan Becerra"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* PROCESO */}
      <section className="bg-[#f8f7f4] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#620c0b] text-xs tracking-[0.3em] uppercase font-medium mb-3">
              Acompañamiento
            </p>
            <h2 className="font-belleza text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide text-gray-900">
              Nuestro Proceso
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { paso: '01', titulo: 'Consultoría', desc: 'Entendemos tu marca y necesidades' },
              { paso: '02', titulo: 'Diseño', desc: 'Validamos muestra antes de producción' },
              { paso: '03', titulo: 'Producción', desc: 'Confección con estándares de calidad' },
              { paso: '04', titulo: 'Entrega', desc: 'En tiempos acordados' },
              { paso: '05', titulo: 'Seguimiento', desc: 'Acompañamiento post-venta continuo' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="font-belleza text-5xl font-light text-[#620c0b]/20 mb-3">
                  {item.paso}
                </div>
                <h3 className="font-moderat text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                  {item.titulo}
                </h3>
                <p className="font-moderat text-gray-600 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULARIO DE CONTACTO */}
      <FormularioContactoB2B />

      {/* WIDGET DE CALENDLY */}
      <section id="calendly" className="bg-[#364e41] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-belleza text-2xl sm:text-3xl lg:text-4xl font-light tracking-wide text-white mb-4">
            ¿Prefieres agendar una llamada?
          </h2>
          <p className="font-moderat text-lg text-white/80 leading-relaxed mb-8">
            Reserva un espacio en nuestro calendario y recibe asesoría personalizada
          </p>

          {/* Widget de Calendly */}
          <CalendlyWidget />
        </div>
      </section>

      {/* DESCARGA CATÁLOGO */}
      <section className="bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-belleza text-xl sm:text-2xl font-light text-white mb-3">
            Descarga nuestro catálogo completo
          </h2>
          <p className="font-moderat text-gray-400 mb-6 text-sm">
            Revisa todos nuestros productos, medidas y colores disponibles
          </p>
          <a
            href="/catalogo.pdf"
            download
            className="inline-flex items-center gap-3 bg-[#620c0b] px-6 py-3 text-white font-moderat text-xs tracking-[0.15em] uppercase font-medium hover:bg-[#4a0908] transition-all duration-300"
          >
            Descargar Catálogo PDF
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      </section>

      <FooterCustom />
    </main>
  );
}
