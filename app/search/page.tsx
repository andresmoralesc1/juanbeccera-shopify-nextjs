import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import { getProducts } from 'lib/shopify';

export const metadata = {
  title: 'Buscar Productos',
  description: 'Busca productos en la tienda.'
};

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts({ sortKey, reverse, query: searchValue });
  const resultsText = products.length === 1 ? 'producto' : 'productos';

  return (
    <>
      {searchValue ? (
        <div className="mb-6">
          {products.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg text-gray-900 mb-2">
                No se encontraron productos para <span className="font-bold">&quot;{searchValue}&quot;</span>
              </p>
              <p className="text-sm text-gray-600">
                Intenta con otros términos de búsqueda o explora nuestras categorías
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-600">
              Mostrando {products.length} {resultsText} para <span className="font-semibold text-gray-900">&quot;{searchValue}&quot;</span>
            </p>
          )}
        </div>
      ) : null}

      {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          <ProductGridItems products={products} />
        </Grid>
      ) : searchValue ? null : (
        <div className="text-center py-12">
          <p className="text-gray-600">
            Usa el buscador para encontrar productos
          </p>
        </div>
      )}
    </>
  );
}
