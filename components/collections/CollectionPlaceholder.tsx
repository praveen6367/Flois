'use client';

import React from 'react';
import Link from 'next/link';
import { Collection } from '@/types/collection';
import { CollectionCard } from './CollectionCard';

/**
 * Shown when Shopify has no collections configured.
 * Uses the exact same CollectionCard layout to avoid
 * double-circle / size mismatch issues.
 */
const PLACEHOLDER_ITEMS: Array<{ collection: Collection; href: string }> = [
  {
    collection: {
      id: 'm1',
      title: 'Hair Growth Oil',
      handle: 'hair-oil',
      description: '',
      descriptionHtml: '',
      updatedAt: '',
      products: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } }
    },
    href: '/products/rootherb-hair-growth-oil'
  },
  {
    collection: {
      id: 'm2',
      title: 'Wooden Comb',
      handle: 'wooden-comb',
      description: '',
      descriptionHtml: '',
      updatedAt: '',
      products: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } }
    },
    href: '/products/neem-wood-comb'
  },
  {
    collection: {
      id: 'm3',
      title: 'De-Tan Sunscreen',
      handle: 'sunscreen',
      description: '',
      descriptionHtml: '',
      updatedAt: '',
      products: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } }
    },
    href: '/products/advanced-de-tan-sunscreen-gel'
  },
  {
    collection: {
      id: 'm4',
      title: 'Shampoo',
      handle: 'shampoo',
      description: '',
      descriptionHtml: '',
      updatedAt: '',
      products: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } }
    },
    href: '/collections/all'
  },
  {
    collection: {
      id: 'm5',
      title: 'Skin Care',
      handle: 'skin-care',
      description: '',
      descriptionHtml: '',
      updatedAt: '',
      products: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } }
    },
    href: '/collections/all'
  },
  {
    collection: {
      id: 'm6',
      title: 'Body Care',
      handle: 'body-care',
      description: '',
      descriptionHtml: '',
      updatedAt: '',
      products: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } }
    },
    href: '/collections/all'
  }
];

export function CollectionPlaceholder() {
  return (
    <div className="w-full flex items-center justify-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar py-2 mx-auto">
      {PLACEHOLDER_ITEMS.map(({ collection, href }) => (
        <CollectionCard
          key={collection.id}
          collection={collection}
          overrideHref={href}
        />
      ))}
    </div>
  );
}
