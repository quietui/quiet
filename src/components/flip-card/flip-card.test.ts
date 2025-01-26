import { expect, fixture, html } from '@open-wc/testing';
import type { QuietFlipCard } from './flip-card.js';

describe('<quiet-flip-card>', () => {
  it('does something', async () => {
    const el = await fixture<QuietFlipCard>(html` <quiet-flip-card>Click me</quiet-flip-card> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
