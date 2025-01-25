import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietDate } from './date.js';

describe('<quiet-date>', () => {
  it('does something', async () => {
    const el = await fixture<QuietDate>(html` <quiet-date>Click me</quiet-date> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
