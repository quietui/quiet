import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietAvatar } from './avatar.js';

describe('<quiet-avatar>', () => {
  it('does something', async () => {
    const el = await fixture<QuietAvatar>(html` <quiet-avatar>Click me</quiet-avatar> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
