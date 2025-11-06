import OpengraphImage from 'components/opengraph-image';
import { getPage } from 'lib/shopify';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const runtime = 'edge';
export const contentType = 'image/png';

export default async function Image({ params }: { params: { page: string } }) {
  try {
    const page = await getPage(params.page);
    const title = page?.seo?.title || page?.title || '';

    // Read font file from the filesystem
    const fontBuffer = await readFile(join(process.cwd(), 'fonts', 'Inter-Bold.ttf'));
    // Convert Buffer to ArrayBuffer
    const font = new Uint8Array(fontBuffer).buffer;

    // Return the OpenGraph image
    return await OpengraphImage({ title, font });
  } catch (error) {
    console.error('Error generating OpenGraph image:', error);
    throw error;
  }
}
