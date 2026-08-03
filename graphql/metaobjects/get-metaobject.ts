import { METAOBJECT_FRAGMENT } from '../fragments/metaobject';

export const GET_METAOBJECT_QUERY = `
  query GetMetaobject($handle: MetaobjectHandleInput!) {
    metaobject(handle: $handle) {
      ...metaobject
    }
  }
  ${METAOBJECT_FRAGMENT}
`;
