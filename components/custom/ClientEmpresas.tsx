'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDownIcon, ChevronUpIcon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Empresa {
  id: number;
  logo: string;
  nombre: string;
  trabajos: string[];
}

interface ClientEmpresasProps {
  empresas: Empresa[];
}

export function ClientEmpresas({ empresas }: ClientEmpresasProps) {
  const [empresaAbierta, setEmpresaAbierta] = useState<number | null>(null);
  const [imagenSeleccionada, setImagenSeleccionada] = useState<{ empresa: string; imagenes: string[]; indice: number } | null>(null);

  const toggleEmpresa = (id: number) => {
    setEmpresaAbierta(empresaAbierta === id ? null : id);
  };

  const abrirLightbox = (nombreEmpresa: string, imagenes: string[], indice: number) => {
    setImagenSeleccionada({ empresa: nombreEmpresa, imagenes, indice });
  };

  const cerrarLightbox = () => {
    setImagenSeleccionada(null);
  };

  const imagenAnterior = () => {
    if (!imagenSeleccionada) return;
    const nuevoIndice = imagenSeleccionada.indice === 0
      ? imagenSeleccionada.imagenes.length - 1
      : imagenSeleccionada.indice - 1;
    setImagenSeleccionada({ ...imagenSeleccionada, indice: nuevoIndice });
  };

  const imagenSiguiente = () => {
    if (!imagenSeleccionada) return;
    const nuevoIndice = imagenSeleccionada.indice === imagenSeleccionada.imagenes.length - 1
      ? 0
      : imagenSeleccionada.indice + 1;
    setImagenSeleccionada({ ...imagenSeleccionada, indice: nuevoIndice });
  };

  // Cerrar con teclas Escape y flechas
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        cerrarLightbox();
      } else if (imagenSeleccionada) {
        if (e.key === 'ArrowLeft') {
          const nuevoIndice = imagenSeleccionada.indice === 0
            ? imagenSeleccionada.imagenes.length - 1
            : imagenSeleccionada.indice - 1;
          setImagenSeleccionada({ ...imagenSeleccionada, indice: nuevoIndice });
        } else if (e.key === 'ArrowRight') {
          const nuevoIndice = imagenSeleccionada.indice === imagenSeleccionada.imagenes.length - 1
            ? 0
            : imagenSeleccionada.indice + 1;
          setImagenSeleccionada({ ...imagenSeleccionada, indice: nuevoIndice });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [imagenSeleccionada]);

  return (
    <>
      <section className="py-16 lg:py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-300 text-sm tracking-[0.2em] uppercase font-medium mb-4">
            Empresas que confían en nosotros
          </p>
          <p className="text-center text-gray-400 text-xs mb-12">
            Haz clic en un logo para ver los trabajos realizados
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {empresas.map((empresa) => (
              <div key={empresa.id} className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300">
                {/* Logo con click */}
                <button
                  onClick={() => toggleEmpresa(empresa.id)}
                  className="w-full p-8 flex flex-col items-center gap-4 cursor-pointer group"
                >
                  <div className="w-full h-20 relative flex items-center justify-center">
                    <Image
                      src={empresa.logo}
                      alt={`Logo ${empresa.nombre}`}
                      width={200}
                      height={100}
                      className="max-h-20 w-auto object-contain"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-white/70 text-sm font-moderat">
                    <span>{empresa.nombre}</span>
                    {empresaAbierta === empresa.id ? (
                      <ChevronUpIcon className="h-4 w-4" />
                    ) : (
                      <ChevronDownIcon className="h-4 w-4" />
                    )}
                  </div>

                  {empresa.trabajos.length > 0 && (
                    <span className="text-xs text-[#620c0b] bg-white/10 px-3 py-1 rounded-full">
                      {empresa.trabajos.length} {empresa.trabajos.length === 1 ? 'trabajo' : 'trabajos'}
                    </span>
                  )}
                </button>

                {/* Galería de trabajos (se expande al hacer clic) */}
                {empresaAbierta === empresa.id && (
                  <div className="border-t border-white/10 p-4 bg-black/40">
                    {empresa.trabajos.length > 0 ? (
                      <div className="grid grid-cols-2 gap-3">
                        {empresa.trabajos.map((trabajo, index) => (
                          <button
                            key={index}
                            onClick={() => abrirLightbox(empresa.nombre, empresa.trabajos, index)}
                            className="relative aspect-[3/4] bg-gray-800 rounded-lg overflow-hidden group cursor-pointer"
                          >
                            <Image
                              src={trabajo}
                              alt={`Trabajo ${index + 1} para ${empresa.nombre}`}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                              <span className="opacity-0 group-hover:opacity-100 text-white text-xs bg-black/50 px-3 py-1 rounded-full transition-opacity duration-300">
                                Ver
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-500 text-xs py-6">
                        Próximamente imágenes de trabajos
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {imagenSeleccionada && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={cerrarLightbox}
        >
          <button
            onClick={cerrarLightbox}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Cerrar"
          >
            <XMarkIcon className="h-8 w-8" />
          </button>

          <div
            className="relative w-full max-w-4xl max-h-[80vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón anterior */}
            {imagenSeleccionada.imagenes.length > 1 && (
              <button
                onClick={imagenAnterior}
                className="absolute left-0 md:-left-12 text-white/70 hover:text-white transition-colors z-10 p-2"
                aria-label="Imagen anterior"
              >
                <ChevronLeftIcon className="h-10 w-10" />
              </button>
            )}

            {/* Imagen actual */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={imagenSeleccionada.imagenes[imagenSeleccionada.indice]}
                alt={`Trabajo ${imagenSeleccionada.indice + 1} de ${imagenSeleccionada.empresa}`}
                width={1200}
                height={900}
                className="object-contain max-h-[80vh] w-auto"
              />
            </div>

            {/* Botón siguiente */}
            {imagenSeleccionada.imagenes.length > 1 && (
              <button
                onClick={imagenSiguiente}
                className="absolute right-0 md:-right-12 text-white/70 hover:text-white transition-colors z-10 p-2"
                aria-label="Imagen siguiente"
              >
                <ChevronRightIcon className="h-10 w-10" />
              </button>
            )}

            {/* Contador */}
            {imagenSeleccionada.imagenes.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm bg-black/50 px-4 py-2 rounded-full">
                {imagenSeleccionada.indice + 1} / {imagenSeleccionada.imagenes.length}
              </div>
            )}

            {/* Nombre de empresa */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-sm font-moderat tracking-wide bg-black/50 px-4 py-2 rounded-full">
              {imagenSeleccionada.empresa}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
