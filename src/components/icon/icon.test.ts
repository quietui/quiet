import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.js';
import type { QuietIcon } from './icon.js';

describe('<quiet-icon>', () => {
  it('does something', async () => {
    const el = await fixture<QuietIcon>(html` <quiet-icon>Click me</quiet-icon> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
