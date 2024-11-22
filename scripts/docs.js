import Eleventy from '@11ty/eleventy';
import { rm } from 'fs/promises';
import { join } from 'path';
import { docsDir, siteDir } from './utils.js';

const elev = new Eleventy(docsDir, siteDir, {
  quietMode: true,
  configPath: join(docsDir, '.eleventy.js')
});

// Cleanup
await rm(siteDir, { recursive: true, force: true });

// Write it
await elev.write();
