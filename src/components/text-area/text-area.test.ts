import { fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { expectEvent } from '../../utilities/testing.js';
import type { QuietTextArea } from './text-area.js';

describe('<quiet-text-area>', () => {
  it('should dispatch the `quiet-input` and `input` events when the user enters a value', async () => {
    const el = await fixture<QuietTextArea>(html`<quiet-text-area label="Test"></quiet-text-area>`);
    await expectEvent(
      el,
      ['quiet-input', 'input'],
      async () => {
        el.focus();
        await sendKeys({ type: 'qui' });
        await el.updateComplete;
      },
      { count: 3 }
    );
  });

  it('should dispatch the `quiet-change` and `change` events when the user commits a value', async () => {
    const el = await fixture<QuietTextArea>(html`<quiet-text-area label="Test"></quiet-text-area>`);
    await expectEvent(
      el,
      ['quiet-change', 'change'],
      async () => {
        el.focus();
        await sendKeys({ type: 'qui' });
        await el.updateComplete;
        el.blur();
      },
      { count: 1 }
    );
  });

  it('should dispatch the `quiet-blur` and `quiet-focus` events when entering and leaving the control', async () => {
    const el = await fixture<QuietTextArea>(html`<quiet-text-area label="Test"></quiet-text-area>`);
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
