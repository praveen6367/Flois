'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { ChevronsLeftRight } from 'lucide-react';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  altText: string;
  initialSliderPosition?: number;
  className?: string;
  aspectRatio?: 'square' | 'portrait' | 'wide';
}

export function ComparisonSlider({
  beforeImage,
  afterImage,
  altText,
  initialSliderPosition = 50,
  className = '',
  aspectRatio = 'square'
}: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(initialSliderPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      let percentage = (x / rect.width) * 100;

      if (percentage < 3) percentage = 3;
      if (percentage > 97) percentage = 97;

      setSliderPosition(percentage);
    },
    []
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || !e.touches[0]) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleTouchMove]);

  const aspectClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[4/5]',
    wide: 'aspect-[16/10]'
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={(e) => {
        handleMouseDown();
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        handleMouseDown();
        if (e.touches[0]) handleMove(e.touches[0].clientX);
      }}
      className={`relative w-full overflow-hidden rounded-xl bg-[#FAF9F5] select-none cursor-ew-resize border border-[#E8E6DF] shadow-sm ${aspectClasses[aspectRatio]} ${className}`}
      aria-label={`Interactive Before and After comparison for ${altText}`}
    >
      {/* After Image (Right) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={afterImage}
          alt={`${altText} After`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center"
        />
        {/* High-Contrast AFTER Badge */}
        <span className="absolute top-3.5 right-3.5 z-10 text-[9px] font-sans font-bold uppercase tracking-[0.15em] bg-[#141C15]/85 backdrop-blur-md text-white px-3 py-1 rounded border border-white/20 shadow-md">
          AFTER
        </span>
      </div>

      {/* Before Image (Left Clipped) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="relative w-full h-full" style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}>
          <Image
            src={beforeImage}
            alt={`${altText} Before`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
          />
          {/* High-Contrast BEFORE Badge */}
          <span className="absolute top-3.5 left-3.5 z-10 text-[9px] font-sans font-bold uppercase tracking-[0.15em] bg-[#141C15]/85 backdrop-blur-md text-white px-3 py-1 rounded border border-white/20 shadow-md">
            BEFORE
          </span>
        </div>
      </div>

      {/* Vibrant High-Contrast Gradient Separator Line */}
      <div
        className="absolute top-0 bottom-0 z-20 w-[3px] bg-gradient-to-b from-[#141C15] via-[#4B644C] via-[#859844] to-[#C8A96E] shadow-[0_0_12px_rgba(75,100,76,0.6)] pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Glowing Circular Handle */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white border-2 border-[#4B644C] shadow-lg flex items-center justify-center text-[#4B644C] transition-all duration-300 ${
            isDragging ? 'scale-115 ring-4 ring-[#4B644C]/30 border-[#141C15]' : 'hover:scale-110'
          }`}
        >
          <div className="flex items-center justify-center rounded-full p-1 bg-[#4B644C]/10">
            <ChevronsLeftRight className="h-4 w-4 text-[#4B644C] stroke-[2.5]" />
          </div>
        </div>
      </div>
    </div>
  );
}
