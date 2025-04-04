import { expect, fixture, html } from '@open-wc/testing';
import type { QuietCountdown } from './countdown.js';

describe('<quiet-countdown>', () => {
  it('does something', async () => {
    const el = await fixture<QuietCountdown>(html` <quiet-countdown></quiet-countdown> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
