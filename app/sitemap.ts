import { MetadataRoute } from 'next';
import { getCollections, getProducts, getPages } from 'lib/shopify';
import { baseUrl } from 'lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Páginas estáticas principales
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
      priority: 0.9
    },
    {
      url: `${baseUrl}/by-juan-becerra`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8
    },
    {
      url: `${baseUrl}/empresarial-juan-becerra`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8
    },
    {
      url: `${baseUrl}/tienda/categoria`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7
    },
    {
      url: `${baseUrl}/politica-reembolso`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5
    },
    {
      url: `${baseUrl}/terminos-del-servicio`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3
    }
  ];

  try {
    // Obtener productos dinámicos
    const products = await getProducts({});
    const productUrls = products.map((product) => ({
      url: `${baseUrl}/products/${product.handle}`,
      lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7
    }));

    // Obtener colecciones dinámicas
    const collections = await getCollections();
    const collectionUrls = collections
      .filter((collection) => collection.handle)
      .flatMap((collection) => [
        {
          url: `${baseUrl}/search/${collection.handle}`,
          lastModified: collection.updatedAt ? new Date(collection.updatedAt) : new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.6
        },
        {
          url: `${baseUrl}/tienda/categoria/${collection.handle}`,
          lastModified: collection.updatedAt ? new Date(collection.updatedAt) : new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.7
        }
      ]);

    // Obtener páginas dinámicas
    const pages = await getPages();
    const pageUrls = pages.map((page) => ({
      url: `${baseUrl}/pages/${page.handle}`,
      lastModified: page.updatedAt ? new Date(page.updatedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5
    }));

    return [...routes, ...productUrls, ...collectionUrls, ...pageUrls];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Retornar rutas estáticas si falla
    return routes;
  }
}
