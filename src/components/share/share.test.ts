import { expect, fixture, html } from '@open-wc/testing';
import type { QuietShare } from './share.js';

describe('<quiet-share>', () => {
  it('does something', async () => {
    const el = await fixture<QuietShare>(html` <quiet-share></quiet-share> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
