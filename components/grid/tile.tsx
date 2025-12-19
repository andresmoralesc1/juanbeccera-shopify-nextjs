import clsx from 'clsx';
import { ComponentProps } from 'react';

export function GridTileImage({
  isInteractive = true,
  active,
  alt,
  src,
  sizes,
  fill,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  alt?: string;
  src?: string;
  sizes?: string;
  fill?: boolean;
} & ComponentProps<'img'>) {
  return (
    <div
      className={clsx(
        'group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white transition-all duration-300 ease-in-out hover:shadow-lg',
        {
          'border-2 border-blue-600': active,
          'border-neutral-200': !active
        }
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt || ''}
          className={clsx('relative h-full w-full object-cover', {
            'transition duration-300 ease-in-out group-hover:scale-105': isInteractive
          })}
          loading="lazy"
          {...props}
        />
      ) : null}
    </div>
  );
}
