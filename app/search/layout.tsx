import ChildrenWrapper from './children-wrapper';
import { Suspense } from 'react';
import FooterCustom from '@/components/custom/FooterCustom';
import AnnouncementBar from '@/components/custom/AnnouncementBar';
import CategorySectionMinimal from '@/components/custom/CategorySectionMinimal';
import { getCollections } from 'lib/shopify';

async function CategorySectionWrapper() {
  const collections = await getCollections();
  return <CategorySectionMinimal collections={collections} />;
}

export default function SearchLayout({ 
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar />

      {/* Main container with padding-top for fixed navbar */}
      <div className="bg-white">
        <Suspense fallback={<div className="h-40 bg-[#f8f7f4]" />}>
          <CategorySectionWrapper />
        </Suspense>

        <div className="mx-auto max-w-screen-2xl px-4 py-16 text-black">

          {/* Contenido principal (centrado con max-width) */}
          <main>
            <Suspense fallback={null}>
              <ChildrenWrapper>{children}</ChildrenWrapper>
            </Suspense>
          </main>

        </div>
      </div>

      <FooterCustom />
    </>
  );
}
