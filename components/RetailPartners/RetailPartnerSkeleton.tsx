'use client';

import React from 'react';

export function RetailPartnerSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((idx) => (
        <div
          key={idx}
          className="animate-pulse flex flex-col justify-between rounded-xl border border-[#E8E6DF] bg-white p-7 text-center h-[210px]"
        >
          <div className="flex justify-between items-center">
            <div className="h-3 w-20 rounded bg-[#F3F1EA]" />
            <div className="h-3 w-3 rounded bg-[#F3F1EA]" />
          </div>
          <div className="my-auto mx-auto h-8 w-28 rounded bg-[#FAF9F5]" />
          <div className="space-y-2 pt-2 border-t border-[#E8E6DF]/60">
            <div className="mx-auto h-4 w-24 rounded bg-[#F3F1EA]" />
            <div className="mx-auto h-3 w-32 rounded bg-[#F3F1EA]" />
          </div>
        </div>
      ))}
    </div>
  );
}
