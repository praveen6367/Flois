import { PRODUCT_FRAGMENT } from '../fragments/product';

export const SEARCH_PRODUCTS_QUERY = `
  query SearchProducts($query: String!, $first: Int = 20, $after: String) {
    search(query: $query, first: $first, after: $after, types: [PRODUCT]) {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          ... on Product {
            ...product
          }
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;
