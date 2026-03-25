import { ProductGridSkeleton } from 'components/ui/skeleton';

export default function Loading() {
  return (
    <>
      <div className="mb-4 h-6" />
      <ProductGridSkeleton count={12} />
    </>
  );
}
