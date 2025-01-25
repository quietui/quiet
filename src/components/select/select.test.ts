import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietSelect } from './select.js';

describe('<quiet-select>', () => {
  it('does something', async () => {
    const el = await fixture<QuietSelect>(html` <quiet-select>Click me</quiet-select> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
