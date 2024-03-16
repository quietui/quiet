import '../../../dist/quiet.loader.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { QuietNumber } from './number.js';

describe('<quiet-number>', () => {
  it('does something', async () => {
    const el = await fixture<QuietNumber>(html` <quiet-number>Click me</quiet-number> `);
    await expect(el).to.be.accessible();
  });
});
