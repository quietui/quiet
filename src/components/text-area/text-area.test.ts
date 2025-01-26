import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { spy } from 'sinon';
import type { QuietTextArea } from './text-area.js';

describe('<quiet-text-area>', () => {
  it('should dispatch the `quiet-input` and `input` events when the user enters a value', async () => {
    const el = await fixture<QuietTextArea>(html`<quiet-text-area label="Test"></quiet-text-area>`);

    const inputSpy = spy();
    const quietInputSpy = spy();

    el.addEventListener('input', inputSpy);
    el.addEventListener('quiet-input', quietInputSpy);

    el.focus();
    await el.updateComplete;
    await sendKeys({ type: 'qui' });
    await el.updateComplete;
    el.blur();

    expect(quietInputSpy).to.have.been.calledThrice;
    expect(inputSpy).to.have.been.calledThrice;
  });

  it('should dispatch the `quiet-change` and `change` events when the user commits a value', async () => {
    const el = await fixture<QuietTextArea>(html`<quiet-text-area label="Test"></quiet-text-area>`);

    const quietChangeSpy = spy();
    const changeSpy = spy();

    el.addEventListener('change', changeSpy);
    el.addEventListener('quiet-change', quietChangeSpy);

    el.focus();
    await el.updateComplete;
    await sendKeys({ type: 'qui' });
    await el.updateComplete;
    el.blur();

    expect(quietChangeSpy).to.have.been.calledOnce;
    expect(changeSpy).to.have.been.calledOnce;
  });

  it('should dispatch the `quiet-blur` and `quiet-change` events when entering and leaving the control', async () => {
    const el = await fixture<QuietTextArea>(html`<quiet-text-area label="Test"></quiet-text-area>`);

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
