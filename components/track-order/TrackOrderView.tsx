'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Search,
  MapPin,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  PhoneCall,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface OrderTimelineEvent {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

interface SimulatedOrder {
  orderNumber: string;
  awbNumber: string;
  courier: string;
  courierTrackingUrl: string;
  status: 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Processing';
  estimatedDelivery: string;
  destination: string;
  items: Array<{
    name: string;
    quantity: number;
    size: string;
  }>;
  timeline: OrderTimelineEvent[];
}

const FAQS = [
  {
    q: 'How do I find my FLOIS Order Number or AWB?',
    a: 'Your Order Number (e.g., #FL-10482) is sent immediately via email and SMS/WhatsApp upon completing checkout. Once your package leaves our Greater Noida facility, your Courier AWB tracking number is shared via SMS.',
  },
  {
    q: 'When will my order be dispatched?',
    a: 'Orders placed before 2:00 PM IST (Monday through Saturday) are prepared, quality checked, and handed over to our courier partner the same day. Orders placed on Sunday are dispatched Monday morning.',
  },
  {
    q: 'How long does standard delivery take across India?',
    a: 'Metro cities (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata): 2–3 business days. Rest of India / Tier 2 & 3 cities: 3–5 business days.',
  },
  {
    q: 'Can I pay Cash on Delivery (COD)?',
    a: 'Yes! Cash on Delivery is available across 19,000+ PIN codes in India. Please keep the exact order amount ready at the time of delivery.',
  },
  {
    q: 'My tracking link says "Shipment Created / In Transit" with no update?',
    a: 'Courier networks periodically sync hub scan data. If your tracking status has not updated for more than 24 hours, reach out to our logistics desk directly via WhatsApp for instant priority escalation.',
  },
];

export function TrackOrderView() {
  const [activeTab, setActiveTab] = useState<'order' | 'awb'>('order');
  const [orderInput, setOrderInput] = useState('');
  const [contactInput, setContactInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [trackedOrder, setTrackedOrder] = useState<SimulatedOrder | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderInput.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    setTimeout(() => {
      setIsLoading(false);
      const cleaned = orderInput.trim().toUpperCase();
      const orderNum = cleaned.startsWith('#') ? cleaned : `#FL-${cleaned.replace(/\D/g, '') || '84291'}`;
      
      setTrackedOrder({
        orderNumber: orderNum,
        awbNumber: `BLUEDART-${Math.floor(100000000 + Math.random() * 900000000)}`,
        courier: 'Blue Dart Express',
        courierTrackingUrl: 'https://www.bluedart.com',
        status: 'In Transit',
        estimatedDelivery: 'Thursday, 3:00 PM - 7:00 PM',
        destination: 'Recipient Address Provided at Checkout',
        items: [
          {
            name: 'RootHerb™ Botanical Hair & Scalp Oil (100ml)',
            quantity: 1,
            size: '100ml Glass Bottle + Free Neem Comb',
          },
          {
            name: 'De-Tan Sunscreen Gel SPF 50+ PA++++ (50g)',
            quantity: 1,
            size: '50g Airless Pump',
          },
        ],
        timeline: [
          {
            title: 'Order Confirmed & Prepared',
            description: 'Order placed, payment/COD verified, packaged in eco-friendly tamper-evident box.',
            date: 'Yesterday',
            time: '03:15 PM',
            location: 'FLOIS Fulfillment Center, Greater Noida, UP',
            isCompleted: true,
            isCurrent: false,
          },
          {
            title: 'Handed Over to Courier',
            description: 'Package picked up by Blue Dart logistics team and manifested.',
            date: 'Yesterday',
            time: '07:45 PM',
            location: 'Blue Dart Hub, Noida UP',
            isCompleted: true,
            isCurrent: false,
          },
          {
            title: 'In Transit — Inter-City Logistics',
            description: 'Package in transit to your regional delivery hub.',
            date: 'Today',
            time: '06:30 AM',
            location: 'Regional Sorting Facility',
            isCompleted: true,
            isCurrent: true,
          },
          {
            title: 'Out for Delivery',
            description: 'Courier associate assigned with delivery vehicle. OTP / verification on delivery.',
            date: 'Expected Tomorrow',
            time: 'Morning',
            location: 'Local Delivery Station',
            isCompleted: false,
            isCurrent: false,
          },
          {
            title: 'Delivered',
            description: 'Package safely delivered to recipient.',
            date: 'Expected Tomorrow',
            time: 'Afternoon',
            location: 'Destination Address',
            isCompleted: false,
            isCurrent: false,
          },
        ],
      });
    }, 600);
  };

  return (
    <div className="w-full">
      {/* ── Page Hero ── */}
      <section className="relative bg-[#FAF9F5] pt-14 pb-16 border-b border-[#E8E6DF] overflow-hidden">
        {/* Subtle background botanical rings */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#4B644C]/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#8C9B3E]/5 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-5 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFFFF] border border-[#E8E6DF] text-[11px] font-sans font-semibold tracking-wider text-[#4B644C] mb-5 shadow-sm">
            <Truck className="h-3.5 w-3.5 text-[#8C9B3E]" />
            <span>REAL-TIME COURIER DISPATCH & TRACKING</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#121412] tracking-tight leading-tight mb-4">
            Track Your <span className="italic font-light text-[#4B644C]">FLOIS</span> Order
          </h1>

          <p className="text-sm sm:text-base font-sans text-[#555555] font-light max-w-xl mx-auto leading-relaxed">
            Enter your Order ID (from your confirmation SMS or email) or Courier AWB number to check real-time dispatch, transit, and delivery status.
          </p>

          {/* ── Search Form Box ── */}
          <div className="mt-8 sm:mt-10 bg-white rounded-2xl sm:rounded-3xl border border-[#E8E6DF] shadow-lg p-5 sm:p-8 max-w-2xl mx-auto text-left">
            {/* Tabs */}
            <div className="flex border-b border-[#E8E6DF] pb-4 mb-6 gap-6 text-xs sm:text-sm font-sans font-medium">
              <button
                type="button"
                onClick={() => setActiveTab('order')}
                className={`pb-2 transition-colors relative ${
                  activeTab === 'order'
                    ? 'text-[#121412] font-semibold'
                    : 'text-[#888888] hover:text-[#121412]'
                }`}
              >
                Track by Order Number
                {activeTab === 'order' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4B644C]"
                  />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('awb')}
                className={`pb-2 transition-colors relative ${
                  activeTab === 'awb'
                    ? 'text-[#121412] font-semibold'
                    : 'text-[#888888] hover:text-[#121412]'
                }`}
              >
                Track by AWB / Courier Number
                {activeTab === 'awb' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4B644C]"
                  />
                )}
              </button>
            </div>

            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#444444] mb-2">
                  {activeTab === 'order' ? 'Order Number' : 'Courier AWB Number'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={orderInput}
                    onChange={(e) => setOrderInput(e.target.value)}
                    placeholder={
                      activeTab === 'order'
                        ? 'e.g. #FL-84291 or 84291'
                        : 'e.g. BLUEDART-482019482 or DELHIVERY-AWB'
                    }
                    className="w-full px-4 py-3.5 rounded-xl border border-[#D5D3CC] focus:outline-none focus:ring-2 focus:ring-[#4B644C]/30 focus:border-[#4B644C] font-sans text-sm text-[#121412] placeholder:text-[#999999] bg-[#FAF9F5]/40 transition-all"
                  />
                  <Search className="absolute right-4 top-3.5 h-4 w-4 text-[#888888]" />
                </div>
              </div>

              {activeTab === 'order' && (
                <div>
                  <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#444444] mb-2">
                    Phone Number or Email (Optional)
                  </label>
                  <input
                    type="text"
                    value={contactInput}
                    onChange={(e) => setContactInput(e.target.value)}
                    placeholder="e.g. 9899123456 or name@example.com"
                    className="w-full px-4 py-3.5 rounded-xl border border-[#D5D3CC] focus:outline-none focus:ring-2 focus:ring-[#4B644C]/30 focus:border-[#4B644C] font-sans text-sm text-[#121412] placeholder:text-[#999999] bg-[#FAF9F5]/40 transition-all"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !orderInput.trim()}
                className="w-full mt-2 py-4 px-6 rounded-xl bg-[#121412] hover:bg-[#4B644C] text-white font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Locating Dispatch Records...</span>
                  </>
                ) : (
                  <>
                    <span>Track Order Status</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-[#E8E6DF] flex flex-wrap items-center justify-between gap-3 text-xs text-[#666666] font-sans">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#8C9B3E]" />
                Dispatch within 24 Hours
              </span>
              <span className="flex items-center gap-1.5">
                <Package className="h-3.5 w-3.5 text-[#8C9B3E]" />
                Tamper-Proof Seal
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5 text-[#8C9B3E]" />
                19,000+ PIN Codes
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tracking Results View ── */}
      <AnimatePresence>
        {trackedOrder && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="py-14 sm:py-20 bg-white border-b border-[#E8E6DF]"
          >
            <div className="max-w-4xl mx-auto px-5">
              {/* Order Status Header Card */}
              <div className="bg-[#FAF9F5] border border-[#E8E6DF] rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E6DF] pb-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl sm:text-2xl font-serif font-bold text-[#121412]">
                        Order {trackedOrder.orderNumber}
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-sans font-semibold bg-[#4B644C]/10 text-[#4B644C] border border-[#4B644C]/20">
                        <Clock className="h-3 w-3" />
                        {trackedOrder.status}
                      </span>
                    </div>
                    <p className="text-xs font-sans text-[#666666] mt-1">
                      Carrier: <strong className="text-[#121412]">{trackedOrder.courier}</strong> · AWB: <strong className="text-[#121412]">{trackedOrder.awbNumber}</strong>
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <span className="text-xs uppercase tracking-wider text-[#777777] font-sans font-semibold block">
                      Estimated Delivery
                    </span>
                    <span className="text-sm sm:text-base font-sans font-bold text-[#4B644C]">
                      {trackedOrder.estimatedDelivery}
                    </span>
                  </div>
                </div>

                {/* Products in this order */}
                <div className="pt-6">
                  <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-[#777777] mb-3">
                    Items in This Consignment ({trackedOrder.items.length})
                  </h4>
                  <div className="space-y-2">
                    {trackedOrder.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#E8E6DF] text-xs sm:text-sm font-sans"
                      >
                        <div className="flex items-center gap-3">
                          <Package className="h-4 w-4 text-[#8C9B3E]" />
                          <div>
                            <span className="font-semibold text-[#121412] block">{item.name}</span>
                            <span className="text-[11px] text-[#777777]">{item.size}</span>
                          </div>
                        </div>
                        <span className="text-xs font-medium text-[#555555]">Qty: {item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step-by-Step Delivery Progress */}
              <div className="bg-white border border-[#E8E6DF] rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-8 shadow-sm">
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#121412] mb-6">
                  Consignment Journey
                </h3>

                <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#E8E6DF]">
                  {trackedOrder.timeline.map((event, idx) => (
                    <div key={idx} className="relative">
                      {/* Status Node Dot */}
                      <span
                        className={`absolute -left-6 sm:-left-8 top-1 h-6 w-6 rounded-full flex items-center justify-center border-2 ${
                          event.isCurrent
                            ? 'bg-[#4B644C] border-[#4B644C] text-white shadow-md animate-pulse'
                            : event.isCompleted
                            ? 'bg-[#8C9B3E] border-[#8C9B3E] text-white'
                            : 'bg-white border-[#D5D3CC] text-transparent'
                        }`}
                      >
                        {event.isCompleted && <CheckCircle2 className="h-3.5 w-3.5" />}
                      </span>

                      <div className="bg-[#FAF9F5] border border-[#E8E6DF] rounded-xl p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <h4 className="font-sans font-bold text-sm text-[#121412] flex items-center gap-2">
                            {event.title}
                            {event.isCurrent && (
                              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#4B644C] text-white">
                                Current Status
                              </span>
                            )}
                          </h4>
                          <span className="text-xs text-[#777777] font-sans">
                            {event.date} · {event.time}
                          </span>
                        </div>
                        <p className="text-xs font-sans text-[#555555] leading-relaxed mb-2">
                          {event.description}
                        </p>
                        <div className="flex items-center gap-1.5 text-[11px] font-sans text-[#777777]">
                          <MapPin className="h-3 w-3 text-[#4B644C]" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Priority Help Box */}
              <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-[#E8E6DF] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif text-base font-bold text-[#121412]">
                    Need Immediate Assistance with Your Delivery?
                  </h4>
                  <p className="text-xs font-sans text-[#666666] mt-0.5">
                    Our logistics desk is available Mon–Sat, 10 AM – 7 PM IST to handle address updates or urgent delivery requests.
                  </p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href="https://wa.me/918076219724?text=Hi%20FLOIS,%20I%20need%20an%20update%20on%20my%20order"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-sans font-bold hover:opacity-95 transition-opacity"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>WhatsApp Desk</span>
                  </a>
                  <a
                    href="tel:+918076219724"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#121412] text-white text-xs font-sans font-bold hover:bg-[#4B644C] transition-colors"
                  >
                    <PhoneCall className="h-3.5 w-3.5" />
                    <span>Call Us</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── Regional Delivery Timelines ── */}
      <section className="py-16 sm:py-20 bg-[#FAF9F5] border-b border-[#E8E6DF]">
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#121412] tracking-tight">
              Estimated Delivery Timelines
            </h2>
            <p className="text-xs sm:text-sm font-sans text-[#666666] mt-2">
              Every bottle of RootHerb and De-Tan Sunscreen is packed in temperature-stabilized botanical packaging to protect bioactive freshness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E8E6DF] shadow-sm">
              <div className="h-10 w-10 rounded-full bg-[#4B644C]/10 text-[#4B644C] flex items-center justify-center mb-4">
                <Truck className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#121412]">Metro Cities</h3>
              <p className="text-xs font-sans text-[#777777] mt-1 mb-3">
                Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata, Pune
              </p>
              <div className="text-sm font-sans font-bold text-[#4B644C]">
                2 to 3 Business Days
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8E6DF] shadow-sm">
              <div className="h-10 w-10 rounded-full bg-[#8C9B3E]/10 text-[#8C9B3E] flex items-center justify-center mb-4">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#121412]">Tier 2 & 3 Cities</h3>
              <p className="text-xs font-sans text-[#777777] mt-1 mb-3">
                Jaipur, Lucknow, Ahmedabad, Chandigarh, Kochi, Indore, Patna, etc.
              </p>
              <div className="text-sm font-sans font-bold text-[#4B644C]">
                3 to 5 Business Days
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8E6DF] shadow-sm">
              <div className="h-10 w-10 rounded-full bg-[#4B644C]/10 text-[#4B644C] flex items-center justify-center mb-4">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#121412]">Express Dispatch</h3>
              <p className="text-xs font-sans text-[#777777] mt-1 mb-3">
                Orders placed before 2:00 PM IST (Mon-Sat)
              </p>
              <div className="text-sm font-sans font-bold text-[#8C9B3E]">
                Same-Day Dispatch Guarantee
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tracking FAQs ── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF9F5] border border-[#E8E6DF] text-[10px] font-sans font-bold uppercase tracking-wider text-[#4B644C] mb-3">
              <HelpCircle className="h-3.5 w-3.5" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#121412]">
              Tracking & Delivery Help
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#E8E6DF] overflow-hidden transition-all bg-[#FAF9F5]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-sans font-semibold text-sm sm:text-base text-[#121412]"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-[#777777] transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180 text-[#4B644C]' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm font-sans text-[#555555] leading-relaxed border-t border-[#E8E6DF] pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
