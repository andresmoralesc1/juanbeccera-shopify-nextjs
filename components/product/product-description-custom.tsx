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
        className="w-full flex items-center justify-between py-5 text-left transition-colors hover:text-[#620c0b] group"
      >
        <span className="font-moderat text-sm uppercase tracking-wider font-medium text-gray-900 group-hover:text-[#620c0b] transition-colors">
          {title}
        </span>
        <span className={`text-gray-400 text-xl font-light transition-all duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pb-6 text-gray-600 leading-relaxed text-sm animate-fadeIn">
          {content}
        </div>
      </div>
    </div>
  );
}

export function ProductDescriptionCustom({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const MAX_QUANTITY = 99; // Límite máximo de cantidad

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
    <div className="flex flex-col h-full">
      {/* Título - Estilo Versace */}
      <h1 className="font-belleza text-2xl sm:text-3xl font-light tracking-wide mb-4 text-gray-900 uppercase">
        {product.title}
      </h1>

      {/* Precio - Prominente */}
      <div className="mb-8">
        <span className="font-moderat text-xl font-semibold text-gray-900">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </span>
      </div>

      {/* Selector de Variantes (Tallas, Colores, etc.) */}
      <div className="mb-6">
        <VariantSelector options={product.options} variants={product.variants} />
      </div>

      {/* Selector de Cantidad - Minimalista */}
      <div className="mb-6">
        <label className="block font-moderat text-xs uppercase tracking-wider font-medium text-gray-700 mb-3">
          Cantidad
        </label>
        <div className="inline-flex items-center border border-gray-300">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Disminuir cantidad"
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-6 py-3 text-center min-w-[60px] font-medium text-gray-900">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(Math.min(MAX_QUANTITY, quantity + 1))}
            className="px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Aumentar cantidad"
            disabled={quantity >= MAX_QUANTITY}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        {quantity >= MAX_QUANTITY && (
          <p className="text-xs text-gray-500 mt-2">
            Cantidad máxima alcanzada
          </p>
        )}
      </div>

      {/* Botón Add to Cart - Grande y prominente estilo Versace con color Juan Becerra */}
      <div className="mb-8">
        <AddToCartCustom product={product} quantity={quantity} />
      </div>

      {/* Acordeón de Detalles - Estilo Versace minimalista */}
      <div className="border-t border-gray-200">
        {productDetails.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            content={item.content}
            isOpen={openAccordion === index}
            onClick={() => handleAccordionClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
