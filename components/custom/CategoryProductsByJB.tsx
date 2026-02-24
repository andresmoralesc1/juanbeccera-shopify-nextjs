import { getCollectionProducts } from 'lib/shopify';
import ProductCard from 'components/product/product-card';

type CategoryProductsByJBProps = {
  collectionHandle: string;
  title?: string;
  limit?: number;
};

export default async function CategoryProductsByJB({
  collectionHandle,
  title = 'Camisetas',
  limit = 8
}: CategoryProductsByJBProps) {
  const products = await getCollectionProducts({
    collection: collectionHandle,
    sortKey: 'BEST_SELLING'
  });

  const limitedProducts = products.slice(0, limit);

  if (limitedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-light tracking-wide text-center mb-12 sm:mb-16 font-belleza">
          {title}
        </h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {limitedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
