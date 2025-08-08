import { expect, fixture, html } from '@open-wc/testing';
import type { QuietMeshGradient } from './mesh-gradient.js';

describe('<quiet-mesh-gradient>', () => {
  it('does something', async () => {
    const el = await fixture<QuietMeshGradient>(html` <quiet-mesh-gradient></quiet-mesh-gradient> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
