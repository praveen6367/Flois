'use client';

import React from 'react';
import Link from 'next/link';

export function BottomBar() {
  return (
    <div className="w-full pt-10 pb-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs font-sans text-[#EAE3D2]/70">
      {/* Copyright */}
      <div className="space-y-0.5">
        <p>© 2026 FLOIS Headless Storefront. All rights reserved.</p>
      </div>

      {/* Center Botanical Philosophy Signature */}
      <div className="font-serif text-sm sm:text-base text-[#C2CE94] font-normal italic">
        Made with Modern Ayurveda and Botanical Science.
      </div>

      {/* Utility Links */}
      <div className="flex items-center gap-4 text-[11px] font-sans">
        <Link href="/policies/privacy-policy" className="hover:text-white transition-colors">
          Privacy
        </Link>
        <span className="text-white/20">•</span>
        <Link href="/policies/privacy-policy" className="hover:text-white transition-colors">
          Cookies
        </Link>
        <span className="text-white/20">•</span>
        <Link href="/pages/accessibility" className="hover:text-white transition-colors">
          Accessibility
        </Link>
        <span className="text-white/20">•</span>
        <Link href="/sitemap.xml" className="hover:text-white transition-colors">
          Sitemap
        </Link>
      </div>
    </div>
  );
}
