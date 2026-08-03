'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CONTACT_FAQS = [
  {
    question: 'Where is FLOIS registered and operating from?',
    answer: 'FLOIS is owned and operated by VRAJA NATURALS, registered at Ground Floor, UGF03, Suite 16, Rise Shoplex, Techzone IV, Greater Noida, Gautam Buddha Nagar, Uttar Pradesh 201306 (GST: 09CBYPH5326K1ZY).'
  },
  {
    question: 'How quickly do you reply to emails and phone inquiries?',
    answer: 'Our customer care team responds to emails (support@getflois.com) within 24 hours. Phone support (+91 8076 219 724) is active Monday through Saturday from 10:00 AM to 7:00 PM IST.'
  },
  {
    question: 'Can I consult a botanical expert before placing an order?',
    answer: 'Yes! We encourage product consultations. Feel free to message us with your scalp type, hair concerns, or skin goals, and our team will recommend the ideal cold-pressed botanical regimen.'
  },
  {
    question: 'How long does shipping take across India & International?',
    answer: 'Orders across India are dispatched within 24 hours from our Greater Noida warehouse and arrive in 2–5 business days via premium express couriers with live tracking.'
  },
  {
    question: 'How do I track my existing order status?',
    answer: 'You can track your package anytime on our dedicated Track Order page (flois.in/pages/track-order) using your Order ID or phone number. Tracking details are also sent via SMS and Email upon dispatch.'
  },
];

export function ContactFAQsSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="relative w-full bg-[#FFFFFF] py-20 sm:py-28 border-b border-[#E8E6DF]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">

        {/* Header */}
        <div className="max-w-[680px] mx-auto text-center space-y-3 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-[#4B644C]" />
            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#4B644C]">
              Customer Service FAQs
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#121412]">
            Questions &amp; Assistance
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {CONTACT_FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#FAF9F5] border border-[#E8E6DF] overflow-hidden transition-shadow hover:shadow-sm"
            >
              <button
                suppressHydrationWarning
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                aria-expanded={openIdx === idx}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4B644C] focus-visible:ring-inset rounded-2xl"
              >
                <span className="font-sans text-sm sm:text-base font-semibold text-[#121412] leading-snug pr-2">
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
                  >
                    <p className="px-6 pb-5 text-xs sm:text-sm font-sans text-[#4A4E4A] font-light leading-relaxed border-t border-[#E8E6DF]/60 pt-4">
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
