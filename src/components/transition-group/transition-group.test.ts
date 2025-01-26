import { expect, fixture, html } from '@open-wc/testing';
import type { QuietTransitionGroup } from './transition-group.js';

describe('<quiet-transition-group>', () => {
  it('does something', async () => {
    const el = await fixture<QuietTransitionGroup>(html` <quiet-transition-group>Click me</quiet-transition-group> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
