import { CART_FRAGMENT } from '../fragments/cart';

export const REMOVE_CART_LINES_MUTATION = `
  mutation RemoveCartLines($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
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
