import { shopifyFetch } from '../lib/shopify/fetch';

async function fetchShopLogo() {
  const query = `
    query GetShopBrand {
      shop {
        name
        description
        brand {
          logo {
            image {
              url
              altText
              width
              height
            }
          }
          squareLogo {
            image {
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{ shop: any }>({ query });
    console.log('Shop Brand Data:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error fetching shop brand:', err);
  }
}

fetchShopLogo();
