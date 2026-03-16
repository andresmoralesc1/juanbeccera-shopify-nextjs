import { Suspense } from 'react';
import AnnouncementBar from '@/components/custom/AnnouncementBar';
import HeroSectionByJB from '@/components/custom/HeroSectionByJB';
import TwoColumnBanner from '@/components/custom/TwoColumnBanner';
import HeroSectionByJBStatic from '@/components/custom/HeroSectionByJBStatic';
import CategoryProductsByJB from '@/components/custom/CategoryProductsByJB';
import FeaturedProductsByJB from '@/components/custom/FeaturedProductsByJB';
import NewsletterByJB from '@/components/custom/NewsletterByJB';
import FooterCustom from '@/components/custom/FooterCustom';
import {
  getProducts,
  getCollectionProducts,
  getHomeAnnouncement
} from 'lib/shopify';
import { CategorySliderSkeleton, ProductGridSkeleton } from '@/components/ui/skeleton';
import './styles.css';

export const metadata = {
  title: 'By Juan Becerra - Colección Exclusiva',
  description: 'Descubre la colección exclusiva By Juan Becerra. Diseños únicos con la mejor calidad y estilo.',
  openGraph: {
    title: 'By Juan Becerra - Colección Exclusiva',
    description: 'Descubre la colección exclusiva By Juan Becerra. Diseños únicos con la mejor calidad y estilo.',
    type: 'website',
    url: '/by-juan-becerra'
  }
};

async function FeaturedProductsSection() {
  const products = await getProducts({ sortKey: 'BEST_SELLING' });

  const featuredProducts = products.slice(0, 6).map((product) => ({
    id: product.id,
    name: product.title,
    slug: product.handle,
    price: `$${parseFloat(product.priceRange.maxVariantPrice.amount).toLocaleString('es-CO')}`,
    category: 'Accesorios',
    categorySlug: 'accesorios',
    imageSrc: product.featuredImage?.url || '/placeholder.jpg',
    description: product.description
  }));

  return <FeaturedProductsByJB products={featuredProducts} />;
}

async function CategorySectionWrapper() {
  const products = await getCollectionProducts({
    collection: 'camisetas',
    sortKey: 'BEST_SELLING'
  });

  return <CategoryProductsByJB products={products} title="Camisetas" caption="Nuestra colección de camisetas" />;
}

async function AnnouncementBarWrapper() {
  const announcement = await getHomeAnnouncement();
  if (!announcement) {
    return <AnnouncementBar />;
  }
  return (
    <AnnouncementBar
      text={announcement.text || undefined}
      enabled={announcement.enabled}
    />
  );
}

async function HeroSectionWrapper() {
  return <HeroSectionByJB backgroundImage="/FOCUS-ON.png" centerImage="" />;
}

async function SeasonalBannerWrapper() {
  return <TwoColumnBanner image1="/tenis.jpg" />;
}

export default function ByJuanBecerraPage() {
  return (
    <>
      <Suspense fallback={<div className="h-[90vh] bg-gray-100" />}>
        <HeroSectionWrapper />
      </Suspense>
      <CategorySectionWrapper />
      <Suspense fallback={<div className="h-[90vh] bg-gray-100" />}>
        <SeasonalBannerWrapper />
      </Suspense>
      <div className="py-16 sm:py-24" style={{ backgroundColor: '#1f2c8c' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<ProductGridSkeleton count={6} />}>
            <FeaturedProductsSection />
          </Suspense>
        </div>
      </div>
      <NewsletterByJB />
      <FooterCustom />
    </>
  );
}
