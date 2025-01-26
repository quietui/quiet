import { expect, fixture, html } from '@open-wc/testing';
import { spy } from 'sinon';
import { clickOnElement } from '../../utilities/testing.js';
import type { QuietCheckbox } from './checkbox.js';

describe('<quiet-checkbox>', () => {
  it('should dispatch the `quiet-input` and `input` events when the checkbox is toggled', async () => {
    const el = await fixture<QuietCheckbox>(html`<quiet-checkbox label="Test"></quiet-checkbox>`);

    const inputSpy = spy();
    const quietInputSpy = spy();

    el.addEventListener('input', inputSpy);
    el.addEventListener('quiet-input', quietInputSpy);

    await clickOnElement(el);

    expect(quietInputSpy).to.have.been.calledOnce;
    expect(inputSpy).to.have.been.calledOnce;
  });

  it('should dispatch the `quiet-change` and `change` events when the checkbox is toggled', async () => {
    const el = await fixture<QuietCheckbox>(html`<quiet-checkbox label="Test"></quiet-checkbox>`);

    const changeSpy = spy();
    const quietChangeSpy = spy();

    el.addEventListener('change', changeSpy);
    el.addEventListener('quiet-change', quietChangeSpy);

    await clickOnElement(el);

    expect(quietChangeSpy).to.have.been.calledOnce;
    expect(changeSpy).to.have.been.calledOnce;
  });

  it('should dispatch the `quiet-blur` and `quiet-change` events when entering and leaving the control', async () => {
    const el = await fixture<QuietCheckbox>(html`<quiet-checkbox label="Test"></quiet-checkbox>`);

    const focusSpy = spy();
    const blurSpy = spy();

    el.addEventListener('quiet-focus', focusSpy);
    el.addEventListener('quiet-blur', blurSpy);

    el.focus();
    el.blur();

    expect(focusSpy).to.have.been.calledOnce;
    expect(blurSpy).to.have.been.calledOnce;
  });
});
