import Collections from 'components/layout/search/collections';
import FilterList from 'components/layout/search/filter';
import { sorting } from 'lib/constants';
import ChildrenWrapper from './children-wrapper';
import { Suspense } from 'react';
import FooterCustom from '@/components/custom/FooterCustom';
import AnnouncementBar from '@/components/custom/AnnouncementBar';

export default function SearchLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar />

      {/* Main container with padding-top for fixed navbar */}
      <div className="pt-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 pb-16">

            {/* Sidebar izquierdo - Categorías (sticky) */}
            <aside className="w-full md:w-64 flex-shrink-0">
              <div className="md:sticky md:top-32">
                <h3 className="font-belleza text-2xl font-light mb-6 text-gray-900">
                  Categorías
                </h3>
                <Collections />
              </div>
            </aside>

            {/* Contenido principal */}
            <main className="flex-1 min-h-screen">
              <Suspense fallback={null}>
                <ChildrenWrapper>{children}</ChildrenWrapper>
              </Suspense>
            </main>

            {/* Sidebar derecho - Ordenar (sticky) */}
            <aside className="w-full md:w-48 flex-shrink-0 order-first md:order-last">
              <div className="md:sticky md:top-32">
                <h3 className="font-belleza text-2xl font-light mb-6 text-gray-900">
                  Ordenar por
                </h3>
                <FilterList list={sorting} title="" />
              </div>
            </aside>

          </div>
        </div>
      </div>

      <FooterCustom />
    </>
  );
}
