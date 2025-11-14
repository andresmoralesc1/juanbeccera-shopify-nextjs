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
      collection.seo?.description || collection.description || `${collection.title} productos`,
    openGraph: {
      type: 'website',
      title: collection.seo?.title || collection.title,
      description: collection.seo?.description || collection.description || `${collection.title} productos`
    }
  };
}

export default async function CategoryPage({
  params: promiseParams,
  searchParams: promiseSearchParams
}: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { sort } = ((await promiseSearchParams) || {}) as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const params = await promiseParams;
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  const products = await getCollectionProducts({ collection: params.collection, sortKey, reverse });

  return (
    <section>
      <AnnouncementBar />
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex items-center justify-between">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-3xl font-bold mb-6">{collection.title}</h1>
          </div>
        </div>
        {products.length === 0 ? (
          <p className="py-3 text-lg">No hay productos disponibles en esta categoría.</p>
        ) : (
          <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductGridItems products={products} />
          </Grid>
        )}
      </div>
    </section>
  );
}