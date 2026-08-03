import { COLLECTION_FRAGMENT } from '../fragments/collection';
import { PRODUCT_FRAGMENT } from '../fragments/product';
import { combineFragments } from '../fragments/utils';

export const GET_COLLECTION_BY_HANDLE_QUERY = `
  query GetCollectionByHandle(
    $handle: String!
    $first: Int = 20
    $after: String
    $sortKey: ProductCollectionSortKeys = RELEVANCE
    $reverse: Boolean = false
    $filters: [ProductFilter!]
  ) {
    collection(handle: $handle) {
      ...collection
      products(
        first: $first
        after: $after
        sortKey: $sortKey
        reverse: $reverse
        filters: $filters
      ) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            ...product
          }
        }
      }
    }
  }
  ${combineFragments(COLLECTION_FRAGMENT, PRODUCT_FRAGMENT)}
`;
