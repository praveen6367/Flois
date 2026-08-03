import { MONEY_FRAGMENT } from '../fragments/money';

export const GET_CUSTOMER_QUERY = `
  query GetCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      email
      phone
      acceptsMarketing
      defaultAddress {
        id
        address1
        address2
        city
        company
        country
        countryCodeV2
        firstName
        lastName
        phone
        province
        provinceCode
        zip
        formatted
      }
      addresses(first: 10) {
        edges {
          node {
            id
            address1
            address2
            city
            company
            country
            countryCodeV2
            firstName
            lastName
            phone
            province
            provinceCode
            zip
            formatted
          }
        }
      }
      orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            orderNumber
            processedAt
            financialStatus
            fulfillmentStatus
            currentTotalPrice {
              ...money
            }
            subtotalPrice {
              ...money
            }
            totalTax {
              ...money
            }
            totalShippingPrice {
              ...money
            }
            lineItems(first: 50) {
              edges {
                node {
                  title
                  quantity
                  variantTitle
                  originalTotalPrice {
                    ...money
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  ${MONEY_FRAGMENT}
`;
