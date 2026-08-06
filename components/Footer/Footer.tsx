'use client';

import React from 'react';
import { FooterNavigation } from './FooterNavigation';
import { BrandStory } from './BrandStory';
import { PaymentMethods } from './PaymentMethods';
import { BottomBar } from './BottomBar';

export function Footer() {
  return (
    <footer className="relative w-full bg-[#F8F6F3] text-[#111111] pt-14 pb-8 overflow-hidden border-t border-[#E8E6DF]">
      {/* Soft Ambient Light Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1100px] h-[700px] bg-[#FFFFFF] rounded-full blur-[160px] pointer-events-none -z-10" />

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
