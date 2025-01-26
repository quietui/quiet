import { fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { clickOnElement, expectEvent } from '../../utilities/testing.js';
import type { QuietRating } from './rating.js';

describe('<quiet-rating>', () => {
  it('should dispatch the `quiet-input` and `input` events when the user moves the rating', async () => {
    const el = await fixture<QuietRating>(html`<quiet-rating label="Test"></quiet-rating>`);
    await expectEvent(
      el,
      ['quiet-input', 'input'],
      async () => {
        await clickOnElement(el.rating, 'center');
        await clickOnElement(el.rating, 'right');
        await clickOnElement(el.rating, 'left');
      },
      { count: 3 }
    );
  });

  it('should dispatch the `quiet-change` and `change` events when the user moves the rating', async () => {
    const el = await fixture<QuietRating>(html`<quiet-rating label="Test"></quiet-rating>`);
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

  it('should dispatch the `quiet-focus` and `quiet-blur` events when entering and leaving the control', async () => {
    const el = await fixture<QuietRating>(html`<quiet-rating label="Test"></quiet-rating>`);
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
