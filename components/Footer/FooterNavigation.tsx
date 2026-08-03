'use client';

import React from 'react';
import Link from 'next/link';

export function FooterNavigation() {
  return (
    <div className="w-full py-12 border-b border-[#304031]/60">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 text-left">
        
        {/* Column 1: Quick Links (Matching Header) */}
        <div className="space-y-4">
          <h4 className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#C2CE94]">
            QUICK LINKS
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/" className="text-[#EAE3D2]/80 hover:text-[#FAF9F5] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/collections/all" className="text-[#EAE3D2]/80 hover:text-[#FAF9F5] transition-colors">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-[#EAE3D2]/80 hover:text-[#FAF9F5] transition-colors">
                Journal
              </Link>
            </li>
            <li>
              <Link href="/pages/track-order" className="text-[#EAE3D2]/80 hover:text-[#FAF9F5] transition-colors">
                Track Order
              </Link>
            </li>
            <li>
              <Link href="/pages/about" className="text-[#EAE3D2]/80 hover:text-[#FAF9F5] transition-colors">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="/pages/contact" className="text-[#EAE3D2]/80 hover:text-[#FAF9F5] transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 2: Important Policies */}
        <div className="space-y-4">
          <h4 className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#C2CE94]">
            POLICIES & INFO
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/pages/about" className="text-[#EAE3D2]/80 hover:text-[#FAF9F5] transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/pages/contact" className="text-[#EAE3D2]/80 hover:text-[#FAF9F5] transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/policies/terms-of-service" className="text-[#EAE3D2]/80 hover:text-[#FAF9F5] transition-colors">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/policies/privacy-policy" className="text-[#EAE3D2]/80 hover:text-[#FAF9F5] transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/policies/refund-policy" className="text-[#EAE3D2]/80 hover:text-[#FAF9F5] transition-colors">
                Refund and Returns Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Social Media Connections (Insta, FB, LinkedIn, X, YouTube) */}
        <div className="space-y-4">
          <h4 className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#C2CE94]">
            FOLLOW US
          </h4>
          <p className="text-xs text-[#EAE3D2]/70 font-light leading-relaxed">
            Follow FLOIS on social media for daily botanical wellness inspiration and ritual guides.
          </p>

          <div className="flex items-center gap-3 pt-2">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/15 text-[#EAE3D2] hover:bg-[#4B644C] hover:text-white hover:border-[#4B644C] transition-all shadow-sm"
              aria-label="Instagram"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/15 text-[#EAE3D2] hover:bg-[#4B644C] hover:text-white hover:border-[#4B644C] transition-all shadow-sm"
              aria-label="Facebook"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.7 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/15 text-[#EAE3D2] hover:bg-[#4B644C] hover:text-white hover:border-[#4B644C] transition-all shadow-sm"
              aria-label="LinkedIn"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
              </svg>
            </a>

            {/* X / Twitter */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/15 text-[#EAE3D2] hover:bg-[#4B644C] hover:text-white hover:border-[#4B644C] transition-all shadow-sm"
              aria-label="X / Twitter"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/15 text-[#EAE3D2] hover:bg-[#4B644C] hover:text-white hover:border-[#4B644C] transition-all shadow-sm"
              aria-label="YouTube"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
