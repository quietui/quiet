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
 * Fuzzy string matching that handles typos, transpositions, and works with any language/script. The higher the
 * threshold (0-1), the pickier it is about matches. 0.7 is a good default that catches most typos while avoiding false
 * positives.
 *
 * @param query The search query to look for
 * @param content The string to search within
 * @param threshold Minimum similarity threshold (0-1), where 1 requires exact match
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
  let contentIndex = 0;
  let queryIndex = 0;
  let lastMatchIndex = -1;

  // Handle surrogate pairs and combining characters
  const contentChars = [...lowContent];
  const queryChars = [...lowQuery];

  // Track potential transpositions
  let lastSkippedChar = '';
  let lastSkippedIndex = -1;

  // Scan through content looking for query characters in order
  while (contentIndex < contentChars.length && queryIndex < queryChars.length) {
    const currentQueryChar = queryChars[queryIndex];
    const currentContentChar = contentChars[contentIndex];

    if (currentContentChar === currentQueryChar) {
      // Regular match
      if (lastMatchIndex === -1) {
        score += 1;
      } else {
        score += Math.max(0, 1 - (contentIndex - lastMatchIndex - 1) * 0.1);
      }
      lastMatchIndex = contentIndex;
      queryIndex++;
      lastSkippedChar = '';
      lastSkippedIndex = -1;
    } else if (
      // Check for transposition with next character
      queryIndex + 1 < queryChars.length &&
      contentIndex + 1 < contentChars.length &&
      currentContentChar === queryChars[queryIndex + 1] &&
      contentChars[contentIndex + 1] === currentQueryChar
    ) {
      // Transposition found - add slightly reduced score
      score += 0.9; // Small penalty for transposition
      lastMatchIndex = contentIndex + 1;
      queryIndex += 2;
      contentIndex++;
      lastSkippedChar = '';
      lastSkippedIndex = -1;
    } else if (
      // Check for transposition with previously skipped character
      lastSkippedChar === currentQueryChar &&
      contentIndex - lastSkippedIndex <= 2
    ) {
      // Transposition found with previously skipped character
      score += 0.8; // Slightly larger penalty for non-adjacent transposition
      lastMatchIndex = contentIndex;
      queryIndex++;
      lastSkippedChar = '';
      lastSkippedIndex = -1;
    } else {
      // No match - track this character for potential later transposition
      lastSkippedChar = currentContentChar;
      lastSkippedIndex = contentIndex;
    }
    contentIndex++;
  }

  // Calculate final similarity score
  const maxScore = queryChars.length;
  const similarity = queryIndex === queryChars.length ? score / maxScore : 0;

  return similarity >= threshold;
}
