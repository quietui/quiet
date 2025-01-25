import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietDivider } from './divider.js';

describe('<quiet-divider>', () => {
  it('does something', async () => {
    const el = await fixture<QuietDivider>(html` <quiet-divider>Click me</quiet-divider> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
