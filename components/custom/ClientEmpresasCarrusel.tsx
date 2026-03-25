'use client';
import Image from 'next/image';

interface Empresa {
  id: number;
  logo: string;
  nombre: string;
  trabajos?: string[];
}

interface ClientEmpresasCarruselProps {
  empresas: Empresa[];
}

export function ClientEmpresasCarrusel({ empresas }: ClientEmpresasCarruselProps) {
  return (
    <div className="bg-[#f8f7f4] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-belleza text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide mb-12 lg:mb-16 leading-tight text-gray-900">
            Nuestros Clientes
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 items-center justify-items-center">
            {empresas.map((empresa) => (
              <div
                key={empresa.id}
                className="group relative w-full max-w-[140px] sm:max-w-[160px] aspect-square flex items-center justify-center bg-white/50 hover:bg-white rounded-lg p-6 transition-all duration-300"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={empresa.logo}
                    alt={`Logo ${empresa.nombre}`}
                    width={160}
                    height={160}
                    className="max-h-20 w-auto object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
