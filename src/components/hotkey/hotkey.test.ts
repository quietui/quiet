import { expect, fixture, html } from '@open-wc/testing';
import type { QuietHotkey } from './hotkey.js';

describe('<quiet-hotkey>', () => {
  it('does something', async () => {
    const el = await fixture<QuietHotkey>(html` <quiet-hotkey></quiet-hotkey> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
