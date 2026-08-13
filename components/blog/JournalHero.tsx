import React from 'react';

export function JournalHero() {
  return (
    <section className="relative w-full bg-[#FAFAF8] pt-28 pb-20 overflow-hidden border-b border-[#E8E6DF]">
      {/* Soft radial botanical glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_center,_#4B644C18_0%,_transparent_70%)]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-12 text-center relative z-10">
        {/* Eyebrow */}
        <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.35em] text-[#4B644C] mb-5">
          FLOIS EDITORIAL
        </p>

        {/* Main heading */}
        <h1
          className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal text-[#121412] leading-[1.02] tracking-tight mb-6"
        >
          The FLOIS Journal
        </h1>

        {/* Botanical divider */}
        <div className="flex items-center justify-center gap-4 my-7">
          <div className="h-px w-16 bg-[#C8A96E]/50" />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#4B644C]">
            <path d="M12 2C12 2 8 6 8 10C8 12.2 9.8 14 12 14C14.2 14 16 12.2 16 10C16 6 12 2 12 2Z" fill="currentColor" opacity="0.6"/>
            <path d="M12 14C12 14 6 16 6 20H18C18 16 12 14 12 14Z" fill="currentColor" opacity="0.4"/>
          </svg>
          <div className="h-px w-16 bg-[#C8A96E]/50" />
        </div>

        {/* Supporting line */}
        <p className="text-sm sm:text-base font-sans font-light text-[#4A4E4A] leading-relaxed max-w-lg mx-auto">
          Modern Ayurvedic insights, ingredient science and botanical wellness.
        </p>
      </div>
    </section>
  );
}
