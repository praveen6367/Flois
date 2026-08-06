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
    <div className="w-full py-8 border-b border-[#E8E6DF] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
      <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#8C9B3E]">
        ACCEPTED PAYMENT METHODS
      </span>

      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {PAYMENT_METHODS.map((method, idx) => (
          <span
            key={idx}
            className="inline-flex items-center justify-center rounded bg-white border border-[#E8E6DF] px-3 py-1.5 text-[10px] font-mono font-bold tracking-wider text-[#333333] hover:text-[#111111] hover:border-[#8C9B3E] hover:bg-[#F2F4E6] transition-all cursor-default shadow-2xs"
          >
            {method}
          </span>
        ))}
      </div>
    </div>
  );
}
