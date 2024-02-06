import { deleteAsync } from 'del';
import { docsDir, siteDir } from './utils.js';
import { join } from 'path';
import Eleventy from '@11ty/eleventy';

const elev = new Eleventy(docsDir, siteDir, {
  quietMode: true,
  configPath: join(docsDir, '.eleventy.js')
});

// Cleanup
await deleteAsync(siteDir);

// Write it
await elev.write();
