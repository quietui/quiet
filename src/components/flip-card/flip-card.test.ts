import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietFlipCard } from './flip-card.js';

describe('<quiet-flip-card>', () => {
  it('does something', async () => {
    const el = await fixture<QuietFlipCard>(html` <quiet-flip-card>Click me</quiet-flip-card> `);
    await expect(el).to.be.accessible();
  });
});
