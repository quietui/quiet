import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { spy } from 'sinon';
import type { QuietTextField } from './text-field.js';

describe('<quiet-text-field>', () => {
  it('should dispatch the `quiet-input` and `input` events when the user enters a value', async () => {
    const el = await fixture<QuietTextField>(html`<quiet-text-field label="Test"></quiet-text-field>`);

    const inputSpy = spy();
    const quietInputSpy = spy();

    el.addEventListener('input', inputSpy);
    el.addEventListener('quiet-input', quietInputSpy);

    el.focus();
    await el.updateComplete;
    await sendKeys({ type: 'qui' });
    await el.updateComplete;
    el.blur();

    // Custom event
    expect(quietInputSpy).to.have.been.calledThrice;
    expect(quietInputSpy.firstCall.args[0].bubbles).to.be.true;
    expect(quietInputSpy.firstCall.args[0].composed).to.be.true;

    // Native event
    expect(inputSpy).to.have.been.calledThrice;
    expect(inputSpy.firstCall.args[0].bubbles).to.be.true;
    expect(inputSpy.firstCall.args[0].composed).to.be.true;
  });

  it('should dispatch the `quiet-change` and `change` events when the user commits a value', async () => {
    const el = await fixture<QuietTextField>(html`<quiet-text-field label="Test"></quiet-text-field>`);

    const quietChangeSpy = spy();
    const changeSpy = spy();

    el.addEventListener('change', changeSpy);
    el.addEventListener('quiet-change', quietChangeSpy);

    el.focus();
    await el.updateComplete;
    await sendKeys({ type: 'qui' });
    await el.updateComplete;
    el.blur();

    // Custom event
    expect(quietChangeSpy).to.have.been.calledOnce;
    expect(quietChangeSpy.firstCall.args[0].bubbles).to.be.true;
    expect(quietChangeSpy.firstCall.args[0].composed).to.be.true;

    // Native event
    expect(changeSpy).to.have.been.calledOnce;
    expect(changeSpy.firstCall.args[0].bubbles).to.be.true;
    expect(changeSpy.firstCall.args[0].composed).to.be.true;
  });

  it('should dispatch the `quiet-blur` and `quiet-change` events when entering and leaving the control', async () => {
    const el = await fixture<QuietTextField>(html`<quiet-text-field label="Test"></quiet-text-field>`);

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
