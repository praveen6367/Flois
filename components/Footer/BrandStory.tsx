'use client';

import React from 'react';
import Image from 'next/image';

export function BrandStory() {
  return (
    <div className="w-full py-10 border-b border-[#304031]/60 text-center space-y-4">
      {/* Official Crisp White FLOIS Brand Logo */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative h-12 w-44">
          <Image
            src="/mainlogo.png"
            alt="FLOIS Official Logo"
            fill
            sizes="176px"
            className="object-contain filter brightness-0 invert"
          />
        </div>
      </div>

      {/* Short Editorial Tagline */}
      <p className="text-sm sm:text-base font-sans text-[#EAE3D2]/80 font-light leading-relaxed max-w-[600px] mx-auto">
        FLOIS combines centuries of Ayurvedic wisdom with modern clinical research for clean, effective personal care.
      </p>
    </div>
  );
}
