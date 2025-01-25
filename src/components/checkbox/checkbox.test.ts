import { expect, fixture, html } from '@open-wc/testing';
import { spy } from 'sinon';
import '../../../dist/quiet.loader.js';
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

    // Custom event
    expect(quietInputSpy).to.have.been.calledOnce;
    expect(quietInputSpy.firstCall.args[0].bubbles).to.be.true;
    expect(quietInputSpy.firstCall.args[0].composed).to.be.true;

    // Native event
    expect(inputSpy).to.have.been.calledOnce;
    expect(inputSpy.firstCall.args[0].bubbles).to.be.true;
    expect(inputSpy.firstCall.args[0].composed).to.be.true;
  });

  it('should dispatch the `quiet-change` and `change` events when the checkbox is toggled', async () => {
    const el = await fixture<QuietCheckbox>(html`<quiet-checkbox label="Test"></quiet-checkbox>`);

    const changeSpy = spy();
    const quietChangeSpy = spy();

    el.addEventListener('change', changeSpy);
    el.addEventListener('quiet-change', quietChangeSpy);

    await clickOnElement(el);

    // Custom change event
    expect(quietChangeSpy).to.have.been.calledOnce;
    expect(quietChangeSpy.firstCall.args[0].bubbles).to.be.true;
    expect(quietChangeSpy.firstCall.args[0].composed).to.be.true;

    // Native change vent
    expect(changeSpy).to.have.been.calledOnce;
    expect(changeSpy.firstCall.args[0].bubbles).to.be.true;
    expect(changeSpy.firstCall.args[0].composed).to.be.true;
  });
});
