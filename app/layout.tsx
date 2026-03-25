import Script from 'next/script';
import { CartProvider } from 'components/cart/cart-context';
import NavbarIntegrated from '@/components/custom/NavbarIntegrated';
import AnnouncementBar from '@/components/custom/AnnouncementBar';
import { PageProgress } from '@/components/ui/page-progress';
import { WebVitals } from '@/components/web-vitals';
import { SkipLink } from '@/components/ui/skip-link';
import { GeistSans } from 'geist/font/sans';
import { getCart, getCollections } from 'lib/shopify';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import './globals.css';
import { baseUrl } from 'lib/utils';
import localFont from 'next/font/local';
import { env } from 'lib/env';

const belleza = localFont({
  src: '../fonts/Belleza-Regular.ttf',
  variable: '--font-belleza',
});

const moderat = localFont({
  src: '../fonts/Moderat-Black.ttf',
  variable: '--font-moderat',
});

const siteName = process.env.SITE_NAME || 'Juan Becerra | Elegancia sin limites'; // Aseguramos un valor por defecto

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: { // Usamos la variable siteName segura
    default: siteName,
    template: `%s | ${siteName}`
  },
  description: 'Prendas de alta calidad 100% Colombianas. Descubre nuestra colección de camisetas, hoodies, chaquetas y accesorios con diseños únicos y elegancia sin límites.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  },
  robots: {
    follow: true,
    index: true
  },
  openGraph: {
    title: siteName,
    description: 'Prendas de alta calidad 100% Colombianas. Diseños únicos que combinan elegancia y comodidad.',
    url: baseUrl,
    siteName: siteName,
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: siteName
    }],
    locale: 'es_CO',
    type: 'website'
  }
};

export const viewport = {
  themeColor: '#000000'
};

export default async function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  // Don't await cart, pass the Promise to the context provider for streaming
  // Collections are awaited for Navbar rendering
  const cart = getCart();
  const collections = await getCollections();

  return (
    <html lang="es" className={`${GeistSans.variable} ${belleza.variable} ${moderat.variable}`}>
      <head>
        {env.NEXT_PUBLIC_GTM_ID && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://neoss.juanbecerra.co/atticmpxip.js?'+i;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','8=GQ1FNzkuRCM7IUo2ITtfUgZUSl5cRQ0aTQMNEQMBDBcVGwoRQwAG');
            `}
          </Script>
        )}
      </head>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        {env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe src={`https://neoss.juanbecerra.co/ns.html?id=${env.NEXT_PUBLIC_GTM_ID}`}
              height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
          </noscript>
        )}
        <SkipLink />
        <AnnouncementBar />
        <CartProvider cartPromise={cart}>
          <WebVitals />
          <PageProgress />
          <NavbarIntegrated collections={collections} />
          <main id="main" className="pt-[156px]">
            {children}
            <Toaster closeButton />
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
