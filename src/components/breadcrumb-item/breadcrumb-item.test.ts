import { expect, fixture, html } from '@open-wc/testing';
import type { QuietBreadcrumbItem } from './breadcrumb-item.js';

describe('<quiet-breadcrumb-item>', () => {
  it('does something', async () => {
    const el = await fixture<QuietBreadcrumbItem>(html` <quiet-breadcrumb-item>Click me</quiet-breadcrumb-item> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
