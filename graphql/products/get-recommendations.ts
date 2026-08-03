import { PRODUCT_FRAGMENT } from '../fragments/product';

export const GET_PRODUCT_RECOMMENDATIONS_QUERY = `
  query GetProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...product
    }
  }
  ${PRODUCT_FRAGMENT}
`;
