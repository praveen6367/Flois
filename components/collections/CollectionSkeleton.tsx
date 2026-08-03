'use client';

import React from 'react';

export function CollectionSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="flex items-center gap-6 sm:gap-8 overflow-hidden py-4">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="flex flex-col items-center gap-2.5 shrink-0 animate-pulse">
          {/* Circular Skeleton */}
          <div className="rounded-full bg-[#E8E6DF]/60 w-[72px] h-[72px] sm:w-[82px] sm:h-[82px] lg:w-[96px] lg:h-[96px]" />
          {/* Label Skeleton */}
          <div className="h-3 w-16 rounded bg-[#E8E6DF]/60" />
        </div>
      ))}
    </div>
  );
}
