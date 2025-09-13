import { expect, fixture, html } from '@open-wc/testing';
import type { QuietTimedContent } from './timed-content.js';

describe('<quiet-timed-content>', () => {
  it('does something', async () => {
    const el = await fixture<QuietTimedContent>(html`<quiet-timed-content></quiet-timed-content>`);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
