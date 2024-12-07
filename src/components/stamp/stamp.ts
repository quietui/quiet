import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './stamp.styles.js';

//
// TODO
//
//  - listen for data- attributes to change and re-render
//  - other re-renders
//  - boolean attributes should probably be ?attr="true|false"
//  - conditional rendering based on truthy values:
//      <div :if="truthy-thing">
//      <div :unless="truthy-thing">
//      <
//

/**
 * <quiet-stamp>
 *
 * @summary TODO
 * @documentation https://quietui.org/docs/components/stamp
 * @status experimental
 * @since TODO
 *
 * @slot - The default slot.
 * @slot named - A named slot.
 */
@customElement('quiet-stamp')
export class QuietStamp extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  /** The id of the `<template>` element to use as a stamp. */
  @property() template = '';

  firstUpdated() {
    // Look for the template
    this.renderTemplate();
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('template')) {
      this.renderTemplate();
    }
  }

  private handleDefaultSlotChange() {
    // Parse slotted elements for slot names
    //
  }

  private renderTemplate() {
    const root = this.getRootNode() as Document | ShadowRoot;
    const templateEl = root.getElementById(this.template) as HTMLTemplateElement;

    // Did we find the <template>?
    if (!templateEl) {
      console.warn(`A template with an id of "${this.template}" could not be found in this document.`);
      return;
    }

    // Clone it
    let doc = templateEl.content.cloneNode(true) as HTMLElement;

    // Loop through all elements in the cloned template and replace :attr with attr="this.dataset.attr"
    doc.querySelectorAll('*').forEach(el => {
      for (const attr of el.attributes) {
        //
        // TODO - decide what syntax to use
        //
        // Text/HTML inserts: <meta name="key">
        // String attributes: .attr="key"
        // Boolean attributes: ?attr="truthy-key"
        // Directives: :if="truthy-key", :unless="truthy-key"
        //
        //
        //
        //
        //
        //
        //
        //

        // Check for value attributes, e.g. `@attr="key"`
        if (attr.name.startsWith('.')) {
          el.setAttribute(attr.name.slice(1), this.getAttribute(`data-${attr.value}`) || '');
          el.removeAttribute(attr.name);
        }

        // TODO - Check for boolean attributes, e.g. `:disabled="truthy"`

        // TODO - Check for directives, e.g. `:if` and `:unless`
        if (attr.name.startsWith(':')) {
          //
        }
      }
    });

    // Replace `<meta name="foo" with the user-provided HTML found in `*[slot="foo"]`. If no content is found, fall back
    // to `this.dataset[name]`.
    const userHtmlMap = new Map(Object.entries(this.dataset));

    // ..then look for content slotted in by the user, convert it to HTML, and add it to the map
    this.querySelectorAll<HTMLElement>('[slot]').forEach(el => {
      const name = el.slot;
      if (name) {
        const clone = el.cloneNode(true) as HTMLElement;
        clone.removeAttribute('slot');
        userHtmlMap.set(name, clone.outerHTML);
      }
    });

    // Replace <meta> tags in the template with the user-provided HTML based on slot="name", falling back to `data-name`
    const metaTags = doc.querySelectorAll<HTMLMetaElement>('meta');
    metaTags.forEach(meta => {
      if (userHtmlMap.has(meta.name)) {
        meta.outerHTML = userHtmlMap.get(meta.name)!;
      } else {
        meta.replaceWith(this.getAttribute(`data-${meta.name}`) || '');
      }
    });

    // Remove anything that doesn't have slot="..."
    [...this.children].forEach(el => {
      if (!el.slot) el.remove();
    });

    // Append the cloned template children
    [...doc.children].forEach(el => {
      this.append(el);
    });
  }

  render() {
    return html` <slot @slotchange=${this.handleDefaultSlotChange}></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-stamp': QuietStamp;
  }
}
