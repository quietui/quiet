/** @type {import("prettier").Config} */
export default {
  arrowParens: 'avoid',
  bracketSpacing: true,
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  bracketSameLine: false,
  jsxSingleQuote: false,
  printWidth: 120,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  requirePragma: false,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  useTabs: false,

  // Plugins
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-css-order'],
  cssDeclarationSorterOrder: 'smacss'
};
