'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Check } from 'lucide-react';

interface StatisticCardProps {
  productType?: 'hair' | 'sunscreen' | 'comb';
}

export function StatisticCard({ productType = 'hair' }: StatisticCardProps) {
  const isSunscreen = productType === 'sunscreen';
  const isComb = productType === 'comb';

  const milestones = isSunscreen
    ? [
        { day: 'Day 0', label: 'Baseline', val: '0%' },
        { day: 'Day 14', label: 'Hydration', val: '+24%' },
        { day: 'Day 30', label: 'Tan Fading', val: '+68%' },
        { day: 'Day 60', label: 'UV Shield', val: '98%' },
      ]
    : isComb
    ? [
        { day: 'Day 0', label: 'Plastic Comb', val: 'High Static' },
        { day: 'Day 7', label: 'Frizz Relief', val: '-40%' },
        { day: 'Day 21', label: 'Scalp Massage', val: 'Gentle' },
        { day: 'Day 45', label: 'Anti-Static', val: '100%' },
      ]
    : [
        { day: 'Day 0', label: 'Baseline', val: '0%' },
        { day: 'Day 30', label: 'Activation', val: '+18%' },
        { day: 'Day 60', label: 'Densification', val: '+36%' },
        { day: 'Day 90', label: 'Peak Growth', val: '+51%' },
      ];

  const statNumber = isSunscreen ? '98%' : isComb ? '100%' : '51%';
  const statTitle = isSunscreen
    ? 'UV Free Radical & Solar Defense'
    : isComb
    ? 'Anti-Static Wood Smooth Glide'
    : 'Hair-Growth Rate Increase*';
  const statSubtitle = isSunscreen
    ? 'SPF 50+ PA++++ Broad-Spectrum Daily Care'
    : isComb
    ? 'Hand-Carved Seasoned Neem Wood Teeth'
    : 'Observed in 2.5% OleoKare® Clinical Study';
  const topHeader = isSunscreen
    ? 'Tested Solar & Tan Defense Efficacy'
    : isComb
    ? 'Handcrafted Artisan Wood Tool'
    : 'Powered by Clinically Studied OleoKare®';

  return (
    <div className="relative flex flex-col justify-between rounded-xl bg-[#F6F4ED] border border-[#E2DDD0] p-6 sm:p-7 lg:p-8 shadow-sm overflow-hidden h-full">
      {/* Subtle Botanical Accent Ambient Glow */}
      <div className="absolute top-0 right-0 w-56 h-56 bg-[#4B644C]/10 rounded-full blur-3xl pointer-events-none" />

      {/* ─── 1. TOP EDITORIAL HEADER ─────────────────────────────────────────────── */}
      <div className="z-10">
        <h4 className="font-serif text-2xl text-[#121412] font-normal leading-snug">
          {topHeader}
        </h4>
      </div>

      {/* ─── 2. HERO STATISTIC & COPY ───────────────────────────────────────────── */}
      <div className="my-6 space-y-1 text-left z-10">
        <div className="font-serif text-6xl sm:text-7xl lg:text-8xl font-normal tracking-tight leading-none">
          <span className="bg-gradient-to-r from-[#121412] via-[#4B644C] to-[#859844] bg-clip-text text-transparent animate-brand-gradient">
            {statNumber}
          </span>
        </div>
        <p className="font-serif text-lg sm:text-xl text-[#4B644C] font-normal italic pt-1">
          {statTitle}
        </p>
        <p className="text-xs font-sans text-[#787E78] uppercase tracking-widest pt-1">
          {statSubtitle}
        </p>
      </div>

      {/* ─── 3. LOGICALLY ALIGNED CLINICAL GROWTH GRAPH & TIMELINE ───────────────── */}
      <div className="relative my-4 z-10">
        {/* SVG Curve Container — Single, Silky Smooth Bezier Arc */}
        <div className="relative w-full h-24 sm:h-28">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 400 110" preserveAspectRatio="none">
            <defs>
              {/* Luxury Line Gradient */}
              <linearGradient id="smoothGraphStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#121412" stopOpacity="0.3" />
                <stop offset="40%" stopColor="#4B644C" />
                <stop offset="100%" stopColor="#859844" />
              </linearGradient>

              {/* Soft Translucent Fill Gradient */}
              <linearGradient id="smoothGraphFill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#859844" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#F6F4ED" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Soft Translucent Area Under Smooth Arc */}
            <motion.path
              d="M 35,95 C 150,90 260,45 365,20 L 365,110 L 35,110 Z"
              fill="url(#smoothGraphFill)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />

            {/* Continuous Silky Smooth Wave Arc */}
            <motion.path
              d="M 35,95 C 150,90 260,45 365,20"
              fill="none"
              stroke="url(#smoothGraphStroke)"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Day 0 Node (X=35, Y=95) */}
            <motion.circle
              cx="35"
              cy="95"
              r="4"
              fill="#121412"
              stroke="#F6F4ED"
              strokeWidth="2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 }}
            />

            {/* Day 30 Node (X=145, Y=73) */}
            <motion.circle
              cx="145"
              cy="73"
              r="4.5"
              fill="#4B644C"
              stroke="#F6F4ED"
              strokeWidth="2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.6 }}
            />

            {/* Day 60 Node (X=255, Y=46) */}
            <motion.circle
              cx="255"
              cy="46"
              r="5"
              fill="#4B644C"
              stroke="#F6F4ED"
              strokeWidth="2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.9 }}
            />

            {/* Day 90 Peak Node (X=365, Y=20) with Outer Glow Halo */}
            <motion.circle
              cx="365"
              cy="20"
              r="9"
              fill="none"
              stroke="#859844"
              strokeWidth="1.5"
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: [1, 1.7, 1], opacity: [0.8, 0, 0.8] }}
              viewport={{ once: true }}
              transition={{ repeat: Infinity, duration: 2.2 }}
            />
            <motion.circle
              cx="365"
              cy="20"
              r="5"
              fill="#859844"
              stroke="#F6F4ED"
              strokeWidth="2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 1.2 }}
            />
          </svg>
        </div>

        {/* 4-Column Timeline Grid Logically Aligned directly under the 4 SVG nodes */}
        <div className="grid grid-cols-4 gap-1 text-center pt-2.5 border-t border-[#E2DDD0]/80">
          {milestones.map((m, idx) => (
            <div key={idx} className="space-y-0.5">
              <div className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#787E78]">
                {m.day}
              </div>
              <div
                className={`text-[11px] font-sans font-bold tracking-tight ${
                  idx === milestones.length - 1 ? 'text-[#859844]' : 'text-[#4B644C]'
                }`}
              >
                {m.val}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 4. PROOF STATEMENTS ─────────────────────────────────────────────────── */}
      <div className="space-y-2.5 pt-4 border-t border-[#E2DDD0] z-10">
        <div className="flex items-center gap-2.5 text-xs text-[#121412] font-sans font-medium">
          <Check className="h-4 w-4 text-[#4B644C] shrink-0 stroke-[2.5]" />
          <span>
            {isSunscreen
              ? 'Non-Comedogenic & Zero White Cast'
              : isComb
              ? '100% Hand-Carved Seasoned Neem Wood'
              : '5 Cold-Pressed Carrier Oils & 12 Herbs'}
          </span>
        </div>
        <div className="flex items-center gap-2.5 text-xs text-[#121412] font-sans font-medium">
          <ShieldCheck className="h-4 w-4 text-[#4B644C] shrink-0 stroke-[2]" />
          <span>
            {isSunscreen
              ? 'Dermatologically Tested Solar Protection'
              : isComb
              ? 'Naturally Low Static Detangling'
              : 'Powered by 2.5% Clinically Studied OleoKare®'}
          </span>
        </div>
      </div>
    </div>
  );
}
