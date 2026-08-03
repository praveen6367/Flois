'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Product } from '@/types/product';

export function RelatedProductsPDP({ currentHandle }: { currentHandle: string }) {
  const RELATED_ITEMS = [
    {
      handle: 'rootherb-hair-growth-oil',
      title: 'RootHerb Hair Growth Oil',
      subtitle: '18 Pure Ayurvedic Herbs • 100ml',
      price: '₹699',
      imageSrc: '/products/rootherb_product.png'
    },
    {
      handle: 'neem-wood-comb',
      title: 'Handcrafted Neem Wood Comb',
      subtitle: 'Medicinal Neem Wood • Anti-Static',
      price: '₹349',
      imageSrc: '/products/neem_comb_product.png'
    },
    {
      handle: 'advanced-de-tan-sunscreen-gel',
      title: 'Advanced De-Tan Sunscreen Gel',
      subtitle: 'SPF 50+ PA++++ • Zero White Cast',
      price: '₹599',
      imageSrc: '/products/sunscreen_product.png'
    }
  ].filter((item) => item.handle !== currentHandle);

  return (
    <section className="relative w-full bg-[#FAF9F5] py-20 sm:py-28 overflow-hidden border-b border-[#E8E6DF]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 text-center">
        
        <div className="max-w-[750px] mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#4B644C]">
            COMPLETE YOUR BOTANICAL RITUAL
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#121412]">
            Recommended Complementary Formulas
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto gap-8 text-left">
          {RELATED_ITEMS.map((item, idx) => (
            <motion.div key={idx} whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
              <Link
                href={`/products/${item.handle}`}
                className="group block p-6 rounded-3xl bg-white border border-[#E8E6DF] hover:border-[#4B644C] hover:shadow-2xl transition-all space-y-4"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF9F5]">
                  <Image
                    src={item.imageSrc}
                    alt={item.title}
                    fill
                    sizes="400px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#4B644C] opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-2xl text-[#121412] font-normal group-hover:text-[#4B644C] transition-colors">
                      {item.title}
                    </h3>
                    <span className="font-serif text-xl font-normal text-[#121412]">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-xs font-sans text-[#787E78]">
                    {item.subtitle}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
