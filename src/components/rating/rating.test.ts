import { expect, fixture, html } from '@open-wc/testing';
import type { QuietRating } from './rating.js';

describe('<quiet-rating>', () => {
  it('does something', async () => {
    const el = await fixture<QuietRating>(html` <quiet-rating>Click me</quiet-rating> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
