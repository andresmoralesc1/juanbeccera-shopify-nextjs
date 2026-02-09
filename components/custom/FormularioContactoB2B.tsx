'use client';

import { useState } from 'react';
import { EnvelopeIcon, PhoneIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface FormData {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  prenda: string;
  cantidad: string;
  plazo: string;
  mensaje: string;
}

export function FormularioContactoB2B() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    prenda: '',
    cantidad: '',
    plazo: '',
    mensaje: '',
  });

  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    // Simular envío (aquí iría la lógica real de envío)
    setTimeout(() => {
      setEnviando(false);
      setEnviado(true);
    }, 1500);
  };

  if (enviado) {
    return (
      <section className="bg-[#364e41] py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 rounded-none p-8 sm:p-12">
            <CheckCircleIcon className="h-16 w-16 text-white mx-auto mb-6" />
            <h2 className="font-belleza text-2xl sm:text-3xl lg:text-4xl font-light tracking-wide text-white mb-4">
              ¡Mensaje Enviado!
            </h2>
            <p className="font-moderat text-white/80 mb-8 leading-relaxed">
              Gracias por tu interés. Nos pondremos en contacto contigo en menos de 24 horas hábiles.
            </p>
            <button
              onClick={() => {
                setEnviado(false);
                setFormData({
                  nombre: '',
                  empresa: '',
                  email: '',
                  telefono: '',
                  prenda: '',
                  cantidad: '',
                  plazo: '',
                  mensaje: '',
                });
              }}
              className="inline-flex items-center gap-2 bg-white px-6 py-3 text-[#364e41] font-moderat text-xs tracking-[0.15em] uppercase font-medium hover:bg-gray-100 transition-all duration-300"
            >
              Enviar otro mensaje
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="bg-[#364e41] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-belleza text-2xl sm:text-3xl lg:text-4xl font-light tracking-wide text-white mb-4">
            ¿Listo para elevar la imagen de tu empresa?
          </h2>
          <p className="font-moderat text-lg text-white/80 leading-relaxed">
            Completa el formulario y recibe asesoría personalizada
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Info de contacto */}
          <div className="lg:col-span-1 space-y-4">
            <a
              href="mailto:contacto@juanbecerra.co"
              className="flex items-center gap-3 bg-white/10 px-4 py-3 hover:bg-white/20 transition-colors"
            >
              <EnvelopeIcon className="h-5 w-5 text-white flex-shrink-0" />
              <span className="font-moderat text-white text-sm">contacto@juanbecerra.co</span>
            </a>
            <a
              href="tel:3172727916"
              className="flex items-center gap-3 bg-white/10 px-4 py-3 hover:bg-white/20 transition-colors"
            >
              <PhoneIcon className="h-5 w-5 text-white flex-shrink-0" />
              <span className="font-moderat text-white text-sm">317 272 7916</span>
            </a>

            <div className="bg-white/10 rounded-none p-4 mt-6">
              <h3 className="font-moderat font-semibold mb-3 text-white text-xs uppercase tracking-wide">
                Respuesta en:
              </h3>
              <p className="font-moderat text-white/90 text-sm leading-relaxed">
                Menos de 24 horas hábiles
              </p>
            </div>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nombre" className="block font-moderat text-white text-xs uppercase tracking-wide mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 font-moderat text-sm focus:outline-none focus:border-white/50 transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label htmlFor="empresa" className="block font-moderat text-white text-xs uppercase tracking-wide mb-2">
                    Empresa *
                  </label>
                  <input
                    type="text"
                    id="empresa"
                    name="empresa"
                    required
                    value={formData.empresa}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 font-moderat text-sm focus:outline-none focus:border-white/50 transition-colors"
                    placeholder="Nombre de tu empresa"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block font-moderat text-white text-xs uppercase tracking-wide mb-2">
                    Email corporativo *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 font-moderat text-sm focus:outline-none focus:border-white/50 transition-colors"
                    placeholder="email@empresa.com"
                  />
                </div>

                <div>
                  <label htmlFor="telefono" className="block font-moderat text-white text-xs uppercase tracking-wide mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    required
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 font-moderat text-sm focus:outline-none focus:border-white/50 transition-colors"
                    placeholder="300 000 0000"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="prenda" className="block font-moderat text-white text-xs uppercase tracking-wide mb-2">
                    Prenda de interés *
                  </label>
                  <select
                    id="prenda"
                    name="prenda"
                    required
                    value={formData.prenda}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white font-moderat text-sm focus:outline-none focus:border-white/50 transition-colors"
                  >
                    <option value="" className="bg-gray-800">Selecciona...</option>
                    <option value="camisetas" className="bg-gray-800">Camisetas y Polos</option>
                    <option value="sacos" className="bg-gray-800">Sacos Unisex</option>
                    <option value="hoodies" className="bg-gray-800">Hoodies</option>
                    <option value="chaquetas" className="bg-gray-800">Chalecos y Chaquetas</option>
                    <option value="camisas" className="bg-gray-800">Camisas Formales</option>
                    <option value="gorras" className="bg-gray-800">Gorras y Viseras</option>
                    <option value="cinturones" className="bg-gray-800">Cinturones Elásticos</option>
                    <option value="varios" className="bg-gray-800">Varios productos</option>
                    <option value="otro" className="bg-gray-800">Otro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="cantidad" className="block font-moderat text-white text-xs uppercase tracking-wide mb-2">
                    Cantidad estimada *
                  </label>
                  <select
                    id="cantidad"
                    name="cantidad"
                    required
                    value={formData.cantidad}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white font-moderat text-sm focus:outline-none focus:border-white/50 transition-colors"
                  >
                    <option value="" className="bg-gray-800">Selecciona...</option>
                    <option value="20-50" className="bg-gray-800">20 - 50 unidades</option>
                    <option value="51-100" className="bg-gray-800">51 - 100 unidades</option>
                    <option value="101-200" className="bg-gray-800">101 - 200 unidades</option>
                    <option value="201-500" className="bg-gray-800">201 - 500 unidades</option>
                    <option value="500+" className="bg-gray-800">Más de 500 unidades</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="plazo" className="block font-moderat text-white text-xs uppercase tracking-wide mb-2">
                  Plazo requerido *
                </label>
                <select
                  id="plazo"
                  name="plazo"
                  required
                  value={formData.plazo}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white font-moderat text-sm focus:outline-none focus:border-white/50 transition-colors"
                >
                  <option value="" className="bg-gray-800">Selecciona...</option>
                  <option value="urgente" className="bg-gray-800">Urgente (menos de 2 semanas)</option>
                  <option value="2-4 semanas" className="bg-gray-800">2 - 4 semanas</option>
                  <option value="1-2 meses" className="bg-gray-800">1 - 2 meses</option>
                  <option value="flexible" className="bg-gray-800">Flexible</option>
                </select>
              </div>

              <div>
                <label htmlFor="mensaje" className="block font-moderat text-white text-xs uppercase tracking-wide mb-2">
                  Detalles adicionales
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  value={formData.mensaje}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 font-moderat text-sm focus:outline-none focus:border-white/50 transition-colors resize-none"
                  placeholder="Cuéntanos más sobre tu proyecto: técnica de personalización, colores específicos, logo, etc."
                />
              </div>

              <button
                type="submit"
                disabled={enviando}
                className="w-full bg-white text-[#364e41] px-6 py-4 font-moderat text-sm tracking-[0.15em] uppercase font-semibold hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {enviando ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar Solicitud
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
