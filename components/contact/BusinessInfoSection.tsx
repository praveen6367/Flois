'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, MapPin, Award, ShieldCheck } from 'lucide-react';

export function BusinessInfoSection() {
  const cubicEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="relative w-full bg-[#FFFFFF] py-20 sm:py-28 border-b border-[#E8E6DF]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 text-left">
        

        {/* Editorial Information Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Legal Entity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: cubicEase }}
            className="p-6 sm:p-8 rounded-2xl bg-[#FAF9F5] border border-[#E8E6DF] space-y-4 shadow-2xs"
          >
            <div className="h-12 w-12 rounded-full bg-[#EAF3EA] border border-[#C5D1C5] flex items-center justify-center text-[#2D5A2E]">
              <Building2 className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#787E78] block">
                LEGAL ENTITY NAME
              </span>
              <h3 className="font-serif text-2xl font-normal text-[#121412]">
                VRAJA NATURALS
              </h3>
              <p className="text-xs font-sans text-[#4A4E4A] pt-1">
                Parent Brand &amp; Manufacturer of FLOIS Botanical Products
              </p>
            </div>
          </motion.div>

          {/* Card 2: Registered Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: cubicEase, delay: 0.1 }}
            className="p-6 sm:p-8 rounded-2xl bg-[#FAF9F5] border border-[#E8E6DF] space-y-4 shadow-2xs"
          >
            <div className="h-12 w-12 rounded-full bg-[#EAF3EA] border border-[#C5D1C5] flex items-center justify-center text-[#2D5A2E]">
              <MapPin className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#787E78] block">
                REGISTERED HEADQUARTERS
              </span>
              <h3 className="font-serif text-xl font-normal text-[#121412] leading-tight">
                Ground Floor, UGF03, Suite 16
              </h3>
              <p className="text-xs font-sans text-[#4A4E4A] pt-1">
                Rise Shoplex, Techzone IV, Greater Noida
              </p>
            </div>
          </motion.div>

          {/* Card 3: District & State */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: cubicEase, delay: 0.2 }}
            className="p-6 sm:p-8 rounded-2xl bg-[#FAF9F5] border border-[#E8E6DF] space-y-4 shadow-2xs"
          >
            <div className="h-12 w-12 rounded-full bg-[#EAF3EA] border border-[#C5D1C5] flex items-center justify-center text-[#2D5A2E]">
              <Award className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#787E78] block">
                DISTRICT &amp; STATE
              </span>
              <h3 className="font-serif text-2xl font-normal text-[#121412]">
                Uttar Pradesh — 201306
              </h3>
              <p className="text-xs font-sans text-[#4A4E4A] pt-1">
                District: Gautam Buddha Nagar, India
              </p>
            </div>
          </motion.div>

          {/* Card 4: GST Registration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: cubicEase, delay: 0.3 }}
            className="p-6 sm:p-8 rounded-2xl bg-[#FAF9F5] border border-[#E8E6DF] space-y-4 shadow-2xs"
          >
            <div className="h-12 w-12 rounded-full bg-[#EAF3EA] border border-[#C5D1C5] flex items-center justify-center text-[#2D5A2E]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#787E78] block">
                OFFICIAL GST REGISTRATION
              </span>
              <h3 className="font-mono text-xl font-semibold text-[#121412] tracking-wider">
                09CBYPH5326K1ZY
              </h3>
              <p className="text-xs font-sans text-[#4A4E4A] pt-1">
                100% Tax Compliant &amp; Verified Business
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
