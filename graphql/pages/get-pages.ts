import { PAGE_FRAGMENT } from '../fragments/page';

export const GET_PAGES_QUERY = `
  query GetPages($first: Int = 20, $after: String) {
    pages(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          ...page
        }
      }
    }
  }
  ${PAGE_FRAGMENT}
`;
