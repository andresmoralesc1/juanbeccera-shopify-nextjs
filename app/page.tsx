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
import { getProducts, getCollections } from 'lib/shopify';

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

export default function HomePage() {
  return (
    <main>
      <AnnouncementBar />
      <HeroSection />
      <Suspense fallback={<div className="py-24 bg-[#364e41] text-center text-white">Cargando categorías...</div>}>
        <CategorySectionWrapper />
      </Suspense>
      <SeasonalBanner />
      <Suspense fallback={<div className="py-24 text-center">Cargando productos...</div>}>
        <FeaturedProductsSection />
      </Suspense>
      <BrandPhilosophy />
      <Newsletter />
      <InstagramFeed />
      <FooterCustom />
    </main>
  );
}
