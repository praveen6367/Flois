export interface ShopifyImageTransformOptions {
  width?: number;
  height?: number;
  crop?: 'top' | 'bottom' | 'center' | 'left' | 'right';
  format?: 'avif' | 'webp' | 'pjpg';
  quality?: number;
}

/**
 * Transforms a Shopify CDN image URL with custom sizing, cropping, and modern formats (AVIF/WebP).
 */
export function getShopifyImageUrl(
  src: string,
  options?: ShopifyImageTransformOptions
): string {
  if (!src || !src.includes('cdn.shopify.com')) {
    return src || '';
  }

  const url = new URL(src);

  if (options?.width) {
    url.searchParams.set('width', options.width.toString());
  }

  if (options?.height) {
    url.searchParams.set('height', options.height.toString());
  }

  if (options?.crop) {
    url.searchParams.set('crop', options.crop);
  }

  if (options?.format) {
    url.searchParams.set('format', options.format);
  }

  if (options?.quality) {
    url.searchParams.set('quality', options.quality.toString());
  }

  return url.toString();
}

/**
 * Generate responsive image width set.
 */
export function getShopifyImageSrcSet(
  src: string,
  widths: number[] = [320, 640, 960, 1280, 1920, 2560]
): string {
  if (!src) return '';
  return widths
    .map((w) => `${getShopifyImageUrl(src, { width: w, format: 'webp' })} ${w}w`)
    .join(', ');
}

/**
 * Generate low-resolution blur placeholder URL.
 */
export function getShopifyBlurPlaceholderUrl(src: string): string {
  return getShopifyImageUrl(src, { width: 20, quality: 30, format: 'webp' });
}
