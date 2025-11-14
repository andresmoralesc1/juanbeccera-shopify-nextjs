import { getCollection, getCollectionProducts } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import AnnouncementBar from '@/components/custom/AnnouncementBar';

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description || collection.description || `${collection.title} products`
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  const products = await getCollectionProducts({ collection: params.collection, sortKey, reverse });
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return (
    <>
      <AnnouncementBar />

      {/* Collection Header - Compacto y enfocado */}
      <div className="bg-[#364e41] pt-24 pb-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb compacto */}
          <nav className="mb-3 text-xs">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="text-white/70 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li className="text-white/30">›</li>
              <li>
                <Link href="/search" className="text-white/70 hover:text-white transition-colors">
                  Colecciones
                </Link>
              </li>
              <li className="text-white/30">›</li>
              <li className="text-white font-medium">{collection.title}</li>
            </ol>
          </nav>

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-belleza text-2xl sm:text-3xl lg:text-4xl font-light tracking-wide mb-3 text-white">
              {collection.title}
              <span className="text-base font-normal text-white/70 ml-3">
                ({products.length} {products.length === 1 ? 'producto' : 'productos'})
              </span>
            </h1>
            {collection.description && (
              <details className="mt-2">
                <summary className="text-sm text-white/80 cursor-pointer hover:text-white transition-colors inline-flex items-center gap-1">
                  Ver descripción
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="text-white/90 text-sm mt-2 leading-relaxed">
                  {collection.description}
                </p>
              </details>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No se encontraron productos en esta colección</p>
              <Link
                href="/search"
                className="mt-6 inline-block text-[#620c0b] hover:underline"
              >
                Ver todas las colecciones →
              </Link>
            </div>
          ) : (
            <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 py-12">
              <ProductGridItems products={products} />
            </Grid>
          )}
        </div>
      </section>
    </>
  );
}
