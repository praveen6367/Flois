import { PAGE_FRAGMENT } from '../fragments/page';

export const GET_PAGE_BY_HANDLE_QUERY = `
  query GetPageByHandle($handle: String!) {
    page(handle: $handle) {
      ...page
    }
  }
  ${PAGE_FRAGMENT}
`;
