import OpengraphImage from 'components/opengraph-image';
import { getBaseUrl } from 'lib/utils';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

export default async function Image() {
  const font = await fetch(new URL(`${getBaseUrl()}/${inter.style.fontFamily}.woff2`)).then((res) =>
    res.arrayBuffer()
  );
  return await OpengraphImage({ font });
}
