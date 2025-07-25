import { expect, fixture, html } from '@open-wc/testing';
import type { QuietNavicon } from './navicon.js';

describe('<quiet-navicon>', () => {
  it('does something', async () => {
    const el = await fixture<QuietNavicon>(html` <quiet-navicon></quiet-navicon> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
