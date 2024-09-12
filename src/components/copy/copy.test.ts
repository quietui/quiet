import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietCopy } from './copy.js';

describe('<quiet-copy>', () => {
  it('does something', async () => {
    const el = await fixture<QuietCopy>(html` <quiet-copy>Click me</quiet-copy> `);
    await expect(el).to.be.accessible();
  });
});
