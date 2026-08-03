export const GET_SHOP_BRAND_QUERY = `
  query GetShopBrand {
    shop {
      name
      description
      brand {
        logo {
          image {
            url
            altText
            width
            height
          }
        }
        squareLogo {
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`;
