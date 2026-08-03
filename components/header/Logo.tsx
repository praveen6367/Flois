import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShopifyImage } from '@/types/shopify';

interface LogoProps {
  logoImage?: ShopifyImage | null;
  localLogoPath?: string;
  className?: string;
}

export function Logo({ logoImage, localLogoPath = '/mainlogo.png', className = '' }: LogoProps) {
  const imageUrl = logoImage?.url || localLogoPath;
  const isSvg = imageUrl.endsWith('.svg');

  return (
    <Link
      href="/"
      className={`group flex items-center text-decoration-none focus:outline-none ${className}`}
      aria-label="FLOIS Homepage"
    >
      <div className="relative h-9 sm:h-10 w-auto min-w-[140px] sm:min-w-[160px] flex items-center">
        <Image
          src={imageUrl}
          alt={logoImage?.altText || 'FLOIS Brand Logo'}
          width={logoImage?.width || 160}
          height={logoImage?.height || 44}
          priority
          unoptimized={isSvg}
          className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </Link>
  );
}
