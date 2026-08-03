import { Product } from './product';
import { Collection } from './collection';
import { Page } from './page';

export interface SearchResults {
  products: Product[];
  collections: Collection[];
  pages: Page[];
  totalResults: number;
}

export interface PredictiveSearchResult {
  products: Product[];
  collections: Collection[];
  pages: Page[];
  queries: { text: string; styledText: string }[];
}
