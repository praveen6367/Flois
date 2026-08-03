import { PRODUCT_FRAGMENT } from '../fragments/product';
import { COLLECTION_FRAGMENT } from '../fragments/collection';
import { PAGE_FRAGMENT } from '../fragments/page';
import { combineFragments } from '../fragments/utils';

export const PREDICTIVE_SEARCH_QUERY = `
  query PredictiveSearch($query: String!, $limit: Int = 5) {
    predictiveSearch(query: $query, limit: $limit) {
      products {
        ...product
      }
      collections {
        ...collection
      }
      pages {
        ...page
      }
      queries {
        text
        styledText
      }
    }
  }
  ${combineFragments(PRODUCT_FRAGMENT, COLLECTION_FRAGMENT, PAGE_FRAGMENT)}
`;
