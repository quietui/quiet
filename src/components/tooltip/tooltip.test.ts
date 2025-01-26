import { expect, fixture, html } from '@open-wc/testing';
import type { QuietTooltip } from './tooltip.js';

describe('<quiet-tooltip>', () => {
  it('does something', async () => {
    const el = await fixture<QuietTooltip>(html` <quiet-tooltip>Click me</quiet-tooltip> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
