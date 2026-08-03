'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export function VerifiedBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-[#F0F7F0] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#2D5A2E] border border-[#C5D1C5] ${className}`}
    >
      <CheckCircle2 className="h-3 w-3 text-[#2D5A2E] stroke-[2.5]" />
      <span>Verified Customer</span>
    </span>
  );
}
