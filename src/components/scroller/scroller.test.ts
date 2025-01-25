import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietScroller } from './scroller.js';

describe('<quiet-scroller>', () => {
  it('does something', async () => {
    const el = await fixture<QuietScroller>(html` <quiet-scroller></quiet-scroller> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
