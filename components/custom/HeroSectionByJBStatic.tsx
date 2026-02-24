import Image from 'next/image';

type HeroSectionByJBStaticProps = {
  backgroundImage?: string;
  centerImage?: string;
};

export default function HeroSectionByJBStatic({
  backgroundImage = '/running.jpg',
  centerImage = '/by-jb-caption.png'
}: HeroSectionByJBStaticProps) {
  return (
    <section className="relative h-[90vh] sm:h-screen flex items-center justify-center overflow-hidden w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="By Juan Becerra - Hero Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Center Image */}
      <div className="relative z-10 flex items-center justify-center w-full h-full px-4">
        <div className="relative max-w-4xl w-full flex items-center justify-center">
          <Image
            src={centerImage}
            alt="By Juan Becerra"
            width={600}
            height={400}
            className="w-auto h-auto object-contain max-w-full"
            priority
          />
        </div>
      </div>
    </section>
  );
}
