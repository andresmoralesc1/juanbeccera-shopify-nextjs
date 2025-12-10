import { Suspense } from 'react';
import AnnouncementBar from '@/components/custom/AnnouncementBar';
import HeroSection from '@/components/custom/HeroSection';
import CategorySectionDynamic from '@/components/custom/CategorySectionDynamic';
import SeasonalBanner from '@/components/custom/SeasonalBanner';
import FeaturedProducts from '@/components/custom/FeaturedProducts';
import BrandPhilosophy from '@/components/custom/BrandPhilosophy';
import Newsletter from '@/components/custom/Newsletter';
import InstagramFeed from '@/components/custom/InstagramFeed';
import FooterCustom from '@/components/custom/FooterCustom';
import {
  getProducts,
  getCollections,
  getHomeHero,
  getHomeSlides,
  getHomeAnnouncement
} from 'lib/shopify';
import { CategorySliderSkeleton, ProductGridSkeleton } from '@/components/ui/skeleton';

export const metadata = {
  description:
    'Juan Becerra - Marroquinería de lujo y accesorios de cuero premium. Elegancia artesanal en cada pieza.',
  openGraph: {
    type: 'website'
  }
};

async function FeaturedProductsSection() {
  // Obtener productos destacados de Shopify
  const products = await getProducts({ sortKey: 'BEST_SELLING' });

  // Adaptar los productos al formato esperado por el componente
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

  return <FeaturedProducts products={featuredProducts} />;
}

async function CategorySectionWrapper() {
  const collections = await getCollections();
  return <CategorySectionDynamic collections={collections} />;
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
  const hero = await getHomeHero();
  if (!hero) {
    return <HeroSection />;
  }
  return (
    <HeroSection
      title={hero.title ? hero.title : undefined}
      description={hero.description ? hero.description : undefined}
      image={hero.image ? hero.image : undefined}
      buttonText={hero.buttonText ? hero.buttonText : undefined}
      buttonText2={hero.buttonText2 ? hero.buttonText2 : undefined}
      buttonUrl={hero.buttonUrl ? hero.buttonUrl : undefined}
      buttonUrl2={hero.buttonUrl2 ? hero.buttonUrl2 : undefined}
    />
  );
}

async function SeasonalBannerWrapper() {
  const slides = await getHomeSlides();
  return <SeasonalBanner slides={slides.length > 0 ? slides : undefined} />;
}

export default function HomePage() {
  return (
    <main className="-mt-[118px]">
      <Suspense fallback={<AnnouncementBar />}>
        <AnnouncementBarWrapper />
      </Suspense>
      <Suspense fallback={<HeroSection />}>
        <HeroSectionWrapper />
      </Suspense>
      <Suspense fallback={<CategorySliderSkeleton />}>
        <CategorySectionWrapper />
      </Suspense>
      <Suspense fallback={<SeasonalBanner />}>
        <SeasonalBannerWrapper />
      </Suspense>
      <Suspense fallback={
        <div className="bg-[#364e41] py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ProductGridSkeleton count={6} />
          </div>
        </div>
      }>
        <FeaturedProductsSection />
      </Suspense>
      <BrandPhilosophy />
      <Newsletter />
      <InstagramFeed />
      <FooterCustom />
    </main>
  );
}
