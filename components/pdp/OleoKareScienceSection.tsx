'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Activity, TrendingUp, CheckCircle2, FlaskConical, Award } from 'lucide-react';

interface MetricItem {
  value: string;
  prefix?: string;
  label: string;
  sublabel: string;
  highlightColor: string;
}

const OLEOKARE_METRICS: MetricItem[] = [
  {
    prefix: 'Up to',
    value: '+51%',
    label: 'Increase in hair-growth rate',
    sublabel: 'Active growth phase support',
    highlightColor: 'from-[#4B644C] to-[#8C9B3E]',
  },
  {
    prefix: 'Up to',
    value: '-57%',
    label: 'Reduction in hair fall',
    sublabel: 'Follicle retention & root anchoring',
    highlightColor: 'from-[#3D523E] to-[#607D3B]',
  },
  {
    prefix: 'Up to',
    value: '+81%',
    label: 'Improvement in hair thickness',
    sublabel: 'Cortex lipid & strand volume boost',
    highlightColor: 'from-[#4B644C] to-[#ACB041]',
  },
  {
    prefix: 'Up to',
    value: '+30%',
    label: 'Increase in hair density',
    sublabel: 'Visible scalp coverage improvement',
    highlightColor: 'from-[#2D5A2E] to-[#8C9B3E]',
  },
  {
    prefix: 'Up to',
    value: '-63%',
    label: 'Reduction in premature greying*',
    sublabel: 'Antioxidant melanocyte defense',
    highlightColor: 'from-[#4B644C] to-[#6B8E23]',
  },
];

export function OleoKareScienceSection() {
  return (
    <section className="relative w-full bg-[#FAF9F5] text-[#121412] py-20 sm:py-28 lg:py-32 overflow-hidden border-b border-[#E8E6DF]">
      {/* Subtle Botanical Aura Gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#EAF3EA]/70 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#FAF3DD]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="max-w-[840px] mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#D5E2D5] shadow-xs"
          >
            <FlaskConical className="h-4 w-4 text-[#4B644C]" />
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.22em] text-[#4B644C]">
              CLINICALLY STUDIED BOTANICAL ACTIVE
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-[#121412]"
          >
            The Science Behind FLOIS RootHerb Hair Growth Oil
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="inline-block"
          >
            <span className="font-serif text-xl sm:text-2xl italic text-[#4B644C]">
              Powered by OleoKare®
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg font-sans text-[#4A4E4A] leading-relaxed max-w-2xl mx-auto font-light"
          >
            OleoKare® is a botanical active at the heart of the RootHerb™ formula. It has been clinically studied at a <strong>2.5% concentration</strong>, with the study observing improvements across key hair-growth and hair-care parameters.
          </motion.p>
        </div>

        {/* 5-Card Metrics Grid */}
        <div className="mb-14">
          <div className="text-center mb-8">
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#787E78]">
              CLINICALLY STUDIED RESULTS (2.5% OleoKare® Active)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
            {OLEOKARE_METRICS.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="group relative flex flex-col justify-between rounded-2xl bg-white border border-[#E2DDD0] p-6 text-left shadow-xs hover:shadow-md hover:border-[#4B644C]/40 transition-all duration-300"
              >
                {/* Top Prefix Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#787E78]">
                    {item.prefix}
                  </span>
                  <Activity className="h-3.5 w-3.5 text-[#8C9B3E] opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Big Metric Display */}
                <div className="space-y-1 my-2">
                  <div className={`font-serif text-4xl sm:text-5xl font-normal tracking-tight bg-gradient-to-r ${item.highlightColor} bg-clip-text text-transparent`}>
                    {item.value}
                  </div>
                  <h4 className="font-serif text-base sm:text-lg text-[#121412] font-normal leading-snug pt-1">
                    {item.label}
                  </h4>
                </div>

                {/* Subtitle / Context */}
                <p className="text-xs font-sans text-[#787E78] font-light mt-3 pt-3 border-t border-[#F0ECE1]">
                  {item.sublabel}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Formula Pillars Bar */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-white border border-[#E2DDD0] p-6 sm:p-8 mb-10 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left divide-y sm:divide-y-0 sm:divide-x divide-[#E8E6DF]">
            <div className="space-y-1 sm:pr-6">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#4B644C]">
                01 · THE BOTANICAL ACTIVE
              </span>
              <h5 className="font-serif text-lg text-[#121412]">OleoKare® Active Complex</h5>
              <p className="text-xs font-sans text-[#666666] font-light leading-relaxed">
                Standardized botanical extract clinically researched at 2.5% concentration for follicular vitality.
              </p>
            </div>

            <div className="space-y-1 sm:px-6 pt-4 sm:pt-0">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#4B644C]">
                02 · AYURVEDIC INFUSION
              </span>
              <h5 className="font-serif text-lg text-[#121412]">12 Classical Herbs</h5>
              <p className="text-xs font-sans text-[#666666] font-light leading-relaxed">
                Bhringraj, Rosemary, Amla, and 9 complementary herbs slow-steeped using traditional methods.
              </p>
            </div>

            <div className="space-y-1 sm:pl-6 pt-4 sm:pt-0">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#4B644C]">
                03 · PURE CARRIER BASE
              </span>
              <h5 className="font-serif text-lg text-[#121412]">5 Cold-Pressed Oils</h5>
              <p className="text-xs font-sans text-[#666666] font-light leading-relaxed">
                Virgin sesame and coconut oil matrix formulated to deliver nutrients without sticky scalp build-up.
              </p>
            </div>
          </div>
        </div>

        {/* Mandatory Regulatory Asterisk Footnote */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-sans text-[#787E78] font-light leading-relaxed bg-[#F4F2EC] px-6 py-4 rounded-xl border border-[#E2DDD0]">
            <strong>*Disclaimer:</strong> Results shown are from the OleoKare® clinical study at a 2.5% concentration. They should not be interpreted as guaranteed results from RootHerb™. Individual results may vary based on consistency, scalp condition, and usage routine.
          </p>
        </div>

      </div>
    </section>
  );
}
