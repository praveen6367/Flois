'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Play, ExternalLink, ShieldCheck, X, Volume2, VolumeX } from 'lucide-react';

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

interface InstagramPost {
  id: string;
  type: 'image' | 'video';
  mediaUrl: string;
  posterUrl?: string;
  permalink: string;
  caption: string;
}

const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'ig-1',
    type: 'video',
    mediaUrl: '/reels/reel1_sunscreen.mp4',
    posterUrl: 'https://cdn.shopify.com/s/files/1/0675/1502/3447/files/preview_images/d7d8e4aad201423fa2567756ca61011f.thumbnail.0000000000.jpg?v=1785968750',
    permalink: 'https://www.instagram.com/p/DblH9bqzJqS/',
    caption: 'Zero visible white cast SPF 50+ De-Tan Sunscreen Gel in action. Lightweight solar defense for Indian skin. 🌿☀️ #FLOIS #SunscreenGel #DeTan',
  },
  {
    id: 'ig-2',
    type: 'video',
    mediaUrl: '/reels/reel2_hairoil.mp4',
    posterUrl: 'https://cdn.shopify.com/s/files/1/0675/1502/3447/files/preview_images/2d86176c7fa246dcab2d58a9dec57970.thumbnail.0000000000.jpg?v=1785968756',
    permalink: 'https://www.instagram.com/p/Dba2I21tVNV/',
    caption: '18 Ayurvedic botanicals powered by OleoKare® active. RootHerb Botanical Hair & Scalp Oil for daily nourishment and hair vitality. 💆‍♀️✨ #FLOIS #RootHerb #Ayurveda',
  },
  {
    id: 'ig-3',
    type: 'image',
    mediaUrl: '/products/editorial_rootherb.jpg',
    permalink: 'https://www.instagram.com/getflois',
    caption: 'Cold-pressed virgin botanical base meets 18 traditional herbs and OleoKare®. Pure botanical ritual crafted for scalp wellness.',
  },
  {
    id: 'ig-4',
    type: 'video',
    mediaUrl: '/reels/reel3_sunscreen.mp4',
    posterUrl: 'https://cdn.shopify.com/s/files/1/0675/1502/3447/files/preview_images/8aec48cb7e284311b5f96ae09a1f7fb0.thumbnail.0000000000.jpg?v=1785968745',
    permalink: 'https://www.instagram.com/p/DbX7f1avKva/',
    caption: 'Lightweight gel texture enriched with Niacinamide and botanical extracts. Seamless daily wear under any climate.',
  },
  {
    id: 'ig-5',
    type: 'image',
    mediaUrl: '/products/editorial_neem_comb.jpg',
    permalink: 'https://www.instagram.com/getflois',
    caption: 'Handcrafted artisan neem wood comb. Say goodbye to static friction & hair breakage with gentle rounded teeth. 🌿🪮',
  },
  {
    id: 'ig-6',
    type: 'video',
    mediaUrl: '/reels/reel5_hairoil.mp4',
    posterUrl: 'https://cdn.shopify.com/s/files/1/0675/1502/3447/files/preview_images/af3026e37bb642faa0b7b50152970040.thumbnail.0000000000.jpg?v=1785968747',
    permalink: 'https://www.instagram.com/p/DbN3KlepFQP/',
    caption: 'Nighttime scalp massage ritual using RootHerb Botanical Hair & Scalp Oil. Nourishment from root to tip.',
  },
];

export function InstagramFeedSection() {
  const [activeMedia, setActiveMedia] = useState<InstagramPost | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section className="relative w-full bg-[#FFFFFF] py-20 sm:py-28 border-b border-[#E8E6DF] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16">

        {/* Section Header */}
        <div className="max-w-[700px] mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF9F5] border border-[#E8E6DF]">
            <InstagramIcon className="h-3.5 w-3.5 text-[#E1306C]" />
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#111111]">
              JOIN OUR COMMUNITY
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#111111] leading-tight">
            Follow Us On Instagram{' '}
            <span className="inline-flex items-center text-[#8C9B3E]">
              @getflois
              <ShieldCheck className="h-6 w-6 ml-1.5 fill-[#8C9B3E] text-white" />
            </span>
          </h2>

          <p className="text-sm sm:text-base font-sans text-[#666666] font-light max-w-lg mx-auto">
            Tag <span className="font-semibold text-[#111111]">#FLOIS</span> or <span className="font-semibold text-[#111111]">@getflois</span> on Instagram to be featured on our official showcase.
          </p>
        </div>

        {/* 6-Grid Showcase */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => setActiveMedia(post)}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#111111] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              {post.type === 'video' ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={post.posterUrl}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                >
                  <source src={post.mediaUrl} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={post.mediaUrl}
                  alt="FLOIS Instagram post"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
              )}

              {/* Type Badge */}
              <div className="absolute top-3 right-3 z-10">
                <span className="h-7 w-7 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                  {post.type === 'video' ? (
                    <Play className="h-3.5 w-3.5 fill-white text-white translate-x-0.5" />
                  ) : (
                    <InstagramIcon className="h-3.5 w-3.5 text-white" />
                  )}
                </span>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <div className="flex items-center justify-end">
                  <ExternalLink className="h-4 w-4 opacity-80" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[11px] font-sans font-medium text-[#8C9B3E]">
                    <InstagramIcon className="h-3 w-3 text-[#E1306C]" />
                    <span>@getflois</span>
                  </div>
                  <p className="text-[10px] font-sans opacity-90 line-clamp-2 leading-tight">
                    {post.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://www.instagram.com/getflois"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#111111] hover:bg-[#8C9B3E] text-white px-8 py-4 text-xs font-sans font-bold uppercase tracking-widest transition-all duration-300 shadow-md hover:scale-105"
          >
            <InstagramIcon className="h-4 w-4" />
            <span>Follow @getflois On Instagram</span>
          </a>
        </div>

      </div>

      {/* ── Media Lightbox ── */}
      <AnimatePresence>
        {activeMedia && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
            onClick={() => setActiveMedia(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl overflow-hidden bg-black border border-white/20 shadow-2xl flex flex-col"
            >
              {/* Top Bar */}
              <div className="p-4 flex items-center justify-between border-b border-white/10 bg-black/60 z-10">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#F09433] via-[#DC2743] to-[#BC1888] p-[2px]">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white text-xs font-serif font-bold">
                      F
                    </div>
                  </div>
                  <span className="text-xs font-sans font-bold text-white">@getflois</span>
                </div>

                <div className="flex items-center gap-2">
                  {activeMedia.type === 'video' && (
                    <button
                      suppressHydrationWarning
                      onClick={() => setIsMuted(!isMuted)}
                      className="h-8 w-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                  )}
                  <button
                    suppressHydrationWarning
                    onClick={() => setActiveMedia(null)}
                    className="h-8 w-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Media Content */}
              <div className="relative aspect-square w-full bg-black">
                {activeMedia.type === 'video' ? (
                  <video
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    controls
                    poster={activeMedia.posterUrl}
                    className="w-full h-full object-cover"
                  >
                    <source src={activeMedia.mediaUrl} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={activeMedia.mediaUrl}
                    alt="FLOIS Instagram"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Caption & Actions */}
              <div className="p-4 space-y-3 bg-[#111111]">
                <div className="flex items-center justify-between text-white text-xs font-sans">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-sans font-medium text-[#8C9B3E] flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4" />
                      Official FLOIS Post
                    </span>
                  </div>

                  <a
                    href={activeMedia.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#8C9B3E] font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>View on Instagram</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <p className="text-xs font-sans text-white/80 leading-relaxed">
                  {activeMedia.caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
