import { expect, fixture, html } from '@open-wc/testing';
import type { QuietBreadcrumb } from './breadcrumb.js';

describe('<quiet-breadcrumb>', () => {
  it('does something', async () => {
    const el = await fixture<QuietBreadcrumb>(html` <quiet-breadcrumb>Click me</quiet-breadcrumb> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
