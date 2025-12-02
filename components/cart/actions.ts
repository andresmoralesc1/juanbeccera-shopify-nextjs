'use server';

import { TAGS } from 'lib/constants';
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart
} from 'lib/shopify';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export async function addItem(
  prevState: unknown,
  selectedVariantId: string | undefined
) {
  if (!selectedVariantId) {
    return 'Error adding item to cart';
  }

  try {
    await addToCart([{ merchandiseId: selectedVariantId, quantity: 1 }]);
    revalidateTag(TAGS.cart);
  } catch {
    return 'Error adding item to cart';
  }
}

export async function removeItem(prevState: unknown, merchandiseId: string) {
  try {
    const cart = await getCart();

    if (!cart) {
      return 'Error fetching cart';
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      await removeFromCart([lineItem.id]);
      revalidateTag(TAGS.cart);
    } else {
      return 'Item not found in cart';
    }
  } catch {
    return 'Error removing item from cart';
  }
}

export async function updateItemQuantity(
  prevState: unknown,
  payload: {
    merchandiseId: string;
    quantity: number;
  }
) {
  const { merchandiseId, quantity } = payload;

  try {
    const cart = await getCart();

    if (!cart) {
      return 'Error fetching cart';
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      if (quantity === 0) {
        await removeFromCart([lineItem.id]);
      } else {
        await updateCart([
          {
            id: lineItem.id,
            merchandiseId,
            quantity
          }
        ]);
      }
    } else if (quantity > 0) {
      // If the item doesn't exist in the cart and quantity > 0, add it
      await addToCart([{ merchandiseId, quantity }]);
    }

    revalidateTag(TAGS.cart);
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.error(e);
    }
    return 'Error updating item quantity';
  }
}

export async function getCheckoutUrl(): Promise<string | null> {
  const cart = await getCart();

  if (!cart) {
    console.error('No cart found');
    return null;
  }

  if (!cart.checkoutUrl || cart.checkoutUrl === '') {
    console.error('Invalid checkout URL:', cart.checkoutUrl);
    return null;
  }

  // Reemplazar el dominio de Shopify por tu dominio personalizado
  let finalUrl = cart.checkoutUrl.replace(
    'juan-becerra.myshopify.com',
    'www.juanbecerra.co'
  );

  // También reemplazar checkout.juanbecerra.co si viene así
  finalUrl = finalUrl.replace(
    'checkout.juanbecerra.co',
    'www.juanbecerra.co'
  );

  // Agregar parámetro return_to
  const siteUrl = process.env.SITE_URL || 'https://www.juanbecerra.co';
  const url = new URL(finalUrl);
  url.searchParams.set('return_to', siteUrl);

  return url.toString();
}

export async function createCartAndSetCookie() {
  const cart = await createCart();
  (await cookies()).set('cartId', cart.id!);
}
