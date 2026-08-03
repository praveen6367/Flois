import { shopifyFetch } from './fetch';
import { SHOPIFY_CACHE_TAGS } from './cache';
import { Menu, MenuItem } from '@/types/menu';
import { GET_MENU_QUERY } from '@/graphql/menu/get-menu';

/**
 * Normalizes any Shopify URL (e.g. "https://7deq26-9s.myshopify.com/", "https://7deq26-9s.myshopify.com/blogs/news")
 * into a clean internal Next.js relative route (e.g. "/", "/blog", "/collections/all").
 */
export function normalizeShopifyUrl(url: string | undefined): string {
  if (!url) return '/';
  
  let relativePath = url.trim();
  
  // Convert full domain URLs (http:// or https://) into pathnames
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

function cleanMenuItem(item: MenuItem): MenuItem {
  return {
    ...item,
    url: normalizeShopifyUrl(item.url),
    items: item.items ? item.items.map(cleanMenuItem) : undefined
  };
}

export const REQUIRED_HEADER_MENU: MenuItem[] = [
  { id: 'home', title: 'Home', url: '/', type: 'HTTP' },
  { id: 'shop', title: 'Shop', url: '/collections/all', type: 'COLLECTION' },
  { id: 'blogs', title: 'Blogs', url: '/blog', type: 'PAGE' },
  { id: 'track-order', title: 'Track Order', url: '/pages/track-order', type: 'PAGE' },
  { id: 'our-story', title: 'Our Story', url: '/pages/about', type: 'PAGE' },
  { id: 'contact', title: 'Contact', url: '/pages/contact', type: 'PAGE' }
];

/**
 * Fetch a menu structure by handle and normalize all item URLs.
 */
export async function getMenu(handle: string): Promise<Menu | null> {
  try {
    const data = await shopifyFetch<{ menu: Menu }>({
      query: GET_MENU_QUERY,
      variables: { handle },
      tags: [SHOPIFY_CACHE_TAGS.menu(handle)]
    });

    if (!data.menu) return null;

    return {
      ...data.menu,
      items: data.menu.items ? data.menu.items.map(cleanMenuItem) : []
    };
  } catch (e) {
    console.warn('[menus] getMenu error:', e);
    return null;
  }
}

/**
 * Fetch header main navigation menu with exact 6 required items:
 * Home | Shop | Blogs | Track Order | Our Story | Contact
 */
export async function getHeaderMenu(handle: string = 'main-menu'): Promise<MenuItem[]> {
  try {
    const menu = await getMenu(handle);
    if (menu?.items && menu.items.length > 0) {
      const items = menu.items.map((item) => {
        const url = normalizeShopifyUrl(item.url);
        if (item.title.toLowerCase() === 'catalogue' || item.title.toLowerCase() === 'catalog') {
          return { ...item, title: 'Shop', url: '/collections/all' };
        }
        return { ...item, url };
      });

      // Ensure essential links exist
      const hasTrack = items.some((i) => i.title.toLowerCase().includes('track'));
      const hasStory = items.some((i) => i.title.toLowerCase().includes('story') || i.title.toLowerCase().includes('about'));
      const hasBlogs = items.some((i) => i.title.toLowerCase().includes('blog'));

      if (!hasTrack) items.push({ id: 'track-order', title: 'Track Order', url: '/pages/track-order', type: 'PAGE' });
      if (!hasStory) items.push({ id: 'our-story', title: 'Our Story', url: '/pages/about', type: 'PAGE' });
      if (!hasBlogs) items.push({ id: 'blogs', title: 'Blogs', url: '/blog', type: 'PAGE' });

      return items;
    }
  } catch (e) {
    console.warn('[menus] getHeaderMenu error:', e);
  }

  return REQUIRED_HEADER_MENU;
}

/**
 * Fetch footer navigation menu.
 */
export async function getFooterMenu(handle: string = 'footer'): Promise<MenuItem[]> {
  const menu = await getMenu(handle);
  return menu?.items || [];
}

/**
 * Fetch mega menu structure.
 */
export async function getMegaMenu(handle: string = 'mega-menu'): Promise<MenuItem[]> {
  const menu = await getMenu(handle);
  return menu?.items || [];
}

/**
 * Helper to fetch any nested sub-menu by handle.
 */
export async function getNestedMenu(handle: string): Promise<MenuItem[]> {
  const menu = await getMenu(handle);
  return menu?.items || [];
}
