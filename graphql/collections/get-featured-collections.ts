import { COLLECTION_FRAGMENT } from '../fragments/collection';

export const GET_FEATURED_COLLECTIONS_QUERY = `
  query GetFeaturedCollections($first: Int = 6) {
    collections(first: $first) {
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
