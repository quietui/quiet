import { expect, fixture, html } from '@open-wc/testing';
import type { QuietMutationObserver } from './mutation-observer.js';

describe('<quiet-mutation-observer>', () => {
  it('does something', async () => {
    const el = await fixture<QuietMutationObserver>(html` <quiet-mutation-observer></quiet-mutation-observer> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
