'use client';

import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { useEffect, useState } from 'react';
import FeaturedProductsByJB from '@/components/custom/FeaturedProductsByJB';

export function RecentlyViewed({ currentProductId }: { currentProductId?: string }) {
  const { recentProducts } = useRecentlyViewed();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  // Filter out current product
  const displayProducts = recentProducts.filter((p) => p.id !== currentProductId);

  if (displayProducts.length === 0) return null;

  // Formatear productos para el carrusel
  const formattedProducts = displayProducts.slice(0, 8).map((product) => ({
    id: product.id,
    name: product.title,
    slug: product.handle,
    price: `$${parseFloat(product.priceRange.maxVariantPrice.amount).toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
    category: 'Producto',
    categorySlug: 'producto',
    imageSrc: product.featuredImage?.url || '/placeholder.jpg',
    description: ''
  }));

  return <FeaturedProductsByJB products={formattedProducts} title="Vistos Recientemente" showCaption={false} />;
}
