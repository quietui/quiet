import { expect, fixture, html } from '@open-wc/testing';
import type { QuietToast } from './toast.js';

describe('<quiet-toast>', () => {
  it('does something', async () => {
    const el = await fixture<QuietToast>(html` <quiet-toast></quiet-toast> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
