'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { RetailPartnerMetaobject } from '@/types/metaobject';
import { ArrowUpRight } from 'lucide-react';

interface RetailPartnerCardProps {
  partner: RetailPartnerMetaobject;
}

export function RetailPartnerCard({ partner }: RetailPartnerCardProps) {
  const [imgError, setImgError] = useState(false);

  const getActionLabel = () => {
    const nameLower = partner.name.toLowerCase();
    if (nameLower.includes('amazon')) return 'Shop on Amazon';
    if (nameLower.includes('flipkart')) return 'Shop on Flipkart';
    if (nameLower.includes('nykaa')) return 'Shop on Nykaa';
    return `Shop on ${partner.name}`;
  };

  return (
    <a
      href={partner.destinationUrl}
      target={partner.destinationUrl.startsWith('http') ? '_blank' : '_self'}
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-between rounded-2xl p-6 sm:p-7 text-center bg-white border border-[#E8E6DF] shadow-[0_4px_20px_rgba(18,20,18,0.03)] hover:border-[#6A9739] hover:shadow-[0_16px_40px_rgba(18,20,18,0.07)] hover:-translate-y-1 transition-all duration-300 focus:outline-none"
      aria-label={`Purchase FLOIS products on ${partner.name}`}
    >
      {/* Official Partner Logo Container */}
      <div className="relative w-full h-24 sm:h-28 flex items-center justify-center rounded-xl bg-[#FAFAF8] border border-[#F0EEE8] p-5 group-hover:bg-white group-hover:border-[#E8E6DF] transition-all duration-300">
        {partner.logoUrl && !imgError ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={partner.logoUrl}
              alt={partner.name}
              fill
              sizes="(max-width: 640px) 100vw, 280px"
              onError={() => setImgError(true)}
              className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <span className="font-serif text-2xl font-normal text-[#111111] group-hover:text-[#6A9739] transition-colors">
            {partner.name}
          </span>
        )}
      </div>

      {/* Minimal Action Link Button */}
      <div className="pt-6">
        <div className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 px-4 bg-[#FAF9F5] border border-[#E8E6DF] text-[#111111] text-xs font-sans font-semibold uppercase tracking-wider group-hover:bg-[#141C15] group-hover:text-white group-hover:border-[#141C15] transition-all duration-300 shadow-sm">
          <span>{getActionLabel()}</span>
          <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </a>
  );
}
