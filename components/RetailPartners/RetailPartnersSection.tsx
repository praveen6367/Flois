'use client';

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { RetailPartnerMetaobject } from '@/types/metaobject';
import { RetailPartnerCard } from './RetailPartnerCard';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface RetailPartnersSectionProps {
  partners?: RetailPartnerMetaobject[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};

export function RetailPartnersSection({
  partners = [],
  eyebrow = 'SHOP WITH CONFIDENCE',
  title = 'Available Through Trusted Retail Partners',
  subtitle = 'Choose the shopping experience you prefer. Every order is backed by the official FLOIS product guarantee.'
}: RetailPartnersSectionProps) {
  const displayPartners = partners && partners.length > 0 ? partners : [];

  return (
    <section className="w-full bg-[#FFFFFF] border-b border-[#E8E6DF] py-20 lg:py-24 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-[700px] mx-auto text-center space-y-3.5 mb-14 sm:mb-16">
          {/* Editorial Eyebrow */}
          <div className="inline-flex items-center gap-2.5">
            <ShieldCheck className="h-4 w-4 text-[#4B644C]" />
            <span className="text-xs font-sans font-semibold uppercase tracking-widest text-[#4B644C]">
              {eyebrow}
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.1] tracking-tight text-[#121412]">
            {title}
          </h2>

          {/* Supporting Copy */}
          <p className="text-sm sm:text-base font-sans text-[#4A4E4A] leading-relaxed font-light max-w-xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Partners Showcase Grid / Mobile Snap Carousel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {displayPartners.map((partner) => (
            <motion.div key={partner.id} variants={itemVariants}>
              <RetailPartnerCard partner={partner} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
