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

export default function ByJuanBecerraPage() {
  return (
    <>
      <HeroSectionWrapper />
      <CategorySectionWrapper />
      <SeasonalBannerWrapper />
      <div className="py-16 sm:py-24" style={{ backgroundColor: '#345644' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<ProductGridSkeleton count={6} />}>
            <FeaturedProductsSection />
          </Suspense>
        </div>
      </div>
      <BrandPhilosophy />
      <Newsletter />
      <InstagramFeed />
      <FooterCustom />
    </>
  );
}
