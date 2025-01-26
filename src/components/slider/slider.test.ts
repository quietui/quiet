import { fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { clickOnElement, expectEvent } from '../../utilities/testing.js';
import type { QuietSlider } from './slider.js';

describe('<quiet-slider>', () => {
  it('should dispatch the `quiet-input` and `input` events when the user moves the slider', async () => {
    const el = await fixture<QuietSlider>(html`<quiet-slider label="Test"></quiet-slider>`);
    await expectEvent(
      el,
      ['quiet-input', 'input'],
      async () => {
        await clickOnElement(el.track, 'center');
        await clickOnElement(el.track, 'right');
        await clickOnElement(el.track, 'left');
      },
      { count: 3 }
    );
  });

  it('should dispatch the `quiet-change` and `change` events when the user moves the slider', async () => {
    const el = await fixture<QuietSlider>(html`<quiet-slider label="Test"></quiet-slider>`);
    await expectEvent(
      el,
      ['quiet-change', 'change'],
      async () => {
        el.focus();
        await sendKeys({ press: 'ArrowUp' });
        await sendKeys({ press: 'ArrowUp' });
        await sendKeys({ press: 'ArrowUp' });
        el.blur();
      },
      { count: 3 }
    );
  });

  it('should dispatch the `quiet-blur` and `quiet-focus` events when entering and leaving the control', async () => {
    const el = await fixture<QuietSlider>(html`<quiet-slider label="Test"></quiet-slider>`);
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
