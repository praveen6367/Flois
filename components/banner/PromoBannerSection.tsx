'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface PromoBannerSectionProps {
  imageSrc?: string;
  altText?: string;
  destinationUrl?: string;
}

export function PromoBannerSection({
  imageSrc = '/placeholders/bannerpromo1.png',
  altText = 'FLOIS Botanical Luxury Offer Banner',
  destinationUrl = '/collections/all'
}: PromoBannerSectionProps) {
  return (
    <section className="relative w-full bg-[#FFFFFF] py-8 sm:py-12 lg:py-14 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="group relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-[#E8E6DF]"
        >
          <Link href={destinationUrl} className="block w-full">
            <Image
              src={imageSrc}
              alt={altText}
              width={1440}
              height={500}
              priority
              sizes="(max-width: 1440px) 100vw, 1440px"
              className="w-full h-auto block object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.01]"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
