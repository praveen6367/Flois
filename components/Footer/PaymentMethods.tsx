'use client';

import React from 'react';

const PAYMENT_METHODS = [
  'VISA',
  'MASTERCARD',
  'RUPAY',
  'UPI',
  'G-PAY',
  'APPLE PAY',
  'PHONEPE',
  'PAYTM'
];

export function PaymentMethods() {
  return (
    <div className="w-full py-8 border-b border-[#304031]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
      <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#C2CE94]">
        ACCEPTED PAYMENT METHODS
      </span>

      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {PAYMENT_METHODS.map((method, idx) => (
          <span
            key={idx}
            className="inline-flex items-center justify-center rounded bg-white/5 border border-white/10 px-3 py-1.5 text-[10px] font-mono font-bold tracking-wider text-[#EAE3D2]/80 hover:text-white hover:border-[#C2CE94] hover:bg-[#4B644C]/30 transition-all cursor-default shadow-sm"
          >
            {method}
          </span>
        ))}
      </div>
    </div>
  );
}
