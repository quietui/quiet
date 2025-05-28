import { expect, fixture, html } from '@open-wc/testing';
import type { QuietZoomableFrame } from './zoomable-frame.js';

describe('<quiet-zoomable-frame>', () => {
  it('does something', async () => {
    const el = await fixture<QuietZoomableFrame>(html` <quiet-zoomable-frame></quiet-zoomable-frame> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
