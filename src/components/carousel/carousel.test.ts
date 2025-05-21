import { expect, fixture, html } from '@open-wc/testing';
import type { QuietCarousel } from './carousel.js';

describe('<quiet-carousel>', () => {
  it('does something', async () => {
    const el = await fixture<QuietCarousel>(html` <quiet-carousel></quiet-carousel> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
