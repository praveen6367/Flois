'use client';

import React, { useState, useEffect } from 'react';

interface CinematicFullVideoSectionProps {
  videoId?: string;
  localVideoSrc?: string;
}

export function CinematicFullVideoSection({
  videoId = 'ZKB1zXCEPoE',
  localVideoSrc = '/placeholders/video1.mp4'
}: CinematicFullVideoSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&playsinline=1&disablekb=1`;

  return (
    <section className="relative w-full bg-black overflow-hidden select-none">
      {/* 100% Edge-to-Edge Container with Aspect-Cover Math */}
      <div className="relative w-full h-[45vh] sm:h-[65vh] lg:h-[80vh] overflow-hidden flex items-center justify-center">
        
        {/* Cover Aspect Math: min-w-[177.78vh] min-h-[56.25vw] w-[140%] h-[140%] guarantees 100% edge coverage without left/right black bars */}
        <iframe
          src={embedUrl}
          title="FLOIS Cinematic Experience Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[177.78vh] min-h-[56.25vw] w-[145%] h-[145%] object-cover pointer-events-none border-0"
        />

        {/* Local MP4 Background Video for instant 100% edge coverage */}
        <video
          src={localVideoSrc}
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 pointer-events-none ${
            isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />

        {/* Soft Ambient Overlay Concealer */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-1000 pointer-events-none ${
            isLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>
    </section>
  );
}
