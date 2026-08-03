import { shopifyFetch } from '../lib/shopify/fetch';

async function checkProductsInDetail() {
  const query = `
    query {
      products(first: 50) {
        edges {
          node {
            id
            title
            handle
            status: availableForSale
          }
        }
      }
    }
  `;

  try {
    const res = await shopifyFetch<{ products: { edges: any[] } }>({ query });
    console.log('Direct GraphQL Products Result:', JSON.stringify(res, null, 2));
  } catch (err) {
    console.error('Error fetching products:', err);
  }
}

checkProductsInDetail();
