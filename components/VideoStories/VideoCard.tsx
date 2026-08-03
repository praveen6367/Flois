'use client';

import React, { useState, useRef } from 'react';
import { VideoStoryMetaobject } from '@/types/metaobject';
import { VideoOverlay } from './VideoOverlay';

interface VideoCardProps {
  story: VideoStoryMetaobject;
  onSelect: (story: VideoStoryMetaobject) => void;
  isActive?: boolean;
}

export function VideoCard({ story, onSelect, isActive = false }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(story)}
      className={`group relative flex-none w-[260px] sm:w-[300px] lg:w-[320px] aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-md hover:shadow-2xl ${
        isHovered || isActive
          ? 'scale-[1.03] -translate-y-2 border-2 border-[#C2CE94] ring-4 ring-[#4B644C]/20 shadow-[0_20px_50px_rgba(75,100,76,0.25)]'
          : 'border border-[#E8E6DF] bg-[#FAF9F5]'
      }`}
      aria-label={`Watch Doctor Review by ${story.title}`}
    >
      {/* Continuous Loop Autoplay Video (Muted) */}
      <video
        src={story.videoUrl}
        poster={story.posterImage}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Overlaid Gradient & Doctor Information */}
      <VideoOverlay
        category={story.category}
        title={story.title}
        duration={story.duration}
        isPlaying={isHovered}
      />
    </div>
  );
}
