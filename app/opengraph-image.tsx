import OpengraphImage from 'components/opengraph-image';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const runtime = 'edge';
export const contentType = 'image/png';

export default async function Image() {
  try {
    // Read font file from the filesystem
    const fontBuffer = await readFile(join(process.cwd(), 'fonts', 'Inter-Bold.ttf'));
    // Convert Buffer to ArrayBuffer
    const font = new Uint8Array(fontBuffer).buffer;
    
    return await OpengraphImage({ font });
  } catch (error) {
    console.error('Error generating OpenGraph image:', error);
    throw error;
  }
}
