import { expect, fixture, html } from '@open-wc/testing';
import type { QuietCard } from './card.js';

describe('<quiet-card>', () => {
  it('does something', async () => {
    const el = await fixture<QuietCard>(html` <quiet-card>Click me</quiet-card> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
