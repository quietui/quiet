import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietSlideActivator } from './slide-activator.js';

describe('<quiet-slide-activator>', () => {
  it('does something', async () => {
    const el = await fixture<QuietSlideActivator>(html` <quiet-slide-activator>Click me</quiet-slide-activator> `);
    await expect(el).to.be.accessible();
  });
});
