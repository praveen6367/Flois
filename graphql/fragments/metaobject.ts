export const METAOBJECT_FRAGMENT = `
  fragment metaobject on Metaobject {
    id
    handle
    type
    fields {
      key
      value
      type
      reference {
        ... on MediaImage {
          image {
            url
            altText
          }
        }
      }
    }
    updatedAt
  }
`;
