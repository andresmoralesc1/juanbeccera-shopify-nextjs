'use client';

import { useState } from 'react';
import { AddToCartCustom } from 'components/cart/add-to-cart-custom';
import Price from 'components/price';
import { Product } from 'lib/shopify/types';
import { VariantSelector } from './variant-selector';
import { Minus, Plus, ShoppingBag, ChevronDown, ChevronUp, Truck, RefreshCcw, Shield } from 'lucide-react';
import Link from 'next/link';

interface AccordionItemProps {
  title: string;
  content: string | React.ReactNode;
  icon?: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

function AccordionItem({ title, content, icon, isOpen, onClick }: AccordionItemProps) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 text-left hover:bg-gray-50 transition-colors px-4"
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-gray-600">{icon}</span>}
          <span className="font-moderat text-base font-medium text-gray-900">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-6">
          <div className="text-gray-600 leading-relaxed text-sm">
            {content}
          </div>
        </div>
      )}
    </div>
  );
}

export function ProductDescriptionCustom({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const handleAccordionClick = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  // Preparar detalles del producto para el acordeón
  const productDetails = [
    {
      title: 'Descripción',
      icon: <Shield className="h-5 w-5" />,
      content: product.description || 'Producto de alta calidad artesanalmente elaborado con los mejores materiales.'
    },
    {
      title: 'Envío y Entrega',
      icon: <Truck className="h-5 w-5" />,
      content: (
        <ul className="space-y-2">
          <li>• Envío gratis en compras superiores a $150.000 COP</li>
          <li>• Entrega en 3-5 días hábiles en Bogotá</li>
          <li>• Entrega en 5-7 días hábiles en el resto del país</li>
          <li>• Seguimiento en tiempo real de tu pedido</li>
        </ul>
      )
    },
    {
      title: 'Devoluciones y Cambios',
      icon: <RefreshCcw className="h-5 w-5" />,
      content: (
        <ul className="space-y-2">
          <li>• 30 días para devoluciones y cambios</li>
          <li>• Producto debe estar sin usar con etiquetas originales</li>
          <li>• Proceso de devolución gratuito</li>
          <li>• Reembolso en 5-10 días hábiles</li>
        </ul>
      )
    }
  ];

  return (
    <>
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol role="list" className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-[#620c0b] transition-colors">
              Inicio
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <Link href="/search" className="hover:text-[#620c0b] transition-colors">
              Productos
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-900 font-medium">{product.title}</li>
        </ol>
      </nav>

      {/* Título y Precio */}
      <div className="mb-8">
        <h1 className="font-belleza text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide mb-4 text-gray-900">
          {product.title}
        </h1>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-medium text-[#620c0b]">
            <Price
              amount={product.priceRange.maxVariantPrice.amount}
              currencyCode={product.priceRange.maxVariantPrice.currencyCode}
            />
          </span>
        </div>
      </div>

      {/* Selector de Variantes (Tallas, Colores, etc.) */}
      <div className="mb-8">
        <VariantSelector options={product.options} variants={product.variants} />
      </div>

      {/* Selector de Cantidad y Botón de Añadir */}
      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cantidad
          </label>
          <div className="inline-flex items-center border border-gray-300 rounded">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Disminuir cantidad"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-6 py-3 text-center min-w-[60px] font-medium">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Aumentar cantidad"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Botón Añadir al Carrito Personalizado */}
        <AddToCartCustom product={product} quantity={quantity} />
      </div>

      {/* Acordeón de Detalles */}
      <div className="mt-10 border-t border-gray-200">
        {productDetails.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            content={item.content}
            icon={item.icon}
            isOpen={openAccordion === index}
            onClick={() => handleAccordionClick(index)}
          />
        ))}
      </div>

      {/* Información adicional */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Compra 100% segura y protegida
        </p>
      </div>
    </>
  );
}
