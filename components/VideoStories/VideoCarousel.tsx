'use client';

import React, { useRef } from 'react';
import { VideoStoryMetaobject } from '@/types/metaobject';
import { VideoCard } from './VideoCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface VideoCarouselProps {
  stories: VideoStoryMetaobject[];
  onSelectStory: (story: VideoStoryMetaobject) => void;
}

export function VideoCarousel({ stories, onSelectStory }: VideoCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const cardWidth = 340; // Approx width + gap
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    if (direction === 'right') {
      // Loop to beginning if at the end
      if (container.scrollLeft >= maxScrollLeft - 20) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    } else {
      // Loop to end if at the beginning
      if (container.scrollLeft <= 20) {
        container.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative w-full">
      {/* Outer Navigation Arrows - Infinite Loop */}
      <button
        suppressHydrationWarning
        onClick={() => scroll('left')}
        className="hidden sm:flex absolute -left-5 top-1/2 -translate-y-1/2 z-30 h-11 w-11 items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-[#E8E6DF] text-[#121412] shadow-xl hover:bg-[#141C15] hover:text-white hover:scale-110 transition-all duration-300 focus:outline-none"
        aria-label="Previous Doctor Video (Loop)"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        suppressHydrationWarning
        onClick={() => scroll('right')}
        className="hidden sm:flex absolute -right-5 top-1/2 -translate-y-1/2 z-30 h-11 w-11 items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-[#E8E6DF] text-[#121412] shadow-xl hover:bg-[#141C15] hover:text-white hover:scale-110 transition-all duration-300 focus:outline-none"
        aria-label="Next Doctor Video (Loop)"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Horizontal Carousel Viewport with ZERO Scrollbars */}
      <div
        ref={scrollRef}
        className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory pt-4 pb-8 px-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {stories.map((story, idx) => (
          <div key={story.id} className="snap-start shrink-0">
            <VideoCard
              story={story}
              onSelect={onSelectStory}
              isActive={idx === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
