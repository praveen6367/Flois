import { CART_FRAGMENT } from '../fragments/cart';

export const UPDATE_CART_NOTE_MUTATION = `
  mutation UpdateCartNote($cartId: ID!, $note: String!) {
    cartNoteUpdate(cartId: $cartId, note: $note) {
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
