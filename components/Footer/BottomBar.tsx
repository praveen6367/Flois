'use client';

import React from 'react';
import Link from 'next/link';

export function BottomBar() {
  return (
    <div className="w-full pt-10 pb-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs font-sans text-[#666666]">
      {/* Copyright */}
      <div className="space-y-0.5">
        <p>© 2026 FLOIS Headless Storefront. All rights reserved.</p>
      </div>

      {/* Center Botanical Philosophy Signature */}
      <div className="font-serif text-sm sm:text-base text-[#8C9B3E] font-normal italic">
        Made with Modern Ayurveda and Botanical Science.
      </div>

      {/* Utility Links */}
      <div className="flex items-center gap-4 text-[11px] font-sans text-[#333333]">
        <Link href="/policies/privacy-policy" className="hover:text-[#8C9B3E] transition-colors">
          Privacy
        </Link>
        <span className="text-[#CCCCCC]">•</span>
        <Link href="/policies/privacy-policy" className="hover:text-[#8C9B3E] transition-colors">
          Cookies
        </Link>
        <span className="text-[#CCCCCC]">•</span>
        <Link href="/pages/accessibility" className="hover:text-[#8C9B3E] transition-colors">
          Accessibility
        </Link>
        <span className="text-[#CCCCCC]">•</span>
        <Link href="/sitemap.xml" className="hover:text-[#8C9B3E] transition-colors">
          Sitemap
        </Link>
      </div>
    </div>
  );
}
