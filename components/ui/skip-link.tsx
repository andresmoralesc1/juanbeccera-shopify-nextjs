'use client';

import Link from 'next/link';

export function SkipLink({ href = '#main', children = 'Saltar al contenido principal' }: {
  href?: string;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded-lg focus:text-sm focus:font-medium"
    >
      {children}
    </Link>
  );
}
