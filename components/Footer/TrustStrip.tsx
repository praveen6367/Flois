'use client';

import React from 'react';
import { ShieldCheck, Truck, Award, RotateCcw, Headphones } from 'lucide-react';

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: 'Secure Checkout',
    desc: '256-Bit Encrypted Payments'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    desc: 'Express Pan-India Shipping'
  },
  {
    icon: Award,
    title: 'Verified Products',
    desc: '100% Authentic Botanicals'
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    desc: 'Hassle-Free Support Guarantee'
  }
];

export function TrustStrip() {
  return (
    <div className="w-full py-12 border-b border-[#304031]/60">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TRUST_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#C2CE94]/60 transition-all duration-300 shadow-sm"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#4B644C]/30 text-[#C2CE94] border border-[#C2CE94]/30">
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-left space-y-0.5">
                <h5 className="font-serif text-base text-[#FAF9F5] font-normal">
                  {item.title}
                </h5>
                <p className="text-xs font-sans text-[#EAE3D2]/70 font-light">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
