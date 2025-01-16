/**
 * Normalizes a string by removing diacritics, handling Unicode compositions, and converting to lowercase for consistent
 * string comparison.
 */
function normalize(str: string): string {
  return str
    .normalize('NFD') // Decompose characters and diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
    .normalize('NFKC') // Normalize to composed form
    .toLocaleLowerCase(); // Make it case-insensitive
}

/**
 * Simple case-insensitive search that checks if a query string appears within content.
 *
 * @param query The search string to look for
 * @param content The string to search within
 * @returns a boolean indicating if the query exists within the content
 */
export function exactSearch(query: string, content: string) {
  return normalize(content).includes(normalize(query));
}

/**
 * Fuzzy string matching that's pretty forgiving of typos and works with any language/script. The higher the threshold
 * (0-1), the pickier it is about matches. 0.7 is a good default that catches most typos while avoiding false positives.
 *
 * @param content The string to search within
 * @param query The search query to look for
 * @param threshold Minimum similarity threshold (0-1), where 1 requires exact match
 *
 * @returns a boolean indicating if the fuzzy match meets the threshold
 */
export function fuzzySearch(query: string, content: string, threshold = 0.7): boolean {
  if (!content || !query) return false;
  if (threshold < 0 || threshold > 1) throw new Error('Threshold must be between 0 and 1');
  if (query.length > content.length) return false;

  // Normalize strings to handle different Unicode compositions, diacritics, etc.
  const normalizedContent = normalize(content);
  const normalizedQuery = normalize(query);

  // Convert to lowercase with proper Unicode support
  const lowContent = normalizedContent.toLocaleLowerCase();
  const lowQuery = normalizedQuery.toLocaleLowerCase();
  let score = 0;
  let contentIdx = 0;
  let queryIdx = 0;
  let lastMatchIdx = -1;

  // Handle surrogate pairs and combining characters
  const contentChars = [...lowContent];
  const queryChars = [...lowQuery];

  // Scan through content looking for query characters in order
  while (contentIdx < contentChars.length && queryIdx < queryChars.length) {
    if (contentChars[contentIdx] === queryChars[queryIdx]) {
      // Add to score based on character proximity to last match
      if (lastMatchIdx === -1) {
        score += 1;
      } else {
        // Reduce score for gaps between matches
        score += Math.max(0, 1 - (contentIdx - lastMatchIdx - 1) * 0.1);
      }
      lastMatchIdx = contentIdx;
      queryIdx++;
    }
    contentIdx++;
  }

  // Calculate final similarity score
  const maxScore = queryChars.length;
  const similarity = queryIdx === queryChars.length ? score / maxScore : 0;

  return similarity >= threshold;
}
