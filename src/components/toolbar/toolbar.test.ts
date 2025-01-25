import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietToolbar } from './toolbar.js';

describe('<quiet-toolbar>', () => {
  it('does something', async () => {
    const el = await fixture<QuietToolbar>(html` <quiet-toolbar>Click me</quiet-toolbar> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
