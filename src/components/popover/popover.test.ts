import { expect, fixture, html } from '@open-wc/testing';
import type { QuietPopover } from './popover.js';

describe('<quiet-popover>', () => {
  it('does something', async () => {
    const el = await fixture<QuietPopover>(html` <quiet-popover>Click me</quiet-popover> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
