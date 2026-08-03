import { MONEY_FRAGMENT } from './money';
import { IMAGE_FRAGMENT } from './image';

export const CART_FRAGMENT = `
  fragment cart on Cart {
    id
    checkoutUrl
    totalQuantity
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              ...money
            }
            subtotalAmount {
              ...money
            }
            amountPerQuantity {
              ...money
            }
            compareAtAmountPerQuantity {
              ...money
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              selectedOptions {
                name
                value
              }
              product {
                id
                handle
                title
                featuredImage {
                  ...image
                }
              }
              price {
                ...money
              }
              compareAtPrice {
                ...money
              }
              image {
                ...image
              }
            }
          }
          attributes {
            key
            value
          }
        }
      }
    }
    cost {
      totalAmount {
        ...money
      }
      subtotalAmount {
        ...money
      }
      totalTaxAmount {
        ...money
      }
      totalDutyAmount {
        ...money
      }
    }
    discountCodes {
      code
      applicable
    }
    attributes {
      key
      value
    }
    buyerIdentity {
      email
      phone
      customer {
        id
        email
      }
      countryCode
    }
    note
    createdAt
    updatedAt
  }
  ${MONEY_FRAGMENT}
  ${IMAGE_FRAGMENT}
`;
