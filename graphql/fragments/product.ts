import { MONEY_FRAGMENT } from './money';
import { IMAGE_FRAGMENT } from './image';
import { SEO_FRAGMENT } from './seo';

export const PRODUCT_VARIANT_FIELDS = `
  fragment productVariant on ProductVariant {
    id
    title
    sku
    availableForSale
    requiresShipping
    selectedOptions {
      name
      value
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
`;

export const PRODUCT_FIELDS = `
  fragment product on Product {
    id
    handle
    title
    description
    descriptionHtml
    availableForSale
    vendor
    productType
    tags
    createdAt
    updatedAt
    publishedAt
    priceRange {
      minVariantPrice {
        ...money
      }
      maxVariantPrice {
        ...money
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        ...money
      }
      maxVariantPrice {
        ...money
      }
    }
    featuredImage {
      ...image
    }
    images(first: 20) {
      edges {
        cursor
        node {
          ...image
        }
      }
    }
    options {
      id
      name
      values
    }
    variants(first: 250) {
      edges {
        cursor
        node {
          ...productVariant
        }
      }
    }
    seo {
      ...seo
    }
  }
`;

export const PRODUCT_FRAGMENT = `
  ${MONEY_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${SEO_FRAGMENT}
  ${PRODUCT_VARIANT_FIELDS}
  ${PRODUCT_FIELDS}
`;
