import { format } from 'prettier';
import defaultOptions from '../../prettier.config.js';

/**
 * Formats a string of code using Prettier.
 *
 * @param {string} code - The code to format.
 * @param {*} options - Prettier options. Defaults are taken from the project's root config. See this page for more
 *   info: https://prettier.io/docs/en/options.html
 */
export async function formatCode(string, options) {
  return await format(string, {
    ...defaultOptions,
    ...options
  });
}

/**
 * Eleventy plugin to format pages using Prettier.
 */
export function formatCodePlugin(eleventyConfig) {
  eleventyConfig.addTransform('format-code', function (content) {
    return formatCode(content, { parser: 'html' });
  });
}
