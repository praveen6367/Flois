'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { VideoStoryMetaobject } from '@/types/metaobject';
import { VideoCarousel } from './VideoCarousel';
import { VideoModal } from './VideoModal';
import { useVideoStories } from '@/hooks/useVideoStories';
import { ShieldCheck } from 'lucide-react';

interface VideoStoriesSectionProps {
  stories?: VideoStoryMetaobject[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export function VideoStoriesSection({
  stories = [],
  eyebrow = 'EXPERT CLINICAL REVIEWS',
  title = 'Recommended by Doctors & Experts',
  subtitle = 'Discover clinical assessments and dermatological evaluations of FLOIS botanical formulations by leading medical specialists.'
}: VideoStoriesSectionProps) {
  const { selectedStory, openModal, closeModal } = useVideoStories();
  const displayStories = stories && stories.length > 0 ? stories : [];

  return (
    <section className="relative w-full bg-[#FFFFFF] text-[#121412] py-20 sm:py-28 lg:py-32 overflow-hidden border-b border-[#E8E6DF]">
      {/* Subtle Botanical Ambient Lighting Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#FAF9F5] rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="max-w-[700px] mx-auto text-center space-y-4 mb-14 sm:mb-18"
        >
          <div className="inline-flex items-center gap-2.5">
            <span className="h-[1px] w-6 bg-[#4B644C]" />
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#4B644C]">
              {eyebrow}
            </span>
            <ShieldCheck className="h-4 w-4 text-[#4B644C]" />
            <span className="h-[1px] w-6 bg-[#4B644C]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-[#121412]">
            {title}
          </h2>

          <p className="text-base sm:text-lg font-sans text-[#4A4E4A] leading-relaxed max-w-xl mx-auto font-light">
            {subtitle}
          </p>
        </motion.div>

        {/* Editorial Horizontal Video Carousel Showcase */}
        {displayStories.length > 0 && (
          <VideoCarousel
            stories={displayStories}
            onSelectStory={openModal}
          />
        )}

      </div>

      {/* Interactive Lightbox Video Modal */}
      <VideoModal
        story={selectedStory}
        isOpen={Boolean(selectedStory)}
        onClose={closeModal}
      />
    </section>
  );
}
