import { CART_FRAGMENT } from '../fragments/cart';

export const CREATE_CART_MUTATION = `
  mutation CreateCart($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        ...cart
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;
