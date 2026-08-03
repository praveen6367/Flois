'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, Droplets } from 'lucide-react';
import { Product } from '@/types/product';

export function TextureShowcase({ product }: { product: Product }) {
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
              Lightweight, Non-Greasy Pure Elixir
            </h2>

            <p className="text-base sm:text-lg font-sans text-[#4A4E4A] font-light leading-relaxed">
              Formulated without heavy mineral oils or synthetic silicones, {product.title} absorbs rapidly into scalp tissue without weighing down fine hair or leaving sticky residue.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E8E6DF]">
              <div className="space-y-1">
                <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[#4B644C]">
                  Aroma Profile
                </span>
                <p className="text-sm font-sans text-[#121412] font-medium">
                  Natural Jasmine & Earthy Botanical Herbs
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[#4B644C]">
                  Scalp Feel
                </span>
                <p className="text-sm font-sans text-[#121412] font-medium">
                  Cooling, Calming & Instantly Soothing
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (6 Cols): Macro Texture Visual */}
          <div className="lg:col-span-6 relative aspect-[4/4] rounded-3xl overflow-hidden shadow-2xl border border-[#E8E6DF] bg-[#FAF9F5]">
            <Image
              src="/products/texture_macro.jpg"
              alt="FLOIS RootHerb Hair Oil — pure golden cold-pressed oil macro texture"
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
