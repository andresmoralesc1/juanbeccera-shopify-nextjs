'use client';

import { useEffect } from 'react';
import { Product } from 'lib/shopify/types';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';

export function TrackRecentlyViewed({ product }: { product: Product }) {
  const { addRecentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    // Add product to recently viewed when component mounts
    addRecentlyViewed(product);
  }, [product.id]); // Only run when product changes

  return null; // This component doesn't render anything
}
