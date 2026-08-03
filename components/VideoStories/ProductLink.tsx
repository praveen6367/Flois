'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShoppingBag } from 'lucide-react';

interface ProductLinkProps {
  productHandle?: string;
  productTitle?: string;
  productPrice?: string;
  productImage?: string;
  onCloseModal?: () => void;
}

export function ProductLink({
  productHandle = 'rootherb-hair-growth-oil',
  productTitle = 'RootHerb Cold-Pressed Hair Growth Oil',
  productPrice = '₹1,250',
  productImage = '/placeholders/banner1background.png',
  onCloseModal
}: ProductLinkProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-[#E8E6DF] bg-[#FAF9F5] p-3.5 shadow-sm">
      {/* Product Image Thumbnail */}
      <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-white border border-[#E8E6DF] shrink-0 p-1">
        <Image
          src={productImage}
          alt={productTitle}
          fill
          sizes="64px"
          className="object-contain p-1"
        />
      </div>

      {/* Product Information */}
      <div className="flex-1 space-y-0.5 text-left min-w-0">
        <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#4B644C] block">
          Featured Formula
        </span>
        <h4 className="font-serif text-sm font-normal text-[#121412] truncate">
          {productTitle}
        </h4>
        <span className="text-xs font-sans font-semibold text-[#121412] block">
          {productPrice}
        </span>
      </div>

      {/* View Product CTA */}
      <Link
        href={`/products/${productHandle}`}
        onClick={onCloseModal}
        className="inline-flex items-center gap-1.5 rounded bg-[#4B644C] hover:bg-[#3D523E] text-white px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wider transition-all shadow-sm shrink-0"
      >
        <span>View</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
