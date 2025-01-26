import { expect, fixture, html } from '@open-wc/testing';
import { clickOnElement, expectEvent } from '../../utilities/testing.js';
import type { QuietRadio } from './radio.js';

describe('<quiet-radio>', () => {
  it('should dispatch the `quiet-input`, `input`, `quiet-change`, and `change` events when the user selects a radio item', async () => {
    const el = await fixture<QuietRadio>(html`
      <quiet-radio label="Test">
        <quiet-radio-item value="a">A</quiet-radio-item>
        <quiet-radio-item value="b">B</quiet-radio-item>
        <quiet-radio-item value="c">C</quiet-radio-item>
      </quiet-radio>
    `);
    const item1 = el.querySelector(':nth-child(1)')!;
    const item2 = el.querySelector(':nth-child(2)')!;
    const item3 = el.querySelector(':nth-child(3)')!;

    await expectEvent(
      el,
      ['quiet-input', 'input', 'quiet-change', 'change'],
      async () => {
        await clickOnElement(item1);
        await el.updateComplete;
        await clickOnElement(item2);
        await el.updateComplete;
        await clickOnElement(item3);
        await el.updateComplete;
      },
      { count: 3 }
    );

    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
