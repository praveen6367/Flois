import { CART_FRAGMENT } from '../fragments/cart';

export const UPDATE_CART_DISCOUNT_CODES_MUTATION = `
  mutation UpdateCartDiscountCodes($cartId: ID!, $discountCodes: [String!]) {
    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
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
