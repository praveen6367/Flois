import { IMAGE_FRAGMENT } from '../fragments/image';
import { SEO_FRAGMENT } from '../fragments/seo';

export const ARTICLE_FIELDS = `
  fragment articleFields on Article {
    id
    handle
    title
    excerpt
    excerptHtml
    contentHtml
    content: contentHtml
    publishedAt
    tags
    image {
      ...image
    }
    author: authorV2 {
      name
      email
      bio
    }
    blog {
      handle
      title
    }
    seo {
      ...seo
    }
    onlineStoreUrl
  }
`;

export const ARTICLE_FRAGMENT = `
  ${IMAGE_FRAGMENT}
  ${SEO_FRAGMENT}
  ${ARTICLE_FIELDS}
`;

// Fetch all articles from a blog (default: "news" blog handle)
export const GET_BLOG_ARTICLES_QUERY = `
  ${ARTICLE_FRAGMENT}
  query GetBlogArticles($blogHandle: String!, $first: Int!, $after: String, $sortKey: ArticleSortKeys, $reverse: Boolean) {
    blog(handle: $blogHandle) {
      id
      handle
      title
      articles(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            ...articleFields
          }
        }
      }
    }
  }
`;

// Fetch a single article by handle
export const GET_ARTICLE_BY_HANDLE_QUERY = `
  ${ARTICLE_FRAGMENT}
  query GetArticleByHandle($blogHandle: String!, $articleHandle: String!) {
    blog(handle: $blogHandle) {
      id
      handle
      title
      articleByHandle(handle: $articleHandle) {
        ...articleFields
      }
    }
  }
`;

// Fetch all blogs with recent articles
export const GET_ALL_BLOGS_QUERY = `
  ${ARTICLE_FRAGMENT}
  query GetAllBlogs($first: Int!) {
    blogs(first: $first) {
      edges {
        node {
          id
          handle
          title
          articles(first: 50, sortKey: PUBLISHED_AT, reverse: true) {
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
            edges {
              cursor
              node {
                ...articleFields
              }
            }
          }
        }
      }
    }
  }
`;
