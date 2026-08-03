import { PRODUCT_FRAGMENT } from '../fragments/product';

export const GET_PRODUCT_QUERY = `
  query GetProduct($id: ID!) {
    product(id: $id) {
      ...product
    }
  }
  ${PRODUCT_FRAGMENT}
`;
