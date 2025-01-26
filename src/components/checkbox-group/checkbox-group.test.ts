import { expect, fixture, html } from '@open-wc/testing';
import type { QuietCheckboxGroup } from './checkbox-group.js';

describe('<quiet-checkbox-group>', () => {
  it('does something', async () => {
    const el = await fixture<QuietCheckboxGroup>(html` <quiet-checkbox-group>Click me</quiet-checkbox-group> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
