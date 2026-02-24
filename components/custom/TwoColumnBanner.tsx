import Image from 'next/image';

type TwoColumnBannerProps = {
  image1?: string;
  image2?: string;
};

export default function TwoColumnBanner({
  image1 = '/running.jpg',
  image2 = '/by-jb-caption.png'
}: TwoColumnBannerProps) {
  return (
    <section className="relative h-[90vh] sm:h-screen overflow-hidden w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
        {/* Columna 1 - Imagen de fondo */}
        <div className="relative h-full">
          <Image
            src={image1}
            alt="By Juan Becerra - Column 1"
            fill
            className="object-cover"
            priority
            sizes="50vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Columna 2 - Imagen centrada */}
        <div className="relative h-full bg-gray-100 flex items-center justify-center p-8">
          <div className="relative max-w-lg w-full">
            <Image
              src={image2}
              alt="By Juan Becerra - Column 2"
              width={600}
              height={400}
              className="w-auto h-auto object-contain max-w-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
