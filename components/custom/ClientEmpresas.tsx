'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

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

  const toggleEmpresa = (id: number) => {
    setEmpresaAbierta(empresaAbierta === id ? null : id);
  };

  return (
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
                className="w-full p-6 flex flex-col items-center gap-4 cursor-pointer group"
              >
                <div className="w-full h-20 relative flex items-center justify-center">
                  <Image
                    src={empresa.logo}
                    alt={`Logo ${empresa.nombre}`}
                    width={200}
                    height={100}
                    className="max-h-16 w-auto object-contain filter brightness-0 invert group-hover:filter-none transition-all duration-300"
                  />
                </div>

                <div className="flex items-center gap-2 text-white/70 text-xs">
                  <span>{empresa.nombre}</span>
                  {empresaAbierta === empresa.id ? (
                    <ChevronUpIcon className="h-4 w-4" />
                  ) : (
                    <ChevronDownIcon className="h-4 w-4" />
                  )}
                </div>
              </button>

              {/* Galería de trabajos (se expande al hacer clic) */}
              {empresaAbierta === empresa.id && (
                <div className="border-t border-white/10 p-4 bg-black/30 animate-in slide-down-from-top-2 duration-300">
                  {empresa.trabajos.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {empresa.trabajos.map((trabajo, index) => (
                        <div key={index} className="relative aspect-square bg-gray-800 rounded overflow-hidden">
                          <Image
                            src={trabajo}
                            alt={`Trabajo ${index + 1} para ${empresa.nombre}`}
                            fill
                            className="object-cover hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 text-xs py-4">
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
  );
}
