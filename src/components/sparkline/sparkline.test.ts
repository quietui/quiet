import { expect, fixture, html } from '@open-wc/testing';
import type { QuietSparkline } from './sparkline.js';

describe('<quiet-sparkline>', () => {
  it('does something', async () => {
    const el = await fixture<QuietSparkline>(html` <quiet-sparkline></quiet-sparkline> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
