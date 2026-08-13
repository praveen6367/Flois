'use client';

import React from 'react';
import Image from 'next/image';
import { Droplets } from 'lucide-react';
import { Product } from '@/types/product';

interface TextureData {
  headline: string;
  desc: string;
  aromaTitle: string;
  aromaValue: string;
  feelTitle: string;
  feelValue: string;
  image: string;
  alt: string;
}

function getTextureData(handle: string, title: string): TextureData {
  const h = handle.toLowerCase();

  if (h.includes('sunscreen') || h.includes('tan') || h.includes('spf')) {
    return {
      headline: 'Ultra-Lightweight, Cooling Gel Finish',
      desc: `Formulated with zero mineral oils, silicones, or heavy waxes, ${title} glides onto skin like water, absorbing in seconds with zero white cast and a weightless natural glow.`,
      aromaTitle: 'Aroma Profile',
      aromaValue: 'Refreshing Green Tea & Calming Sandalwood',
      feelTitle: 'Skin Feel',
      feelValue: 'Cooling Gel, Non-Greasy & Zero White Cast',
      image: '/products/texture_sunscreen.jpg',
      alt: 'FLOIS Advanced De-Tan Sunscreen Gel — ultra-light gel texture macro photo',
    };
  }

  if (h.includes('neem') || h.includes('comb')) {
    return {
      headline: 'Hand-Polished Medicinal Neem Wood',
      desc: `Carved from seasoned margosa wood and herbal-infused for 45 days, ${title} features rounded, non-scratching teeth that glide effortlessly through wet or dry hair without static friction.`,
      aromaTitle: 'Wood Aroma',
      aromaValue: 'Subtle Earthy Medicinal Neem & Herbal Oils',
      feelTitle: 'Scalp Feel',
      feelValue: 'Anti-Static, Soothing & Micro-Circulating',
      image: '/products/texture_neem_comb.jpg',
      alt: 'FLOIS Handcrafted Neem Comb — smooth polished medicinal wood grain macro',
    };
  }

  // RootHerb Hair Oil (default)
  return {
    headline: 'Lightweight, Non-Greasy Pure Elixir',
    desc: `Formulated without heavy mineral oils or synthetic silicones, ${title} absorbs rapidly into scalp tissue without weighing down fine hair or leaving sticky residue.`,
    aromaTitle: 'Aroma Profile',
    aromaValue: 'Natural Jasmine & Earthy Botanical Herbs',
    feelTitle: 'Scalp Feel',
    feelValue: 'Cooling, Calming & Instantly Soothing',
    image: '/products/texture_macro.jpg',
    alt: 'FLOIS RootHerb Hair Oil — pure golden cold-pressed oil macro texture',
  };
}

export function TextureShowcase({ product }: { product: Product }) {
  const data = getTextureData(product.handle || '', product.title);

  return (
    <section className="relative w-full bg-[#FFFFFF] py-20 sm:py-28 overflow-hidden border-b border-[#E8E6DF]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          
          {/* Left Column (6 Cols): Texture Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2">
              <Droplets className="h-4 w-4 text-[#4B644C]" />
              <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#4B644C]">
                SENSORY TEXTURE & FINISH
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-[#121412]">
              {data.headline}
            </h2>

            <p className="text-base sm:text-lg font-sans text-[#4A4E4A] font-light leading-relaxed">
              {data.desc}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E8E6DF]">
              <div className="space-y-1">
                <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[#4B644C]">
                  {data.aromaTitle}
                </span>
                <p className="text-sm font-sans text-[#121412] font-medium">
                  {data.aromaValue}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[#4B644C]">
                  {data.feelTitle}
                </span>
                <p className="text-sm font-sans text-[#121412] font-medium">
                  {data.feelValue}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (6 Cols): Macro Texture Visual */}
          <div className="lg:col-span-6 relative aspect-[4/4] rounded-3xl overflow-hidden shadow-2xl border border-[#E8E6DF] bg-[#FAF9F5]">
            <Image
              src={data.image}
              alt={data.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover object-center"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
