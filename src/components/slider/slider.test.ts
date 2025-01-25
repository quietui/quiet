import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietSlider } from './slider.js';

describe('<quiet-slider>', () => {
  it('does something', async () => {
    const el = await fixture<QuietSlider>(html` <quiet-slider>Click me</quiet-slider> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
