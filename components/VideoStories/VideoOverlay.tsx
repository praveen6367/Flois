'use client';

import React from 'react';
import { Play, Clock } from 'lucide-react';

interface VideoOverlayProps {
  category: string;
  title: string;
  duration?: string;
  isPlaying?: boolean;
}

export function VideoOverlay({ category, title, duration, isPlaying = false }: VideoOverlayProps) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col justify-between p-5 pointer-events-none bg-gradient-to-t from-[#0D140E]/90 via-[#0D140E]/30 to-transparent">
      {/* Top Play Indicator Badge */}
      <div className="flex items-center justify-between w-full">
        {duration && (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#141C15]/75 backdrop-blur-md px-2.5 py-1 text-[10px] font-medium text-white/90 border border-white/10 shadow-sm">
            <Clock className="h-3 w-3 text-[#C2CE94]" />
            <span>{duration}</span>
          </div>
        )}

        <div className={`flex h-9 w-9 items-center justify-center rounded-full bg-[#141C15]/80 backdrop-blur-md border border-white/20 text-[#FAF9F5] shadow-lg transition-transform duration-300 ${isPlaying ? 'scale-110 border-[#C2CE94]' : 'group-hover:scale-110'}`}>
          <Play className="h-3.5 w-3.5 fill-[#FAF9F5] ml-0.5" />
        </div>
      </div>

      {/* Bottom Information Overlay */}
      <div className="space-y-1 text-left">
        <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-[#C2CE94]">
          {category}
        </span>
        <h4 className="font-serif text-lg sm:text-xl text-white font-normal leading-snug line-clamp-2 drop-shadow-md">
          {title}
        </h4>
      </div>
    </div>
  );
}
