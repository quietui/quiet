import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.js';
import type { QuietSpinner } from './spinner.js';

describe('<quiet-spinner>', () => {
  it('does something', async () => {
    const el = await fixture<QuietSpinner>(html` <quiet-spinner>Click me</quiet-spinner> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
