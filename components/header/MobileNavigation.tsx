'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Search,
  ShoppingBag,
  Heart,
  User,
  ChevronRight,
  ArrowRight,
  Leaf
} from 'lucide-react';
import { MenuItem } from '@/types/menu';
import { ShopifyImage } from '@/types/shopify';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { normalizeShopifyUrl } from '@/utils/url';

// ─── Fallback menu items (all linked correctly) ────────────────────────────────
const FALLBACK_MENU: MenuItem[] = [
  { id: 'home',        title: 'Home',        url: '/',                    type: 'HTTP' },
  { id: 'shop',        title: 'Shop',        url: '/collections/all',     type: 'COLLECTION' },
  { id: 'our-story',   title: 'Our Story',   url: '/pages/about',         type: 'PAGE' },
  { id: 'journal',     title: 'Journal',     url: '/blog',                type: 'PAGE' },
  { id: 'contact',     title: 'Contact',     url: '/pages/contact',       type: 'PAGE' },
  { id: 'track-order', title: 'Track Order', url: '/pages/track-order',   type: 'PAGE' },
];

// ─── Featured products shown at drawer bottom ──────────────────────────────────
const FEATURED_PRODUCTS = [
  {
    title: 'RootHerb Hair Growth Oil',
    price: '₹699',
    href: '/products/rootherb-hair-growth-oil',
    img:  '/products/rootherb_product.png',
  },
  {
    title: 'De-Tan Sunscreen Gel',
    price: '₹599',
    href: '/products/advanced-de-tan-sunscreen-gel',
    img:  '/products/sunscreen_product.png',
  },
  {
    title: 'Neem Wood Comb',
    price: '₹349',
    href: '/products/neem-wood-comb',
    img:  '/products/neem_comb_product.png',
  },
];

interface MobileNavigationProps {
  menu?: MenuItem[];
  logoImage?: ShopifyImage | null;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
}

