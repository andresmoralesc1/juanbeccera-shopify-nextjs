import { MetadataRoute } from 'next';
import { getCollections, getProducts } from 'lib/shopify';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000';

  // Páginas estáticas
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8
    },
    {
      url: `${baseUrl}/tienda/categoria`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8
    }
  ];

  // Obtener productos dinámicos
  const products = await getProducts({});
  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/${product.handle}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7
  }));

  // Obtener colecciones dinámicas
  const collections = await getCollections();
  const collectionUrls = collections
    .filter((collection) => collection.handle)
    .map((collection) => ({
      url: `${baseUrl}/search/${collection.handle}`,
      lastModified: new Date(collection.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.6
    }));

  return [...routes, ...productUrls, ...collectionUrls];
}
