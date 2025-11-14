import { Product } from 'lib/shopify/types';

export function generateProductJsonLd(product: Product, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage?.url,
    url,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: process.env.COMPANY_NAME || 'Juan Becerra'
    },
    offers: {
      '@type': 'Offer',
      price: product.priceRange.minVariantPrice.amount,
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url
    }
  };
}

export function generateOrganizationJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000';

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: process.env.COMPANY_NAME || 'Juan Becerra',
    url: baseUrl,
    logo: `${baseUrl}/logo-juan-becerra.png`,
    description: 'Marroquinería de lujo y accesorios de cuero premium',
    sameAs: [
      // Agregar redes sociales aquí
    ]
  };
}

export function generateWebsiteJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: process.env.SITE_NAME || 'Juan Becerra',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
}
