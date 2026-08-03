import { METAOBJECT_FRAGMENT } from '../fragments/metaobject';

export const GET_METAOBJECTS_QUERY = `
  query GetMetaobjects($type: String!, $first: Int = 20, $after: String) {
    metaobjects(type: $type, first: $first, after: $after) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          ...metaobject
        }
      }
    }
  }
  ${METAOBJECT_FRAGMENT}
`;
