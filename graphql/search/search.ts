import { PRODUCT_FRAGMENT } from '../fragments/product';
import { COLLECTION_FRAGMENT } from '../fragments/collection';
import { PAGE_FRAGMENT } from '../fragments/page';
import { combineFragments } from '../fragments/utils';

export const SEARCH_QUERY = `
  query Search($query: String!, $first: Int = 20) {
    search(query: $query, first: $first, types: [PRODUCT, COLLECTION, PAGE]) {
      totalCount
      edges {
        node {
          ... on Product {
            ...product
          }
          ... on Collection {
            ...collection
          }
          ... on Page {
            ...page
          }
        }
      }
    }
  }
  ${combineFragments(PRODUCT_FRAGMENT, COLLECTION_FRAGMENT, PAGE_FRAGMENT)}
`;
