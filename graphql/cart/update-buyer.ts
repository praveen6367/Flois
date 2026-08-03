import { CART_FRAGMENT } from '../fragments/cart';

export const UPDATE_CART_BUYER_IDENTITY_MUTATION = `
  mutation UpdateCartBuyerIdentity($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
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
