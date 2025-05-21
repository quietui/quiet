import { expect, fixture, html } from '@open-wc/testing';
import type { QuietCarouselItem } from './carousel-item.js';

describe('<quiet-carousel-item>', () => {
  it('does something', async () => {
    const el = await fixture<QuietCarouselItem>(html` <quiet-carousel-item></quiet-carousel-item> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
