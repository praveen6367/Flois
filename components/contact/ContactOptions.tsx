'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, Mail, Briefcase, MapPin, ArrowRight } from 'lucide-react';

const CONTACT_CARDS = [
  {
    icon: PhoneCall,
    title: 'Call Us',
    value: '+91 8076 219 724',
    subtitle: 'Mon - Sat, 10am - 7pm IST',
    actionText: 'Tap to Call',
    actionHref: 'tel:+918076219724',
  },
  {
    icon: Mail,
    title: 'Customer Support',
    value: 'support@getflois.com',
    subtitle: 'Response within 24 Hours',
    actionText: 'Email Support',
    actionHref: 'mailto:support@getflois.com',
  },
  {
    icon: Briefcase,
    title: 'Sales & Partnerships',
    value: 'contact@getflois.com',
    subtitle: 'Business Enquiries',
    actionText: 'Business Contact',
    actionHref: 'mailto:contact@getflois.com',
  },
  {
    icon: MapPin,
    title: 'Business Location',
    value: 'Greater Noida, Uttar Pradesh',
    subtitle: 'VRAJA NATURALS Headquarters',
    actionText: 'View on Google Maps',
    actionHref: '#map',
  },
];

export function ContactOptions() {
  const cubicEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="relative w-full bg-[#FFFFFF] py-16 sm:py-24 border-b border-[#E8E6DF]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Responsive Grid: 4 Desktop / 2x2 Tablet / Carousel Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONTACT_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: cubicEase, delay: idx * 0.08 }}
                className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white border border-[#E8E6DF] shadow-xs hover:shadow-xl hover:border-[#4B644C]/50 transition-all duration-300 hover:-translate-y-1 text-left"
              >
                <div className="space-y-4">
                  {/* Concentric Circle Icon Badge */}
                  <div className="h-14 w-14 rounded-full bg-[#F3F1EA] border border-[#E3E8E3] flex items-center justify-center text-[#4B644C] group-hover:bg-[#4B644C] group-hover:text-white transition-colors duration-300">
                    <Icon className="h-6 w-6 stroke-[1.5]" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#787E78] block">
                      {card.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl font-normal text-[#121412] leading-tight group-hover:text-[#4B644C] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm font-sans text-[#4A4E4A] font-medium pt-1 break-all">
                      {card.value}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#E8E6DF] mt-6">
                  <a
                    href={card.actionHref}
                    className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-wider text-[#4B644C] group-hover:text-[#121412] transition-colors"
                  >
                    <span>{card.actionText}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
