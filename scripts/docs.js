import { deleteAsync } from 'del';
import { docsDir, siteDir } from './utils.js';
import Eleventy from '@11ty/eleventy';

const elev = new Eleventy(docsDir, siteDir, {
  quietMode: true,
  config: function (eleventyConfig) {
    // Config options here
  }
});

// Cleanup
await deleteAsync(siteDir);

// Write it
await elev.write();
