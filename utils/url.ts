/**
 * Pure URL utility to normalize any Shopify store URL into internal Next.js routes.
 * Safe for both Server and Client components (no next/cache or server-only dependencies).
 */
export function normalizeShopifyUrl(url: string | undefined): string {
  if (!url) return '/';
  
  let relativePath = url.trim();
  
  // Convert full domain URLs (http:// or https://) into relative pathnames
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    try {
      const parsed = new URL(relativePath);
      relativePath = parsed.pathname + parsed.search + parsed.hash;
    } catch {
      // Fallback if parsing fails
    }
  }

  // Remove trailing slashes (except root "/")
  if (relativePath.length > 1 && relativePath.endsWith('/')) {
    relativePath = relativePath.slice(0, -1);
  }

  // Root or empty paths
  if (!relativePath || relativePath === '' || relativePath === '/') {
    return '/';
  }

  // Normalize Shopify blogs paths -> /blog
  if (relativePath === '/blogs' || relativePath.startsWith('/blogs/')) {
    return '/blog';
  }

  // Normalize Shopify default catalog paths -> /collections/all
  if (relativePath === '/catalog' || relativePath === '/catalogue' || relativePath === '/collections') {
    return '/collections/all';
  }

  return relativePath;
}
