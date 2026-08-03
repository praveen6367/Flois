import { IMAGE_FRAGMENT } from './image';
import { SEO_FRAGMENT } from './seo';

export const COLLECTION_FRAGMENT = `
  fragment collection on Collection {
    id
    handle
    title
    description
    descriptionHtml
    updatedAt
    image {
      ...image
    }
    seo {
      ...seo
    }
  }
  ${IMAGE_FRAGMENT}
  ${SEO_FRAGMENT}
`;
