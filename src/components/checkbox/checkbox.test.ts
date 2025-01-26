import { fixture, html } from '@open-wc/testing';
import { clickOnElement, expectEvent } from '../../utilities/testing.js';
import type { QuietCheckbox } from './checkbox.js';

describe('<quiet-checkbox>', () => {
  it('should dispatch the `quiet-input` and `input` events when the checkbox is toggled', async () => {
    const el = await fixture<QuietCheckbox>(html`<quiet-checkbox label="Test"></quiet-checkbox>`);
    await expectEvent(el, ['input', 'quiet-input'], () => clickOnElement(el));
  });

  it('should dispatch the `quiet-change` and `change` events when the checkbox is toggled', async () => {
    const el = await fixture<QuietCheckbox>(html`<quiet-checkbox label="Test"></quiet-checkbox>`);
    await expectEvent(el, ['change', 'quiet-change'], () => clickOnElement(el));
  });

  it('should dispatch the `quiet-blur` and `quiet-focus` events when entering and leaving the control', async () => {
    const el = await fixture<QuietCheckbox>(html`<quiet-checkbox label="Test"></quiet-checkbox>`);
    await expectEvent(el, ['quiet-focus', 'quiet-blur'], () => {
      el.focus();
      el.blur();
    });
  });
});
