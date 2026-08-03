import { SEO_FRAGMENT } from './seo';

export const PAGE_FRAGMENT = `
  fragment page on Page {
    id
    handle
    title
    body
    bodySummary
    createdAt
    updatedAt
    seo {
      ...seo
    }
  }
  ${SEO_FRAGMENT}
`;
