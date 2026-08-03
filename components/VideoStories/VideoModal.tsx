'use client';

import React, { useState, useRef, useEffect } from 'react';
import { VideoStoryMetaobject } from '@/types/metaobject';
import { ProductLink } from './ProductLink';
import { X, Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';

interface VideoModalProps {
  story: VideoStoryMetaobject | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ story, isOpen, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !story) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration || 1;
      setProgress((current / duration) * 100);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dark Glass Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Modal Card Container */}
      <div className="relative w-full max-w-4xl rounded-2xl bg-[#141C15] text-[#FAF9F5] shadow-2xl border border-white/15 overflow-hidden z-10 my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-md transition-colors"
          aria-label="Close video story modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
          {/* Video Player Column (7 Cols ~ Portrait 9:16) */}
          <div className="md:col-span-7 relative bg-black flex items-center justify-center min-h-[440px] sm:min-h-[540px]">
            <video
              ref={videoRef}
              src={story.videoUrl}
              poster={story.posterImage}
              autoPlay
              playsInline
              loop
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onClick={togglePlay}
              className="w-full h-full object-cover max-h-[640px] cursor-pointer"
            />

            {/* Video Controls Bar Overlay */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col gap-2.5 z-20">
              {/* Timeline Progress Bar */}
              <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden cursor-pointer">
                <div
                  className="h-full bg-[#C2CE94] transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-md text-white hover:bg-white/30 transition-colors"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="h-4 w-4 fill-white" /> : <Play className="h-4 w-4 fill-white ml-0.5" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-md text-white hover:bg-white/30 transition-colors"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                </div>

                <span className="text-xs font-mono text-white/80">{story.duration}</span>
              </div>
            </div>
          </div>

          {/* Side Info & Linked Product Column (5 Cols) */}
          <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#141C15] border-t md:border-t-0 md:border-l border-white/10">
            <div className="space-y-4">
              <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#C2CE94]">
                {story.category}
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-snug text-white">
                {story.title}
              </h3>

              <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed font-light">
                {story.description}
              </p>
            </div>

            {/* Product Connection */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#C2CE94] block">
                Shop Product In Video
              </span>

              <ProductLink
                productHandle={story.productHandle}
                productTitle={story.productTitle}
                productPrice={story.productPrice}
                productImage={story.productImage}
                onCloseModal={onClose}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
