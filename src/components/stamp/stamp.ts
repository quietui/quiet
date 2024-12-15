import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './stamp.styles.js';

/** Determines if a value is truthy. */
function isTruthy(value: string) {
  const isFalse = [
    'false',
    'null',
    'undefined',
    '', // empty string
    'NaN', // Not a number
    '0', // zero
    '-0', // negative zero
    '0n' // BigInt zero
  ];
  return isFalse.includes(`${value}`) ? false : true;
}

//
// TODO
//
//  - set attributes
//    - how do we handle boolean attributes? e.g. `disabled="true"`
//  - set values in text nodes
//  - set HTML values in text nodes
//  - handle + document `if` attributes
//  - handle + document `unless` attributes
//  - escape placeholders, e.g. `\{escaped}`
//
//  - should the stamp replace itself with the resulting HTML?
//

/**
 * <quiet-stamp>
 *
 * @summary Stamps let you create a template and "stamp out" multiple copies of it using custom data.
 * @documentation https://quietui.org/docs/components/stamp
 * @status experimental
 * @since 1.0
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
    this.stampFromTemplate();
  }

  private stampFromTemplate() {
    const root = this.getRootNode() as Document | ShadowRoot;
    const templateEl = root.getElementById(this.template) as HTMLTemplateElement;

    // Did we find the <template>?
    if (!templateEl) {
      console.warn(`A template with an id of "${this.template}" could not be found in this document.`, this);
      return;
    }

    // Clone it
    const doc = templateEl.content.cloneNode(true) as HTMLElement;

    // Loop through all elements
    doc.querySelectorAll('*').forEach((el: Element) => {
      for (const attr of el.attributes) {
        let content = '';

        //
        // Step 1 - replace `attr="{key}"` attributes with corresponding values
        //
        if (typeof attr.value === 'string') {
          const trimmedValue = attr.value.trim();
          if (trimmedValue.startsWith('{') && trimmedValue.endsWith('}')) {
            const key = trimmedValue.slice(1, -1);
            content = this.dataset[key] || '';
            el.setAttribute(attr.name, content);
          }
        }

        //
        // Step 2 - handle if/unless attributes
        //
        if (attr.name === 'if') {
          if (isTruthy(content)) {
            el.removeAttribute('if');
          } else {
            el.remove();
          }
        } else if (attr.name === 'unless') {
          if (isTruthy(content)) {
            el.remove();
          } else {
            el.removeAttribute('unless');
          }
        }
      }

      //
      // Step 2 - replace text nodes with corresponding values
      //
      //  - Loop through every text node in the document
      //  - If it has an unescaped placeholder with :html, break the node into three: text + HTML + text
      //  - If it has an unescaped placeholder, swap it out with its text value
      //
      // TODO - this works but is too eager and breaks if/unless
      //
      // if (el.textContent?.includes('{')) {
      //   const htmlRegex = /\{([^}]+?):html\}/g;
      //   const textRegex = /\{([^}]+?)(?<!:html)\}/g;
      //   let content = el.innerHTML;

      //   // Handle HTML placeholders first
      //   content = content.replace(htmlRegex, (_match, key) => {
      //     return this.dataset[key] || '';
      //   });

      //   // Then handle text placeholders
      //   content = content.replace(textRegex, (_match, key) => {
      //     return escapeHtml(this.dataset[key] || '');
      //   });

      //   el.innerHTML = content;
      // }

      //
      // TODO - handle if/unless conditionals by showing/removing and stripping the attributes
      //
    });

    // Append the cloned template children
    this.append(doc);
  }

  render() {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-stamp': QuietStamp;
  }
}
