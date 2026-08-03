'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { CollectionCard } from './CollectionCard';
import { Collection } from '@/types/collection';

interface CollectionScrollerProps {
  collections: Collection[];
  activeHandle?: string;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export function CollectionScroller({
  collections,
  activeHandle,
  scrollRef
}: CollectionScrollerProps) {
  return (
    <motion.div
      ref={scrollRef}
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full flex items-center justify-center gap-5 sm:gap-7 lg:gap-8 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2 px-4 sm:px-8 touch-pan-x mx-auto"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {collections.map((collection) => (
        <motion.div key={collection.id} variants={cardVariants} className="shrink-0 snap-center">
          <CollectionCard
            collection={collection}
            isActive={collection.handle === activeHandle}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
