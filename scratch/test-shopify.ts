import { getProducts, getFeaturedProducts } from '../lib/shopify/products';
import { getCollections } from '../lib/shopify/collections';
import { createCart } from '../lib/shopify/cart';
import { getHeaderMenu } from '../lib/shopify/menus';

async function fullLiveTest() {
  console.log('--- STARTING LIVE SHOPIFY STOREFRONT API TEST ---');

  try {
    console.log('1. Testing getProducts...');
    const productsRes = await getProducts({ first: 5 });
    console.log(`✓ Products count: ${productsRes.products.length}`);

    console.log('2. Testing getCollections...');
    const collectionsRes = await getCollections(5);
    console.log(`✓ Collections count: ${collectionsRes.collections.length}`);

    console.log('3. Testing createCart...');
    const cart = await createCart();
    console.log(`✓ Cart created successfully! ID: ${cart.id}, Checkout URL: ${cart.checkoutUrl}`);

    console.log('4. Testing getHeaderMenu...');
    const menu = await getHeaderMenu('main-menu');
    console.log(`✓ Main Menu items count: ${menu.length}`);

    console.log('--- ALL LIVE API TESTS PASSED SUCCESSFULLY! ---');
  } catch (error) {
    console.error('❌ Test Failed:', error);
  }
}

fullLiveTest();
