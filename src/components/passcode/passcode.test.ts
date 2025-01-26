import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { spy } from 'sinon';
import type { QuietPasscode } from './passcode.js';

describe('<quiet-passcode>', () => {
  it('should dispatch the `quiet-input` and `input` events when the user enters a value', async () => {
    const el = await fixture<QuietPasscode>(html`<quiet-passcode label="Test"></quiet-passcode>`);

    const inputSpy = spy();
    const quietInputSpy = spy();

    el.addEventListener('input', inputSpy);
    el.addEventListener('quiet-input', quietInputSpy);

    el.focus();
    await el.updateComplete;
    await sendKeys({ type: '123' });
    await el.updateComplete;
    el.blur();

    // Custom event
    expect(quietInputSpy).to.have.been.calledThrice;
    expect(inputSpy).to.have.been.calledThrice;
  });

  it('should dispatch the `quiet-change` and `change` events when the user commits a value', async () => {
    const el = await fixture<QuietPasscode>(html`<quiet-passcode label="Test"></quiet-passcode>`);

    const quietChangeSpy = spy();
    const changeSpy = spy();

    el.addEventListener('change', changeSpy);
    el.addEventListener('quiet-change', quietChangeSpy);

    el.focus();
    await el.updateComplete;
    await sendKeys({ type: '123' });
    await el.updateComplete;
    el.blur();

    // Custom event
    expect(quietChangeSpy).to.have.been.calledOnce;
    expect(changeSpy).to.have.been.calledOnce;
  });

  it('should dispatch the `quiet-blur` and `quiet-change` events when entering and leaving the control', async () => {
    const el = await fixture<QuietPasscode>(html`<quiet-passcode label="Test"></quiet-passcode>`);

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
