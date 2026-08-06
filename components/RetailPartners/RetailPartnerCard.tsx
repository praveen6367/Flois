'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { RetailPartnerMetaobject } from '@/types/metaobject';
import { ExternalLink, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface RetailPartnerCardProps {
  partner: RetailPartnerMetaobject;
}

export function RetailPartnerCard({ partner }: RetailPartnerCardProps) {
  const isOfficial = partner.isOfficial;
  const [imgError, setImgError] = useState(false);

  const getActionLabel = () => {
    if (isOfficial) return 'Shop Official';
    if (partner.name.toLowerCase().includes('amazon')) return 'Shop on Amazon';
    if (partner.name.toLowerCase().includes('flipkart')) return 'Shop on Flipkart';
    if (partner.name.toLowerCase().includes('nykaa')) return 'Shop on Nykaa';
    return `Shop on ${partner.name}`;
  };

  return (
    <a
      href={partner.destinationUrl}
      target={partner.destinationUrl.startsWith('http') ? '_blank' : '_self'}
      rel="noopener noreferrer"
      className={`group relative flex flex-col justify-between rounded-2xl p-5 sm:p-6 text-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none overflow-hidden ${
        isOfficial
          ? 'bg-[#F8F6F3] border-2 border-[#ACB041]/60 shadow-[0_6px_30px_rgba(172,176,65,0.1)] hover:border-[#ACB041] hover:shadow-[0_16px_45px_rgba(172,176,65,0.18)] hover:-translate-y-1.5'
          : 'bg-white border border-[#E8E6DF] shadow-[0_4px_20px_rgba(18,20,18,0.03)] hover:border-[#ACB041] hover:shadow-[0_16px_40px_rgba(18,20,18,0.08)] hover:-translate-y-1.5'
      }`}
      aria-label={`Purchase FLOIS products on ${partner.name}`}
    >
      {/* Top Meta Header: Badge & External Link */}
      <div className="flex items-center justify-between text-xs w-full mb-3 z-10">
        {isOfficial ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#111111] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#FFFFFF] shadow-sm">
            <ShieldCheck className="h-3 w-3 text-[#ACB041]" />
            <span>Official Store</span>
          </span>
        ) : (
          <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#6A9739] bg-[#F7F8EE] px-2 py-0.5 rounded border border-[#E0E4B3]">
            Authorized Partner
          </span>
        )}

        <ExternalLink className="h-3.5 w-3.5 text-[#666666] group-hover:text-[#ACB041] transition-colors" />
      </div>

      {/* Official Partner Logo Box */}
      <div
        className={`relative w-full h-20 sm:h-24 my-3 flex items-center justify-center rounded-xl p-4 transition-all duration-500 overflow-hidden ${
          isOfficial
            ? 'bg-[#111111] border border-[#333333]'
            : 'bg-[#F8F6F3] border border-[#E8E6DF]/70 group-hover:bg-white group-hover:border-[#E8E6DF]'
        }`}
      >
        {partner.logoUrl && !imgError ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={partner.logoUrl}
              alt={partner.name}
              fill
              sizes="(max-width: 640px) 100vw, 250px"
              onError={() => setImgError(true)}
              className={`object-contain transition-transform duration-500 group-hover:scale-105 ${
                isOfficial ? 'p-2' : 'p-1'
              }`}
            />
          </div>
        ) : (
          <span className="font-serif text-2xl font-normal text-[#111111] group-hover:text-[#ACB041] transition-colors">
            {partner.name}
          </span>
        )}
      </div>

      {/* Perks List */}
      {partner.perks && partner.perks.length > 0 && (
        <div className="space-y-1.5 py-3 text-left border-t border-[#E8E6DF]/60">
          {partner.perks.map((perk, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs font-sans text-[#333333]">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#ACB041] shrink-0" />
              <span className="truncate">{perk}</span>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Primary Action Button - Single Line 100% Guaranteed */}
      <div className="pt-3 z-10">
        <div
          className={`w-full inline-flex items-center justify-center gap-2 rounded py-3 px-3 text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm ${
            isOfficial
              ? 'bg-[#8C9B3E] text-white group-hover:bg-[#7A8834] shadow-md'
              : 'bg-[#F8F6F3] text-[#111111] border border-[#E8E6DF] group-hover:bg-[#8C9B3E] group-hover:text-white group-hover:border-[#8C9B3E]'
          }`}
        >
          <span className="whitespace-nowrap">{getActionLabel()}</span>
          <ArrowRight className="h-3.5 w-3.5 shrink-0" />
        </div>
      </div>
    </a>
  );
}
