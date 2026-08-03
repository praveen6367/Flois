'use client';

import React, { useRef } from 'react';
import { Collection } from '@/types/collection';
import { CollectionScroller } from './CollectionScroller';
import { CollectionPlaceholder } from './CollectionPlaceholder';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CollectionNavigationProps {
  collections?: Collection[];
  activeHandle?: string;
}

export function CollectionNavigation({ collections, activeHandle }: CollectionNavigationProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const hasCollections = collections && collections.length > 0;

  return (
    <section className="w-full bg-[#FFFFFF] border-b border-[#E8E6DF] py-2 sm:py-3.5 relative z-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative group/colnav">
        
        {/* Desktop Left Scroll Arrow Button */}
        {hasCollections && collections.length > 6 && (
          <button
            onClick={() => scroll('left')}
            className="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 z-30 h-8 w-8 items-center justify-center rounded-full bg-white border border-[#E8E6DF] text-[#121412] shadow-md hover:border-[#4B644C] hover:text-[#4B644C] transition-all opacity-0 group-hover/colnav:opacity-100 focus:opacity-100 focus:outline-none"
            aria-label="Scroll collections left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}

        {/* Collection Scroller Track */}
        {hasCollections ? (
          <CollectionScroller
            collections={collections}
            activeHandle={activeHandle}
            scrollRef={scrollRef}
          />
        ) : (
          <CollectionPlaceholder />
        )}

        {/* Desktop Right Scroll Arrow Button */}
        {hasCollections && collections.length > 6 && (
          <button
            onClick={() => scroll('right')}
            className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 z-30 h-8 w-8 items-center justify-center rounded-full bg-white border border-[#E8E6DF] text-[#121412] shadow-md hover:border-[#4B644C] hover:text-[#4B644C] transition-all opacity-0 group-hover/colnav:opacity-100 focus:opacity-100 focus:outline-none"
            aria-label="Scroll collections right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}

      </div>
    </section>
  );
}
