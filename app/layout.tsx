import Script from 'next/script';
import { CartProvider } from 'components/cart/cart-context';
import NavbarIntegrated from '@/components/custom/NavbarIntegrated';
import { WelcomeToast } from 'components/welcome-toast';
import { PageProgress } from '@/components/ui/page-progress';
import { GeistSans } from 'geist/font/sans';
import { getCart } from 'lib/shopify';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner'; // Asumo que 'sonner' es correcto, si no, podría ser 'react-hot-toast'
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

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  }
};

export default async function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();

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
          <PageProgress />
          <NavbarIntegrated />
          <main>
            {children}
            <Toaster closeButton />
            <WelcomeToast />
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
