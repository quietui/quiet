import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietButton } from './button.js';

describe('<quiet-button>', () => {
  it('does something', async () => {
    const el = await fixture<QuietButton>(html` <quiet-button>Click me</quiet-button> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
