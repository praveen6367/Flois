import { NextRequest, NextResponse } from 'next/server';
import { getProductByHandle } from '@/lib/shopify/products';

/**
 * GET /api/product-variant?handle=<product-handle>
 * Returns the first available variant ID for the given Shopify product handle.
 * Used by the ReelStoriesSection AddToCartButton to avoid redirecting to product pages.
 */
export async function GET(req: NextRequest) {
  const handle = req.nextUrl.searchParams.get('handle');

  if (!handle) {
    return NextResponse.json({ error: 'Missing handle' }, { status: 400 });
  }

  try {
    const product = await getProductByHandle(handle);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const variants = product.variants?.nodes || [];
    const firstAvailable = variants.find((v: any) => v.availableForSale) || variants[0];

    if (!firstAvailable?.id) {
      return NextResponse.json({ error: 'No variant found' }, { status: 404 });
    }

    return NextResponse.json({ variantId: firstAvailable.id }, { status: 200 });
  } catch (err) {
    console.error('[product-variant] Error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
