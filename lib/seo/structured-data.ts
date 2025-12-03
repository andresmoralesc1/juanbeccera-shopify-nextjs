import { Product } from 'lib/shopify/types';

export function generateProductJsonLd(product: Product, url: string) {
  // Calcular fecha de validez del precio (1 año desde hoy)
  const priceValidUntil = new Date();
  priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1);

  const baseOffer = {
    '@type': 'Offer',
    price: product.priceRange.minVariantPrice.amount,
    priceCurrency: product.priceRange.minVariantPrice.currencyCode,
    priceValidUntil: priceValidUntil.toISOString().split('T')[0],
    availability: product.availableForSale
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock',
    url,
    // Detalles de envío
    shippingDetails: {
      '@type': 'OfferShippingDetails',
      shippingRate: {
        '@type': 'MonetaryAmount',
        value: '0',
        currency: 'COP'
      },
      shippingDestination: {
        '@type': 'DefinedRegion',
        addressCountry: 'CO'
      },
      deliveryTime: {
        '@type': 'ShippingDeliveryTime',
        handlingTime: {
          '@type': 'QuantitativeValue',
          minValue: 1,
          maxValue: 3,
          unitCode: 'DAY'
        },
        transitTime: {
          '@type': 'QuantitativeValue',
          minValue: 3,
          maxValue: 7,
          unitCode: 'DAY'
        }
      }
    },
    // Política de devoluciones
    hasMerchantReturnPolicy: {
      '@type': 'MerchantReturnPolicy',
      applicableCountry: 'CO',
      returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
      merchantReturnDays: 30,
      returnMethod: 'https://schema.org/ReturnByMail',
      returnFees: 'https://schema.org/FreeReturn'
    }
  };

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description || product.title,
    image: product.featuredImage?.url,
    url,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: process.env.COMPANY_NAME || 'Juan Becerra'
    }
  };

  // Si tiene múltiples variantes, usar hasVariant
  if (product.variants && product.variants.length > 1) {
    jsonLd.offers = {
      '@type': 'AggregateOffer',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      lowPrice: product.priceRange.minVariantPrice.amount,
      highPrice: product.priceRange.maxVariantPrice.amount,
      priceValidUntil: priceValidUntil.toISOString().split('T')[0],
      offerCount: product.variants.length,
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url,
      shippingDetails: baseOffer.shippingDetails,
      hasMerchantReturnPolicy: baseOffer.hasMerchantReturnPolicy
    };
  } else {
    jsonLd.offers = baseOffer;
  }

  return jsonLd;
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
