import { PRODUCT_FRAGMENT } from '../fragments/product';

export const GET_PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...product
    }
  }
  ${PRODUCT_FRAGMENT}
`;
