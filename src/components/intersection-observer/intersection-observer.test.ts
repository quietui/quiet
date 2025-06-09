import { expect, fixture, html } from '@open-wc/testing';
import type { QuietIntersectionObserver } from './intersection-observer.js';

describe('<quiet-intersection-observer>', () => {
  it('does something', async () => {
    const el = await fixture<QuietIntersectionObserver>(html` <quiet-intersection-observer></quiet-intersection-observer> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
