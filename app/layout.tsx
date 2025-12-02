import Script from 'next/script';
import { CartProvider } from 'components/cart/cart-context';
import NavbarIntegrated from '@/components/custom/NavbarIntegrated';
import { WelcomeToast } from 'components/welcome-toast';
import N8nChatWidget from '@/components/N8nChatWidget';
import { PageProgress } from '@/components/ui/page-progress';
import { WebVitals } from '@/components/web-vitals';
import { GeistSans } from 'geist/font/sans';
import { getCart, getCollections } from 'lib/shopify';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import './globals.css';
import { baseUrl } from 'lib/utils';
import localFont from 'next/font/local';

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
  robots: {
    follow: true,
    index: true
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
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();
  const collections = await getCollections();

  return (
    <html lang="es" className={`${GeistSans.variable} ${belleza.variable} ${moderat.variable}`}>
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WKH2FLX6');
          `}
        </Script>
      </head>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WKH2FLX6"
            height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
        </noscript>
        <CartProvider cartPromise={cart}>
          <WebVitals />
          <PageProgress />
          <NavbarIntegrated collections={collections} />
          <main className="pt-[118px]">
            {children}
            <Toaster closeButton />
            <WelcomeToast />
            <N8nChatWidget />
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
