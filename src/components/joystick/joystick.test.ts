import { expect, fixture, html } from '@open-wc/testing';
import type { QuietJoystick } from './joystick.js';

describe('<quiet-joystick>', () => {
  it('does something', async () => {
    const el = await fixture<QuietJoystick>(html` <quiet-joystick></quiet-joystick> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
