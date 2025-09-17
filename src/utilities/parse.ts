/**
 * Parses a delimited set of tokens and returns an array with all whitespace and empty items removed.
 */
export function parseDelimitedTokens(input: string | number, delimiter: string = ' '): string[] {
  return (input + '')
    .split(delimiter)
    .map(token => token.trim())
    .filter(token => token !== '');
}
