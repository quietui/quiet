import { expect, fixture, html } from '@open-wc/testing';
import type { QuietBarChart } from './bar-chart.js';

describe('<quiet-bar-chart>', () => {
  it('does something', async () => {
    const el = await fixture<QuietBarChart>(html` <quiet-bar-chart></quiet-bar-chart> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
