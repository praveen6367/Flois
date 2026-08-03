import { PRODUCT_FRAGMENT } from '../fragments/product';

export const GET_FEATURED_PRODUCTS_QUERY = `
  query GetFeaturedProducts($first: Int = 8) {
    products(first: $first, sortKey: BEST_SELLING) {
      edges {
        cursor
        node {
          ...product
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;
