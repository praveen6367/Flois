'use client';

import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { AnnouncementBar, AnnouncementItem } from './AnnouncementBar';
import { DesktopNavigation } from './DesktopNavigation';
import { HeaderActions } from './HeaderActions';
import { MobileNavigation } from './MobileNavigation';
import { SearchDrawer } from './SearchDrawer';
import { CartDrawer } from './CartDrawer';
import { AccountModal } from './AccountModal';
import { MenuItem } from '@/types/menu';
import { ShopifyImage } from '@/types/shopify';

interface HeaderProps {
  menu?: MenuItem[];
  announcements?: AnnouncementItem[];
  logoImage?: ShopifyImage | null;
}

export function Header({ menu, announcements, logoImage }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full font-sans transition-all duration-300">
      {/* Dynamic Announcement Bar */}
      <AnnouncementBar items={announcements} />

      {/* Main Header Bar (relative container for MegaMenu) */}
      <div
        className={`relative w-full py-3.5 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#141C15]/95 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.45)] border-b border-[#304031]'
            : 'bg-[#141C15] border-b border-[#304031]/60'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Left: Mobile Nav & Logo */}
          <div className="flex items-center gap-4">
            <MobileNavigation
              menu={menu}
              logoImage={logoImage}
              onOpenSearch={() => setIsSearchOpen(true)}
              onOpenAccount={() => setIsAccountOpen(true)}
            />
            <Logo logoImage={logoImage} />
          </div>

          {/* Center: Desktop Navigation */}
          <DesktopNavigation menu={menu} />

          {/* Right: Header Actions */}
          <HeaderActions
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenAccount={() => setIsAccountOpen(true)}
          />
        </div>
      </div>

      {/* Global Drawers & Modals */}
      <SearchDrawer isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CartDrawer />
      <AccountModal isOpen={isAccountOpen} onClose={() => setIsAccountOpen(false)} />
    </header>
  );
}
