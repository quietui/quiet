import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietInclude } from './include.js';

describe('<quiet-include>', () => {
  it('does something', async () => {
    const el = await fixture<QuietInclude>(html` <quiet-include>Click me</quiet-include> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
