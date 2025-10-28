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

      {/* Collection Header - Diseño elegante */}
      <div className="bg-[#364e41] pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="text-white/70 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li className="text-white/50">/</li>
              <li>
                <Link href="/search" className="text-white/70 hover:text-white transition-colors">
                  Colecciones
                </Link>
              </li>
              <li className="text-white/50">/</li>
              <li className="text-white font-medium">{collection.title}</li>
            </ol>
          </nav>

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-belleza text-4xl sm:text-5xl lg:text-6xl font-light tracking-wide mb-6 text-white">
              {collection.title}
            </h1>
            {collection.description && (
              <p className="text-white/90 text-lg leading-relaxed">
                {collection.description}
              </p>
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
            <>
              <div className="flex justify-between items-center mb-8">
                <p className="text-sm text-gray-600">
                  {products.length} {products.length === 1 ? 'producto' : 'productos'}
                </p>
              </div>
              <Grid className="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                <ProductGridItems products={products} />
              </Grid>
            </>
          )}
        </div>
      </section>
    </>
  );
}
