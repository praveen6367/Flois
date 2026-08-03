'use client';

import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

export function InteractiveMapSection() {
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.743210459381!2d77.447842!3d28.577456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef6f0b4d4b1f%3A0xa6f85419992c90c!2sRise%20Shoplex%2C%20Techzone%20IV%2C%20Greater%20Noida%2C%20Uttar%20Pradesh%20201306!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";
  const directMapsLink = "https://maps.google.com/?q=Rise+Shoplex,+Techzone+IV,+Greater+Noida,+Uttar+Pradesh+201306";

  return (
    <section id="map" className="relative w-full bg-[#FAF9F5] py-20 sm:py-28 border-b border-[#E8E6DF]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="max-w-[700px] text-left mb-10 space-y-2">
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#4B644C] block">
            LOCATION MATRIX
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#121412]">
            Find Us on the Map
          </h2>
        </div>

        {/* Map Stage */}
        <div className="relative w-full h-[450px] sm:h-[520px] rounded-3xl overflow-hidden border border-[#E8E6DF] shadow-2xl bg-[#EAF3EA]">
          <iframe
            title="FLOIS VRAJA NATURALS Office Location Map"
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale-[25%] opacity-95"
          />

          {/* Floating Address Badge Overlay */}
          <div className="absolute bottom-6 left-6 right-6 sm:right-auto max-w-md bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-[#E8E6DF] shadow-2xl space-y-3 text-left">
            <div className="flex items-center gap-2 text-[#4B644C]">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="text-[10px] font-sans font-semibold uppercase tracking-widest">
                VRAJA NATURALS HEADQUARTERS
              </span>
            </div>

            <div className="space-y-0.5 text-xs font-sans text-[#121412]">
              <p className="font-semibold">Ground Floor, UGF03, Suite 16, Rise Shoplex</p>
              <p className="text-[#4A4E4A]">Techzone IV, Greater Noida, UP 201306</p>
            </div>

            <a
              href={directMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#141C15] text-white text-[11px] font-sans font-semibold uppercase tracking-wider hover:bg-[#4B644C] transition-colors"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
