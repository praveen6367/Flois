export type FloisProductType = 'hair-oil' | 'sunscreen' | 'comb';

export const OFFICIAL_HANDLES = {
  HAIR_OIL: 'flois-rootherb-hair-growth-oil-plant-based-ayurvedic-herbal-hair-oil-for-hair-fall-control-5-cold-pressed-oils-12-herbs-no-chemicals-no-mineral-lightweight-unisex-free-wooden-comb-100ml',
  SUNSCREEN: 'advanced-de-tan-sunscreen-gel',
  COMB: 'flois-kacchi-neem-wood-comb-5-5-inch-handmade-herbal-comb-soaked-in-17-herbs-sesame-oil-anti-static-hair-comb-for-unisex-reduces-hair-fall-dandruff-frizz-control',
} as const;

export const SHORT_HANDLES = {
  HAIR_OIL: 'rootherb-hair-growth-oil',
  SUNSCREEN: 'advanced-de-tan-sunscreen-gel',
  COMB: 'neem-wood-comb',
} as const;

/**
 * Robustly classifies a product, title, or handle into one of the 3 FLOIS flagship products:
 * 1. 'hair-oil'  -> RootHerb Botanical Hair & Scalp Oil
 * 2. 'sunscreen' -> Advanced De-Tan Sunscreen Gel SPF 50+
 * 3. 'comb'      -> Neem Wood Comb for Dandruff & Hair Fall Control
 *
 * CRITICAL RULE:
 * The hair oil URL/handle contains 'free-wooden-comb-100ml', and the comb title/handle
 * contains 'hair' and 'sesame-oil'. This classifier cleanly isolates the standalone comb
 * from the hair oil to prevent any product information bleed or mixup.
 */
export function getProductType(input: string | { handle?: string; title?: string } | null | undefined): FloisProductType {
  if (!input) return 'hair-oil';

  const str = (
    typeof input === 'string'
      ? input
      : `${input.handle || ''} ${input.title || ''}`
  ).toLowerCase();

  // 1. Sunscreen check: highly specific
  if (str.includes('sunscreen') || str.includes('de-tan') || str.includes('spf') || str.includes('solar')) {
    return 'sunscreen';
  }

  // 2. Hair Oil check:
  // If it mentions rootherb, growth-oil, hair-growth, or specifically indicates the oil bottle with free comb
  const isHairOilExplicit =
    str.includes('rootherb') ||
    str.includes('growth-oil') ||
    str.includes('growth oil') ||
    str.includes('hair-growth') ||
    str.includes('hair growth') ||
    str.includes('free-wooden-comb') ||
    str.includes('free wooden comb') ||
    str.includes('botanical hair & scalp oil');

  if (isHairOilExplicit) {
    return 'hair-oil';
  }

  // 3. Comb check:
  // Standalone neem comb product
  const isComb =
    str.includes('kacchi-neem') ||
    str.includes('kacchi neem') ||
    str.includes('neem-wood-comb') ||
    str.includes('neem wood comb') ||
    str.includes('comb for dandruff') ||
    (str.includes('comb') && !str.includes('oil'));

  if (isComb) {
    return 'comb';
  }

  // 4. Default fallback: hair oil
  return 'hair-oil';
}

/**
 * Maps any handle (short, legacy, or URL slug) to the canonical Shopify handle.
 */
export function resolveShopifyHandle(handle: string): string {
  const type = getProductType(handle);
  switch (type) {
    case 'sunscreen':
      return OFFICIAL_HANDLES.SUNSCREEN;
    case 'comb':
      return OFFICIAL_HANDLES.COMB;
    case 'hair-oil':
      return OFFICIAL_HANDLES.HAIR_OIL;
  }
}
