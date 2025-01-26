import { expect, fixture, html } from '@open-wc/testing';
import { spy } from 'sinon';
import { clickOnElement } from '../../utilities/testing.js';
import type { QuietSwitch } from './switch.js';

describe('<quiet-switch>', () => {
  it('should dispatch the `quiet-input` and `input` events when the switch is toggled', async () => {
    const el = await fixture<QuietSwitch>(html`<quiet-switch label="Test"></quiet-switch>`);

    const inputSpy = spy();
    const quietInputSpy = spy();

    el.addEventListener('input', inputSpy);
    el.addEventListener('quiet-input', quietInputSpy);

    await clickOnElement(el);

    expect(quietInputSpy).to.have.been.calledOnce;
    expect(inputSpy).to.have.been.calledOnce;
  });

  it('should dispatch the `quiet-change` and `change` events when the switch is toggled', async () => {
    const el = await fixture<QuietSwitch>(html`<quiet-switch label="Test"></quiet-switch>`);

    const changeSpy = spy();
    const quietChangeSpy = spy();

    el.addEventListener('change', changeSpy);
    el.addEventListener('quiet-change', quietChangeSpy);

    await clickOnElement(el);

    expect(quietChangeSpy).to.have.been.calledOnce;
    expect(changeSpy).to.have.been.calledOnce;
  });
});
