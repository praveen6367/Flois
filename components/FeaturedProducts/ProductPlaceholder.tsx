'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const FALLBACK_PRODUCTS = [
  {
    handle: 'rootherb-hair-growth-oil',
    title: 'RootHerb Cold-Pressed Hair Growth Oil',
    category: 'Scalp & Follicle Therapy',
    description: 'Infused with 18 pure herbs and cold-pressed sesame oil to deeply nourish hair follicles.',
    price: '₹1,250',
    compareAtPrice: '₹1,850',
    image: '/placeholders/banner1background.png',
    badge: 'BEST SELLER'
  },
  {
    handle: 'advanced-de-tan-sunscreen-gel',
    title: 'Advanced De-Tan Sunscreen Gel SPF 50+',
    category: 'Solar Protection',
    description: 'Non-greasy, zero white-cast formula enriched with green tea and sandalwood.',
    price: '₹890',
    compareAtPrice: '₹1,200',
    image: '/placeholders/Banner2background.png',
    badge: 'CLINICALLY TESTED'
  },
  {
    handle: 'neem-wood-comb',
    title: 'Handcrafted Neem Wood Comb',
    category: 'Botanical Tool',
    description: 'Pure medicinal neem wood comb handcrafted to stimulate scalp micro-circulation.',
    price: '₹450',
    compareAtPrice: '₹650',
    image: '/placeholders/comb.svg',
    badge: '100% NATURAL'
  }
];

export function ProductPlaceholder() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {FALLBACK_PRODUCTS.map((prod, idx) => (
        <div
          key={prod.handle}
          className="group relative flex flex-col justify-between rounded-2xl border border-[#E8E6DF] bg-white p-4 sm:p-5 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1.5 overflow-hidden"
        >
          {/* Top Image Frame with Badge */}
          <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#FAF9F5] flex items-center justify-center border border-[#E8E6DF]/60">
            {/* Badge Overlay */}
            <div className="absolute top-3 left-3 z-20">
              <span className="inline-flex items-center gap-1.5 rounded bg-[#141C15] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#FAF9F5]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C2CE94]" />
                {prod.badge}
              </span>
            </div>

            <Image
              src={prod.image}
              alt={prod.title}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Content Info */}
          <div className="space-y-1.5 text-left pt-3">
            <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-[#4B644C]">
              {prod.category}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#121412] font-normal leading-snug truncate group-hover:text-[#4B644C] transition-colors">
              {prod.title}
            </h3>
            <p className="text-xs text-[#4A4E4A] line-clamp-1">
              {prod.description}
            </p>
            <div className="flex items-baseline gap-2 pt-1 font-sans">
              <span className="text-base font-semibold text-[#121412]">{prod.price}</span>
              <span className="text-xs text-[#787E78] line-through">{prod.compareAtPrice}</span>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4 z-20">
            <Link
              href={`/products/${prod.handle}`}
              className="w-full inline-flex items-center justify-center gap-2 rounded bg-[#4B644C] hover:bg-[#3D523E] text-white px-6 py-3.5 text-xs font-semibold uppercase tracking-widest transition-all shadow-md"
            >
              <span>Explore Product</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
