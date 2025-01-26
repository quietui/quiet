import { fixture, html } from '@open-wc/testing';
import { clickOnElement, expectEvent } from '../../utilities/testing.js';
import type { QuietSwitch } from './switch.js';

describe('<quiet-switch>', () => {
  it('should dispatch the `quiet-input` and `input` events when the switch is toggled', async () => {
    const el = await fixture<QuietSwitch>(html`<quiet-switch label="Test"></quiet-switch>`);
    await expectEvent(
      el,
      ['quiet-input', 'input'],
      async () => {
        await clickOnElement(el);
      },
      { count: 1 }
    );
  });

  it('should dispatch the `quiet-change` and `change` events when the switch is toggled', async () => {
    const el = await fixture<QuietSwitch>(html`<quiet-switch label="Test"></quiet-switch>`);
    await expectEvent(
      el,
      ['quiet-change', 'change'],
      async () => {
        await clickOnElement(el);
      },
      { count: 1 }
    );
  });

  it('should dispatch the `quiet-blur` and `quiet-focus` events when entering and leaving the control', async () => {
    const el = await fixture<QuietSwitch>(html`<quiet-switch label="Test"></quiet-switch>`);
    await expectEvent(
      el,
      ['quiet-focus', 'quiet-blur'],
      async () => {
        el.focus();
        el.blur();
      },
      { count: 1 }
    );
  });
});
