import { expect, fixture, html } from '@open-wc/testing';
import type { QuietButtonGroup } from './button-group.js';

describe('<quiet-button-group>', () => {
  it('does something', async () => {
    const el = await fixture<QuietButtonGroup>(html` <quiet-button-group>Click me</quiet-button-group> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
