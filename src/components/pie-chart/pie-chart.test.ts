import { expect, fixture, html } from '@open-wc/testing';
import type { QuietPieChart } from './pie-chart.js';

describe('<quiet-pie-chart>', () => {
  it('does something', async () => {
    const el = await fixture<QuietPieChart>(html` <quiet-pie-chart></quiet-pie-chart> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
