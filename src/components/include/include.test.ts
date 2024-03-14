import '../../../dist/quiet.loader.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { Include } from './include.js';

describe('<quiet-include>', () => {
  it('does something', async () => {
    const el = await fixture<Include>(html` <quiet-include>Click me</quiet-include> `);
    await expect(el).to.be.accessible();
  });
});
