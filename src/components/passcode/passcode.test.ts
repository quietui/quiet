import { expect, fixture, html } from '@open-wc/testing';
import type { QuietPasscode } from './passcode.js';

describe('<quiet-passcode>', () => {
  it('does something', async () => {
    const el = await fixture<QuietPasscode>(html` <quiet-passcode>Click me</quiet-passcode> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
