import { PRODUCT_FRAGMENT } from '../fragments/product';

export const GET_PRODUCTS_QUERY = `
  query GetProducts(
    $first: Int = 20
    $after: String
    $sortKey: ProductSortKeys = RELEVANCE
    $reverse: Boolean = false
    $query: String
  ) {
    products(
      first: $first
      after: $after
      sortKey: $sortKey
      reverse: $reverse
      query: $query
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
  ${PRODUCT_FRAGMENT}
`;
