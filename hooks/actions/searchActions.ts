'use server';

import { searchAll, getSearchSuggestions } from '@/lib/shopify/search';

export async function searchAllAction(query: string) {
  try {
    const results = await searchAll(query);
    return { success: true, results };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function predictiveSearchAction(query: string) {
  try {
    const suggestions = await getSearchSuggestions(query);
    return { success: true, suggestions };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
