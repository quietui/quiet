import { expect, fixture, html } from '@open-wc/testing';
import type { QuietCallout } from './callout.js';

describe('<quiet-callout>', () => {
  it('does something', async () => {
    const el = await fixture<QuietCallout>(html` <quiet-callout>Click me</quiet-callout> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
