import clsx from 'clsx';
import Image from 'next/image';
import { ComponentProps } from 'react';

export function GridTileImage({
  isInteractive = true,
  active,
  alt,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
} & ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        'group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white transition-all duration-300 ease-in-out hover:shadow-lg dark:bg-black',
        {
          'border-2 border-blue-600': active,
          'border-neutral-200 dark:border-neutral-800': !active
        }
      )}
    >
      {props.src ? (
        <Image className={clsx('relative h-full w-full object-cover', {
            'transition duration-300 ease-in-out group-hover:scale-105': isInteractive
          })} alt={alt || ''} {...props} />
      ) : null}
    </div>
  );
}
