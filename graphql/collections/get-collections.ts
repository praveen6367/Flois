import { COLLECTION_FRAGMENT } from '../fragments/collection';

export const GET_COLLECTIONS_QUERY = `
  query GetCollections($first: Int = 20, $after: String) {
    collections(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          ...collection
        }
      }
    }
  }
  ${COLLECTION_FRAGMENT}
`;
