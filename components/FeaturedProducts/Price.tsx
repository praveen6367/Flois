'use client';

import React from 'react';

interface PriceProps {
  amount: string | number;
  currencyCode?: string;
  compareAtAmount?: string | number | null;
  compareAtCurrencyCode?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function formatCurrency(amount: string | number, currencyCode: string = 'INR'): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '';

  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: 0
    }).format(num);
  } catch (e) {
    return `${currencyCode === 'INR' ? '₹' : currencyCode} ${num}`;
  }
}

export function Price({
  amount,
  currencyCode = 'INR',
  compareAtAmount,
  size = 'md',
  className = ''
}: PriceProps) {
  const formattedPrice = formatCurrency(amount, currencyCode);
  const formattedComparePrice = compareAtAmount ? formatCurrency(compareAtAmount, currencyCode) : null;

  const numericPrice = typeof amount === 'string' ? parseFloat(amount) : amount;
  const numericComparePrice = compareAtAmount
    ? typeof compareAtAmount === 'string'
      ? parseFloat(compareAtAmount)
      : compareAtAmount
    : 0;

  const isOnSale = numericComparePrice > numericPrice;

  const sizeClasses = {
    sm: 'text-sm sm:text-base font-semibold',
    md: 'text-base sm:text-lg lg:text-xl font-semibold',
    lg: 'text-xl sm:text-2xl lg:text-3xl font-semibold'
  };

  return (
    <div className={`inline-flex items-baseline gap-2 font-sans ${className}`}>
      {/* Current Price */}
      <span className={`${sizeClasses[size]} text-[#121412] tracking-tight`}>
        {formattedPrice}
      </span>

      {/* Compare-At Price (Strikethrough) */}
      {isOnSale && formattedComparePrice && (
        <span className="text-xs sm:text-sm font-normal text-[#787E78] line-through">
          {formattedComparePrice}
        </span>
      )}
    </div>
  );
}
