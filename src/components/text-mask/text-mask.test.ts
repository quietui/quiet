import { expect, fixture, html } from '@open-wc/testing';
import type { QuietTextMask } from './text-mask.js';

describe('<quiet-text-mask>', () => {
  it('does something', async () => {
    const el = await fixture<QuietTextMask>(html` <quiet-text-mask></quiet-text-mask> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
