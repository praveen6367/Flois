import { CART_FRAGMENT } from '../fragments/cart';

export const UPDATE_CART_LINES_MUTATION = `
  mutation UpdateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
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
