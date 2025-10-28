'use client';

import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import { useProduct } from 'components/product/product-context';
import { Product, ProductVariant } from 'lib/shopify/types';
import { useActionState } from 'react';
import { useCart } from './cart-context';
import { ShoppingBag } from 'lucide-react';

function SubmitButton({
  availableForSale,
  selectedVariantId,
  quantity
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  quantity: number;
}) {
  const baseClasses =
    'font-moderat w-full flex items-center justify-center gap-3 px-8 py-4 text-sm tracking-[0.15em] uppercase font-medium transition-all duration-300';

  const enabledClasses = 'bg-[#620c0b] text-white hover:bg-[#4a0908]';
  const disabledClasses = 'bg-gray-300 text-gray-500 cursor-not-allowed';

  if (!availableForSale) {
    return (
      <button
        disabled
        className={clsx(baseClasses, disabledClasses)}
      >
        <ShoppingBag className="h-5 w-5" />
        Agotado
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Selecciona una opción"
        disabled
        className={clsx(baseClasses, disabledClasses)}
      >
        <ShoppingBag className="h-5 w-5" />
        Selecciona una Opción
      </button>
    );
  }

  return (
    <button
      aria-label="Añadir al carrito"
      className={clsx(baseClasses, enabledClasses)}
    >
      <ShoppingBag className="h-5 w-5" />
      Añadir al Carrito
    </button>
  );
}

export function AddToCartCustom({
  product,
  quantity = 1
}: {
  product: Product;
  quantity?: number;
}) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const { state } = useProduct();
  const [message, formAction] = useActionState(addItem, null);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()]
    )
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const addItemAction = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId
  )!;

  return (
    <form
      action={async () => {
        // Añadir la cantidad especificada al carrito
        for (let i = 0; i < quantity; i++) {
          addCartItem(finalVariant, product);
        }
        addItemAction();
      }}
    >
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
        quantity={quantity}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
