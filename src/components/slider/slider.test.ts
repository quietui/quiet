import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { spy } from 'sinon';
import { clickOnElement } from '../../utilities/testing.js';
import type { QuietSlider } from './slider.js';

describe('<quiet-slider>', () => {
  it('should dispatch the `quiet-input` and `input` events when the user moves the slider', async () => {
    const el = await fixture<QuietSlider>(html`<quiet-slider label="Test"></quiet-slider>`);
    const inputSpy = spy();
    const quietInputSpy = spy();

    el.addEventListener('input', inputSpy);
    el.addEventListener('quiet-input', quietInputSpy);

    await clickOnElement(el.track, 'center');
    await clickOnElement(el.track, 'right');
    await clickOnElement(el.track, 'left');

    expect(quietInputSpy).to.have.been.calledThrice;
    expect(inputSpy).to.have.been.calledThrice;
  });

  it('should dispatch the `quiet-change` and `change` events when the user moves the slider', async () => {
    const el = await fixture<QuietSlider>(html`<quiet-slider label="Test"></quiet-slider>`);
    const changeSpy = spy();
    const quietChangeSpy = spy();

    el.addEventListener('change', changeSpy);
    el.addEventListener('quiet-change', quietChangeSpy);

    el.focus();
    await sendKeys({ press: 'ArrowUp' });
    await sendKeys({ press: 'ArrowUp' });
    await sendKeys({ press: 'ArrowUp' });
    el.blur();

    expect(quietChangeSpy).to.have.been.calledThrice;
    expect(changeSpy).to.have.been.calledThrice;
  });

  it('should dispatch the `quiet-blur` and `quiet-change` events when entering and leaving the control', async () => {
    const el = await fixture<QuietSlider>(html`<quiet-slider label="Test"></quiet-slider>`);

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
