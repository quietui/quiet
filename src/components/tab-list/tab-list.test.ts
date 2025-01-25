import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietTabList } from './tab-list.js';

describe('<quiet-tab-list>', () => {
  it('does something', async () => {
    const el = await fixture<QuietTabList>(html` <quiet-tab-list>Click me</quiet-tab-list> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
