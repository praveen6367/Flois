'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuItem } from '@/types/menu';
import { normalizeShopifyUrl } from '@/utils/url';

const DEFAULT_MENU: MenuItem[] = [
  { id: 'home', title: 'Home', url: '/', type: 'HTTP' },
  { id: 'shop', title: 'Shop', url: '/collections/all', type: 'COLLECTION' },
  { id: 'journal', title: 'Journal', url: '/blog', type: 'PAGE' },
  { id: 'track-order', title: 'Track Order', url: '/pages/track-order', type: 'PAGE' },
  { id: 'our-story', title: 'Our Story', url: '/pages/about', type: 'PAGE' },
  { id: 'contact', title: 'Contact', url: '/pages/contact', type: 'PAGE' }
];

export function DesktopNavigation({ menu = DEFAULT_MENU }: { menu?: MenuItem[] }) {
  const pathname = usePathname();

  const displayMenu = (menu && menu.length > 0 ? menu : DEFAULT_MENU).map((item) => ({
    ...item,
    url: normalizeShopifyUrl(item.url)
  }));

  return (
    <nav className="relative hidden lg:flex items-center gap-8" aria-label="Main Navigation">
      {displayMenu.map((item) => {
        const isActive = item.url === '/' ? pathname === '/' : pathname.startsWith(item.url || '___');

        return (
          <div key={item.id} className="group relative py-3">
            <Link
              href={item.url || '#'}
              className={`inline-flex items-center text-[12px] font-semibold uppercase tracking-wider transition-colors py-0.5 focus:outline-none ${
                isActive ? 'text-[#C2CE94]' : 'text-[#FAF9F5] hover:text-[#C2CE94]'
              }`}
            >
              <span>{item.title}</span>
            </Link>

            {/* Subtle Active / Hover Underline Bar */}
            <span
              className={`absolute bottom-1 left-0 h-[1.5px] bg-[#C2CE94] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isActive ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            />
          </div>
        );
      })}
    </nav>
  );
}
