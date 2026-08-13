'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import {
  ArrowRight,
  Leaf,
  ShieldCheck,
  Droplet,
  FlaskConical,
  Sun,
  Droplets,
  Smile,
  Gift
} from 'lucide-react';

export interface TrustFeature {
  iconName: string;
  label: string;
}

export interface SlideData {
  id: string;
  categoryTitle: string;
  headlineMain?: string;
  headlineHighlight1: string;
  headlineMiddle: string;
  headlineHighlight2: string;
  headlineEnd: string;
  description?: string;          // short supporting line for mobile
  bgImage: string;
  mobileBgImage?: string;
  giftTitle: string;
  giftSubtitle?: string;
  shopLink: string;
  ctaText: string;
  isLightTheme?: boolean;
  trustFeatures?: TrustFeature[];
}

interface HeroSlideProps {
  slide: SlideData;
  isActive: boolean;
}

const contentVariants: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: 'easeOut',
      staggerChildren: 0.07,
      delayChildren: 0.08
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
};

export function HeroSlide({ slide, isActive }: HeroSlideProps) {
  const isLight = Boolean(slide.isLightTheme);

  const renderIcon = (name: string) => {
    const iconColor = isLight ? 'text-[#8C9B3E]' : 'text-[#CBD285]';
    const cls = `h-3.5 w-3.5 sm:h-4 sm:w-4 ${iconColor}`;
    switch (name) {
      case 'leaf': return <Leaf className={cls} />;
      case 'toxins': return <ShieldCheck className={cls} />;
      case 'oil': return <Droplet className={cls} />;
      case 'chemicals': return <FlaskConical className={cls} />;
      case 'sun': return <Sun className={cls} />;
      case 'uv': return <ShieldCheck className={cls} />;
      case 'water': return <Droplets className={cls} />;
      case 'skin': return <Smile className={cls} />;
      default: return <Leaf className={cls} />;
    }
  };

  const defaultTrustFeatures: TrustFeature[] = slide.trustFeatures || [
    { iconName: 'leaf', label: 'Lightweight' },
    { iconName: 'toxins', label: 'No Toxins' },
    { iconName: 'oil', label: 'No Mineral Oil' },
    { iconName: 'chemicals', label: 'No Chemicals' }
  ];

  const gradientTextClass = isLight
    ? 'bg-gradient-to-r from-[#111111] via-[#8C9B3E] to-[#6A9739] bg-clip-text text-transparent font-normal'
    : 'bg-gradient-to-r from-[#FAF9F5] via-[#CBD285] to-[#8C9B3E] bg-clip-text text-transparent font-normal';

  const mobileBg = slide.mobileBgImage || slide.bgImage;

  return (
    <div className="relative w-full h-full overflow-hidden">

      {/* =============================================
          MOBILE LAYOUT (< sm) — full 9:16 portrait
          image, centered text top, CTA bottom
      ============================================= */}
      <div className="sm:hidden relative w-full h-full">
        {/* Full-bleed portrait image — 9:16 container matches image ratio exactly, no crop */}
        <Image
          src={mobileBg}
          alt={slide.categoryTitle}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Soft white gradient at top so text is always readable */}
        <div className="absolute inset-x-0 top-0 h-[50%] bg-gradient-to-b from-white/95 via-white/85 to-transparent z-10" />

        {/* Text content — centered, top section */}
        <div className="absolute inset-x-0 top-0 z-20 flex flex-col items-center text-center px-6 pt-8">
          <motion.div
            key={`${slide.id}-mobile`}
            variants={contentVariants}
            initial="hidden"
            animate={isActive ? 'visible' : 'hidden'}
            className="w-full space-y-3"
          >
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-2">
              <span className="h-px w-5 bg-[#8C9B3E]" />
              <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#8C9B3E]">
                {slide.categoryTitle}
              </span>
              <span className="h-px w-5 bg-[#8C9B3E]" />
            </motion.div>

            {/* Headline — larger */}
            <motion.h1
              variants={itemVariants}
              className="font-serif text-[2.05rem] leading-[1.08] tracking-tight text-[#111111]"
            >
              <span className={gradientTextClass}>{slide.headlineHighlight1}</span>
              <span className="font-serif font-light opacity-80"> {slide.headlineMiddle} </span>
              <span className={gradientTextClass}>{slide.headlineHighlight2}</span>
              <span className="font-serif font-light opacity-80"> {slide.headlineEnd}</span>
            </motion.h1>

            {/* Short description */}
            {slide.description && (
              <motion.p
                variants={itemVariants}
                className="text-[12px] font-sans font-light text-[#333333] leading-relaxed px-2"
              >
                {slide.description}
              </motion.p>
            )}
          </motion.div>
        </div>

        {/* Soft white gradient at bottom so CTA is always readable */}
        <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-white/95 via-white/70 to-transparent z-10" />

        {/* CTA — centered, bottom section above pagination controls */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center pb-14 px-6">
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate={isActive ? 'visible' : 'hidden'}
            className="flex flex-col items-center gap-2"
          >
            <motion.div variants={itemVariants}>
              <Link
                href={slide.shopLink}
                className="inline-flex items-center gap-2 rounded bg-[#8C9B3E] hover:bg-[#7A8834] text-white px-7 py-3 text-[11px] font-semibold uppercase tracking-widest transition-all duration-300 shadow-lg"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>

            {slide.giftTitle && (
              <motion.div variants={itemVariants} className="flex items-center gap-1.5">
                <Gift className="h-3 w-3 text-[#8C9B3E] shrink-0" />
                <span className="font-serif italic text-[11px] text-[#111111]/75">
                  Complimentary {slide.giftTitle} with order
                </span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>


      {/* =============================================
          DESKTOP LAYOUT (≥ sm) — Original landscape
          design with left text, right product image
      ============================================= */}
      <div
        className={`hidden sm:block relative w-full h-full ${
          isLight ? 'bg-[#F8F6F3]' : 'bg-[#0D140E]'
        }`}
      >
        {/* Background Image */}
        <Image
          src={slide.bgImage}
          alt={slide.categoryTitle}
          fill
          priority
          sizes="(max-width: 1600px) 100vw, 1600px"
          className="object-cover object-top"
        />

        {/* Vignette Overlay */}
        <div
          className={`absolute inset-0 z-10 ${
            isLight
              ? 'bg-gradient-to-r from-[#F8F6F3]/92 via-[#F8F6F3]/55 to-transparent'
              : 'bg-gradient-to-r from-[#0D140E]/88 via-[#0D140E]/45 to-transparent'
          }`}
        />

        {/* Left Content Container */}
        <div className="relative z-20 h-full max-w-[1440px] mx-auto px-6 pl-12 sm:pl-20 lg:pl-24 pr-6 flex items-center">
          <motion.div
            key={`${slide.id}-desktop`}
            variants={contentVariants}
            initial="hidden"
            animate={isActive ? 'visible' : 'hidden'}
            className="max-w-xl text-left space-y-4 sm:space-y-5 py-6"
          >
            {/* Overline Category Title */}
            <motion.div variants={itemVariants} className="space-y-1">
              <div className="inline-flex items-center gap-2">
                <span className={`h-[1px] w-6 ${isLight ? 'bg-[#8C9B3E]' : 'bg-[#A3B177]'}`} />
                <h3
                  className={`font-serif text-lg sm:text-xl lg:text-2xl tracking-wide font-normal ${
                    isLight ? 'text-[#8C9B3E]' : 'text-[#CBD285]'
                  }`}
                >
                  {slide.categoryTitle}
                </h3>
                <span className={`text-xs ${isLight ? 'text-[#8C9B3E]' : 'text-[#CBD285]'}`}>❦</span>
                <span className={`h-[1px] w-6 ${isLight ? 'bg-[#8C9B3E]' : 'bg-[#A3B177]'}`} />
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants} className="space-y-1">
              <h1
                className={`font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight drop-shadow-sm ${
                  isLight ? 'text-[#111111]' : 'text-white'
                }`}
              >
                <span className={gradientTextClass}>{slide.headlineHighlight1}</span>
                <span className="font-serif font-light opacity-90"> {slide.headlineMiddle} </span>
                <span className={gradientTextClass}>{slide.headlineHighlight2}</span>
                <span className="font-serif font-light opacity-90"> {slide.headlineEnd}</span>
              </h1>
            </motion.div>

            {/* Trust Feature Icons */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 sm:gap-6 pt-1 flex-wrap">
              {defaultTrustFeatures.slice(0, 4).map((feat, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center text-center gap-1 group cursor-pointer shrink-0">
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-300 shadow-sm ${
                        isLight
                          ? 'border-[#E8E6DF] bg-white group-hover:border-[#8C9B3E] group-hover:scale-105 group-hover:bg-[#8C9B3E]/10'
                          : 'border-[#CBD285]/40 bg-[#0D140E]/50 backdrop-blur-md group-hover:border-[#CBD285] group-hover:scale-105 group-hover:bg-[#CBD285]/15'
                      }`}
                    >
                      {renderIcon(feat.iconName)}
                    </div>
                    <span
                      className={`text-[10px] sm:text-[11px] font-sans font-medium tracking-tight ${
                        isLight ? 'text-[#111111]' : 'text-[#EAE3D2]'
                      }`}
                    >
                      {feat.label}
                    </span>
                  </div>

                  {idx < Math.min(defaultTrustFeatures.length, 4) - 1 && (
                    <span
                      className={`h-5 w-[1px] shrink-0 ${
                        isLight ? 'bg-[#111111]/15' : 'bg-[#CBD285]/25'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={itemVariants} className="pt-2 space-y-2.5">
              <Link
                href={slide.shopLink}
                className="inline-flex items-center gap-3 rounded bg-[#8C9B3E] hover:bg-[#7A8834] text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] shrink-0"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              {slide.giftTitle && (
                <div className="flex items-center gap-2 text-xs text-opacity-80 pt-0.5">
                  <Gift className={`h-3.5 w-3.5 shrink-0 ${isLight ? 'text-[#4B644C]' : 'text-[#C2CE94]'}`} />
                  <span className={`font-serif italic text-xs ${isLight ? 'text-[#121412]/80' : 'text-[#EAE3D2]/85'}`}>
                    Complimentary {slide.giftTitle} with order
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
