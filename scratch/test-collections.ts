import { getCollections } from '../lib/shopify/collections';

async function testCollections() {
  try {
    const res = await getCollections(25);
    console.log('API Returned Collections Count:', res.collections.length);
    console.log('Collections List:', res.collections.map(c => ({ id: c.id, title: c.title, handle: c.handle, hasImage: !!c.image?.url })));
  } catch (err) {
    console.error('Error fetching collections:', err);
  }
}

testCollections();
