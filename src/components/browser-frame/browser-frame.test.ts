import { expect, fixture, html } from '@open-wc/testing';
import type { QuietBrowserFrame } from './browser-frame.js';

describe('<quiet-browser-frame>', () => {
  it('does something', async () => {
    const el = await fixture<QuietBrowserFrame>(html` <quiet-browser-frame></quiet-browser-frame> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
