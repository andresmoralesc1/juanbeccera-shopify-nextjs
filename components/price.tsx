import clsx from 'clsx';

const Price = ({
  amount,
  className,
  currencyCode = 'COP',
  compareAtAmount
}: {
  amount: string;
  className?: string;
  currencyCode: string;
  compareAtAmount?: string;
} & React.ComponentProps<'p'>) => {
  const formatPrice = (value: string) => {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'narrowSymbol',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(parseFloat(value));
  };

  const hasDiscount = compareAtAmount && parseFloat(compareAtAmount) > parseFloat(amount);

  return (
    <div suppressHydrationWarning={true} className={clsx('flex items-center gap-2', className)}>
      {hasDiscount && (
        <span className="text-gray-500 line-through text-sm">
          {formatPrice(compareAtAmount)}
        </span>
      )}
      <span className={clsx(hasDiscount && 'text-red-600 font-semibold')}>
        {formatPrice(amount)}
      </span>
    </div>
  );
};

export default Price;
