import { Metadata } from 'next';
import Image from 'next/image';
import { FadeIn } from '@/components/ui/fade-in';
import FooterCustom from '@/components/custom/FooterCustom';
import { ClientEmpresasCarrusel } from '@/components/custom/ClientEmpresasCarrusel';
import { FormularioContactoB2B } from '@/components/custom/FormularioContactoB2B';
import { CalendlyWidget } from '@/components/custom/CalendlyWidget';

export const metadata: Metadata = {
  title: 'Prendas Deportivas Personalizadas | Running Juan Becerra',
  description: 'Prendas deportivas de alta calidad para running, atletismo y actividad física. 100% Colombianas con personalización DTF, Serigrafía, Bordado y Vinilo textil.',
  openGraph: {
    title: 'Prendas Deportivas Personalizadas | Running Juan Becerra',
    description: 'Uniformes deportivos personalizados con tecnología transpirable y diseños únicos.',
    url: '/running-juan-becerra',
  },
};

const productos = [
  {
    categoria: 'CAMISETAS',
    titulo: 'Camisetas Deportivas',
    descripcion: '100% poliéster transpirable con tecnología dry-fit. Ideales para running, atletismo y actividades físicas intensas.',
    minimo: '50 unidades',
    imagen: '/servicios/p3_11.png',
    colores: 8,
  },
  {
    categoria: 'SACOS',
    titulo: 'Sacos Running',
    descripcion: 'Diseño ligero y respirable para entrenamientos y competencias. Perfectos para usar antes y después de correr.',
    minimo: '30 unidades',
    imagen: '/servicios/p4_20.png',
    colores: 6,
  },
  {
    categoria: 'HOODIES',
    titulo: 'Hoodies Deportivos',
    descripcion: 'Combinan suavidad con tejido técnico para mantenerte cómodo durante el calentamiento y recuperación.',
    minimo: '30 unidades',
    imagen: '/servicios/p5_34.png',
    colores: 8,
  },
  {
    categoria: 'CHAQUETAS',
    titulo: 'Chalecos y Chaquetas',
    descripcion: 'Protección contra el vío con materiales ligeros y transpirables. Perfectos para running en condiciones variables.',
    minimo: '30 unidades',
    imagen: '/servicios/p6_68.png',
    colores: 5,
  },
  {
    categoria: 'LEGGINGS',
    titulo: 'Leggings y Pants',
    descripcion: 'Tejido técnico con compresión y soporte. Diseñados para máxima comodidad y rendimiento durante la carrera.',
    minimo: '30 unidades',
    imagen: '/servicios/p9_110.png',
    colores: 6,
  },
  {
    categoria: 'ACCESORIOS',
    titulo: 'Gorras y Viseras',
    descripcion: 'Protección solar con materiales transpirables. Diseño ergonómico que no molesta durante la actividad física.',
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
];

const beneficios = [
  {
    titulo: 'Tejidos Técnicos Deportivos',
    descripcion: 'Materiales transpirables, secado rápido y ligeros para máximo rendimiento',
  },
  {
    titulo: 'Personalización en Alto Relieve',
    descripcion: 'DTF, Serigrafía y Bordado con diseños que resisten el lavado intensivo',
  },
  {
    titulo: 'Tallas Deportivas Perfectas',
    descripcion: 'Fit ergonómico diseñado para movimiento sin restricciones',
  },
  {
    titulo: 'Colores de Alta Visibilidad',
    descripcion: 'Opciones neón y reflectantes para running seguro en cualquier condición',
  },
  {
    titulo: 'Mínimos Accesibles',
    descripcion: 'Desde 30 unidades por referencia, ideal para equipos y clubes',
  },
  {
    titulo: 'Entregas para Eventos',
    descripcion: 'Tiempos de producción optimizados para competencias y carreras',
  },
];

export default function RunningJuanBecerraPage() {
  return (
    <main>
      {/* HERO PRINCIPAL - Split Editorial */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        {/* Imagen */}
        <div className="relative h-[50vh] lg:h-[600px] order-2 lg:order-1">
          <Image
            src="/servicios/desing.jpg"
            alt="Prendas running personalizadas Juan Becerra"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Contenido */}
        <div className="flex items-center justify-center p-8 sm:p-12 lg:p-16 xl:p-24 order-1 lg:order-2" style={{ backgroundColor: '#ffffff' }}>
          <FadeIn delay={0.2} direction="right">
            <div className="max-w-xl space-y-6">
              <p className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: '#1f2c8c' }}>
                Para Deportistas
              </p>

              <h1 className="font-belleza text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide leading-tight" style={{ color: '#131859' }}>
                Prendas Running Personalizadas
              </h1>

              <p className="font-moderat text-base leading-relaxed font-light" style={{ color: '#345644' }}>
                Desde 30 unidades, viste a tu equipo o club con prendas técnicas de alto rendimiento.
              </p>

              <p className="font-moderat text-sm" style={{ color: '#345644' }}>
                Rendimiento y estilo en cada kilómetro.
              </p>

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href="#contacto"
                  className="group inline-flex items-center gap-3 text-white text-sm tracking-[0.15em] uppercase font-semibold px-6 py-3 transition-all duration-300 hover:opacity-90"
                  style={{ backgroundColor: '#eb2e11' }}
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
                  className="group inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase font-light border-b-2 pb-2 transition-all duration-300 hover:border-[#1f2c8c]"
                  style={{ color: '#131859', borderColor: '#1f2c8c50' }}
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
      <section className="py-16 lg:py-20" style={{ backgroundColor: '#345644' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-12 text-center">
          <FadeIn delay={0.3} direction="none">
            <div className="space-y-6">
              <svg className="w-12 h-12 mx-auto text-white/20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
              <blockquote className="font-belleza text-2xl sm:text-3xl lg:text-4xl font-light text-white leading-relaxed">
                Rendimiento que inspira belonged
              </blockquote>
              <p className="font-moderat text-white/70 text-xs tracking-[0.2em] uppercase">
                Prendas técnicas para superar límites
              </p>
            </div>
          </FadeIn>
        </div>
      </section>


      {/* PRODUCTOS - Grid Editorial */}
      <section id="productos" className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase font-medium mb-3" style={{ color: '#eb2e11' }}>
              Colección Running
            </p>
            <h2 className="font-belleza text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide mb-4" style={{ color: '#131859' }}>
              Elige tu Prenda Deportiva
            </h2>
            <p className="font-moderat text-lg max-w-2xl mx-auto" style={{ color: '#345644' }}>
              Mínimos accesibles desde 30 unidades
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productos.map((producto, index) => (
              <div key={index} className="group">
                <div className="relative aspect-[4/5] overflow-hidden mb-4" style={{ backgroundColor: '#f8f7f4' }}>
                  <Image
                    src={producto.imagen}
                    alt={producto.titulo}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: '#eb2e11' }}>
                    {producto.categoria}
                  </p>
                  <h3 className="font-belleza text-xl font-light" style={{ color: '#131859' }}>
                    {producto.titulo}
                  </h3>
                  <p className="font-moderat text-sm leading-relaxed" style={{ color: '#345644' }}>
                    {producto.descripcion}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-moderat text-xs px-3 py-2" style={{ color: '#eb2e11', backgroundColor: '#f8f7f4' }}>
                      Desde {producto.minimo}
                    </span>
                    <span className="font-moderat text-xs" style={{ color: '#34564480' }}>
                      {producto.colores}+ colores
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Nota sobre tecnologías */}
          <div className="mt-12 p-6 text-center" style={{ backgroundColor: '#131859' }}>
            <p className="font-moderat text-white text-sm leading-relaxed">
              <strong className="font-medium">Tecnología deportiva:</strong> Dry-fit, protecci1n UV, tejidos transpirables y dise1os reflectantes disponibles.
            </p>
          </div>
        </div>
      </section>

      {/* POR QUÉ ELEGIRNOS - Split Editorial */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        {/* Contenido */}
        <div className="flex items-center justify-center p-8 sm:p-12 lg:p-16 xl:p-24 order-2 lg:order-1" style={{ backgroundColor: '#ffffff' }}>
          <div className="max-w-lg space-y-5">
            <p className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: '#1f2c8c' }}>
              Nuestra Diferencia
            </p>

            <h2 className="font-belleza text-2xl sm:text-3xl lg:text-4xl font-light tracking-wide leading-tight" style={{ color: '#131859' }}>
              Por qué elegir Juan Becerra Running
            </h2>

            <div className="space-y-4 pt-2">
              {beneficios.map((beneficio, index) => (
                <div key={index}>
                  <h3 className="font-moderat text-sm font-semibold mb-1" style={{ color: '#131859' }}>
                    {beneficio.titulo}
                  </h3>
                  <p className="font-moderat text-xs leading-relaxed" style={{ color: '#345644' }}>
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
            alt="Productos running personalizados Juan Becerra"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* PROCESO */}
      <section className="py-16" style={{ backgroundColor: '#f8f7f4' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase font-medium mb-3" style={{ color: '#1f2c8c' }}>
              Acompa1amiento
            </p>
            <h2 className="font-belleza text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide" style={{ color: '#131859' }}>
              Nuestro Proceso
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { paso: '01', titulo: 'Consultor1a', desc: 'Entendemos tu disciplina y necesidades' },
              { paso: '02', titulo: 'Dise1o', desc: 'Validamos muestra antes de producci1n' },
              { paso: '03', titulo: 'Producci1n', desc: 'Confecci1n con tejidos tcnicos' },
              { paso: '04', titulo: 'Entrega', desc: 'En tiempos para tu evento' },
              { paso: '05', titulo: 'Seguimiento', desc: 'Acompa1amiento post-venta continuo' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="font-belleza text-5xl font-light mb-3" style={{ color: '#1f2c8c20' }}>
                  {item.paso}
                </div>
                <h3 className="font-moderat text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: '#131859' }}>
                  {item.titulo}
                </h3>
                <p className="font-moderat text-xs leading-relaxed" style={{ color: '#345644' }}>
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
      <section id="calendly" className="py-16" style={{ backgroundColor: '#345644' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-belleza text-2xl sm:text-3xl lg:text-4xl font-light tracking-wide text-white mb-4">
            19Prefieres agendar una llamada?
          </h2>
          <p className="font-moderat text-lg leading-relaxed mb-8" style={{ color: '#ffffff80' }}>
            Reserva un espacio en nuestro calendario y recibe asesor1a personalizada
          </p>

          {/* Widget de Calendly */}
          <CalendlyWidget />
        </div>
      </section>

      {/* DESCARGA CAT1LOGO */}
      <section className="py-12" style={{ backgroundColor: '#131859' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-belleza text-xl sm:text-2xl font-light text-white mb-3">
            Descarga nuestro cat1logo completo
          </h2>
          <p className="font-moderat mb-6 text-sm" style={{ color: '#ffffff60' }}>
            Revisa todos nuestros productos, medidas y colores disponibles
          </p>
          <a
            href="/catalogo.pdf"
            download
            className="inline-flex items-center gap-3 px-6 py-3 text-white font-moderat text-xs tracking-[0.15em] uppercase font-medium transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: '#eb2e11' }}
          >
            Descargar Cat1logo PDF
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
