'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, X, Sparkles } from 'lucide-react';

export interface AnnouncementItem {
  id: string;
  text: string;
  code?: string;
}

const DEFAULT_ANNOUNCEMENTS: AnnouncementItem[] = [
  { id: '1', text: 'Complimentary Express Shipping on all orders above ₹999', code: 'BOTANICAL' },
  { id: '2', text: 'Free Ayurvedic Neem Comb with RootHerb Hair Growth Oil', code: 'FREECOMB' },
  { id: '3', text: 'Clinically Tested 100% Cold-Pressed Plant Formulations' }
];

interface AnnouncementBarProps {
  items?: AnnouncementItem[];
}

export function AnnouncementBar({ items = DEFAULT_ANNOUNCEMENTS }: AnnouncementBarProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const announcements = items && items.length > 0 ? items : DEFAULT_ANNOUNCEMENTS;

  // Desktop: rotate announcements every 4.5s
  useEffect(() => {
    if (announcements.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [announcements.length]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isVisible) return null;

  const current = announcements[currentIndex];

  // Build the marquee string: all announcement texts joined with a separator
  const marqueeText = announcements
    .map((a) => (a.code ? `${a.text}  ·  Use code ${a.code}` : a.text))
    .join('     ✦     ');

  return (
    <aside className="relative z-50 w-full bg-[#1A241B] border-b border-[#304031] text-xs font-sans text-[#FAF9F5] py-2 px-4">

      {/* ─── MOBILE: continuous marquee ticker ─────────────────────── */}
      <div className="flex md:hidden items-center gap-2 overflow-hidden">
        {/* Dismiss button — left on mobile */}
        <button
          suppressHydrationWarning
          onClick={() => setIsVisible(false)}
          className="shrink-0 opacity-70 hover:opacity-100 transition-opacity focus:outline-none"
          aria-label="Dismiss"
        >
          <X className="h-3.5 w-3.5 text-[#EAE3D2]" />
        </button>

        {/* Marquee track */}
        <div className="flex-1 overflow-hidden">
          <div className="flex w-max animate-marquee whitespace-nowrap">
            {/* Duplicate for seamless loop */}
            <span className="pr-16 text-[11px] font-medium text-[#FAF9F5] tracking-wide">
              {marqueeText}
            </span>
            <span className="pr-16 text-[11px] font-medium text-[#FAF9F5] tracking-wide" aria-hidden>
              {marqueeText}
            </span>
          </div>
        </div>
      </div>

      {/* ─── DESKTOP: existing rotating text layout ─────────────────── */}
      <div className="hidden md:flex max-w-[1440px] mx-auto items-center justify-between gap-4">

        {/* Left Badge */}
        <div className="flex items-center gap-1.5 text-[#C2CE94]">
          <Sparkles className="h-3.5 w-3.5" />
          <span className="text-[11px] font-semibold uppercase tracking-wider">FLOIS BOTANICAL CARE</span>
        </div>

        {/* Center Rotating Text */}
        <div className="flex-1 text-center overflow-hidden h-5 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 font-medium text-[#FAF9F5]"
            >
              <span>{current.text}</span>
              {current.code && (
                <span className="inline-flex items-center gap-1 rounded bg-[#222E23] px-1.5 py-0.5 text-[10px] font-semibold tracking-widest text-[#EAE3D2] border border-[#4B644C]">
                  CODE: {current.code}
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {current.code && (
            <button
              suppressHydrationWarning
              onClick={() => handleCopyCode(current.code!)}
              className="relative flex items-center gap-1 rounded bg-[#4B644C] hover:bg-[#3D523E] px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase text-white transition-colors focus:outline-none"
              title="Copy Coupon Code"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-[#34d399]" />
                  <span className="text-[#34d399]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3 opacity-90" />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}

          <button
            suppressHydrationWarning
            onClick={() => setIsVisible(false)}
            className="p-0.5 opacity-70 hover:opacity-100 transition-opacity focus:outline-none"
            aria-label="Dismiss Announcement Bar"
          >
            <X className="h-3.5 w-3.5 text-[#EAE3D2]" />
          </button>
        </div>

      </div>
    </aside>
  );
}
