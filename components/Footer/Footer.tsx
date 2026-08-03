'use client';

import React from 'react';
import { FooterNavigation } from './FooterNavigation';
import { BrandStory } from './BrandStory';
import { PaymentMethods } from './PaymentMethods';
import { BottomBar } from './BottomBar';

export function Footer() {
  return (
    <footer className="relative w-full bg-[#111611] text-[#FAF9F5] pt-14 pb-8 overflow-hidden border-t border-[#304031]">
      {/* Soft Ambient Radial Botanical Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1100px] h-[700px] bg-[#1A241B] rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Section 2: Quick Links, Essential Policies & Social Icons */}
        <FooterNavigation />

        {/* Section 3: Official Logo & Tagline */}
        <BrandStory />

        {/* Section 4: Accepted Payment Methods */}
        <PaymentMethods />

        {/* Section 5: Bottom Signature Bar */}
        <BottomBar />
      </div>
    </footer>
  );
}
