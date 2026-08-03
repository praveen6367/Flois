'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    question: 'How quickly can I expect to see visible hair fall reduction?',
    answer: 'Most users notice a clear drop in daily comb hair fall within 2–3 weeks of regular application (3× weekly). Baby hair regrowth along hairlines typically becomes visible around week 4–6.'
  },
  {
    question: 'Is this oil suitable for color-treated or chemically straightened hair?',
    answer: 'Yes, absolutely. All FLOIS formulas are 100% natural, sulfate-free, and mineral-oil free — completely safe for color-treated, keratin-treated, or chemically processed hair.'
  },
  {
    question: 'Can I leave the RootHerb hair oil on overnight?',
    answer: 'Yes. Leaving the oil overnight allows deep penetration into dormant scalp follicles. Simply rinse the next morning with a mild, sulfate-free cleanser.'
  },
  {
    question: 'Will this cause scalp breakouts or greasiness?',
    answer: 'No. FLOIS formulas are non-comedogenic and rapidly absorbed without blocking scalp pores. They are specifically designed to be lightweight and non-greasy.'
  },
  {
    question: 'How often should I use the oil for best results?',
    answer: 'We recommend applying 3–4 times per week for the first 8 weeks. After that, you can reduce to twice weekly for maintenance. Consistency is key to sustained results.'
  },
  {
    question: 'Is FLOIS RootHerb suitable for all hair types?',
    answer: 'Yes. The formula is dermatologist-tested and suitable for all hair types including dry, oily, fine, thick, curly, and straight. It is also safe for sensitive scalps.'
  },
];

export function ProductFAQs() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      className="relative w-full bg-[#FAFAF8] py-20 sm:py-28 border-b border-[#E8E6DF]"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="max-w-[680px] mx-auto text-center space-y-3 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-[#4B644C]" />
            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#4B644C]">
              Frequently Asked Questions
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#0F1410]">
            Everything You Need To Know
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div
          className="max-w-3xl mx-auto space-y-2.5"
          itemScope
          itemType="https://schema.org/FAQPage"
        >
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-[#E8E6DF] overflow-hidden transition-shadow hover:shadow-sm"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                suppressHydrationWarning
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                aria-expanded={openIdx === idx}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4B644C] focus-visible:ring-inset rounded-2xl"
              >
                <span
                  itemProp="name"
                  className="font-sans text-[14px] sm:text-[15px] font-semibold text-[#0F1410] leading-snug pr-2"
                >
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-[#4B644C] shrink-0 transition-transform duration-300 ${
                    openIdx === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <p
                      itemProp="text"
                      className="px-6 pb-5 text-[13px] font-sans text-[#4A4E4A] font-light leading-relaxed border-t border-[#F0EDE6] pt-4"
                    >
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
