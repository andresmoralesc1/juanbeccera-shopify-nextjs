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

      {/* Collection Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <nav className="mb-4 text-xs">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors">
                  Inicio
                </Link>
              </li>
              <li className="text-gray-300">›</li>
              <li>
                <Link href="/search" className="text-gray-500 hover:text-gray-900 transition-colors">
                  Colecciones
                </Link>
              </li>
              <li className="text-gray-300">›</li>
              <li className="text-gray-900 font-medium">{collection.title}</li>
            </ol>
          </nav>

          <h1 className="font-belleza text-2xl sm:text-3xl font-light tracking-wide text-gray-900">
            {collection.title}
            <span className="text-sm font-normal text-gray-500 ml-3">
              ({products.length} {products.length === 1 ? 'producto' : 'productos'})
            </span>
          </h1>
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
