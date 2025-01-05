import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietSlideActivate } from './slide-activate.js';

describe('<quiet-slide-activate>', () => {
  it('does something', async () => {
    const el = await fixture<QuietSlideActivate>(html` <quiet-slide-activate>Click me</quiet-slide-activate> `);
    await expect(el).to.be.accessible();
  });
});
