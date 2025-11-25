import { MetadataRoute } from 'next';
import { getCollections, getProducts } from 'lib/shopify';
import { baseUrl } from 'lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    },
    {
      url: `${baseUrl}/terminos-del-servicio`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3
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
    .flatMap((collection) => [
      // URL de búsqueda por colección
      {
        url: `${baseUrl}/search/${collection.handle}`,
        lastModified: new Date(collection.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.6
      },
      // URL de categoría de tienda
      {
        url: `${baseUrl}/tienda/categoria/${collection.handle}`,
        lastModified: new Date(collection.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7
      }
    ]);

  return [...routes, ...productUrls, ...collectionUrls];
}
