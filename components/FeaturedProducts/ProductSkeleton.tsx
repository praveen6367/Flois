'use client';

import React from 'react';

export function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
      {[1, 2, 3].map((idx) => (
        <div
          key={idx}
          className="animate-pulse flex flex-col justify-between rounded-2xl border border-[#E8E6DF] bg-white p-7 shadow-sm h-[560px]"
        >
          {/* Top Badge & Action Shimmers */}
          <div className="flex items-center justify-between">
            <div className="h-5 w-28 rounded bg-[#F3F1EA]" />
            <div className="flex gap-2">
              <div className="h-9 w-9 rounded-full bg-[#F3F1EA]" />
              <div className="h-9 w-9 rounded-full bg-[#F3F1EA]" />
            </div>
          </div>

          {/* Image Shimmer */}
          <div className="my-auto mx-auto h-64 w-full rounded-xl bg-[#FAF9F5]" />

          {/* Meta & Typography Shimmers */}
          <div className="space-y-3 pt-4">
            <div className="h-3 w-20 rounded bg-[#F3F1EA]" />
            <div className="h-7 w-3/4 rounded bg-[#F3F1EA]" />
            <div className="h-4 w-full rounded bg-[#F3F1EA]" />
            <div className="h-4 w-2/3 rounded bg-[#F3F1EA]" />
            <div className="h-6 w-24 rounded bg-[#F3F1EA] pt-2" />
          </div>

          {/* Button Shimmer */}
          <div className="h-12 w-full rounded bg-[#E3E8E3] pt-4" />
        </div>
      ))}
    </div>
  );
}