export function MobileNavigation({
  menu = [],
  logoImage,
  onOpenSearch,
  onOpenAccount,
}: MobileNavigationProps) {
  const [isOpen, setIsOpen]   = useState(false);
  const [mounted, setMounted] = useState(false);
  const { totalQuantity, openCart } = useCart();
  const { wishlistCount, openWishlist } = useWishlist();

  // Must be mounted in the browser before we can portal
  useEffect(() => { setMounted(true); }, []);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  const displayMenu = (menu.length > 0 ? menu : FALLBACK_MENU).map((item) => ({
    ...item,
    url: normalizeShopifyUrl(item.url),
  }));

  const logoSrc = logoImage?.url || '/mainlogo.png';

  const drawer = (
    <AnimatePresence>
      {isOpen && (
        /* Full-screen fixed portal — completely outside header stacking context */
        <div className="fixed inset-0 z-[9999] overflow-hidden">

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={close}
            className="absolute inset-0 bg-black/55 backdrop-blur-[3px]"
          />

          {/* Drawer panel */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 h-full w-[88vw] max-w-[340px] flex flex-col bg-[#111812] text-[#FAF9F5] shadow-2xl overflow-hidden"
          >

            {/* ── Top bar: logo + close ─────────────────────────────── */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#1E2B1E] shrink-0">
              <Link href="/" onClick={close} aria-label="FLOIS Home">
                <Image
                  src={logoSrc}
                  alt="FLOIS"
                  width={120}
                  height={34}
                  className="h-8 w-auto object-contain"
                  priority
                />
              </Link>
              <button
                suppressHydrationWarning
                onClick={close}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8 hover:bg-white/15 text-[#EAE3D2] transition-colors"
                aria-label="Close menu"
              >
                <X className="h-4.5 w-4.5" strokeWidth={1.8} />
              </button>
            </div>

            {/* ── Search bar ────────────────────────────────────────── */}
            <div className="px-5 py-3 border-b border-[#1E2B1E] shrink-0">
              <button
                suppressHydrationWarning
                onClick={() => { close(); onOpenSearch(); }}
                className="w-full flex items-center gap-3 rounded-xl bg-white/6 border border-white/10 px-4 py-2.5 text-[13px] text-[#7A8C7A] hover:border-[#4B644C] transition-colors"
              >
                <Search className="h-4 w-4 shrink-0" />
                <span>Search FLOIS formulations…</span>
              </button>
            </div>

            {/* ── Scrollable body ───────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto overscroll-contain no-scrollbar">

              {/* Navigation links */}
              <nav className="px-3 py-4" aria-label="Mobile Navigation">
                {displayMenu.map((item, idx) => (
                  <Link
                    key={item.id}
                    href={item.url || '#'}
                    onClick={close}
                    className="group flex items-center justify-between px-3 py-3.5 rounded-xl hover:bg-white/6 transition-colors"
                  >
                    <span
                      className="font-serif text-[1.1rem] font-normal text-[#FAF9F5] group-hover:text-[#C2CE94] transition-colors"
                      style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                    >
                      {item.title}
                    </span>
                    <ChevronRight className="h-4 w-4 text-[#4B644C] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </nav>

              {/* Divider */}
              <div className="mx-5 h-px bg-[#1E2B1E]" />

              {/* ── Featured Products mini-shelf ─────────────────────── */}
              <div className="px-5 pt-5 pb-4">
                <div className="flex items-center gap-2 mb-4">
                  <Leaf className="h-3.5 w-3.5 text-[#4B644C]" />
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#4B644C]">
                    Botanical Formulas
                  </span>
                </div>

                <div className="space-y-3">
                  {FEATURED_PRODUCTS.map((p) => (
                    <Link
                      key={p.href}
                      href={p.href}
                      onClick={close}
                      className="group flex items-center gap-3.5 rounded-xl bg-white/5 border border-white/8 p-3 hover:border-[#4B644C]/50 hover:bg-white/8 transition-all"
                    >
                      {/* Product thumbnail */}
                      <div className="relative h-12 w-12 shrink-0 rounded-lg overflow-hidden bg-[#1A221A]">
                        <Image
                          src={p.img}
                          alt={p.title}
                          fill
                          sizes="48px"
                          className="object-cover object-center"
                          onError={(e) => { (e.target as HTMLImageElement).src = '/placeholders/botanical-placeholder.svg'; }}
                        />
                      </div>

                      {/* Name + price */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-sans font-medium text-[#EAE3D2] group-hover:text-white truncate transition-colors leading-tight">
                          {p.title}
                        </p>
                        <p className="text-[12px] font-sans text-[#4B644C] font-semibold mt-0.5">
                          {p.price}
                        </p>
                      </div>

                      <ArrowRight className="h-3.5 w-3.5 text-[#4B644C] shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* ── Quick links ──────────────────────────────────────── */}
              <div className="px-5 pb-4 pt-1">
                <div className="mx-0 mb-4 h-px bg-[#1E2B1E]" />
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Track Order',    href: '/pages/track-order' },
                    { label: 'Refund Policy',  href: '/policies/refund-policy' },
                    { label: 'Privacy Policy', href: '/policies/privacy-policy' },
                    { label: 'Contact Us',     href: '/pages/contact' },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={close}
                      className="text-[11px] font-sans text-[#7A8C7A] hover:text-[#C2CE94] transition-colors py-1"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Bottom action bar ─────────────────────────────────── */}
            <div className="shrink-0 border-t border-[#1E2B1E] bg-[#0E1510] px-4 py-3 grid grid-cols-3 gap-2">
              <button
                suppressHydrationWarning
                onClick={() => { close(); openWishlist(); }}
                className="flex flex-col items-center gap-1 py-2 rounded-xl hover:bg-white/6 transition-colors"
              >
                <div className="relative">
                  <Heart className="h-5 w-5 text-[#EAE3D2]" strokeWidth={1.5} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-[#4B644C] text-[9px] font-bold text-white flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-sans text-[#7A8C7A]">Wishlist</span>
              </button>

              <button
                suppressHydrationWarning
                onClick={() => { close(); openCart(); }}
                className="flex flex-col items-center gap-1 py-2 rounded-xl hover:bg-white/6 transition-colors"
              >
                <div className="relative">
                  <ShoppingBag className="h-5 w-5 text-[#EAE3D2]" strokeWidth={1.5} />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-[#4B644C] text-[9px] font-bold text-white flex items-center justify-center">
                      {totalQuantity}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-sans text-[#7A8C7A]">Bag</span>
              </button>

              <button
                suppressHydrationWarning
                onClick={() => { close(); onOpenAccount(); }}
                className="flex flex-col items-center gap-1 py-2 rounded-xl hover:bg-white/6 transition-colors"
              >
                <User className="h-5 w-5 text-[#EAE3D2]" strokeWidth={1.5} />
                <span className="text-[10px] font-sans text-[#7A8C7A]">Account</span>
              </button>
            </div>

          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="lg:hidden flex items-center">
      {/* Hamburger trigger */}
      <button
        suppressHydrationWarning
        onClick={() => setIsOpen(true)}
        className="p-2 text-[#FAF9F5] hover:text-[#C2CE94] transition-colors focus:outline-none"
        aria-label="Open Mobile Menu"
        aria-expanded={isOpen}
      >
        {/* Custom botanical hamburger icon */}
        <div className="flex flex-col gap-[5px]">
          <span className="block h-[1.5px] w-6 bg-current rounded-full transition-all" />
          <span className="block h-[1.5px] w-4 bg-current rounded-full transition-all" />
          <span className="block h-[1.5px] w-5 bg-current rounded-full transition-all" />
        </div>
      </button>

      {/* Portal — rendered at document.body, completely outside header stacking context */}
      {mounted && createPortal(drawer, document.body)}
    </div>
  );
}
