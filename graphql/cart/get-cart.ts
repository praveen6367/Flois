import { CART_FRAGMENT } from '../fragments/cart';

export const GET_CART_QUERY = `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      ...cart
    }
  }
  ${CART_FRAGMENT}
`;
