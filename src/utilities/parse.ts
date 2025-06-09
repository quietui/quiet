/** Parses a space-delimited set of tokens and returns an array with all whitespace removed. */
export function parseSpaceDelimitedTokens(input: string | number): string[] {
  return (input + '')
    .split(' ')
    .map(token => token.trim())
    .filter(token => token !== '');
}
