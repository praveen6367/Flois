/**
 * Combines multiple GraphQL fragment strings and eliminates duplicate fragment definitions.
 */
export function combineFragments(...fragments: string[]): string {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const frag of fragments) {
    if (!frag) continue;
    // Match fragment declarations
    const blocks = frag.split(/(?=fragment\s+[A-Za-z0-9_]+\s+on)/g);
    for (const block of blocks) {
      const trimmed = block.trim();
      if (!trimmed) continue;
      const match = trimmed.match(/^fragment\s+([A-Za-z0-9_]+)/);
      if (match) {
        const name = match[1];
        if (!seen.has(name)) {
          seen.add(name);
          result.push(trimmed);
        }
      } else {
        result.push(trimmed);
      }
    }
  }

  return result.join('\n\n');
}
